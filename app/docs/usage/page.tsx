import { Code, H3, P, Page, Title, UL } from "@/components/docs-ui";

export default function Usage() {
  return (
    <Page>
      <Title>Usage</Title>

      <H3>Download a file</H3>

      <Code>ffd https://example.com/file.zip</Code>

      <P>
        ffd automatically detects the file metadata and, when supported,
        downloads the file using multiple HTTP byte ranges.
      </P>

      <H3>HTTP Forward Proxy</H3>

      <P>ffd can also run as a local HTTP forward proxy.</P>

      <P>Start the proxy:</P>
      <Code>ffd proxy</Code>

      <P>By default, the proxy listens on 127.0.0.1:8000</P>

      <P>You can change the port with:</P>
      <Code>ffd proxy --port 9000</Code>

      <P>Then configure your browser or another HTTP client to use:</P>
      <UL>
        <li>HTTP Proxy: 127.0.0.1:8000</li>
        <li>HTTPS Proxy: 127.0.0.1:8000</li>
      </UL>
    </Page>
  );
}
