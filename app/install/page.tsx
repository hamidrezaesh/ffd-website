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
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch latest release.");
  }

  return res.json();
}

export default async function Install() {
	const release = await getLatestRelease()
	
	const assets: GitHubAsset[] = release.assets.filter(
		  (asset: GitHubAsset) =>
			asset.name.endsWith(".tar.gz") ||
			asset.name.endsWith(".zip")
		);
	
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900">Installation</h1>

        <p className="mt-3 text-lg text-gray-600">
          Install FFD using the official installer or download a release
          manually.
        </p>

        {/* Linux / macOS */}
        <section className="mt-12 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Linux / macOS
          </h2>

          <p className="mt-3 text-gray-600">
            Install the latest version directly from GitHub.
          </p>

          <pre className="mt-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
            <code>
              curl -fsSL https://raw.githubusercontent.com/hamidrezaesh/ffd/main/scripts/install.sh | sh
            </code>
          </pre>

          <p className="mt-6 text-gray-600">Verify the installation:</p>

          <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
            <code>ffd --help</code>
          </pre>
        </section>

        {/* Windows */}
        <section className="mt-8 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Windows</h2>

          <p className="mt-3 text-gray-600">
            Native Windows installer is coming soon.
          </p>

          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-gray-500">
            Coming Soon
          </div>
        </section>

        {/* Install from Release */}
        <section className="mt-12 rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Install from Release
          </h2>

          <p className="mt-3 text-gray-600">
            Download a release archive for your operating system and install FFD
            manually.
          </p>

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

          <h3 className="mt-10 text-xl font-semibold text-gray-900">
            Linux / macOS
          </h3>

          <p className="mt-3 text-gray-600">
            After downloading the archive:
          </p>

          <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
            <code>{`
# Extract the downloaded archive
tar -xzf ffd_*.tar.gz
	
# Install the binary
sudo install -m 755 ffd /usr/local/bin/

# Verify it
ffd --help`}</code>
          </pre>
          
          <h3 className="mt-10 text-xl font-semibold text-gray-900">
			  Windows
			</h3>

			<p className="mt-3 text-gray-600">
			  Download the appropriate <code>.zip</code> archive from the Releases page.
			  Extract <code>ffd.exe</code> and add its directory to your{" "}
			  <code>PATH</code>.
			</p>

			<p className="mt-6 text-gray-600">
			  Then run:
			</p>

			<pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
			  <code>ffd --help</code>
			</pre>

          <p className="mt-6 text-sm text-gray-500">
            Need more details? See the{" "}
            <a
              href="https://github.com/hamidrezaesh/ffd/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              README on GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
