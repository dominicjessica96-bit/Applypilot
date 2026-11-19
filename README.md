# ApplyPilot

ApplyPilot is an AI-assisted job discovery and application platform for Nigerian job seekers. It helps candidates find relevant vacancies, check how well they fit, prepare tailored CVs and cover letters from **verified** career facts, and track applications — while keeping the candidate in control of every submission.

This repository is the Foundry MVP: a responsive web app with a limited, sourced job catalog and a **manual** apply handoff. Broad ATS autofill and automated submissions are out of scope for this release.

## Who it is for

Actively applying Nigerian graduates and professionals who already have a CV, know the kinds of roles they want, and need a faster, more accurate way to prepare applications. Recruiters and employer tools are not part of the initial product.

## What the product does

1. **Account and consent** — Sign in with a private workspace and clear CV processing controls.
2. **Verified career profile** — Upload a PDF/DOCX CV, extract structured facts, then review and confirm them.
3. **Preferences** — Set target titles, location, work mode, and eligibility.
4. **Job feed** — Browse sourced vacancies with title, employer, location, source link, freshness, and fit context.
5. **Fit review** — See supported requirements, partial matches, missing evidence, and hard blockers. Scores (if shown) measure alignment, not hiring probability.
6. **Application workspace** — Generate an editable CV and cover letter grounded only in verified facts; optionally draft screening answers.
7. **Export and apply** — Download or copy materials, open the official application URL, submit outside ApplyPilot, then mark the job as applied.
8. **Tracking** — Keep saved, preparing, ready, applied, interview, offer, rejected, and withdrawn statuses in one place.

## What it does not do (Foundry)

- Promise bulk or automatic applications
- Scrape sites, automate LinkedIn, bypass CAPTCHA, or fill every ATS
- Guarantee interviews, responses, or job offers
- Include payments, an employer portal, or a native mobile app

AI generation must not invent dates, metrics, employers, skills, or outcomes. The verified career profile is the only source of candidate claims.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Cache Components) with React 19 and TypeScript
- Tailwind CSS 4 with a custom design-token layer and Radix primitives
- PostgreSQL 17 via Docker locally and [Neon](https://neon.com) free tier in production, with Drizzle ORM
- [Better Auth](https://www.better-auth.com) for email/password auth, verification, and password reset
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) for private CV and artifact storage
- [Resend](https://resend.com) for transactional email
- Vercel AI SDK with Anthropic as the primary model provider and OpenAI as fallback (planned)

## Design system

The Phase 1 design system is implemented in [`src/app/globals.css`](./src/app/globals.css) and [`src/components`](./src/components):

- `src/components/ui/` — accessible primitives (buttons, fields, selection controls, dialogs, tabs, tooltips, progress steps, skeletons, empty states).
- `src/components/domain/` — product components (status pills, evidence chips, fit summaries, requirement rows, job cards, application rows).
- `src/app/design/` — a live gallery of tokens, type, spacing, every component state, and the domain patterns.

Run the app and open [http://localhost:3000/design](http://localhost:3000/design). The gallery is available in development. In production it returns a 404 unless `ENABLE_DESIGN_GALLERY=true` is set **at build time**.

The design is light-theme only for the pilot, targets WCAG 2.2 AA, and uses semantic tokens (`bg-surface`, `text-muted`, `border-line`) rather than raw hex values.

## Documentation

- [Product Requirements Document](./docs/PRD.md) — goals, scope, functional requirements, AI safeguards, data model, and delivery plan.
- [Implementation Plan](./docs/IMPLEMENTATION_PLAN.md) — design system, architecture decisions, data model, AI pipeline, phased delivery with exit gates, quality and launch plan.
- [Agent guidelines](./AGENTS.md) — repository conventions and version-matched Next.js docs.

## Getting started

Requires Node.js 22 LTS.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/design](http://localhost:3000/design) for the design-system gallery.

```bash
npm run typecheck   # generate route types, then run tsc
npm run lint
```
