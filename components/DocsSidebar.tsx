"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type DocLink = {
  href: string;
  label: string;
};

type DocGroup = {
  title: string;
  links: DocLink[];
};

const groups: DocGroup[] = [
  {
    title: "Getting Started",
    links: [{ href: "/docs", label: "Overview" }],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/install", label: "Install" },
      { href: "/docs/features", label: "Features" },
      { href: "/docs/usage", label: "Usage" },
      { href: "/docs/how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/requirements", label: "Requirements" },
      { href: "/docs/license", label: "License" },
    ],
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {group.title}
          </h3>
          <ul className="mt-3 space-y-1">
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={
                      active
                        ? "block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-16 z-40 flex items-center justify-between border-b border-gray-200 bg-white/70 px-6 py-3 backdrop-blur-md lg:hidden">
        <span className="text-sm font-semibold text-gray-900">Documentation</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle documentation menu"
          className="rounded-md border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile slide-down */}
      {open && (
        <div className="sticky top-[7.25rem] z-30 border-b border-gray-200 bg-white px-6 py-4 lg:hidden">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 px-6 py-10 lg:block">
        <NavLinks pathname={pathname} />
      </aside>
    </>
  );
}
