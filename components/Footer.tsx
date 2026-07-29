export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-600 md:flex-row">
        <p>
          Made by{" "}
          <a
            href="https://github.com/hamidrezaesh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 hover:underline"
          >
            Hamidreza
          </a>
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/hamidrezaesh/ffd-website"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 hover:underline"
          >
            Website Source
          </a>

          <a
            href="https://github.com/hamidrezaesh/ffd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
