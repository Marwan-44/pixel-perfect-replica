#!/usr/bin/env node
/**
 * Commits and pushes whatever changes in the `uploads/` folder (images + links.json).
 *
 *   npm run publish:watch   keeps running and publishes every change it sees
 *   npm run publish:now     publishes the current changes once and exits
 *
 * Only the `uploads/` folder is ever committed, so unfinished work elsewhere in the project is
 * never swept into an automatic commit.
 */
import { execFile } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WATCHED = ["uploads"];
const POLL_MS = 2000;
const RETRY_MS = 30000;
const BIG_FILE_MB = 50;

const stamp = () => new Date().toLocaleTimeString();
const defaultLog = (msg) => console.log(`[publish ${stamp()}] ${msg}`);

async function git(args) {
  const { stdout } = await run("git", args, {
    cwd: ROOT,
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true,
  });
  return stdout;
}

const gitError = (err) => String(err?.stderr || err?.message || err).trim();

/** Files under uploads/ that are new, changed or deleted. */
async function pendingChanges() {
  const out = await git([
    "status",
    "--porcelain=v1",
    "-z",
    "--untracked-files=all",
    "--",
    ...WATCHED,
  ]);
  const parts = out.split("\0").filter(Boolean);
  const files = [];
  for (let i = 0; i < parts.length; i++) {
    const entry = parts[i];
    files.push(entry.slice(3));
    if (entry[0] === "R" || entry[0] === "C") i++; // renames list the old name as a second entry
  }
  return files;
}

/** Changes while a file is still being copied, so we only publish once it stops changing. */
function signature(files) {
  return files
    .map((f) => {
      try {
        const s = statSync(path.join(ROOT, f));
        return `${f}:${s.size}:${s.mtimeMs}`;
      } catch {
        return `${f}:gone`;
      }
    })
    .join("|");
}

function commitMessage(files) {
  const names = files.map((f) => f.replace(/^uploads\//, ""));
  const shown = names.slice(0, 3).join(", ");
  const more = names.length > 3 ? ` and ${names.length - 3} more` : "";
  return `Update site content: ${shown}${more}`;
}

async function push(log) {
  const branch = (await git(["rev-parse", "--abbrev-ref", "HEAD"])).trim();
  if (branch === "HEAD")
    throw new Error("Git is in a detached HEAD state. Switch to a branch (git switch main) first.");
  try {
    await git(["push", "origin", `HEAD:${branch}`]);
  } catch {
    // The remote has newer commits (for example from Lovable): bring them in, then try again.
    log("Remote has new commits, pulling them in first...");
    await git(["pull", "--rebase", "--autostash", "origin", branch]);
    await git(["push", "origin", `HEAD:${branch}`]);
  }
  return branch;
}

/** Commits and pushes the pending uploads. Returns the number of files published (0 = nothing). */
export async function publishNow(log = defaultLog) {
  const files = await pendingChanges();
  if (files.length === 0) return 0;

  for (const f of files) {
    try {
      const mb = statSync(path.join(ROOT, f)).size / (1024 * 1024);
      if (mb > BIG_FILE_MB)
        log(`Warning: ${f} is ${mb.toFixed(0)} MB. GitHub rejects files over 100 MB.`);
    } catch {
      /* deleted file */
    }
  }

  await git(["add", "-A", "--", ...WATCHED]);
  const staged = (await git(["diff", "--cached", "--name-only", "--", ...WATCHED])).trim();
  if (!staged) return 0;

  await git(["commit", "-m", commitMessage(files), "--", ...WATCHED]);
  const branch = await push(log);
  log(`Published ${files.length} file(s) to ${branch}.`);
  return files.length;
}

/** Checks that git is ready to commit and push. Returns an error message, or null when fine. */
export async function preflight() {
  try {
    await git(["rev-parse", "--is-inside-work-tree"]);
  } catch {
    return "This folder is not a git repository, so there is nothing to push to.";
  }
  try {
    await git(["remote", "get-url", "origin"]);
  } catch {
    return "No git remote named origin. Clone the project from GitHub (git clone <url>) and run this inside it.";
  }
  for (const key of ["user.name", "user.email"]) {
    try {
      if (!(await git(["config", key])).trim()) throw new Error("empty");
    } catch {
      return `Git does not know your ${key}. Run: git config --global ${key} "your value"`;
    }
  }
  return null;
}

/** Watches uploads/ and publishes changes. Call the returned function to stop. */
export function startAutoPublish({ log = defaultLog } = {}) {
  let stopped = false;
  let timer = null;
  let lastSignature = null;

  const tick = async () => {
    let delay = POLL_MS;
    try {
      const files = await pendingChanges();
      if (files.length === 0) {
        lastSignature = null;
      } else {
        const sig = signature(files);
        if (sig !== lastSignature) {
          if (lastSignature === null)
            log(`Change detected (${files.length} file(s)), publishing in a moment...`);
          lastSignature = sig;
        } else {
          await publishNow(log);
          lastSignature = null;
        }
      }
    } catch (err) {
      log(`Could not publish: ${gitError(err)}`);
      log(`Will try again in ${RETRY_MS / 1000} seconds.`);
      delay = RETRY_MS;
    }
    if (!stopped) timer = setTimeout(tick, delay);
  };

  log(
    `Watching the uploads/ folder. New images and link changes are committed and pushed automatically.`,
  );
  void tick();
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
  };
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const problem = await preflight();
  if (problem) {
    console.error(problem);
    process.exit(1);
  }
  if (process.argv.includes("--once")) {
    try {
      const n = await publishNow();
      if (n === 0) console.log("Nothing new in uploads/ to publish.");
    } catch (err) {
      console.error(gitError(err));
      process.exit(1);
    }
  } else {
    const stop = startAutoPublish();
    const quit = () => {
      stop();
      process.exit(0);
    };
    process.on("SIGINT", quit);
    process.on("SIGTERM", quit);
  }
}
