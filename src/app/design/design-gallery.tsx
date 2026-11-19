"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Info,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckboxField } from "@/components/ui/checkbox";
import {
  CharacterCounter,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { ProgressSteps, type Step } from "@/components/ui/progress-steps";
import { RadioGroup, RadioOption } from "@/components/ui/radio-group";
import { Skeleton, SkeletonText, Spinner } from "@/components/ui/skeleton";
import { SwitchField } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ApplicationRow } from "@/components/domain/application-row";
import { EvidenceChip } from "@/components/domain/evidence-chip";
import { FitSummary } from "@/components/domain/fit-summary";
import { JobCard } from "@/components/domain/job-card";
import { RequirementRow } from "@/components/domain/requirement-row";
import { StatusPill, type FitStatus } from "@/components/domain/status-pill";

const sections = [
  { id: "foundations", label: "Foundations" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing & elevation" },
  { id: "actions", label: "Actions" },
  { id: "forms", label: "Forms" },
  { id: "feedback", label: "Feedback" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays" },
  { id: "domain", label: "Job & fit" },
  { id: "content", label: "Content rules" },
  { id: "accessibility", label: "Accessibility" },
];

type ColorToken = { token: string; hex: string; usage: string };

const paletteGroups: Array<{
  name: string;
  description: string;
  tokens: ColorToken[];
}> = [
  {
    name: "Ink",
    description: "Text, structure, and borders",
    tokens: [
      { token: "ink-950", hex: "#0B1220", usage: "Headings" },
      { token: "ink-900", hex: "#111A2C", usage: "Body text" },
      { token: "ink-700", hex: "#2A3A55", usage: "Secondary text" },
      { token: "ink-500", hex: "#5B6B85", usage: "Muted text" },
      { token: "ink-300", hex: "#A7B2C3", usage: "Disabled text" },
      { token: "ink-100", hex: "#E6EAF0", usage: "Borders" },
    ],
  },
  {
    name: "Paper & surface",
    description: "Warm, low-glare backgrounds",
    tokens: [
      { token: "paper-50", hex: "#FCFAF6", usage: "App background" },
      { token: "paper-100", hex: "#F6F2EA", usage: "Subtle panels" },
      { token: "paper-200", hex: "#EFE9DD", usage: "Pressed panels" },
      { token: "surface", hex: "#FFFFFF", usage: "Cards and forms" },
    ],
  },
  {
    name: "Pilot teal",
    description: "One accent for primary actions and focus",
    tokens: [
      { token: "accent-800", hex: "#0B4A45", usage: "Accent text" },
      { token: "accent-700", hex: "#0F5F58", usage: "Accent hover" },
      { token: "accent-600", hex: "#0F766E", usage: "Primary button" },
      { token: "accent-500", hex: "#0E9F8A", usage: "Decorative marks" },
      { token: "accent-200", hex: "#B7E6DC", usage: "Accent border" },
      { token: "accent-100", hex: "#D9F2EC", usage: "Selected background" },
    ],
  },
  {
    name: "Feedback",
    description: "Always paired with an icon and a text label",
    tokens: [
      { token: "success-700", hex: "#15803D", usage: "Supported" },
      { token: "success-50", hex: "#ECFDF3", usage: "Supported background" },
      { token: "warning-700", hex: "#B45309", usage: "Partial" },
      { token: "warning-50", hex: "#FFFBEB", usage: "Partial background" },
      { token: "danger-700", hex: "#B91C1C", usage: "Blocker" },
      { token: "danger-50", hex: "#FEF2F2", usage: "Blocker background" },
      { token: "info-700", hex: "#1D4ED8", usage: "Information" },
      { token: "info-50", hex: "#EFF6FF", usage: "Information background" },
      { token: "focus", hex: "#2563EB", usage: "Focus ring" },
    ],
  },
];

const semanticAliases = [
  ["bg-background", "paper-50"],
  ["text-foreground", "ink-900"],
  ["text-heading", "ink-950"],
  ["text-muted", "ink-500"],
  ["text-subtle", "ink-700"],
  ["border-line", "ink-100"],
  ["border-line-strong", "ink-200"],
  ["bg-accent", "accent-600"],
  ["bg-accent-soft", "accent-100"],
  ["outline-focus", "focus"],
];

const contrastPairs = [
  { pair: "Ink 900 on paper 50", ratio: "16.68:1", use: "Body text" },
  { pair: "Ink 500 on paper 50", ratio: "5.18:1", use: "Muted copy" },
  { pair: "White on accent 600", ratio: "5.47:1", use: "Primary button" },
  { pair: "Accent 800 on accent 100", ratio: "8.59:1", use: "Selected state" },
  { pair: "Success 700 on success 50", ratio: "4.76:1", use: "Supported" },
  { pair: "Warning 700 on warning 50", ratio: "4.84:1", use: "Partial" },
  { pair: "Danger 700 on danger 50", ratio: "5.91:1", use: "Blocker" },
  { pair: "Info 700 on info 50", ratio: "6.16:1", use: "Information" },
  { pair: "White on ink 950", ratio: "18.72:1", use: "Tooltip" },
  { pair: "Focus on paper 50", ratio: "4.96:1", use: "Focus ring" },
];

const spacingScale = [
  { px: 2, utility: "0.5" },
  { px: 4, utility: "1" },
  { px: 6, utility: "1.5" },
  { px: 8, utility: "2" },
  { px: 12, utility: "3" },
  { px: 16, utility: "4" },
  { px: 20, utility: "5" },
  { px: 24, utility: "6" },
  { px: 32, utility: "8" },
  { px: 40, utility: "10" },
  { px: 48, utility: "12" },
  { px: 64, utility: "16" },
  { px: 80, utility: "20" },
];

const runningSteps: Step[] = [
  {
    label: "Reading CV",
    description: "PDF text extracted · 2 pages",
    status: "complete",
  },
  {
    label: "Extracting facts",
    description: "11 facts found",
    status: "complete",
  },
  {
    label: "Checking evidence",
    description: "Comparing requirements with your verified profile",
    status: "current",
  },
  { label: "Preparing summary", status: "upcoming" },
];

const failedSteps: Step[] = [
  { label: "Reading CV", status: "complete" },
  {
    label: "Extracting facts",
    description: "This PDF has no readable text. Try another file or enter your details manually.",
    status: "error",
  },
  { label: "Checking evidence", status: "upcoming" },
  { label: "Preparing summary", status: "upcoming" },
];

const accessibilityChecks = [
  "Visible 2 px focus ring on every interactive element",
  "Touch targets at least 44 × 44 px",
  "One h1 per page and ordered headings",
  "Labels, hints, and errors linked with aria-describedby",
  "Errors announced with role=\"alert\"",
  "Dialogs trap focus, close on Escape, and return focus",
  "No meaning conveyed by colour alone",
  "Works at 320 px width and 200% zoom",
  "prefers-reduced-motion disables transforms and long animation",
];

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="border-t border-line pt-10">
        <p className="text-micro uppercase tracking-[0.14em] text-accent-700">
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="mt-2 text-h2 text-heading">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Specimen({
  title,
  note,
  children,
  className,
  contentClassName,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-surface p-4 shadow-xs sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
        <p className="text-micro uppercase text-muted">{title}</p>
        {note ? <p className="text-xs text-muted">{note}</p> : null}
      </div>
      <div className={cn("pt-4", contentClassName)}>{children}</div>
    </div>
  );
}

function ColorSwatch({ token, hex, usage }: ColorToken) {
  return (
    <div className="rounded-sm border border-line bg-surface p-2">
      <div
        className="h-14 rounded-[4px] border border-ink-950/5"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-2 font-mono text-data text-ink-950">--color-{token}</p>
      <div className="mt-0.5 flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] tracking-wide text-muted">
          {hex}
        </span>
        <span className="text-right text-xs text-muted">{usage}</span>
      </div>
    </div>
  );
}

function TypeSpecimen({
  role,
  spec,
  sample,
  className,
}: {
  role: string;
  spec: string;
  sample: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="grid gap-2 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6">
      <div>
        <p className="text-micro uppercase text-muted">{role}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted">{spec}</p>
      </div>
      <div className={cn("text-ink-950", className)}>{sample}</div>
    </div>
  );
}

function ContentRule({
  label,
  good,
  bad,
}: {
  label: string;
  good: React.ReactNode;
  bad: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-line bg-surface p-4">
      <p className="text-micro uppercase text-muted">{label}</p>
      <div className="mt-3 flex items-start gap-2 text-sm text-ink-900">
        <CheckCircle2
          className="mt-0.5 size-4 shrink-0 text-success-700"
          aria-hidden="true"
        />
        <p>
          <span className="sr-only">Use: </span>
          {good}
        </p>
      </div>
      <div className="mt-2 flex items-start gap-2 text-sm text-muted">
        <XCircle
          className="mt-0.5 size-4 shrink-0 text-danger-700"
          aria-hidden="true"
        />
        <p>
          <span className="sr-only">Avoid: </span>
          {bad}
        </p>
      </div>
    </div>
  );
}

function SectionNav({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label="Design system sections"
      className={cn(
        mobile
          ? "-mx-4 flex gap-2 overflow-x-auto px-4 pb-2"
          : "sticky top-24",
      )}
    >
      {mobile ? null : (
        <p className="mb-3 text-micro uppercase text-muted">Sections</p>
      )}
      <ul className={cn(mobile ? "flex gap-2" : "space-y-0.5")}>
        {sections.map((section) => (
          <li key={section.id} className={mobile ? "shrink-0" : undefined}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block rounded-sm text-sm text-muted transition-colors duration-[120ms] ease-brand hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                mobile
                  ? "border border-line bg-surface px-3 py-1.5 whitespace-nowrap"
                  : "px-3 py-1.5",
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DesignGallery() {
  const [note, setNote] = React.useState("");
  const [copyState, setCopyState] = React.useState<
    "idle" | "copied" | "error"
  >("idle");
  const [openEvidence, setOpenEvidence] = React.useState<string | null>(null);
  const [jobMessage, setJobMessage] = React.useState<string | null>(null);

  const disclosure =
    "Prepared with AI from your verified profile. Review every line before you send it.";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(disclosure);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <TooltipProvider delayDuration={150}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
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
              ApplyPilot{" "}
              <span className="hidden font-normal text-muted sm:inline">
                Design system
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex">
              v0.1 · Phase 1
            </Badge>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-11 px-0 sm:w-auto sm:px-3"
            >
              <Link href="/" aria-label="Back to app">
                <ArrowLeft aria-hidden="true" />
                <span className="hidden sm:inline">Back to app</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <header className="max-w-3xl">
            <Badge variant="accent">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Design system
            </Badge>
            <h1 className="mt-4 text-display-sm text-heading sm:text-display">
              A calm, evidence-first interface.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Warm paper, deep ink, and one teal accent. Every AI statement is
              visually tied to a source fact, and uncertainty is shown as a
              first-class state — never hidden.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Light theme</Badge>
              <Badge>Tailwind 4 tokens</Badge>
              <Badge>Radix primitives</Badge>
              <Badge>WCAG 2.2 AA target</Badge>
            </div>
            <Alert tone="info" className="mt-6" title="Developer gallery">
              This route is available in development, or when{" "}
              <code className="rounded-xs bg-info-100 px-1 py-0.5 font-mono text-xs">
                ENABLE_DESIGN_GALLERY=true
              </code>{" "}
              is set. It returns a 404 in production otherwise.
            </Alert>
          </header>

          <div className="mt-10">
            <SectionNav mobile />
          </div>

          <div className="mt-4 grid gap-10 lg:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
              <SectionNav />
            </aside>

            <div className="min-w-0 space-y-14">
              {/* ---------------------------------------------------------- */}
              <Section
                id="foundations"
                eyebrow="01 · Foundations"
                title="Colour"
                description="The palette is deliberately small. Teal means action, not success. Feedback colours always arrive with an icon and a text label."
              >
                <div className="space-y-8">
                  {paletteGroups.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-ink-950">
                          {group.name}
                        </h3>
                        <p className="text-xs text-muted">
                          {group.description}
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {group.tokens.map((token) => (
                          <ColorSwatch key={token.token} {...token} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  <Specimen
                    title="Semantic aliases"
                    note="Use these names in product code"
                  >
                    <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                      {semanticAliases.map(([alias, token]) => (
                        <div
                          key={alias}
                          className="flex items-baseline justify-between gap-3 border-b border-line py-1.5 last:border-b-0"
                        >
                          <dt className="font-mono text-data text-ink-900">
                            {alias}
                          </dt>
                          <dd className="text-xs text-muted">{token}</dd>
                        </div>
                      ))}
                    </dl>
                  </Specimen>

                  <Specimen
                    title="Contrast pairs"
                    note="WCAG 2.2 AA · body text needs 4.5:1"
                  >
                    <ul className="space-y-1">
                      {contrastPairs.map((pair) => (
                        <li
                          key={pair.pair}
                          className="flex items-center justify-between gap-3 border-b border-line py-1.5 text-sm last:border-b-0"
                        >
                          <span className="min-w-0 truncate text-ink-700">
                            {pair.pair}
                            <span className="ml-1.5 text-xs text-muted">
                              {pair.use}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="font-mono text-data text-ink-950">
                              {pair.ratio}
                            </span>
                            <Badge variant="success">
                              <Check
                                className="size-3"
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                              AA
                            </Badge>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Specimen>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="typography"
                eyebrow="02 · Typography"
                title="Type scale"
                description="Geist Sans for the interface, Geist Mono for data and IDs, Source Serif 4 for document previews. Text is never smaller than 12 px."
              >
                <div className="rounded-md border border-line bg-surface p-4 shadow-xs sm:p-6">
                  <TypeSpecimen
                    role="Display"
                    spec="40/44 · 600"
                    sample="Evidence over polish."
                    className="text-display-sm sm:text-display"
                  />
                  <TypeSpecimen
                    role="H1"
                    spec="30/36 · 600"
                    sample="Find the roles that fit"
                    className="text-h1"
                  />
                  <TypeSpecimen
                    role="H2"
                    spec="24/32 · 600"
                    sample="Your verified profile"
                    className="text-h2"
                  />
                  <TypeSpecimen
                    role="H3"
                    spec="20/28 · 600"
                    sample="Requirements and evidence"
                    className="text-h3"
                  />
                  <TypeSpecimen
                    role="Body"
                    spec="16/24 · 400"
                    sample="We compare each requirement with the facts you have verified. Nothing is added to your profile without your review."
                    className="max-w-2xl text-base"
                  />
                  <TypeSpecimen
                    role="Body strong"
                    spec="16/24 · 500"
                    sample="Supported by 4 verified facts."
                    className="text-base font-medium"
                  />
                  <TypeSpecimen
                    role="Small"
                    spec="14/20 · 400"
                    sample="Last verified on 17 Nov 2026. You can edit this at any time."
                    className="text-sm text-ink-700"
                  />
                  <TypeSpecimen
                    role="Micro"
                    spec="12/16 · 500 · +0.02em"
                    sample="Requirement"
                    className="text-micro uppercase"
                  />
                  <TypeSpecimen
                    role="Data"
                    spec="13/18 · Geist Mono"
                    sample="JOB-2026-0042 · v3"
                    className="font-mono text-data"
                  />
                  <TypeSpecimen
                    role="Document"
                    spec="Source Serif 4 · 15/22"
                    sample={
                      <div className="rounded-sm border border-line bg-paper-50 p-5">
                        <p className="font-serif text-xl font-semibold text-ink-950">
                          Adaeze Okafor
                        </p>
                        <p className="mt-0.5 text-sm text-muted">
                          Product Designer · Lagos, Nigeria
                        </p>
                        <div className="my-3 h-px bg-line" />
                        <p className="max-w-xl text-[15px] leading-[22px] text-ink-900">
                          Product designer with six years of experience
                          shipping financial products for small businesses.
                          Led discovery, design systems, and usability
                          research across three product teams.
                        </p>
                      </div>
                    }
                  />
                </div>
                <p className="mt-3 text-sm text-muted">
                  Preview only. Exported PDFs embed Inter and Source Serif 4;
                  DOCX uses Calibri and Cambria so documents open correctly on
                  the widest range of machines.
                </p>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="spacing"
                eyebrow="03 · Layout"
                title="Spacing, radius, and elevation"
                description="An 8 px rhythm with a 4 px step for tight details. Controls use 6 px corners, cards 10 px, sheets 16 px."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <Specimen
                    title="Spacing scale"
                    note="Tailwind utility in parentheses"
                  >
                    <div className="space-y-2.5">
                      {spacingScale.map((space) => (
                        <div
                          key={space.px}
                          className="flex items-center gap-3"
                        >
                          <span className="w-12 shrink-0 font-mono text-[11px] text-muted">
                            {space.px} px
                          </span>
                          <span
                            className="h-3 rounded-full bg-accent-500"
                            style={{ width: `${space.px}px` }}
                          />
                          <span className="font-mono text-[11px] text-muted">
                            ({space.utility})
                          </span>
                        </div>
                      ))}
                    </div>
                  </Specimen>

                  <div className="space-y-4">
                    <Specimen title="Radius">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          {
                            label: "sm",
                            value: "6 px",
                            use: "Controls",
                            className: "rounded-sm",
                          },
                          {
                            label: "md",
                            value: "10 px",
                            use: "Cards",
                            className: "rounded-md",
                          },
                          {
                            label: "lg",
                            value: "16 px",
                            use: "Sheets & dialogs",
                            className: "rounded-lg",
                          },
                        ].map((radius) => (
                          <div
                            key={radius.label}
                            className={cn(
                              "border border-line bg-paper-50 p-3",
                              radius.className,
                            )}
                          >
                            <p className="font-mono text-data text-ink-950">
                              radius-{radius.label}
                            </p>
                            <p className="mt-0.5 text-sm text-muted">
                              {radius.value}
                            </p>
                            <p className="text-xs text-muted">{radius.use}</p>
                          </div>
                        ))}
                      </div>
                    </Specimen>

                    <Specimen title="Elevation">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          { label: "sm", className: "shadow-sm" },
                          { label: "md", className: "shadow-md" },
                          { label: "lg", className: "shadow-lg" },
                        ].map((shadow) => (
                          <div
                            key={shadow.label}
                            className={cn(
                              "rounded-md border border-line bg-surface p-3",
                              shadow.className,
                            )}
                          >
                            <p className="font-mono text-data text-ink-950">
                              shadow-{shadow.label}
                            </p>
                            <p className="mt-0.5 text-xs text-muted">
                              0 {shadow.label === "sm" ? "1 2" : shadow.label === "md" ? "4 12" : "12 32"}{" "}
                              px
                            </p>
                          </div>
                        ))}
                      </div>
                    </Specimen>
                  </div>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="actions"
                eyebrow="04 · Actions"
                title="Buttons"
                description="One primary action per screen. Every state is visible, and touch targets stay at least 44 px tall."
              >
                <div className="space-y-4">
                  <Specimen
                    title="Variants"
                    note="Primary, secondary, ghost, destructive, link"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Button>Check fit</Button>
                      <Button variant="secondary">Save job</Button>
                      <Button variant="ghost">Skip</Button>
                      <Button variant="destructive">Delete draft</Button>
                      <Button variant="link">View evidence</Button>
                    </div>
                  </Specimen>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen title="Sizes" note="44 / 44 / 48 px tall">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm">
                          <Plus aria-hidden="true" />
                          Small
                        </Button>
                        <Button size="md">
                          <Plus aria-hidden="true" />
                          Medium
                        </Button>
                        <Button size="lg">
                          <Plus aria-hidden="true" />
                          Large
                        </Button>
                      </div>
                    </Specimen>

                    <Specimen title="States" note="Loading keeps the label">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button loading>Checking fit</Button>
                        <Button variant="secondary" loading>
                          Uploading
                        </Button>
                        <Button disabled>Unavailable</Button>
                      </div>
                    </Specimen>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen
                      title="Icon buttons"
                      note="Always supply an accessible label"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <IconButton label="Save job" variant="secondary">
                          <Bookmark aria-hidden="true" />
                        </IconButton>
                        <IconButton label="More actions" variant="ghost">
                          <MoreHorizontal aria-hidden="true" />
                        </IconButton>
                        <IconButton label="Delete draft" variant="ghost">
                          <XCircle aria-hidden="true" />
                        </IconButton>
                      </div>
                    </Specimen>

                    <Specimen
                      title="Copy disclosure"
                      note="Feedback is announced, not colour-only"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCopy}
                        >
                          {copyState === "copied" ? (
                            <Check aria-hidden="true" />
                          ) : (
                            <Copy aria-hidden="true" />
                          )}
                          {copyState === "copied" ? "Copied" : "Copy disclosure"}
                        </Button>
                        <p
                          aria-live="polite"
                          className="text-sm text-muted"
                        >
                          {copyState === "copied"
                            ? "Copied to clipboard."
                            : copyState === "error"
                              ? "Copy failed. Select the text manually."
                              : "AI disclosure used on every artifact."}
                        </p>
                      </div>
                    </Specimen>
                  </div>

                  <Specimen title="Styled link" note="asChild keeps link semantics">
                    <Button asChild variant="secondary">
                      <a href="#forms">
                        Jump to forms
                        <ArrowRight aria-hidden="true" />
                      </a>
                    </Button>
                  </Specimen>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="forms"
                eyebrow="05 · Forms"
                title="Inputs and selection"
                description="Manual entry is always available. Labels are visible, hints explain, errors are specific and blame-free, and nothing relies on placeholder text alone."
              >
                <div className="space-y-4">
                  <Specimen
                    title="Text inputs"
                    note="Label · control · hint or error"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        htmlFor="demo-name"
                        hint="Use the name on your CV."
                      >
                        <Input
                          id="demo-name"
                          name="name"
                          autoComplete="name"
                          placeholder="e.g. Adaeze Okafor"
                          aria-describedby="demo-name-hint"
                        />
                      </Field>

                      <Field
                        label="Work email"
                        htmlFor="demo-email"
                        error="Enter a valid email address."
                      >
                        <Input
                          id="demo-email"
                          type="email"
                          defaultValue="adaeze@"
                          aria-invalid="true"
                          aria-describedby="demo-email-error"
                        />
                      </Field>

                      <Field
                        label="Current role"
                        htmlFor="demo-role"
                        optional
                      >
                        <Select id="demo-role" defaultValue="designer">
                          <option value="designer">Product Designer</option>
                          <option value="engineer">Software Engineer</option>
                          <option value="analyst">Data Analyst</option>
                          <option value="manager">Product Manager</option>
                        </Select>
                      </Field>

                      <Field label="Search jobs" htmlFor="demo-search">
                        <div className="relative">
                          <Search
                            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                            aria-hidden="true"
                          />
                          <Input
                            id="demo-search"
                            placeholder="Title, company, or location"
                            className="pl-9"
                          />
                        </div>
                      </Field>

                      <Field
                        label="Read-only while analysis runs"
                        htmlFor="demo-readonly"
                        hint="This value comes from your verified profile."
                        className="sm:col-span-2"
                      >
                        <Input
                          id="demo-readonly"
                          value="Checking evidence…"
                          readOnly
                          disabled
                          aria-describedby="demo-readonly-hint"
                        />
                      </Field>
                    </div>
                  </Specimen>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen
                      title="Textarea"
                      note="Character count is announced politely"
                    >
                      <Field
                        label="Cover note"
                        htmlFor="demo-note"
                        hint="Keep it under 600 characters. Plain text only."
                      >
                        <div className="space-y-1.5">
                          <Textarea
                            id="demo-note"
                            rows={5}
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                            placeholder="Why this role interests you…"
                            aria-describedby="demo-note-hint"
                          />
                          <CharacterCounter value={note.length} max={600} />
                        </div>
                      </Field>
                    </Specimen>

                    <Specimen
                      title="File upload"
                      note="Magic-byte validation happens server-side"
                    >
                      <FileDropzone
                        hint="We remove the file if it is not a genuine PDF or DOCX."
                        onFileSelect={() => undefined}
                      />
                    </Specimen>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen title="Checkboxes" note="Each label is clickable">
                      <fieldset className="space-y-3">
                        <legend className="text-sm font-medium text-ink-900">
                          Email preferences
                        </legend>
                        <CheckboxField
                          id="alerts-fit"
                          label="New roles added to my feed"
                          description="A short email when new roles are added."
                          defaultChecked
                        />
                        <CheckboxField
                          id="alerts-weekly"
                          label="Weekly summary"
                          description="One email every Monday."
                        />
                        <CheckboxField
                          id="alerts-product"
                          label="Product updates"
                          description="Occasional changes to ApplyPilot."
                        />
                      </fieldset>
                    </Specimen>

                    <Specimen title="Radio group" note="One choice, always visible">
                      <div className="space-y-3">
                        <p
                          id="work-preference"
                          className="text-sm font-medium text-ink-900"
                        >
                          Work preference
                        </p>
                        <RadioGroup
                          aria-labelledby="work-preference"
                          defaultValue="hybrid"
                        >
                          <RadioOption
                            id="work-remote"
                            value="remote"
                            label="Remote"
                            description="Any location, fully remote."
                          />
                          <RadioOption
                            id="work-hybrid"
                            value="hybrid"
                            label="Hybrid"
                            description="A mix of office and home."
                          />
                          <RadioOption
                            id="work-onsite"
                            value="onsite"
                            label="On-site"
                            description="Lagos or Abuja."
                          />
                        </RadioGroup>
                      </div>
                    </Specimen>
                  </div>

                  <Specimen title="Switch" note="Changes apply immediately">
                    <SwitchField
                      id="demo-notify"
                      label="Email me when a new role is added"
                      description="You can change this at any time."
                      defaultChecked
                    />
                  </Specimen>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="feedback"
                eyebrow="06 · Feedback"
                title="States that tell the truth"
                description="Failure copy names what happened and what to do next. Progress is step-based — never a fake percentage."
              >
                <div className="space-y-4">
                  <div className="grid gap-3 lg:grid-cols-2">
                    <Alert
                      tone="danger"
                      title="We couldn’t read this file."
                      action={
                        <Button variant="secondary" size="sm">
                          Enter manually
                        </Button>
                      }
                    >
                      Try another PDF or DOCX, or enter your details manually.
                    </Alert>
                    <Alert
                      tone="warning"
                      title="One claim needs your review."
                      action={
                        <Button variant="secondary" size="sm">
                          Review
                        </Button>
                      }
                    >
                      We could not find evidence for “led a team of 12” in your
                      profile.
                    </Alert>
                    <Alert
                      tone="info"
                      title="Prepared with AI from your verified profile."
                    >
                      Review every line before you send it.
                    </Alert>
                    <Alert tone="success" title="Analysis complete.">
                      6 requirements supported, 2 partially supported, 1 not
                      evidenced.
                    </Alert>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen
                      title="Fit labels"
                      note="Icon + text, never colour alone"
                    >
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            "supported",
                            "partial",
                            "not-evidenced",
                            "not-eligible",
                          ] as FitStatus[]
                        ).map((status) => (
                          <StatusPill key={status} status={status} />
                        ))}
                      </div>
                    </Specimen>

                    <Specimen
                      title="Loading and empty"
                      note="Explanatory copy appears within 1.5 s"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        <Spinner label="Saving" />
                        <span aria-hidden="true" className="text-sm text-muted">
                          Saving your profile…
                        </span>
                      </div>
                      <div className="mt-4 space-y-2 rounded-sm border border-line bg-paper-50 p-4">
                        <Skeleton className="h-5 w-40" />
                        <SkeletonText lines={2} />
                      </div>
                    </Specimen>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen
                      title="Analysis progress"
                      note="Honest steps, no percentages"
                    >
                      <ProgressSteps steps={runningSteps} />
                    </Specimen>

                    <Specimen
                      title="Analysis failed"
                      note="Specific reason and a way forward"
                    >
                      <ProgressSteps steps={failedSteps} />
                      <p className="mt-4 text-sm text-muted">
                        If a previous analysis exists, it stays visible and is
                        labelled with its date.
                      </p>
                    </Specimen>
                  </div>

                  <EmptyState
                    icon={FileText}
                    title="No CV yet"
                    description="Upload a PDF or DOCX, or enter your details manually to start matching."
                    action={
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button size="sm">Upload CV</Button>
                        <Button variant="secondary" size="sm">
                          Enter manually
                        </Button>
                      </div>
                    }
                  />
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="navigation"
                eyebrow="07 · Navigation"
                title="Orientation and tabs"
                description="The user always knows where they are, what is selected, and how to get back."
              >
                <div className="space-y-4">
                  <Specimen title="Breadcrumb">
                    <nav aria-label="Breadcrumb">
                      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                        <li>
                          <a
                            href="#navigation"
                            className="rounded-sm hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                          >
                            Jobs
                          </a>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                          <a
                            href="#navigation"
                            className="rounded-sm hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                          >
                            Product Designer
                          </a>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li
                          aria-current="page"
                          className="font-medium text-ink-900"
                        >
                          Fit check
                        </li>
                      </ol>
                    </nav>
                  </Specimen>

                  <Specimen
                    title="Tabs"
                    note="Keyboard arrow keys move between tabs"
                  >
                    <Tabs defaultValue="overview">
                      <TabsList aria-label="Job workspace">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="requirements">
                          Requirements
                        </TabsTrigger>
                        <TabsTrigger value="fit">Your fit</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <p className="max-w-2xl text-sm leading-6 text-ink-700">
                          Northstar Bank is hiring a product designer to work
                          on small-business banking tools. The team works
                          hybrid from Lagos.
                        </p>
                      </TabsContent>
                      <TabsContent value="requirements">
                        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-700">
                          <li>5+ years designing digital products</li>
                          <li>Experience with design systems</li>
                          <li>Financial services exposure</li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="fit">
                        <div className="flex flex-wrap gap-2">
                          <StatusPill status="supported" />
                          <StatusPill status="partial" />
                          <StatusPill status="not-evidenced" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Specimen>

                  <Specimen
                    title="Tooltip"
                    note="Keyboard and touch accessible"
                  >
                    <div className="flex items-center gap-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Why evidence matters"
                            className="grid size-11 place-items-center rounded-sm text-muted transition-colors hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                          >
                            <Info className="size-5" aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Every claim is linked to a fact in your verified
                          profile. Nothing is invented.
                        </TooltipContent>
                      </Tooltip>
                      <span className="text-sm text-muted">
                        Hover or focus the icon.
                      </span>
                    </div>
                  </Specimen>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="overlays"
                eyebrow="08 · Overlays"
                title="Dialogs"
                description="Dialogs trap focus, close on Escape, and return focus to the trigger. A grounding conflict is shown side by side with the cited fact."
              >
                <Specimen
                  title="Grounding review"
                  note="Export stays blocked until resolved"
                  contentClassName="rounded-sm bg-paper-50 p-4"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
                        <ShieldCheck aria-hidden="true" />
                        Review 2 issues
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Review before exporting</DialogTitle>
                        <DialogDescription>
                          One blocking issue and one advisory. Export stays
                          disabled until the blocking claim is resolved.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-5 space-y-3">
                        <div className="rounded-md border border-warning-100 bg-warning-50 p-3">
                          <p className="text-micro uppercase text-warning-800">
                            Blocking · grounding conflict
                          </p>
                          <div className="mt-2 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-sm border border-line bg-surface p-3">
                              <p className="text-micro uppercase text-muted">
                                Generated sentence
                              </p>
                              <p className="mt-1 text-sm text-ink-900">
                                “Led a team of 12 analysts at Northstar Bank.”
                              </p>
                            </div>
                            <div className="rounded-sm border border-line bg-surface p-3">
                              <p className="text-micro uppercase text-muted">
                                Your cited fact
                              </p>
                              <p className="mt-1 text-sm text-ink-900">
                                “Led a team of 6 analysts at Northstar Bank
                                (2021–2025).”
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-warning-800">
                            The number 12 does not appear in your verified
                            profile.
                          </p>
                        </div>

                        <div className="rounded-md border border-line bg-paper-50 p-3">
                          <p className="text-micro uppercase text-muted">
                            Advisory · no evidence
                          </p>
                          <p className="mt-1 text-sm text-ink-900">
                            “Familiar with Figma variables.”
                          </p>
                          <p className="mt-1 text-sm text-muted">
                            We could not find evidence for this in your
                            profile. Edit the sentence or add a fact.
                          </p>
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="secondary">Close</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button>Go to evidence</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <p className="mt-3 text-sm text-muted">
                    Clicking the trigger opens the dialog. Press Escape to
                    return focus.
                  </p>
                </Specimen>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="domain"
                eyebrow="09 · Domain"
                title="Jobs, evidence, and applications"
                description="These components carry the product’s core promise: every fit label is traceable, and no score or probability is ever shown."
              >
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
                    <div className="space-y-3">
                      <FitSummary
                        supported={4}
                        partial={2}
                        notEvidenced={3}
                        status="partial"
                        verifiedAt="17 Nov 2026"
                      />
                      <p className="text-xs leading-5 text-muted">
                        Counts are facts about evidence. “Partially supported”
                        never means “weak match”, and there is no percentage.
                      </p>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Requirements</CardTitle>
                        <CardDescription>
                          Product Designer · Northstar Bank
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul>
                          <RequirementRow
                            requirement="5+ years designing digital products"
                            status="supported"
                            evidence={{
                              source: "Experience",
                              fact: "6 years at Northstar Bank",
                            }}
                          />
                          <RequirementRow
                            requirement="Experience with design systems"
                            status="partial"
                            note="Used a shared component library, but did not own it."
                            evidence={{
                              source: "Experience",
                              fact: "Contributed to the Northstar design system",
                            }}
                          />
                          <RequirementRow
                            requirement="Financial services exposure"
                            status="supported"
                            evidence={{
                              source: "Experience",
                              fact: "Small-business banking, 2021–2025",
                            }}
                          />
                          <RequirementRow
                            requirement="Must be based in Nairobi"
                            status="not-eligible"
                            note="This role is location-restricted."
                          />
                          <RequirementRow
                            requirement="Figma variables and tokens"
                            status="not-evidenced"
                          />
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Specimen
                    title="Evidence chips"
                    note="Click a chip to open the cited fact"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <EvidenceChip
                        source="Experience"
                        fact="Led a team of 6 analysts"
                        onClick={() =>
                          setOpenEvidence(
                            "Led a team of 6 analysts at Northstar Bank (2021–2025). Source: CV, page 1.",
                          )
                        }
                      />
                      <EvidenceChip
                        source="Education"
                        fact="BSc Computer Science, University of Lagos"
                      />
                      <EvidenceChip source="Certification" />
                    </div>

                    {openEvidence ? (
                      <div
                        role="region"
                        aria-live="polite"
                        className="mt-3 rounded-md border border-accent-200 bg-accent-100/50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-micro uppercase text-accent-800">
                              Cited fact
                            </p>
                            <p className="mt-1 text-sm text-ink-900">
                              {openEvidence}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOpenEvidence(null)}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-muted">
                        Evidence opens beside the sentence it supports, never
                        in a separate technical view.
                      </p>
                    )}
                  </Specimen>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <JobCard
                      title="Product Designer"
                      company="Northstar Bank"
                      location="Lagos, Nigeria"
                      workMode="Hybrid"
                      employmentType="Full-time"
                      posted="2 days ago"
                      source="Curated list"
                      fit="partial"
                      summary="Your profile supports 4 of 9 requirements, with 2 partially supported. Two requirements have no evidence yet."
                      onView={() =>
                        setJobMessage(
                          "In the product, this opens the original job page in a new tab.",
                        )
                      }
                      onCheckFit={() =>
                        setJobMessage(
                          "In the product, this starts an evidence check with a progress state.",
                        )
                      }
                    />
                    <JobCard
                      title="Senior Product Designer"
                      company="Lagos Fintech Co."
                      location="Remote, Nigeria"
                      workMode="Remote"
                      employmentType="Contract"
                      posted="5 days ago"
                      source="Curated list"
                      fit={null}
                      onView={() =>
                        setJobMessage(
                          "In the product, this opens the original job page in a new tab.",
                        )
                      }
                      onCheckFit={() =>
                        setJobMessage(
                          "In the product, this starts an evidence check with a progress state.",
                        )
                      }
                    />
                  </div>
                  <p aria-live="polite" className="text-sm text-muted">
                    {jobMessage ??
                      "Job actions are interactive. In the product they open the source site or start a fit check."}
                  </p>

                  <Card>
                    <CardHeader>
                      <CardTitle>Applications</CardTitle>
                      <CardDescription>
                        Status changes are explicit. Nothing is submitted
                        automatically.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ApplicationRow
                        role="Product Designer"
                        company="Northstar Bank"
                        status="ready"
                        updated="17 Nov 2026"
                        nextAction="Review 1 blocking issue before exporting."
                        onOpen={() =>
                          setJobMessage(
                            "In the product, this opens the application workspace.",
                          )
                        }
                      />
                      <ApplicationRow
                        role="UX Researcher"
                        company="Kano Health"
                        status="applied"
                        updated="14 Nov 2026"
                        nextAction="Submitted on the original site. No response yet."
                        onOpen={() => undefined}
                      />
                      <ApplicationRow
                        role="Design Lead"
                        company="Abuja Logistics"
                        status="draft"
                        updated="9 Nov 2026"
                        nextAction="Add evidence for two requirements."
                        onOpen={() => undefined}
                      />
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted">
                        ApplyPilot prepares materials. You submit on the
                        employer’s own site.
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="content"
                eyebrow="10 · Content"
                title="Words matter"
                description="Plain English, short sentences, Nigerian English spelling, and dates written as 17 Nov 2026. No hype and no promises."
              >
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ContentRule
                      label="Fit language"
                      good={
                        <>
                          Use the four labels: Supported, Partially supported,
                          Not evidenced, Not eligible.
                        </>
                      }
                      bad={
                        <>
                          “87% match”, “weak fit”, or “poor match”. Never imply
                          odds.
                        </>
                      }
                    />
                    <ContentRule
                      label="Failure copy"
                      good={
                        <>
                          “Nothing was saved. Try again.” Name the failure and
                          keep the retry.
                        </>
                      }
                      bad={
                        <>
                          “Something went wrong.” with no cause and no next
                          step.
                        </>
                      }
                    />
                    <ContentRule
                      label="Uncertainty"
                      good={
                        <>
                          “We could not find evidence for this in your
                          profile.” plus Edit, Remove, or Add evidence.
                        </>
                      }
                      bad={
                        <>
                          “The AI is confident.” Confidence is not evidence.
                        </>
                      }
                    />
                    <ContentRule
                      label="AI disclosure"
                      good={
                        <>
                          “Prepared with AI from your verified profile. Review
                          every line before you send it.”
                        </>
                      }
                      bad={
                        <>
                          “AI will get you hired.” ApplyPilot never guarantees
                          an outcome.
                        </>
                      }
                    />
                  </div>

                  <Alert
                    tone="warning"
                    title="Forbidden language"
                  >
                    guaranteed · probability · auto-apply · “apply to 20 jobs a
                    day” · “AI will get you hired”. These phrases promise
                    outcomes the product cannot control.
                  </Alert>
                </div>
              </Section>

              {/* ---------------------------------------------------------- */}
              <Section
                id="accessibility"
                eyebrow="11 · Accessibility"
                title="WCAG 2.2 AA target"
                description="Accessibility is part of the component contract, not a later audit. The gallery is checked with axe and a keyboard-only pass."
              >
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Specimen title="Component contract">
                      <ul className="space-y-2">
                        {accessibilityChecks.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-ink-700"
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-50 text-success-700">
                              <Check
                                className="size-3"
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Specimen>

                    <Specimen
                      title="Keyboard and focus"
                      note="Tab through this panel"
                    >
                      <div className="space-y-3">
                        <p className="text-sm text-muted">
                          Focus uses a 2 px blue ring with a 2 px offset. It is
                          never removed, and it is visible on every surface.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="secondary">Focus me</Button>
                          <Button variant="ghost">Then me</Button>
                          <Input
                            aria-label="Focusable example"
                            placeholder="And this field"
                            className="max-w-52"
                          />
                        </div>
                        <p className="text-sm text-muted">
                          Motion lasts 120 ms for hover, 200 ms for expansion,
                          and 320 ms for sheets. Reduced motion removes
                          transforms and long animation.
                        </p>
                      </div>
                    </Specimen>
                  </div>

                  <Specimen
                    title="Contrast examples"
                    note="Automated check is part of CI"
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      {contrastPairs.slice(0, 6).map((pair) => (
                        <div
                          key={pair.pair}
                          className="flex items-center justify-between gap-3 rounded-sm border border-line bg-paper-50 px-3 py-2 text-sm"
                        >
                          <span className="text-ink-700">{pair.pair}</span>
                          <span className="font-mono text-data text-ink-950">
                            {pair.ratio}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Specimen>
                </div>
              </Section>

              <footer className="border-t border-line pt-6 text-sm text-muted">
                <p>ApplyPilot design system · Phase 1 · Light theme only.</p>
                <p className="mt-1">
                  Tokens live in{" "}
                  <code className="rounded-xs bg-paper-100 px-1 py-0.5 font-mono text-xs">
                    src/app/globals.css
                  </code>
                  . Components live in{" "}
                  <code className="rounded-xs bg-paper-100 px-1 py-0.5 font-mono text-xs">
                    src/components
                  </code>
                  .
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
