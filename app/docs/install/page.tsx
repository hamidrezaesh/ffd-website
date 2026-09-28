import { Code, H2, H3, Inline, P, Page, Title } from "@/components/docs-ui";

type GitHubAsset = {
  id: number;
  name: string;
  browser_download_url: string;
};

async function getLatestRelease() {
  const res = await fetch(
    "https://api.github.com/repos/hamidrezaesh/ffd/releases/latest",
    {
      next: { revalidate: 3600 }, // Refresh every hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch latest release.");
  }

  return res.json();
}

export default async function Install() {
  const release = await getLatestRelease();

  const assets: GitHubAsset[] = release.assets.filter(
    (asset: GitHubAsset) =>
      asset.name.endsWith(".tar.gz") || asset.name.endsWith(".zip"),
  );

  return (
    <Page>
      <Title>Installation</Title>

      <P>
        Install FFD using the official installer or download a release manually.
      </P>

      <H2>Linux / macOS</H2>

      <P>Install the latest version directly from GitHub.</P>

      <Code>
        curl -fsSL
        https://raw.githubusercontent.com/hamidrezaesh/ffd/main/scripts/install.sh
        | sh
      </Code>

      <P>Verify the installation:</P>

      <Code>ffd --help</Code>

      <H2>Windows</H2>

      <P>
        Before running the installer, make sure PowerShell scripts are allowed:
      </P>

      <Code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</Code>

      <P>Then run:</P>

      <Code>
        irm
        https://raw.githubusercontent.com/hamidrezaesh/ffd/main/scripts/install.ps1
        | iex
      </Code>

      <P>After installation, restart your terminal and run:</P>

      <Code>ffd --help</Code>

      <H2>Install from Release</H2>

      <P>
        Download a release archive for your operating system and install FFD
        manually.
      </P>

      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Operating System</th>
              <th className="px-6 py-4 font-semibold">Architecture</th>
              <th className="px-6 py-4 font-semibold">Download</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => {
              let os = "Unknown";
              let arch = "Unknown";

              if (asset.name.includes("linux")) os = "Linux";
              else if (asset.name.includes("darwin")) os = "macOS";
              else if (asset.name.includes("windows")) os = "Windows";

              if (asset.name.includes("amd64")) arch = "x86_64 / amd64";
              else if (asset.name.includes("arm64")) arch = "ARM64";

              return (
                <tr key={asset.id} className="border-t">
                  <td className="px-6 py-4">{os}</td>

                  <td className="px-6 py-4">{arch}</td>

                  <td className="px-6 py-4">
                    <a
                      href={asset.browser_download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <H3>Linux / macOS</H3>

      <P>After downloading the archive:</P>

      <Code>{`# Extract the downloaded archive
tar -xzf ffd_*.tar.gz

# Install the binary
sudo install -m 755 ffd /usr/local/bin/

# Verify it
ffd --help`}</Code>

      <H3>Windows</H3>

      <P>
        Download the appropriate <Inline>.zip</Inline> archive from the Releases
        page. Extract <Inline>ffd.exe</Inline> and add its directory to your{" "}
        <Inline>PATH</Inline>.
      </P>

      <P>Then run:</P>

      <Code>ffd --help</Code>
    </Page>
  );
}
