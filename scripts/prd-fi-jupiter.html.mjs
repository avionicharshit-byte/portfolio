import { styles } from './prd-template.mjs';

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width"/>
<title>Jupiter — EKYC Onboarding PRD</title>
<style>${styles}</style>
</head>
<body>

<!-- Header -->
<div class="doc-header">
  <div class="doc-tag">Product Requirements Document · Harshit Dev Yadav</div>
  <h1 class="doc-title">Jupiter — EKYC Onboarding</h1>
  <p class="doc-tagline">Minimum-friction account opening within fixed regulatory constraints.</p>
  <div class="doc-meta">
    <div class="doc-meta-item"><strong>Author</strong> Harshit Dev Yadav</div>
    <div class="doc-meta-item"><strong>Product</strong> Jupiter (Neobank)</div>
    <div class="doc-meta-item"><strong>Status</strong> Sample PRD</div>
    <div class="doc-meta-item"><strong>North-star</strong> Account-opening completion rate</div>
  </div>
</div>

<!-- TL;DR callout -->
<div class="callout">
  <div class="callout-label">⚡ TL;DR</div>
  <p><strong>Product:</strong> Jupiter — neobank account opening / EKYC flow.</p>
  <p><strong>Who:</strong> Urban users aged 18–35, mobile-first, opening a zero-balance digital savings account.</p>
  <p><strong>Why now:</strong> User research (n=10) shows 100% want a fully online process and 100% are willing to spend under 5 minutes. The current flow exceeds that threshold. Every extra step is measurable drop-off.</p>
  <p><strong>Launch:</strong> Phased rollout with a 30-day decision gate.</p>
</div>

<!-- Metrics -->
<div class="metrics-row">
  <div class="metric-chip">
    <div class="value">~60%</div>
    <div class="label">Current completion rate</div>
  </div>
  <div class="metric-chip">
    <div class="value">+15pp</div>
    <div class="label">Target lift (90 days)</div>
  </div>
  <div class="metric-chip">
    <div class="value">&lt;5 min</div>
    <div class="label">User tolerance threshold</div>
  </div>
</div>

<!-- Core insight -->
<div class="callout">
  <div class="callout-label">💡 Core Insight</div>
  <p>A neobank rides a partner bank's regulated rails — you <strong>cannot trade compliance for speed</strong>. The problem is minimum-friction onboarding within fixed constraints, not "better UX." Every redundant OTP and repeated KYC step is drop-off that cannot be recovered through design alone.</p>
</div>

<h2>Background &amp; Problem</h2>
<p><strong>First-hand evidence:</strong> In March 2024, a Fi account access was banned because AI-powered KYC verification failed during a noisy environment. Recovery required reaching a PM directly on LinkedIn — resolved after one week. A typical user would have churned at step one of that recovery path.</p>
<p>Jupiter operates on Federal Bank's regulated rails. The statutory KYC requirements — PAN, Aadhaar OTP, facial verify, signature — are <strong>fixed</strong>. The problem is not removing steps; it's removing redundancy and perceived friction within those steps, and building a graceful recovery path when AI fails.</p>
<p><strong>Competitive context:</strong> Fi and Jupiter lead on AI KYC and UX simplicity vs. HDFC, ICICI, and Kotak. Jupiter wins on positioning — but the onboarding funnel still has 30–40% drop-off before a funded account.</p>

<hr/>

<h2>Goals &amp; Non-Goals</h2>

<h3>Goals</h3>
<ul>
  <li>Consolidate redundant OTPs into one verification pass</li>
  <li>Pre-fill PAN + Aadhaar fields from DigiLocker retrieval (eliminate re-entry)</li>
  <li>Manual video KYC as a graceful fallback when AI KYC fails</li>
  <li>Single consolidated review screen before submit</li>
  <li>Instrument per-step drop-off (currently a black box)</li>
</ul>

<h3>Non-Goals</h3>
<ul>
  <li>Removing any statutory KYC step</li>
  <li>Changing fraud / ML check logic or reducing fraud flag rate</li>
  <li>Redesigning post-onboarding home or investing flows</li>
  <li>Building a concierge service (high effort, 3% use-case)</li>
  <li>Targeting non-urban or non-mobile-first segments (separate KYC path)</li>
</ul>

<hr/>

<h2>User Stories / JTBD</h2>
<ul>
  <li><em>When I start opening an account, I want to finish in under 5 minutes so I don't abandon mid-way.</em></li>
  <li><em>When I enter my PAN, I want my details auto-filled so I don't retype what the system already knows.</em></li>
  <li><em>When KYC fails, I want a clear fallback so I'm not locked out of my own account.</em></li>
  <li><em>When I've verified everything, I want to see one clear summary so I know what I'm submitting.</em></li>
</ul>

<hr/>

<h2>Functional Requirements</h2>

<div class="priority-block p0">
  <div class="priority-label">P0 — Must Ship</div>
  <ul>
    <li>Consolidate 3 separate OTP requests into one verification pass (phone, email, Aadhaar)</li>
    <li>PAN → auto-fetch name, DOB, address via DigiLocker; pre-fill form fields; user confirms, doesn't retype</li>
    <li>Manual video KYC fallback when AI facial recognition fails — AI failure must not mean account lock</li>
    <li>Single consolidated review screen before final submission</li>
  </ul>
</div>

<div class="priority-block p1">
  <div class="priority-label">P1 — Should Ship</div>
  <ul>
    <li>Aadhaar card scan via OCR (camera-scan the number, like Amazon does for credit cards)</li>
    <li>Per-step drop-off analytics (step name, exit rate, device/OS breakdown)</li>
    <li>Smart retry with context: "Your Aadhaar OTP expired — tap to resend" (not a generic error)</li>
  </ul>
</div>

<div class="priority-block p2">
  <div class="priority-label">P2 — Nice to Have</div>
  <ul>
    <li>Truecaller SDK for phone number pre-fill</li>
    <li>Progress bar + step count to reduce perceived friction</li>
    <li>Resume-where-you-left-off for sessions abandoned mid-flow</li>
  </ul>
</div>

<hr/>

<h2>Acceptance Criteria</h2>

<table>
  <thead>
    <tr>
      <th>Requirement</th>
      <th>Pass / Fail Test</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>OTP consolidation</strong><br/>User receives at most 2 OTPs total (phone + Aadhaar); email verify happens silently post-submission</td>
      <td><span class="pass-fail">≤2 OTPs per session</span></td>
    </tr>
    <tr>
      <td><strong>Pre-fill</strong><br/>PAN entry triggers DigiLocker auto-fetch; name/DOB appear within 2s; user edits are respected</td>
      <td><span class="pass-fail">Fields populated, no retype required</span></td>
    </tr>
    <tr>
      <td><strong>AI KYC fallback</strong><br/>When facial recognition fails, video KYC offered within same session — no forced restart</td>
      <td><span class="pass-fail">Zero forced restarts on AI failure</span></td>
    </tr>
    <tr>
      <td><strong>Review screen</strong><br/>Every submitted field visible on one screen before final CTA</td>
      <td><span class="pass-fail">User can audit all data before submit</span></td>
    </tr>
  </tbody>
</table>

<hr/>

<h2>Success Metrics</h2>

<div class="north-star">
  <div class="ns-label">⭐ North-Star Metric</div>
  <div class="ns-metric">Account-opening completion rate (start → funded account)</div>
  <div class="ns-target">Baseline ~60% → Target ~75% in 90 days (+15pp)</div>
  <div class="guardrails">
    <p><strong>Guardrails (must not worsen):</strong></p>
    <p>KYC pass integrity / fraud-flag rate · Manual video KYC usage rate (rising = AI model degradation) · Per-step drop-off · Regulatory step omission rate (zero)</p>
  </div>
</div>

<hr/>

<h2>Wireframes / User Flows</h2>

<div class="flow-label">Flow 1 — OTP Consolidation + PAN Pre-fill</div>
<div class="flow">Phone entry → [DigiLocker fetch triggered] → fields pre-filled → user confirms
→ single OTP screen (phone + Aadhaar) → verified ✓ → proceed</div>

<div class="flow-label">Flow 2 — AI KYC with Fallback</div>
<div class="flow">Facial verify step → [AI attempt]
  → success: proceed
  → failure: "Verification didn't work — try video KYC instead"
  → video KYC slot booked → proceed</div>

<div class="flow-label">Flow 3 — Review Screen</div>
<div class="flow">All P0 steps complete → Review (name, DOB, PAN, Aadhaar last 4, address, photo) → Submit</div>

<hr/>

<h2>Risks &amp; Open Questions</h2>

<div class="risk">
  <span class="risk-badge risk-known">Known</span>
  <p><strong>Aadhaar OTP + phone OTP simultaneous:</strong> UIDAI does not allow a single OTP to satisfy both. "One OTP" is the phone OTP; Aadhaar remains separate. The win is UX sequencing and fewer screens, not one OTP total.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-known">Known</span>
  <p><strong>Name mismatch (PAN vs. Aadhaar):</strong> Common for married name changes and transliteration differences. Flag mismatch, let user proceed with a note — do not hard-block.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-open">Open</span>
  <p><strong>DigiLocker integration scope:</strong> Does Jupiter / Federal Bank already have a DigiLocker agreement? If not, this is a compliance procurement task, not just engineering — must confirm before P0 timeline commitment.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-open">Open</span>
  <p><strong>Current AI KYC failure rate:</strong> Without this baseline, we cannot set a meaningful target for fallback usage. Confirm with data eng before sprint planning.</p>
</div>

<hr/>

<h2>Rollout Plan</h2>

<div class="phase">
  <span class="phase-badge">Phase 1</span>
  <div class="phase-content">
    <p class="phase-title">Days 0–30 · 10% of new sign-ups</p>
    <p>Instrument drop-off per step. Decision gate: if completion rate improves ≥8pp and fraud-flag rate is flat, proceed. If guardrails breach, rollback immediately.</p>
  </div>
</div>
<div class="phase">
  <span class="phase-badge">Phase 2</span>
  <div class="phase-content">
    <p class="phase-title">Days 31–60 · 50% rollout</p>
    <p>Activate Aadhaar OCR scan (P1). A/B test consolidated OTP copy vs. control.</p>
  </div>
</div>
<div class="phase">
  <span class="phase-badge">Phase 3</span>
  <div class="phase-content">
    <p class="phase-title">Days 61–90 · 100% rollout</p>
    <p>Evaluate P2 items (Truecaller, progress bar). Instrument video KYC fallback rate for ML team review.</p>
  </div>
</div>

</body>
</html>`;
