import { Code, H3, Page, P, Title, UL } from "@/components/docs-ui";

export default function Architecture() {
  return (
    <Page>
      <Title>Architecture</Title>

      <P>
        ffd is organized into separate packages, with each package responsible
        for a specific part of the downloader.
      </P>

      <Code>{`ffd/
├── .github/
│   └── workflows/
├── cmd/
├── internal/
│   ├── disk/
│   ├── engine/
│   ├── formatter/
│   ├── metadata/
│   ├── proxy/
│   ├── scheduler/
│   ├── tracker/
│   └── validator/
├── scripts/
├── main.go
├── go.mod
└── ...`}</Code>

      <H3>main.go</H3>

      <P>
        The entry point of ffd. It starts the Cobra CLI by calling the root
        command.
      </P>

      <H3>cmd/</H3>

      <P>Contains the CLI commands and their configuration.</P>

      <UL>
        <li>
          <strong>root.go</strong> — handles CLI arguments, download flags,
          multiple URLs, protocols, workers, chunks, retries, and output paths.
        </li>
        <li>
          <strong>version.go</strong> — contains the build-time version used by
          <code>ffd --version</code>.
        </li>
      </UL>

      <H3>internal/engine/</H3>

      <P>Responsible for the actual download process.</P>

      <UL>
        <li>HTTP requests and range downloads</li>
        <li>Workers and concurrent downloads</li>
        <li>Writing downloaded data</li>
        <li>Retries</li>
        <li>HTTP client configuration</li>
      </UL>

      <P>
        The engine receives the download plan from the scheduler and executes
        it.
      </P>

      <H3>internal/scheduler/</H3>

      <P>
        Responsible for deciding <strong>how the download should be performed</strong>.
      </P>

      <UL>
        <li>Splitting files into chunks</li>
        <li>Selecting the number of workers</li>
        <li>Testing HTTP protocols</li>
        <li>Selecting the preferred protocol</li>
        <li>Creating download ranges</li>
      </UL>

      <P>
        The scheduler produces the work that the engine executes.
      </P>

      <Code>{`URL
 │
 ▼
Scheduler
 │
 ├── Protocol
 ├── Workers
 └── Chunks
 │
 ▼
Engine
 │
 ▼
Downloaded File`}</Code>

      <H3>internal/proxy/</H3>

      <P>Contains the ffd forward proxy.</P>

      <UL>
        <li>Incoming proxy requests</li>
        <li>HTTP requests</li>
        <li>HTTPS CONNECT tunnels</li>
        <li>Checking range support</li>
        <li>Forwarding requests</li>
        <li>Accelerated downloads when possible</li>
      </UL>

      <H3>scripts/</H3>

      <P>Contains installation scripts used by the updater.</P>

      <UL>
        <li>
          <strong>install.sh</strong> — Linux and macOS installation.
        </li>
        <li>
          <strong>install.ps1</strong> — Windows PowerShell installation.
        </li>
      </UL>

      <H3>Build &amp; Configuration</H3>

      <UL>
        <li>
          <strong>go.mod</strong> — Go module and dependencies.
        </li>
        <li>
          <strong>go.sum</strong> — dependency checksums.
        </li>
        <li>
          <strong>.goreleaser.yaml</strong> — build and release configuration.
        </li>
        <li>
          <strong>.github/workflows/</strong> — automated CI and release
          workflows.
        </li>
      </UL>
    </Page>
  );
}