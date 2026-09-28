import { Code, H3, P, Page, Title, Table } from "@/components/docs-ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

async function getUsage() {
  const res = await fetch(
    "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/docs/USAGE.md",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch USAGE.md");
  }

  return res.text();
}

export default async function Usage() {
  const markdown = await getUsage();

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

  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="border-b bg-muted/50">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b last:border-0">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-4 py-3 align-top">
      {children}
    </td>
  ),
}}
      >
        {markdown}
      </ReactMarkdown>
    </Page>
  );
}