import { Page, P, Title, UL } from "@/components/docs-ui";

export default function Features() {
  return (
    <Page>
      <Title>Features</Title>

      <P>ffd comes with the following features:</P>

      <UL>
        <li>Multi-segment downloads</li>
        <li>Automatic file metadata detection</li>
        <li>Automatic filename detection</li>
        <li>Download progress tracking</li>
        <li>Download speed display</li>
        <li>Estimated time remaining</li>
        <li>Custom filenames</li>
        <li>Custom download paths</li>
        <li>Delayed downloads</li>
        <li>Cross-platform Go implementation</li>
        <li>
          Automatically distributes download chunks among workers for better
          performance.
        </li>
      </UL>
    </Page>
  );
}
