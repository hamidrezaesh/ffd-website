export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="rounded-md bg-gray-900 px-2.5 py-1 font-mono text-lg font-bold tracking-tight text-white transition hover:bg-gray-700"
          >
            ffd
          </a>

          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a
              href="/"
              className="transition hover:text-black"
            >
              Home
            </a>

            <a
              href="/docs/install"
              className="transition hover:text-black"
            >
              Install
            </a>

            <a
              href="/docs"
              className="transition hover:text-black"
            >
              Docs
            </a>
          </div>
        </div>

        {/* Right */}
        <a
          href="https://github.com/hamidrezaesh/ffd"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
