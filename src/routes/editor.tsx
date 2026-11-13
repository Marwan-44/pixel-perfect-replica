import { createFileRoute } from "@tanstack/react-router";

import { WebsiteEditor } from "@/components/editor/WebsiteEditor";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "RAQEEB Website Editor" },
      { name: "description", content: "Edit the RAQEEB website text and images in this browser." },
      { property: "og:title", content: "RAQEEB Website Editor" },
      { property: "og:description", content: "Edit the RAQEEB website text and images in this browser." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  return <WebsiteEditor />;
}
