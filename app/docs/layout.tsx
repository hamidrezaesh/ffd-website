import DocsSidebar from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-6 py-12 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
