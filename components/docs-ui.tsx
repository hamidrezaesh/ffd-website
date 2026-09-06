import type { ReactNode } from "react";

export function Code({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-gray-800 bg-gray-950 p-4 text-sm leading-relaxed text-emerald-400 shadow-inner">
      <code>{children}</code>
    </pre>
  );
}

export function Inline({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-900">
      {children}
    </code>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-14 scroll-mt-24 border-b border-gray-200 pb-3 text-2xl font-semibold tracking-tight text-gray-900">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-10 text-xl font-semibold tracking-tight text-gray-900">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-gray-600">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-gray-600 marker:text-gray-400">
      {children}
    </ul>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl">{children}</div>;
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {children}
    </h1>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-900">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-gray-600">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}