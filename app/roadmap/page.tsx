
"use client";

import { useEffect, useState } from "react";
import {
  getRoadmapContributors,
  getRoadmapMarkdown,
  type RoadmapContributor,
} from "@/lib/roadmap";

function parseRoadmap(markdown: string) {
  const sections: Record<string, string[]> = {
    "In Progress": [],
    Planned: [],
  };

  let currentSection: keyof typeof sections | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);

    if (heading) {
      const section = heading[1].trim();

      currentSection =
        section in sections
          ? (section as keyof typeof sections)
          : null;

      continue;
    }

    if (!currentSection) continue;

    const item = line.match(/^\s*-\s+(.+?)\s*$/);

    if (item && item[1]) {
      sections[currentSection].push(item[1]);
    }
  }

  return sections;
}

export default function RoadmapPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [contributors, setContributors] = useState<
    RoadmapContributor[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getRoadmapMarkdown()
      .then((content) => {
        if (!cancelled) setMarkdown(content);
      })
      .catch((error) => {
        console.error("Failed to fetch roadmap:", error);

        if (!cancelled) {
          setError("Failed to load the roadmap. Please try again later.");
        }
      });

    getRoadmapContributors()
      .then((data) => {
        if (!cancelled) setContributors(data);
      })
      .catch((error) => {
        console.error("Failed to fetch roadmap contributors:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          FFD Roadmap
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {error}
        </p>
      </main>
    );
  }

  if (markdown === null) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          FFD Roadmap
        </h1>
        <p className="mt-4 text-muted-foreground">
          Loading roadmap...
        </p>
      </main>
    );
  }

  const roadmap = parseRoadmap(markdown);

  const sections = [
    {
      title: "In Progress",
      description: "Features currently being worked on.",
      items: roadmap["In Progress"],
    },
    {
      title: "Planned",
      description: "Features we're planning to work on.",
      items: roadmap.Planned,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
      <h1 className="text-4xl font-bold tracking-tight">
        <a
          href="https://github.com/hamidrezaesh/ffd/blob/main/ROADMAP.md"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-muted-foreground"
        >
          FFD Roadmap
          <span className="ml-2 text-base font-normal">↗</span>
        </a>
      </h1>
        <p className="mt-4 text-muted-foreground">
          See what we're working on and what's planned for FFD.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold">
              {section.title}
              <span className="ml-3 text-sm font-normal text-muted-foreground">
                {section.items.length}
              </span>
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {section.description}
            </p>

            <div className="mt-5 space-y-3">
              {section.items.length > 0 ? (
                section.items.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="rounded-xl border p-4"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  Nothing here yet.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-semibold">
          Roadmap Contributors
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks to everyone who has helped shape the FFD roadmap.
        </p>

        {contributors.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {contributors.map((contributor) => (
              <a
                key={contributor.username}
                href={contributor.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                @{contributor.username}
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No roadmap contributors yet.
          </p>
        )}
      </section>

      <section className="mt-12 rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold">
          Have an idea?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Want to suggest a feature for FFD? Open a pull
          request to the main repository and add your idea
          to ROADMAP.md.
        </p>
        <a
          href="https://github.com/hamidrezaesh/ffd/compare"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Suggest an idea on GitHub
        </a>
      </section>
    </main>
  );
}
