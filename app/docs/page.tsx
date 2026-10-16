
"use client";

import { useEffect, useState } from "react";
import { Page, Title } from "@/components/docs-ui";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const README_URL =
  "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/README.md";

export default function Overview() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(README_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch README.md");
        }

        return res.text();
      })
      .then((content) => {
        if (!cancelled) setMarkdown(content);
      })
      .catch((err) => {
        console.error("Failed to fetch README.md:", err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page>
      <Title>Overview</Title>

      {error ? (
        <p className="text-muted-foreground">
          Failed to load the overview. Please try again later.
        </p>
      ) : markdown === null ? (
        <p className="text-muted-foreground">
          Loading documentation...
        </p>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </Page>
  );
}
