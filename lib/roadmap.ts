
const GITHUB_API =
  "https://api.github.com/repos/hamidrezaesh/ffd";

const ROADMAP_URL =
  "https://raw.githubusercontent.com/hamidrezaesh/ffd/main/ROADMAP.md";

export interface RoadmapContributor {
  username: string;
  profileUrl: string;
}

interface GitHubPullRequest {
  number: number;
  merged_at: string | null;
  user: {
    login: string;
    html_url: string;
  } | null;
}

interface GitHubPullRequestFile {
  filename: string;
}

export async function getRoadmapMarkdown(): Promise<string> {
  const response = await fetch(ROADMAP_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch FFD roadmap: ${response.status}`,
    );
  }

  return response.text();
}

export async function getRoadmapContributors(): Promise<
  RoadmapContributor[]
> {
  const response = await fetch(
    `${GITHUB_API}/pulls?state=closed&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch FFD pull requests: ${response.status}`,
    );
  }

  const pullRequests: GitHubPullRequest[] =
    await response.json();

  const contributors = new Map<string, RoadmapContributor>();

  for (const pr of pullRequests) {
    if (!pr.merged_at || !pr.user) continue;

    const filesResponse = await fetch(
      `${GITHUB_API}/pulls/${pr.number}/files`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );

    if (!filesResponse.ok) continue;

    const files: GitHubPullRequestFile[] =
      await filesResponse.json();

    const changedRoadmap = files.some(
      (file) => file.filename === "ROADMAP.md",
    );

    if (!changedRoadmap) continue;

    contributors.set(pr.user.login, {
      username: pr.user.login,
      profileUrl: pr.user.html_url,
    });
  }

  return Array.from(contributors.values());
}
