import DotBackground from "@/components/DotBackground";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <DotBackground />

    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <section className="text-center">
          <div className="mx-auto w-fit rounded-xl border border-gray-200 bg-gray-950 px-6 py-4 font-mono shadow-2xl shadow-blue-500/10">
            <span className="select-none text-gray-500">$ </span>
            <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              ffd
            </span>
          </div>

          <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
            Fast Fetch Data
          </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            href="/docs/install">
            Install
          </Link>

          <Link
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50"
              href="/docs">
            Learn More
          </Link>
        </div>
      </section>
    </main>

    </div>
  );
}
