PLANNING DOCUMENT — NOT CODE. NOTHING IN THE APP HAS BEEN CHANGED FOR THIS PLAN.
============================================================================

AI Enabled Interview Preparation & Assessment
Strategic Plan for the e-Shram / NCS Problem Statement (PS-03)
============================================================================


0. WHY THIS DOCUMENT LOOKS DIFFERENT FROM A NORMAL PROJECT PLAN
----------------------------------------------------------------
Before writing anything else, I checked the actual NCS portal (ncs.gov.in) and public
records about it. That changes the plan significantly, so read this section first.

**NCS already ships three AI tools to jobseekers, for free, today:**
  1. "AI Interview Coach" — interview preparation tool
  2. "Employability Skill Assessment" — powered by a private partner, HireMee
     (MoU between MoLE and Karpaga Assessment App Matrix Services Pvt Ltd)
  3. "AI Job Match" — AI-based job recommendation
  4. "AI Resume Builder" — resume creation tool

Source evidence:
  - NCS homepage sections: "AI Resume builder", "AI Interview Coach",
    "Employability Assessment" (via Hire-mee), "Career Tools & Learning"
  - NCS's own promotional post (X/Twitter, @NCSIndia): "NCS ke FREE AI Tools ke
    saath apni job search ko banaye smart aur aasan — AI Interview Coach se
    interview ki taiyari karein, Employability Skill Assessment se pehchane apni
    kshamta, AI Job Match se paaye sahi avsar"
  - Facebook/DGE confirmation of the free Employability Assessment Test and the
    HireMee video-CV integration

**What this means for the hackathon:**
This PS is NOT asking you to invent a category that doesn't exist on NCS. It is
asking you to design something that is clearly BETTER, DEEPER, or MORE INCLUSIVE
than what already ships — and to show you understand the existing ecosystem well
enough to say precisely how. Judges scoring "Innovation & Originality" and
"Relevance to Problem Statement" will very likely already know about these three
tools. If your pitch doesn't mention them and explain the delta, it will read as
uninformed, no matter how polished the demo is.

**Where the real gaps are (this is your differentiation story):**
  - NCS's tools are text/portal-based; there is no evidence of VOICE-based mock
    interview practice — your PS explicitly calls out "voice based practice."
  - No evidence of a public NCO (National Classification of Occupations) linked
    skill-gap view for jobseekers — occupation classification exists as a backend
    government standard but isn't surfaced as a "here's what you're missing for
    this exact occupation code" tool.
  - No evidence of behavioural-question-specific coaching (STAR method, soft
    skills like confidence/clarity/pacing) as a distinct, scored feature.
  - No evidence of low-bandwidth/IVR/SMS fallback for the AI tools specifically
    (NCS does have a general toll-free helpline: 1514).
  - No evidence of regional-language interview practice.

Your submission should say, explicitly, in the pitch: "NCS already gives jobseekers
an AI Interview Coach and an Employability Assessment. We are not replacing those —
we are the missing layer underneath them: voice-based practice grounded in India's
official occupation taxonomy (NCO-2015), with soft-skills coaching and accessibility
options the current tools don't cover." That framing directly answers Criterion 1
(Relevance) and Criterion 2 (Innovation) at the same time.


1. THE NEW FEATURE YOU ASKED FOR: RESUME -> RELEVANT NCS/NCO SKILLS
----------------------------------------------------------------
You asked for: upload a resume, and see the relevant skills "from NCS."

What "from NCS" concretely means: India's official occupation taxonomy is the
**NCO-2015 (National Classification of Occupations, 2015 edition)**, published by
the Ministry of Labour & Employment / DGE — the same ministry that runs NCS. It is
publicly available as a PDF (ncs.gov.in/hi-in/documents/nco - 2015.pdf) and is
structured hierarchically, similarly to the international ISCO-08 standard it is
aligned with:

  Division (1 digit)      -> broad occupation group
    Sub-Division (2 digit)
      Group (3 digit)
        Family (4 digit)
          Unit occupation (full code) -> specific job title, with associated
                                          tasks/duties and typical skill
                                          requirements

This is the correct, authentic target to match a resume against — not a taxonomy
you invent yourself. Matching against NCO-2015 instead of generic "skills" is what
makes this feature specifically an *NCS-aligned* feature rather than a generic
resume scanner, and it directly strengthens Criterion 1 and Criterion 3
(using an existing MoLE data asset instead of reinventing one).

FLOW — Resume to NCO Skill Mapping
-----------------------------------
```
 Job seeker                Backend                          NCO-2015 dataset
 ----------                -------                          -----------------
     |                        |                                     |
     | 1. Upload resume (PDF) |                                     |
     |----------------------->|                                     |
     |                        | 2. Extract text (already built:     |
     |                        |    pdf-parse)                       |
     |                        |                                     |
     |                        | 3. LLM extracts structured skills,  |
     |                        |    tools, and experience keywords    |
     |                        |    from resume text                 |
     |                        |                                     |
     |                        | 4. Compare extracted skills against |
     |                        |    curated NCO occupation records   |
     |                        |------------------------------------>|
     |                        |    (embedding similarity + keyword  |
     |                        |     overlap per occupation entry)   |
     |                        |<------------------------------------|
     |                        | 5. Rank top 3-5 matching NCO         |
     |                        |    occupations by fit score          |
     |                        |                                     |
     | 6. Show results:       |                                     |
     |    - Matched NCO code  |                                     |
     |      + title (e.g.     |                                     |
     |      "4222 - Client    |                                     |
     |      Information       |                                     |
     |      Clerks")          |                                     |
     |    - Skills you have   |                                     |
     |      that match it     |                                     |
     |    - Skills the        |                                     |
     |      occupation        |                                     |
     |      typically needs   |                                     |
     |      that you're       |                                     |
     |      missing           |                                     |
     |    - Suggested NCS     |                                     |
     |      job categories to |                                     |
     |      search for        |                                     |
     |<-----------------------|                                     |
```

PHASED IMPLEMENTATION (be honest about scope in the pitch)
  Phase 1 — Hackathon/demo scope (feasible in days, solo):
    - Manually curate ~80-150 common NCO occupation entries covering the job
      categories NCS itself highlights (retail, driving/logistics, domestic and
      care work, IT/ITES, healthcare support, construction, agriculture,
      manufacturing, clerical/back-office).
    - Store as a simple JSON/seed collection: { ncoCode, title, coreSkills[],
      relatedTasks[] }.
    - Reuse the resume text extraction already built for the resume-to-job-fit
      feature; add a second LLM prompt that extracts a skill/keyword list, then
      compares it against the curated set (LLM reasoning is enough at this scale
      — no need for a vector DB yet).
  Phase 2 — Post-hackathon / scale-up (say this in the roadmap slide, don't build
  it now):
    - Ingest the full NCO-2015 document (all divisions) into a proper searchable
      store with embeddings, so matching covers the entire taxonomy, not a
      curated subset.
    - Pursue an official data-sharing/API arrangement with DGE/NCS so the
      taxonomy stays current and — with explicit user consent — matched skill
      gaps can feed back into the user's real NCS profile instead of living only
      in this tool.

This phased honesty is itself a scoring point under Criterion 3 (Feasibility) —
judges distrust demos that imply a fully scaled government-data integration was
built in a weekend.


2. CRITERION-BY-CRITERION PLAN
----------------------------------------------------------------

### Criterion 1 — Relevance to Problem Statement
  - Explicitly name the existing NCS AI tools (Section 0) and state the gap you
    fill: voice-based practice, NCO-grounded skill matching, soft-skills scoring,
    accessibility fallback.
  - Frame the user as "worker-centric": an NCS-registered jobseeker, not a
    recruiter. (You already corrected this in the app — recruiter language like
    "share with candidates" and "hire/no-hire" verdicts have been replaced with
    self-practice framing and a readiness verdict.)
  - Explicitly reference NCO-2015 as the skill taxonomy, not a generic one.

### Criterion 2 — Innovation & Originality
  - Voice-based mock interview (Vapi integration) — NCS's coach is not confirmed
    to be voice-based; this is your clearest novel angle.
  - NCO-grounded resume matching (Section 1) — nobody else is doing "which
    official Indian occupation code do I fit, and what am I missing for it."
  - Soft-skills scoring (confidence, clarity, engagement) extracted from the same
    voice transcript already captured — no extra data collection needed, reuses
    what the call already produces.
  - Emerging tech used appropriately: LLM-based structured extraction (resume
    parsing, question generation, feedback scoring), voice AI (Vapi), not
    over-engineered with tech for its own sake.

### Criterion 3 — Feasibility & Implementability
  - Built on Next.js + MongoDB + NextAuth — a stack any MoLE-adjacent dev team
    can maintain; no exotic infrastructure.
  - Everything in Section 1's Phase 1 is buildable solo in days using the
    resume-parsing pipeline that already exists in the app (pdf-parse +
    OpenRouter LLM calls with a fallback chain across multiple free models,
    already implemented for resilience).
  - Clear phased roadmap (Phase 1 demo -> Phase 2 full NCO ingestion -> Phase 3
    official NCS integration) shows futuristic orientation without overpromising.
  - Integration touchpoint: could sit behind NCS's existing "Find Skill Provider"
    / "SIDH Registration" flow as a pre-assessment step, or be offered right
    after a jobseeker uses "AI Job Match" to see what's missing for a suggested
    job.

### Criterion 4 — Impact Potential
  - Worker welfare: reduces interview anxiety through repeated low-stakes
    practice; makes official occupation/skill expectations legible to workers
    who don't have access to a career counsellor.
  - Measurable outcomes to propose in the pitch (even if simulated/estimated for
    the demo, state them as target KPIs, not measured facts):
      - number of practice sessions completed per registered user
      - readiness-verdict improvement across repeated sessions for the same user
      - % of resumes where a clear NCO occupation match was found
      - self-reported confidence before/after (a simple 1-5 survey prompt after
        each session would generate this data cheaply)
  - System-level: could reduce load on NCS's human "Find Counsellor" service by
    handling first-pass readiness coaching automatically, reserving counsellor
    time for cases that need a human.

### Criterion 5 — User Experience & Accessibility
  - Mobile-first layout (already the primary target, given NCS's own user base
    skews toward mobile-only, low-end Android devices).
  - Multilingual: NCS itself supports multiple languages; propose at minimum
    Hindi + English for questions/feedback text as a near-term addition
    (explicitly scoped as a fast-follow, not core hackathon scope — be honest).
  - Low-tech fallback: propose a text-only practice mode (no voice/video
    required) for low-bandwidth or older devices, and note NCS's own toll-free
    1514 helpline as a precedent for the "not everyone has a good app
    experience" reality — your text-only mode is the app-side equivalent of
    that same principle.
  - Disability-friendly: real accessibility work needed on the current app
    (proper ARIA labels, keyboard navigation, screen-reader-friendly transcript
    view) — flag this explicitly as a known gap being worked on, don't claim
    it's done if it isn't.

### Criterion 6 — Data Security & Privacy
  - Resumes and interview transcripts are sensitive personal data — for migrant
    or vulnerable jobseekers, especially so.
  - Concrete safeguards to state in the pitch:
      - Resumes are processed in-memory for scoring and not persisted to disk
        beyond the database record needed for the session (state this as a
        design principle even if today's code path doesn't yet enforce
        deletion — flag as a near-term hardening item).
      - No resume/transcript data sent to any third party beyond the LLM
        provider needed to generate feedback, and that call carries no
        personally identifying fields beyond what's necessary (name/email
        already excluded from the resume-scoring prompt today).
      - Environment secrets (API keys) are not committed to source control —
        this was an actual issue found and fixed in the existing codebase
        (hardcoded OpenRouter/Vapi keys were removed and moved to environment
        variables). Mention this in the pitch as evidence of security hygiene,
        it signals maturity to judges scoring this criterion.
      - Align with India's Digital Personal Data Protection Act, 2023 (DPDP
        Act) principles: purpose limitation (data used only for interview
        prep), consent for storage, and a user-facing data deletion option as
        a near-term addition.

### Criterion 7 — Sustainability & Long-Term Value
  - Cost model: LLM calls are the main recurring cost. The fallback-chain
    design (multiple free-tier models tried in sequence) already reduces cost
    risk and demonstrates awareness of running this affordably at scale, not
    just for a demo.
  - Maintenance: standard, widely-known stack (Next.js/Mongo/NextAuth) means low
    hiring risk for whoever maintains this after the hackathon.
  - Evolution path ties directly to the Phase 1/2/3 roadmap in Section 1 — full
    NCO ingestion, regional languages, and progress tracking are the natural
    next investments, not guesswork.

### Criterion 8 — Clarity of Presentation
  - Recommended demo script (see Section 3 flow) — walk through ONE user's
    journey end-to-end rather than clicking through every screen.
  - Open the pitch with the "gap vs. existing NCS tools" framing from Section 0
    — this immediately shows problem-understanding depth before a single
    screen is shown.
  - Close with the honest phased roadmap (Section 1) rather than claiming
    everything is finished — judges scoring feasibility respond better to
    "here's what's real today vs. what's next" than to overclaiming.


3. RECOMMENDED END-TO-END DEMO FLOW (for the pitch)
----------------------------------------------------------------
```
 [Landing page]
      |
      v
 [Sign up / Sign in]  (already reframed as free, job-seeker-facing)
      |
      v
 [Dashboard]
      |
      |-----------------------------+
      v                             v
 [Start a Mock Interview]    [Resume-to-Job/NCO Fit]
      |                             |
      v                             v
 [Pick target role +          [Upload resume PDF +
  generate questions]          target job description]
      |                             |
      v                             v
 [Voice practice session]     [Fit score + matched/missing
  (Vapi call, live               skills + NCO occupation
  transcript)]                    match, if Section 1 is
      |                           built]
      v
 [Feedback: ratings +
  soft skills (confidence/
  clarity/engagement) +
  improvement tips +
  readiness verdict]
      |
      v
 [Practice again / try a
  different role]
```

This single-path walkthrough is what should be demoed live — it tells one
coherent worker's story ("I'm preparing for a Client Information Clerk role,
here's my resume fit, here's my mock interview, here's what to improve") rather
than a feature tour.


4. RISKS / HONEST CAVEATS TO STATE UP FRONT
----------------------------------------------------------------
  - The NCO matching in Phase 1 uses a curated subset of occupations, not the
    full national taxonomy — say this explicitly, don't imply full coverage.
  - Free-tier LLM providers (used for cost reasons in the demo) can be rate-
    limited or deprecated without notice — the app already has a fallback chain
    across multiple models to reduce (not eliminate) this risk; a production
    deployment would need a paid-tier or self-hosted model for reliability.
  - Voice interview quality depends on a third-party voice AI vendor (Vapi) —
    fine for a demo/pilot, but a production MoLE deployment would likely need a
    government-approved/data-residency-compliant voice vendor, which is a
    procurement question, not a coding one.
  - Accessibility and regional-language support are acknowledged gaps, explicitly
    scoped as near-term roadmap, not claimed as done.


5. SOURCES CONSULTED FOR THIS PLAN
----------------------------------------------------------------
  - ncs.gov.in homepage (jobseeker/employer sections, AI tools, career
    counselling, accessibility features)
  - National Career Service - India, official X/Twitter post on free AI tools
    (@NCSIndia)
  - Facebook/DGE post confirming the free Employability Assessment Test
  - dge.gov.in NCS overview page (Directorate General of Employment)
  - NCO-2015 official document reference: ncs.gov.in/hi-in/documents/
    nco - 2015.pdf (National Classification of Occupations, 2015 edition,
    Ministry of Labour & Employment)


============================================================================
END OF PLAN — nothing in the codebase was modified while writing this document.
Tell me which pieces to build first (the NCO matching feature, accessibility
pass, or something else) and I'll implement only that.
============================================================================
