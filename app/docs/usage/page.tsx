import { Code, H3, P, Page, Title, Table } from "@/components/docs-ui";

export default function Usage() {
  return (
    <Page>
      <Title>Usage</Title>

      <H3>Basic</H3>

      <Code>ffd &lt;URL&gt;</Code>

      <P>Download multiple files:</P>
      <Code>ffd &lt;URL1&gt; &lt;URL2&gt; &lt;URL3&gt;</Code>

      <H3>Commands</H3>

      <H3>proxy</H3>

      <P>Start the ffd forward proxy.</P>
      <Code>ffd proxy</Code>

      <H3>update</H3>

      <P>Update ffd to the latest version.</P>
      <Code>ffd update</Code>

      <H3>Options</H3>

      <Table
        headers={["Option", "Short", "Description", "Default"]}
        rows={[
          ["--output NAME", "-o", "Custom output filename", "—"],
          ["--wait SECONDS", "-w", "Wait before downloading", "—"],
          ["--path PATH", "-p", "Output directory", "."],
          ["--max-retries NUMBER", "-r", "Maximum retries", "4"],
          ["--max-workers NUMBER", "-W", "Maximum concurrent workers", "8"],
          ["--max-chunks NUMBER", "-c", "Maximum download chunks", "12"],
          ["--protocol PROTOCOL", "—", "HTTP protocol to use", "auto"],
          ["--help", "-h", "Show help", "—"],
          ["--version", "-v", "Show version", "—"],
        ]}
      />

      <H3>Examples</H3>

      <P>Custom filename:</P>
      <Code>ffd &lt;URL&gt; -o my-file.zip</Code>

      <P>Custom download directory:</P>
      <Code>ffd &lt;URL&gt; -p ~/Downloads</Code>

      <P>More workers and chunks:</P>
      <Code>ffd &lt;URL&gt; -W 16 -c 20</Code>

      <P>Force HTTP/2:</P>
      <Code>ffd &lt;URL&gt; --protocol http2</Code>

      <P>Wait before downloading:</P>
      <Code>ffd &lt;URL&gt; -w 10</Code>

      <P>Increase retries:</P>
      <Code>ffd &lt;URL&gt; -r 10</Code>

      <P>
        For more details about ffd&apos;s architecture and internals, see the
        project documentation.
      </P>
    </Page>
  );
}