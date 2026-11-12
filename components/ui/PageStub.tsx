/** Temporary page body: just the page name. Each route gets its real content one by one. */
export function PageStub({ title }: { title: string }) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-gradient-to-b from-hero-a via-hero-b to-hero-c px-5 pt-28">
      <h1 className="text-5xl font-extrabold tracking-tight text-heading sm:text-6xl">{title}</h1>
    </main>
  );
}
