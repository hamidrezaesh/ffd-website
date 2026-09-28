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
      { href: "/docs/usage", label: "Usage" },
      { href: "/docs/architecture", label: "Architecture" },
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

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
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
                        ? "flex min-h-10 items-center rounded-lg bg-gray-900 px-3 text-sm font-semibold text-white"
                        : "flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
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
      {/* ========================= */}
      {/* MOBILE DOCS NAVIGATION */}
      {/* ========================= */}

      <div className="sm:hidden">
        {/* Docs bar */}
        <div className="sticky top-16 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="flex h-14 items-center px-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle documentation navigation"
              className="flex h-10 w-10 items-center justify-center bg-transparent text-gray-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Docs menu */}
        {open && (
          <div className="sticky top-[7rem] z-30 max-h-[calc(100vh-7rem)] overflow-y-auto border-b border-gray-200 bg-white px-5 py-6 shadow-lg">
            <NavLinks
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* DESKTOP DOCS SIDEBAR */}
      {/* ========================= */}

      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 px-6 py-10 sm:block">
        <NavLinks pathname={pathname} />
      </aside>
    </>
  );
}