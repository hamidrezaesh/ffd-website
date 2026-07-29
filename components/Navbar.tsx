export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700"
          >
            ffd
          </a>

          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="transition hover:text-black">
              Home
            </a>

            <a href="/install" className="transition hover:text-black">
              Install
            </a>
          </div>
        </div>

        {/* Right */}
        <a
          href="https://github.com/hamidrezaesh/ffd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-600 transition hover:text-black"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
