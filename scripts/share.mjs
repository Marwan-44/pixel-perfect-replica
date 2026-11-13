#!/usr/bin/env node
/**
 * One command that does everything:
 *   1. starts the site (vite dev) on your computer,
 *   2. commits and pushes anything you add to the uploads/ folder,
 *   3. opens a public link (Cloudflare quick tunnel) that anyone can open in a browser.
 *
 *   npm run share                 all three
 *   npm run share -- --no-tunnel  no public link (site + auto publish only)
 *   npm run share -- --no-publish no automatic commit/push
 *
 * The public link only works while this command is running, and it changes every time.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";

import { preflight, ROOT, startAutoPublish } from "./auto-publish.mjs";

const PORT = Number(process.env.PORT ?? 8080);
const args = new Set(process.argv.slice(2));
const win = process.platform === "win32";
const children = [];
let stopPublisher = () => {};
let quitting = false;

const say = (msg) => console.log(msg);

function shutdown(code = 0) {
  if (quitting) return;
  quitting = true;
  stopPublisher();
  for (const child of children) {
    if (child.exitCode !== null) continue;
    if (win) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { windowsHide: true });
    else child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(code), 300);
}
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

function waitForServer(timeoutMs = 180000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get({ host: "127.0.0.1", port: PORT, path: "/", timeout: 4000 }, (res) => {
        res.resume();
        resolve();
      });
      const retry = () => {
        if (Date.now() - started > timeoutMs) reject(new Error("The site did not start in time."));
        else setTimeout(attempt, 1000);
      };
      req.on("error", retry);
      req.on("timeout", () => {
        req.destroy();
        retry();
      });
    };
    attempt();
  });
}

function startSite() {
  const vite = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");
  if (!existsSync(vite)) {
    console.error("Dependencies are not installed. Run: npm install");
    process.exit(1);
  }
  const child = spawn(
    process.execPath,
    [vite, "dev", "--host", "0.0.0.0", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "inherit", env: { ...process.env, RAQEEB_SHARE: "1" } },
  );
  children.push(child);
  child.on("exit", (code) => {
    if (!quitting) {
      say(
        `\nThe site stopped (exit code ${code}). If port ${PORT} was busy, close what uses it or run: PORT=3000 npm run share`,
      );
      shutdown(code ?? 1);
    }
  });
}

function startTunnel() {
  const hasBinary =
    spawnSync(win ? "where" : "which", ["cloudflared"], { windowsHide: true }).status === 0;
  const tunnelArgs = ["tunnel", "--url", `http://127.0.0.1:${PORT}`, "--no-autoupdate"];
  const [cmd, cmdArgs] = hasBinary
    ? ["cloudflared", tunnelArgs]
    : [win ? "npx.cmd" : "npx", ["--yes", "cloudflared", ...tunnelArgs]];

  let found = false;
  const child = spawn(cmd, cmdArgs, { cwd: ROOT, shell: win, windowsHide: true });
  children.push(child);

  const onData = (chunk) => {
    // Log lines also mention Cloudflare's own API host, which is not the public link.
    const match = [
      ...chunk.toString().matchAll(/https:\/\/([a-z0-9-]+)\.trycloudflare\.com/gi),
    ].find((m) => m[1].toLowerCase() !== "api");
    if (match && !found) {
      found = true;
      const bar = "=".repeat(Math.max(40, match[0].length + 6));
      say(
        `\n${bar}\n  Public link (send this to anyone):\n\n  ${match[0]}\n\n  Works while this window stays open. A new link is created every run.\n${bar}\n`,
      );
    }
  };
  child.stdout.on("data", onData);
  child.stderr.on("data", onData);

  child.on("error", () => {});
  child.on("exit", () => {
    if (!quitting && !found) {
      say(
        "\nCould not open a public link. Install Cloudflare's free tunnel tool and run again:\n" +
          "  https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/\n" +
          "The site is still running, and anyone on your Wi-Fi can open the Network address printed above.\n",
      );
    }
  });
}

const problem = args.has("--no-publish") ? null : await preflight();
if (problem) {
  console.error(`Automatic publishing is off: ${problem}`);
} else if (!args.has("--no-publish")) {
  stopPublisher = startAutoPublish();
}

startSite();

if (!args.has("--no-tunnel")) {
  try {
    await waitForServer();
    say("\nSite is up. Opening the public link...");
    startTunnel();
  } catch (err) {
    console.error(err.message);
  }
}
