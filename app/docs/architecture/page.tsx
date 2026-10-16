
"use client";

import { useEffect, useState } from "react";
import { Code, H3, Page, P, Title, UL } from "@/components/docs-ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const ARCHITECTURE_URL =
  "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/docs/ARCHITECTURE.md";

export default function Architecture() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(ARCHITECTURE_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch ARCHITECTURE.md");
        }
        return res.text();
      })
      .then((content) => {
        if (!cancelled) setMarkdown(content);
      })
      .catch((err) => {
        console.error("Failed to fetch ARCHITECTURE.md:", err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <Page>
        <Title>Architecture</Title>
        <P>Failed to load the architecture documentation. Please try again later.</P>
      </Page>
    );
  }

  if (markdown === null) {
    return (
      <Page>
        <Title>Architecture</Title>
        <P>Loading documentation...</P>
      </Page>
    );
  }

  return (
    <Page>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => <Title>{children}</Title>,
          h2: ({ children }) => <H3>{children}</H3>,
          h3: ({ children }) => <H3>{children}</H3>,
          p: ({ children }) => <P>{children}</P>,
          ul: ({ children }) => <UL>{children}</UL>,

          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border bg-zinc-950 p-4 text-sm leading-6">
              {children}
            </pre>
          ),

          code: ({ className, children, ...props }) => (
            <code className={`${className ?? ""} font-mono`} {...props}>
              {children}
            </code>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Page>
  );
}
