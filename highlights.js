/**
 * PROJECT HIGHLIGHTS — data file
 * -------------------------------
 * Memorable projects/moments from the QA work — NOT risk-mitigation
 * formatted (no Context/Risk/Mitigation/Outcome). Just what happened and
 * why it stuck.
 *
 * To add a new entry: copy an existing object, give it the next id, fill
 * in the fields, add it to the END of the array.
 *
 * Fields:
 *   id        - e.g. "002" (zero-padded, display only)
 *   title     - short, specific description
 *   project   - anonymised project/feature label
 *   period    - rough date, e.g. "June 2026"
 *   story     - 2-4 sentences: what happened and why it's memorable
 *   highlights- array of short bullet strings (concrete specifics/numbers)
 *   mock      - OPTIONAL, same shape as in cases.js (see the comment there)
 */
const projectHighlights = [
  {
    id: "001",
    title: "Catching a category-filtering defect in an AI equipment recommendation engine",
    project: "AI equipment recommendation engine — change request testing",
    period: "June 2026",
    story:
      "This one stuck with me. A change request updated the matching logic " +
      "behind an AI-driven equipment recommendation feature, and I led test " +
      "case review and execution for it — comparing the engine's behaviour " +
      "before and after the fix on the same targeted scenarios. The first run " +
      "told a clear story: every targeted case failed, with the engine still " +
      "returning equipment outside the service category the user had actually " +
      "asked for. That's not a cosmetic bug for a recommendation feature — " +
      "it's the one thing the feature exists to get right. We logged it at " +
      "Blocker severity and held it open through a CI/CD delay rather than " +
      "closing it early, until the retest actually came back clean.",
    highlights: [
      "0 of 3 targeted cases passed on the original logic — 3 of 3 passed after the fix",
      "A 24-case regression suite confirmed the fix didn't disturb the rest of the recommendation flow",
      "The defect stayed open through a retest delay rather than being closed on schedule alone",
    ],
    mock: {
      caption:
        "Illustrative before/after test result summary — figures shown match " +
        "the real pass/fail counts from this change; feature and project " +
        "names are generalised.",
      table: {
        columns: ["Test cycle", "Test cases", "Passed", "Failed"],
        rows: [
          ["Before fix", "3", "0", "3"],
          ["After fix", "3", "3", "0"],
          ["Regression suite", "24", "24", "0"],
        ],
      },
      leadStatus: [
        { project: "Defect severity", status: "Blocker" },
        { project: "Defect status", status: "Closed" },
      ],
      footnote:
        "The Blocker defect stayed open across a retest delay rather than " +
        "being closed on schedule alone — it closed only once the after-fix " +
        "run actually came back clean.",
    },
  },
  {
    id: "002",
    title: "Testing a trilingual voice AI's speech-to-speech stack",
    project: "Inbound voice AI agent — speech & language testing",
    period: "Sep–Oct 2026",
    story:
      "QA on a guardrails/policy layer sitting over a real speech-to-speech " +
      "voice agent — a stack combining speech-to-text, text-to-speech, and a " +
      "reasoning layer behind it — where getting the language and " +
      "identity-verification logic right depended directly on getting the " +
      "speech side right. Fixed and verified a trilingual (Japanese, English, " +
      "Indonesian) knowledge-base retrieval bug so a caller's spoken question " +
      "routed to the correct language's answer instead of silently falling " +
      "back to the wrong one, and tested the caller-verification gate that " +
      "identifies a caller from spoken details before granting any access. " +
      "Also ended up coordinating voice-cloning testing directly with its " +
      "developer after a code review surfaced that the feature wasn't " +
      "actually implemented on any branch yet — a reminder that a written " +
      "feature description and the shipped code behind it are two different " +
      "things, especially for something as new as instant voice cloning.",
    highlights: [
      "Verified trilingual (JA/EN/ID) knowledge-base retrieval across the speech-to-speech pipeline",
      "Tested the spoken-detail caller-verification gate that every other action depends on",
      "Caught a precondition gap on voice cloning before it reached the client demo: test cases assumed a built feature; the code had none",
    ],
  },
  {
    id: "003",
    title: "Benchmarking speech-to-text accuracy across four languages under failover stress",
    project: "Real-time multilingual meeting transcription product — STT accuracy testing",
    period: "Early 2026",
    story:
      "Hands-on testing of a transcription engine's accuracy across four " +
      "languages as the system switched between a local speech-to-text engine " +
      "and a cloud failover API under load. Established a 'gold standard' " +
      "baseline on the idle local engine, then re-measured the same metric " +
      "during and after the failover event, so a stressed system's " +
      "transcription couldn't quietly get worse the moment it moved to the " +
      "backup engine without anyone noticing. One real wrinkle: nobody on the " +
      "QA team read Japanese or Vietnamese well enough to judge whether the " +
      "'ground truth' reference transcripts were themselves correct — so " +
      "before trusting any accuracy score in those two languages, the " +
      "reference transcripts were independently audited by people who " +
      "actually speak them.",
    highlights: [
      "Benchmarked transcription accuracy in 4 languages, before and during an engine failover event",
      "Used Word Error Rate for English/Indonesian and Character Error Rate for Japanese/Vietnamese, against a defined acceptable-degradation threshold rather than a vague pass/fail",
      "Had the Japanese and Vietnamese reference transcripts independently audited before trusting any score measured against them",
    ],
  },
];
