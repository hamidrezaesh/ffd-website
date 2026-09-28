import { Page, Title } from "@/components/docs-ui";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default async function Overview() {
  const res = await fetch(
    "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/README.md",
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  const markdown = await res.text();
  return (
    <Page>
      <Title>Overview</Title>

      <div className="prose max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </Page>
  );
}
