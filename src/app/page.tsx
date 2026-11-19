import Link from "next/link";
import { ArrowRight, Eye, FileText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: ShieldCheck,
    title: "Evidence over polish",
    description:
      "Every AI statement is tied to a fact in your verified profile. Provenance is normal, not technical.",
  },
  {
    icon: Eye,
    title: "Show uncertainty honestly",
    description:
      "“Not evidenced” is a first-class state. We never invent experience or imply odds.",
  },
  {
    icon: FileText,
    title: "You review and submit",
    description:
      "Prepare a tailored CV and note, review every line, then apply on the employer’s own site.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <span
              className="grid size-8 place-items-center rounded-sm bg-accent text-sm font-semibold text-white"
              aria-hidden="true"
            >
              AP
            </span>
            <span className="text-sm font-semibold text-ink-950">
              ApplyPilot
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/design">Design system</Link>
          </Button>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_0%,var(--color-accent-100),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Badge variant="accent">Phase 1 · Design system</Badge>
          <h1 className="mt-5 max-w-3xl text-display-sm text-heading sm:text-display">
            Evidence-grounded applications, without the guesswork.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Find relevant jobs, check your fit against a verified career
            profile, and prepare application materials you can defend line by
            line.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/design">
                Explore the design system
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/design#domain">See job &amp; fit components</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Built for Nigerian job seekers. Mobile-first, low-bandwidth, and
            calm by design.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="rounded-md border border-line bg-surface p-5 shadow-sm"
              >
                <span className="grid size-10 place-items-center rounded-sm bg-accent-100 text-accent-800">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-base font-medium text-heading">
                  {principle.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-muted">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-auto border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>ApplyPilot · Evidence-grounded job applications.</p>
          <p>Next.js 16 · Tailwind CSS 4 · Radix primitives</p>
        </div>
      </footer>
    </main>
  );
}
