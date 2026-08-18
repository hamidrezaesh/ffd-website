import { Page, P, Title } from "@/components/docs-ui";

export default function HowItWorks() {
  return (
    <Page>
      <Title>How it works</Title>

      <P>
        When the server supports HTTP byte-range requests, ffd divides the
        file into multiple ranges and downloads them concurrently.
      </P>

      <P>
        If the server does not support range requests, ffd automatically
        falls back to a single download stream.
      </P>
    </Page>
  );
}
