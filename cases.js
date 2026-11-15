/**
 * RISK MITIGATION CASE LOG — data file
 * -------------------------------------
 * Each object below becomes one card in the "Risk mitigation case log" section.
 * To add a new entry: copy an existing object, give it the next id, fill in the
 * fields, and add it to the END of the array. No other file needs to change.
 *
 * Fields:
 *   id        - e.g. "002" (zero-padded, used for display only)
 *   title     - short, specific description of the situation (not the outcome)
 *   project   - anonymised project/client label (no real client or system names
 *               unless already public — generalise anything under NDA)
 *   period    - e.g. "Aug 2025" or "Q3 2025" — rough is fine
 *   tag       - one short category label, e.g. "Resourcing risk", "Scope risk"
 *   context   - 1-3 sentences: the situation before the risk was addressed
 *   risk      - 1-2 sentences: what could go wrong and its likely impact
 *   mitigation- 1-3 sentences: the decision/action taken
 *   outcome   - 1-2 sentences: what happened as a result (use real figures only
 *               where you're confident of them — otherwise describe the effect
 *               qualitatively, e.g. "gave leadership a clear decision point")
 *   mock      - OPTIONAL. Only add this if you want an illustrative data snapshot
 *               under the case (e.g. to show what a tool/dashboard you built looks
 *               like). Every value inside MUST be fake — no real names, no real
 *               project/client names, no real numbers from an actual sheet.
 *     caption     - one line explaining what the snapshot illustrates
 *     table       - { columns: [...], rows: [[...], [...]] } — row length must
 *                   match columns length. A cell exactly equal to "OK" or
 *                   "Over-allocated" renders as a coloured status badge.
 *     leadStatus  - [{ project, status }] — status must be exactly "Assigned",
 *                   "Planned", or "No lead assigned" to get the right colour.
 *     footnote    - one line pointing out what the snapshot demonstrates
 */
const caseStudies = [
  {
    id: "001",
    title: "Resourcing conflict across two concurrent client leads",
    project: "QA engagement, Japan-based client (long-running platform project)",
    period: "Early 2026",
    tag: "Resourcing risk",
    context:
      "A QA engineer on the team was being split between two concurrent client " +
      "engagements, reporting to two different leads, with no formal agreement on " +
      "how their time should be divided. As the second engagement's workload grew, " +
      "day-to-day priority conflicts became harder to see and resolve in time.",
    risk:
      "Left unresolved, the conflict risked stalling validation work that needed " +
      "logic review on one engagement, while increasing the chance of burnout and " +
      "decision paralysis for the shared resource — with a knock-on risk of delayed " +
      "production issue resolution on either side.",
    mitigation:
      "Defined two concrete resourcing protocols for leadership to choose between: " +
      "a fixed weekly time-split, or an on-call model with a guaranteed response " +
      "window for urgent production issues. Paired this with one firm rule — all " +
      "task prioritisation for the shared resource routes through their lead, never " +
      "directly to the individual — to stop priorities being set by whoever asked " +
      "last.",
    outcome:
      "Gave leadership a clear, bounded decision instead of an open-ended conflict, " +
      "and the same escalation pattern was reused for later resourcing conflicts on " +
      "the team.",
  },
  {
    id: "002",
    title: "Building a resourcing visibility system during a QA Manager vacancy",
    project: "QA Lead group, across all concurrent engagements",
    period: "Q4 2026",
    tag: "Capacity visibility",
    context:
      "With no QA Manager in place, QA Leads were directly responsible for spotting " +
      "and resolving resourcing conflicts across every concurrent project themselves. " +
      "The resourcing picture that existed before this lived across ad hoc notes and " +
      "verbal updates, with no single place showing who was allocated where.",
    risk:
      "Without a shared, up-to-date view of allocations, people could end up " +
      "over-committed across multiple projects at once well before anyone noticed — " +
      "with real risk of QA coverage gaps or burnout surfacing only after delivery " +
      "was already affected.",
    mitigation:
      "Built a lightweight resourcing tracker (spreadsheet-based, no new tooling " +
      "budget needed) with QA Leads as both its users and its first data source: a " +
      "roster of each person's maximum capacity, one allocation log entry per project " +
      "assignment, and three auto-calculated views layered on top — an FTE report " +
      "flagging anyone over or under capacity as of a chosen reference date, a " +
      "rolling weekly schedule, and a per-project QA leadership status (Assigned / " +
      "Planned / No lead assigned) so leadership coverage gaps were visible " +
      "project-by-project, not just person-by-person.",
    outcome:
      "Gave the QA Lead group a shared source of truth for who was doing what, " +
      "without needing a QA Manager role to maintain it — surfacing over-allocation " +
      "and leadership coverage gaps at a glance instead of after the fact.",
    mock: {
      caption: "Illustrative snapshot of the tracker's output — all names, projects, and numbers below are fictional.",
      table: {
        columns: ["Person", "Role", "Project", "Allocation", "Status"],
        rows: [
          ["Person A", "QA Lead", "Project 1", "30%", "OK"],
          ["Person A", "QA Lead", "Project 2", "30%", "OK"],
          ["Person A", "QA Lead", "Project 3", "30%", "OK"],
          ["Person B", "QA Member", "Project 1", "60%", "OK"],
          ["Person C", "QA Member", "Project 4", "100%", "Over-allocated"],
          ["Person D", "QA Member", "Project 4", "100%", "Over-allocated"],
        ],
      },
      leadStatus: [
        { project: "Project 1", status: "Assigned" },
        { project: "Project 4", status: "Assigned" },
        { project: "Project 5", status: "No lead assigned" },
      ],
      footnote:
        "Project 4 shows two people stacked at 100% each — a 200% total the " +
        "tracker's FTE report flags immediately. Project 5 shows the other thing " +
        "it surfaces: a project with no QA Lead assigned at all.",
    },
  },
  {
    id: "003",
    title: "Standardising test case & reporting templates across projects",
    project: "QA tooling — compatibility & performance test templates, company-wide",
    period: "QA Manager transition period, 2026",
    tag: "Reporting consistency risk",
    context:
      "A PM flagged that QA test cases and result reporting looked different from " +
      "project to project, making it hard to track and compare progress across the " +
      "team — and there was no standardised test management system in place yet to " +
      "fix that. When the QA Manager then left two unfinished test templates, for " +
      "compatibility and performance testing, intended to become that shared " +
      "standard, finishing them became the opening to close the gap. I coordinated " +
      "the work with two other QA Leads.",
    risk:
      "Without a shared, reliable template, every project risked reporting test " +
      "coverage and results in its own format, leaving the PM with no consistent " +
      "way to compare progress or trust the numbers across projects. On review, the " +
      "inherited templates meant to fix this had their own problems: cross-sheet " +
      "references pointing at the wrong tab, a formula one spreadsheet engine " +
      "wouldn't recognise, and a dropdown that didn't stay in sync with each " +
      "cycle's test environments — all of which would have produced quietly wrong " +
      "pass/fail roll-ups if rolled out as-is, trading one inconsistency problem " +
      "for a quieter one.",
    mitigation:
      "Before handing the templates back for general use, audited every automated " +
      "field end-to-end — summary roll-ups, dropdowns, cross-sheet references — " +
      "traced each broken formula to its root cause rather than patching the " +
      "visible symptom, and re-pointed static lists to read live from the " +
      "environment configuration so a future change wouldn't silently break them " +
      "again. Verified each fix against a dummy test run before sign-off.",
    outcome:
      "Delivered two templates the wider QA team could trust and reuse without " +
      "re-auditing them per project — giving the PM a consistent, comparable view " +
      "of test coverage and results across projects for the first time, instead of " +
      "the handover quietly passing the same problem forward.",
  },
  {
    id: "004",
    title: "Scoping a performance test strategy under a tight, cost-capped deadline",
    project:
      "Performance testing — hybrid-cloud failover architecture, real-time " +
      "multilingual meeting transcription product",
    period: "Q1 2026",
    tag: "Test scoping & schedule risk",
    context:
      "First time designing a performance test strategy for this product's new " +
      "hybrid-cloud architecture — adding a third-party API as an automatic " +
      "failover to keep the transcription service available when local " +
      "infrastructure was under strain. The timeline was short, the business " +
      "priority was proving the new architecture was sellable rather than " +
      "exhaustively validated, and testing itself had to run inside a strict, " +
      "fixed budget cap on the third-party API credits consumed during testing.",
    risk:
      "With limited time and a hard credit budget, the real risk ran in both " +
      "directions: test too broadly and run out of budget or time before " +
      "validating the one behaviour the business actually depended on — a " +
      "seamless handover to the failover API with no data loss, no added latency, " +
      "and no unnoticed drop in transcription accuracy — or test too narrowly and " +
      "ship an architecture whose actual failure mode was never proven at all.",
    mitigation:
      "Built a test strategy that explicitly decided what not to test and " +
      "documented the reasoning for every test type considered, so the trade-off " +
      "was visible rather than assumed — tests whose risk was already covered " +
      "elsewhere (e.g. stress and scalability testing) were skipped in favour of " +
      "concentrating the limited budget on failover and accuracy validation. Set a " +
      "mandatory smoke test as a hard go/no-go gate before any performance run, so " +
      "a broken build couldn't burn through test budget by failing at the first " +
      "real test. Defined accuracy degradation as a measurable, bounded threshold " +
      "(comparing transcription accuracy before versus during failover) instead of " +
      "a subjective pass/fail call, and built a dedicated risk register for the " +
      "test cycle itself — environment instability, schedule overrun, specialist " +
      "review availability for non-English accuracy checks — each with its own " +
      "mitigation and an explicit fallback if it was triggered.",
    outcome:
      "Gave the team a defensible go/no-go basis for adopting the new architecture " +
      "inside a tight deadline and a fixed budget, without overspending on " +
      "low-value tests or skipping validation of the one failure mode the business " +
      "actually depended on.",
    mock: {
      caption:
        "Illustrative excerpt from the test-method decision matrix — test types, " +
        "wording, and layout below are a simplified recreation, not the original " +
        "document's exact text.",
      table: {
        columns: ["Test type", "Priority", "Decision", "Reason (summarised)"],
        rows: [
          [
            "Smoke test (pre-performance gate)",
            "High",
            "Chosen",
            "Mandatory gate — stops a broken build from burning through test budget",
          ],
          [
            "Load test (failover trigger & recovery)",
            "High",
            "Chosen",
            "Directly validates the one behaviour the release depends on",
          ],
          [
            "Stress test (absolute breaking point)",
            "Low",
            "Skipped",
            "Risk already bounded by the load test's built-in safety thresholds",
          ],
          [
            "Scalability test (horizontal scaling)",
            "Low",
            "Skipped",
            "Out of scope — this release validates failover, not scaling",
          ],
        ],
      },
      footnote:
        "Every test type in the real matrix — chosen or skipped, 15+ in total — " +
        "carried its own written benefit / drawback / worst-case reasoning, plus a " +
        "separate risk register (risk, probability, impact, mitigation) for the " +
        "test cycle's own execution risks. Shown here as a short illustrative " +
        "excerpt rather than the full matrix.",
    },
  },
  {
    id: "005",
    title:
      "Validating AI-driven governance scores without a data-science skill set on the QA team",
    project: "QA strategy — AI governance platform for datasets & models (MVP)",
    period: "Q3 2026",
    tag: "AI testing capability gap",
    context:
      "The business wanted an AI-governance platform with heavy AI/ML surface " +
      "area — calculated quality and risk scores for datasets and models, " +
      "statistical diagnostics, and AI-generated summaries — built on a tight MVP " +
      "timeline. The QA team's experience testing AI-driven, statistically-derived " +
      "output was still developing, well short of where it needed to be to " +
      "independently judge whether a calculated score was actually correct.",
    risk:
      "If a calculated score was wrong, the team had no independent way to catch " +
      "it: deriving the correct statistical reference values is a data-science " +
      "skill, not a functional-QA one, so any gap in whatever reference source was " +
      "used would be a blind spot the team couldn't see past. Separately, several " +
      "AI-driven outputs (a toxicity classifier, AI-written summaries, an " +
      "automated model comparison) could display cleanly without that output ever " +
      "being checked for accuracy — risking a result that reads as validated when " +
      "only its presentation was.",
    mitigation:
      "Partnered with the team's data science lead to build and maintain an " +
      "independent reference implementation covering every scored metric, with a " +
      "jointly confirmed match tolerance (exact match for discrete outputs, a " +
      "defined floating-point tolerance for continuous ones) so a calculated score " +
      "could be checked against ground truth rather than judged by eye. For the AI " +
      "outputs the team genuinely could not verify for accuracy this cycle, scope " +
      "was split deliberately: tested and signed off as 'verified presentation' " +
      "(the label, the disclaimer, the boundary condition are correct) rather than " +
      "silently implying 'verified accuracy' — and this distinction was written " +
      "into the test strategy's own risk register rather than left implicit.",
    outcome:
      "Delivered a QA strategy that didn't claim a skill the team didn't yet have: " +
      "calculated scores the team could verify were checked against an " +
      "independent reference, and the ones it genuinely couldn't were labelled as " +
      "such rather than rubber-stamped — giving stakeholders an honest picture of " +
      "what had actually been proven before release, instead of a uniform pass.",
    mock: {
      caption:
        "Illustrative snippet of how AI-driven outputs were scoped for " +
        "validation — components and wording below are a simplified recreation, " +
        "not the original document's exact text.",
      table: {
        columns: ["AI-driven output", "What this cycle verified", "Status"],
        rows: [
          [
            "Dataset & model governance scores",
            "Checked against an independent reference implementation within a confirmed tolerance",
            "Verified accuracy",
          ],
          [
            "AI-written summary",
            "Label, disclaimer, and that it never alters a committed score",
            "Verified presentation",
          ],
          [
            "Content-safety classifier",
            "Label and boundary behaviour only — classifier accuracy itself out of scope this cycle",
            "Verified presentation",
          ],
          [
            "Automated model comparison",
            "Presented as guidance only; confirmed it is never treated as approval",
            "Verified presentation",
          ],
        ],
      },
      footnote:
        "Only one row needed a custom-built reference to earn 'Verified " +
        "accuracy'; the rest were deliberately scoped as presentation-only so " +
        "the capability gap was documented, not quietly implied away.",
    },
  },
  {
    id: "006",
    title: "Building a layered QA approach for AI-generated content quality",
    project: "QA strategy — AI content-generation feature, single-cycle UAT",
    period: "Q2 2026",
    tag: "Subjective quality testing",
    context:
      "An AI feature generating short conversational text from input keywords, " +
      "across multiple languages, needed to ship inside one single testing cycle " +
      "with no room for a second pass. Much of what made the output 'good' — " +
      "tone, naturalness, brand voice — was inherently subjective and couldn't be " +
      "pass/failed the way a functional check could.",
    risk:
      "Treating quality as purely a manual, subjective review would consume far " +
      "more time than the single cycle allowed and leave no reproducible evidence " +
      "behind. Treating it as 'tested' based only on structural checks (sentence " +
      "count, keyword presence) risked letting genuinely repetitive or awkward " +
      "output reach sign-off undetected, because structure can be correct while " +
      "the writing itself is poor.",
    mitigation:
      "Split AI output quality into three layers instead of one blanket check. " +
      "Hard structural rules (sentence-count limits, mandatory keyword inclusion, " +
      "output volume scaling) were asserted deterministically — no judgment " +
      "involved. For the layer that was subjective but still approximately " +
      "measurable, built objective proxy metrics: a sentence-embedding similarity " +
      "score to catch repetitive phrasing, and a language-appropriate readability " +
      "proxy for each supported language. Each proxy's limits were documented " +
      "alongside its result — for example, the similarity score was recorded as " +
      "catching structural repetition only, explicitly not semantic duplication, " +
      "rather than presenting it as a complete uniqueness check. The remaining, " +
      "genuinely judgment-based layer (brand voice, intent alignment) was " +
      "reserved for a narrow, time-boxed manual review rather than spread across " +
      "the whole output set.",
    outcome:
      "Delivered an AI-quality testing approach that fit inside a single-cycle " +
      "deadline without overstating what any one layer actually proved — " +
      "stakeholders could see exactly how much of the quality claim was " +
      "machine-verified versus human-judged, rather than one undifferentiated " +
      "'tested' label.",
  },
  {
    id: "007",
    title: "Standardising project closure with a structured QA Summary",
    project: "QA closure practice, applied across multiple projects",
    period: "Ongoing practice",
    tag: "Knowledge continuity risk",
    context:
      "When a QA engagement wound down, what had actually been tested — " +
      "coverage per feature, automation status, remaining defects — tended to " +
      "live scattered across sheets, chat threads, and individual memory rather " +
      "than in one place.",
    risk:
      "Without a single closing record, that knowledge risked being lost at " +
      "handover. Anyone picking the project back up later — for maintenance, an " +
      "audit, or a new QA lead taking over — would have no quick way to see what " +
      "was genuinely verified versus what was skipped, and could easily assume an " +
      "untested area was covered simply because no one flagged otherwise.",
    mitigation:
      "Adopted a standing practice of producing one structured QA Summary at the " +
      "close of every project: test coverage per module (total cases, how many " +
      "were actually executed, automation share), remaining defects by severity " +
      "and status, and an explicit list of untested or descoped areas rather than " +
      "a silent gap. Kept the structure consistent across projects, so the " +
      "document reads the same way regardless of which project it closes out.",
    outcome:
      "Gave every closed project a self-contained closing record, cutting the " +
      "time anyone else needs to understand what was actually verified without a " +
      "live walkthrough from the original tester.",
    mock: {
      caption:
        "Illustrative structure of a closing QA Summary — module names and " +
        "numbers below are fictional, not from a real project record.",
      table: {
        columns: ["Module", "Test cases", "Automated", "Status"],
        rows: [
          ["Core Administration", "120", "0%", "Complete"],
          ["Asset Management", "180", "0%", "Partial"],
          ["Reporting Dashboard", "40", "0%", "Not tested"],
          ["Security & Access", "60", "15%", "Complete"],
        ],
      },
      leadStatus: [
        { project: "High-severity defects", status: "Closed" },
        { project: "Medium-severity defects", status: "Accepted risk" },
        { project: "Untested scope", status: "Documented" },
      ],
      footnote:
        "'Not tested' and 'Accepted risk' are written down as plainly as " +
        "'Complete' — the summary's job is to show what was verified, not to " +
        "make the project look finished.",
    },
  },
];
