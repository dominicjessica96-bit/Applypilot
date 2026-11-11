export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 font-sans">
      <main className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-sm">
        <p className="text-sm font-medium tracking-wide text-zinc-500">
          Foundry MVP
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          ApplyPilot
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          Find relevant vacancies, review fit against a verified career profile,
          tailor application materials, then submit on the original job site.
        </p>
      </main>
    </div>
  );
}
