import { Code, H3, Page, P, Title, UL } from "@/components/docs-ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default async function Architecture() {
  const res = await fetch(
    "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/docs/ARCHITECTURE.md",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ARCHITECTURE.md");
  }

  const markdown = await res.text();

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
