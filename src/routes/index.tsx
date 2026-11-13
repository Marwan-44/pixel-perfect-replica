import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/site/HomePage";

const title = "RAQEEB — Smarter Care. Safer Treatment. Better Outcomes.";
const description =
  "RAQEEB is an AI-powered healthcare platform supporting cancer treatment monitoring through toxicity assessment, clinical decision support, and continuous follow-up.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomePage />;
}
