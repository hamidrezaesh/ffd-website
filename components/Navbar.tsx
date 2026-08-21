"use client";

import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs/install", label: "Install" },
  { href: "/docs", label: "Docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="rounded-md bg-gray-900 px-2.5 py-1 font-mono text-lg font-bold tracking-tight text-white transition hover:bg-gray-700"
          >
            ffd
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-black">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/hamidrezaesh/ffd"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            GitHub
          </a>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-md border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 sm:hidden"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-200/60 bg-white px-4 pb-4 pt-2 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
