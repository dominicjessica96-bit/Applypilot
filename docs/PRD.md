# ApplyPilot — Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Development baseline (research-informed, not market-validated)  
**Category:** Smart Utilities  
**Initial audience:** Nigerian job seekers  
**Platform:** Responsive web app

## 1. Executive summary

ApplyPilot is an AI-assisted job discovery and application platform that helps candidates find relevant vacancies, assess eligibility, prepare accurate tailored materials, complete repetitive application questions, review all proposed information, and track application progress. The user stays in control of submissions. The initial product will demonstrate this workflow with a limited, reliably sourced job catalog and a manual submission handoff; broad ATS autofill and automated submission are later releases.

## 2. Evidence and assumptions

Evidence source: first six previously verified responses to the Job Application Experience Survey. A fresh response check was attempted but could not be authorized. Percentages below are sample counts, not population estimates.

| Signal | Count |
|---|---|
| Relevant job discovery desired | 6/6 |
| Skipped an application because of effort (often or sometimes) | 6/6 |
| Finding jobs difficult | 5/6 |
| Missing-requirement identification desired | 5/6 |
| CV tailoring desired | 4/6 |
| Repetitive autofill desired | 4/6 |
| Tracking desired | 4/6 |
| Concerned about AI adding inaccurate CV claims | 4/6 |
| Prototype participation | 4 yes; 1 maybe; 1 no |

Open assumptions to test: job-feed quality is sufficient; users trust evidence-grounded tailoring; prepared applications save measurable time; users return for a second job; some users will pay. No employment-outcome improvement or conversion rate is yet established.

## 3. Problem and target users

Job seekers navigate fragmented sources and repeat work across applications: searching, checking eligibility, tailoring CVs, drafting cover letters, entering information already in the CV, answering screening questions and tracking outcomes. This can cause abandonment and lower-quality submissions.

### Primary persona

An actively applying Nigerian graduate or professional with an existing CV, specific role/location preferences, and at least one real vacancy they want to pursue. Secondary: occasional applicants. Out of scope initially: recruiters and employers.

### Jobs to be done

* FIND: Surface legitimate, relevant vacancies with clear source links.
* MATCH: Show supported requirements, partial matches, missing evidence and hard eligibility constraints.
* TAILOR: Create a CV and cover letter grounded in verified candidate facts.
* APPLY: Prepare screening answers and reduce repetition, with review before external submission.
* TRACK: Save application materials, status and dates in one place.

## 4. Product goals and non-goals

### MVP goals

* A user can upload a CV, verify their profile, choose preferences, discover a relevant vacancy and prepare an application.
* A user can inspect source-backed match explanations and correct the AI before exporting.
* A user can download/copy application materials and mark an external application submitted.
* At least one independent tester uses the functioning product and provides documented feedback; target 4–5 testers.

### Non-goals for the Foundry release

* No promise of 10–20 automatic applications per day.
* No bulk scraping, autonomous LinkedIn activity, bypassing CAPTCHA, or universal ATS automation.
* No guaranteed interview, response or employment outcomes.
* No payment system, employer portal, mobile-native app, or proprietary model training.

## 5. End-to-end user journey

### 1 — Account and consent

Register/sign in; explain CV processing, retention and deletion controls.

### 2 — Verified career profile

Upload PDF/DOCX CV; extract experience, education, skills, dates and achievements; review/edit and confirm accuracy.

### 3 — Preferences

Specify target titles, location, remote/on-site, experience level and eligibility/work authorization.

### 4 — Job feed

Browse sourced vacancies with title, employer, location, link, freshness and fit explanation. Filter and save.

### 5 — Fit review

Show evidenced matches, partial matches, unsupported requirements and critical blockers; do not claim hiring probability.

### 6 — Application workspace

Generate editable tailored CV and cover letter; optionally draft screening answers; show unsupported-claim warnings.

### 7 — Export and apply

Download DOCX/PDF or copy text, open official application URL, submit outside ApplyPilot, then mark Applied.

### 8 — Tracking

Review saved, preparing, ready, applied, interview, offer, rejected and withdrawn states.

## 6. Functional requirements and acceptance criteria

| ID / Priority | Requirement | Acceptance test |
|---|---|---|
| F01 / P0 | Account and private workspace | User can sign in and see only own records. |
| F02 / P0 | CV upload and extraction | PDF/DOCX extraction produces editable structured profile; parsing failures handled. |
| F03 / P0 | Candidate fact verification | User approves/corrects extracted claims before generation. |
| F04 / P0 | Job preferences and catalog | At least one maintainable sourced job feed; filter and open original vacancy. |
| F05 / P0 | Job analysis | Required/preferred criteria extracted; evidence and blockers shown. |
| F06 / P0 | Tailored CV and cover letter | Editable outputs reflect verified evidence; no unsupported facts. |
| F07 / P0 | Export and external handoff | Download usable CV and copy/download letter; official link opens. |
| F08 / P0 | Application tracking | Save job, generated artifacts, status and timestamps. |
| F09 / P0 | Privacy and deletion | User can delete CV/profile and derived application data. |
| F10 / P1 | Screening answer drafting | Draft answers only when sufficient candidate evidence exists. |
| F11 / P1 | Application review evidence view | Show source facts for major generated claims. |
| F12 / P2 | Form autofill extension | Limited supported sites, explicit user review and consent. |
| F13 / P2 | Submission after approval | Only where permitted, technically supported and confirmed by user. |

## 7. AI behavior and safeguards

* Canonical evidence: verified career profile is the sole source for candidate claims; job description is an untrusted source for employer requirements.
* Structured extraction: parse CV and job requirements into typed fields; preserve original text and evidence references.
* Fit explanation: classify each requirement as supported, partially supported, not evidenced or not eligible. A score, if displayed, measures alignment—not probability of hiring.
* Generation: prioritize/rephrase verified achievements; never invent dates, metrics, qualifications, employers, skills or outcomes.
* Grounding check: compare generated statements against source facts; flag unverifiable claims and require human correction.
* Prompt-injection defense: treat job descriptions and CV uploads as data, never instructions to reveal secrets or alter application behavior.
* Human approval: no automatic submission or irreversible action without an explicit user decision.
* Safety: show confidence/uncertainty; avoid suggesting that automated submissions are allowed on every third-party site.

## 8. Job discovery implementation

Foundry approach: use a small catalog of real, publicly accessible vacancies gathered from sources that permit access, with source URL, collected timestamp, expiry (when known), and location/eligibility fields. Refresh or remove expired postings. Manual curation or an authorized API is acceptable. Do not represent a static demo list as live comprehensive search. A user may paste a job URL or description as fallback if no catalog match exists.

## 9. Information architecture and data model

| Entity | Minimum fields |
|---|---|
| User | id, email, created_at |
| CareerProfile | user_id, verified facts, CV file reference, revision, updated_at |
| JobPreference | user_id, roles, locations, work mode, eligibility |
| Job | id, title, company, description, requirements, source_url, fetched_at, expires_at |
| MatchAnalysis | profile_revision, job_id, criteria, evidence, gaps, blockers |
| Application | user_id, job_id, status, tailored_cv, cover_letter, answers, timestamps |
| AuditEvent | user_id, action, record_id, timestamp |

## 10. UX screens

* Welcome / account — short explanation of what the product does and does not do.
* Career profile — upload, extraction progress, editable evidence fields.
* Preferences — role, location, remote and eligibility filters.
* Job feed — compact cards with provenance and filters.
* Job detail / match — supported, partial, missing, blocker.
* Application workspace — editable CV, cover letter, optional answers and evidence review.
* Applications — status, dates, saved files and original posting link.

## 11. Nonfunctional requirements

* Security: authenticated access, encrypted transport, private file storage, least-privilege service keys, no secrets in frontend.
* Privacy: explicit processing notice; no public sharing of CVs; delete uploaded and generated data on request; avoid unnecessary personal data.
* Reliability: retry transient model errors; clear user-facing error states; prevent duplicate application records.
* Performance targets (provisional): responsive UI, progress states for AI operations, normal CV-to-draft workflow under 3 minutes on test fixtures.
* Accessibility: mobile-responsive layout, readable text, keyboard-accessible forms and sufficient contrast.
* Observability: error logs and anonymized latency/cost metrics; never log raw CVs or cover letters by default.
* Cost control: model call limits, token budgeting, caching stable job analyses and basic abuse protection.

## 12. Metrics and validation

| Metric | Measurement / target |
|---|---|
| Task completion | ≥ 4 of 5 testers finish CV → job → tailored application without assistance (target, not observed). |
| Time saved | Compare same user manual preparation vs ApplyPilot; target ≥ 40% median reduction. |
| Factual accuracy | Zero fabricated claims in final reviewed outputs; record all draft issues. |
| User acceptance | ≥ 4 of 5 testers say they would submit after any necessary edits. |
| Repeat use | At least 2 testers return for a second real vacancy. |
| Discovery quality | Testers identify at least one genuinely relevant, currently available vacancy. |

Research plan: recruit willing survey respondents; use synthetic CVs for demos and consented real CVs for usability testing. Record task time, errors, corrections, source relevance, and unsolicited feedback. Do not treat self-reported willingness to pay as actual purchase evidence.

## 13. Delivery plan and scope gates

### Week 1 — Define and prototype

Confirm top user journey, wireframe seven screens, seed permitted job catalog, define extraction schemas and evaluation fixtures.

### Week 2 — Core product

Implement auth, CV extraction, verified profile, preferences, job feed and job details. Demo one candidate-job match.

### Week 3 — AI application generation

Implement fit analysis, truthful CV/cover letter generation, editable workspace and evidence checks; test with first users.

### Week 4 — Ship and validate

Export, tracking, privacy controls, monitoring, bug fixes, production deployment and Demo Day validation.

Scope gate: if job feed integration is unstable by mid-Week 2, use a curated set of 20–50 sourced live postings plus paste-a-job fallback. If application-question drafting or tracking threatens core reliability, defer those P1 items. Do not sacrifice factual accuracy or basic usability for automation.

## 14. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Job-source access and freshness | Authorized sources, provenance, refresh dates, limited catalog, manual fallback. |
| AI hallucination | Verified fact store, evidence checks, edit/approve workflow, adversarial tests. |
| Applicant data privacy | Consent, restricted access, deletion, no unnecessary retention. |
| Platform restrictions | No prohibited automation or bypassing anti-bot controls. |
| Four-week scope | P0-first milestones; defer autofill and submission. |
| Competitive differentiation | Test workflow speed, discovery relevance and evidence-grounded trust rather than generic AI writing. |
| Weak pricing evidence | No payment build; revisit after larger research and willingness-to-pay tests. |

## 15. Roadmap

* Foundry MVP: Find (limited) → Match → Tailor → Export → Track.
* Post-MVP: broader authorized job sources, saved searches, alerts, stronger fit ranking and question drafting.
* Later: supported browser autofill, per-site validation, approval-controlled submissions and delivery confirmations.
* Long-term: monitored job feed and batches of ready-for-review applications; never promise automated submissions on unsupported platforms.

## 16. Release criteria

* All P0 requirements work on a deployed URL.
* One user completes the full workflow with a real vacancy.
* Generated application contains no unresolved fabricated claims.
* CV deletion, access isolation and failure handling tested.
* Job cards show original sources and stale jobs are handled.
* Documented user feedback and before/after task-time comparison available for Demo Day.

## 17. Decisions and open questions

Locked: Nigerian job-seeker initial persona; five-pillar vision; relevant-job feed in MVP; evidence-grounded tailoring; human review; manual external submission for Foundry. Open: exact job-source provider; pricing/credit model; which job categories to seed first; supported export template; ATS autofill partner strategy; future international expansion. Research updates may revise priorities but should not expand four-week scope without a trade-off.

Document note: “Final” means the implementation baseline for the Qubators build, not that market validation is complete. The latest connected-form refresh was not authorized; research counts reflect the last six verified responses.
