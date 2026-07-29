import Link from "next/link";

export default function Home() {
  return (
  <div className="bg-white">
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900">
          $ ffd
        </h1>

        <p className="mt-4 text-2xl text-gray-600">
          Fast Fetch Data
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
            href="/install">
            Install
          </Link>

          <Link
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 font-medium transition hover:bg-gray-100"
             href="https://github.com/hamidrezaesh/ffd/blob/main/README.md"
			target="_blank"
			rel="noopener noreferrer">
            Learn More
          </Link>
        </div>
      </section>
    </main>

  </div>
  );
}
