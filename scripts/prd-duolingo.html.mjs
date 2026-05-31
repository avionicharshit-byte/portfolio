import { styles } from './prd-template.mjs';

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width"/>
<title>Duolingo — Notifications PRD</title>
<style>${styles}</style>
</head>
<body>

<!-- Header -->
<div class="doc-header">
  <div class="doc-tag">Product Requirements Document · Harshit Dev Yadav</div>
  <h1 class="doc-title">Duolingo — Notifications</h1>
  <p class="doc-tagline">Durable habit formation without burning the notification channel.</p>
  <div class="doc-meta">
    <div class="doc-meta-item"><strong>Author</strong> Harshit Dev Yadav</div>
    <div class="doc-meta-item"><strong>Product</strong> Duolingo (Consumer / EdTech)</div>
    <div class="doc-meta-item"><strong>Status</strong> Sample PRD</div>
    <div class="doc-meta-item"><strong>North-star</strong> D30 streak-maintenance rate</div>
  </div>
</div>

<!-- TL;DR callout -->
<div class="callout">
  <div class="callout-label">⚡ TL;DR</div>
  <p><strong>Product:</strong> Duolingo notification / re-engagement system.</p>
  <p><strong>Who:</strong> Streak holders at risk of losing their streak (D3–D30 users). Duolingo has 575M+ total users, 42M MAU. The retention engine runs on streaks.</p>
  <p><strong>Why now:</strong> Notification fatigue is driving opt-outs. Up to 3 push notifications per day for at-risk users. Open rate declining QoQ. When a user opts out, the channel is gone — permanently.</p>
  <p><strong>Launch:</strong> Phased, with frequency-cap guardrail hard-enforced from day one.</p>
</div>

<!-- Metrics -->
<div class="metrics-row">
  <div class="metric-chip">
    <div class="value">575M+</div>
    <div class="label">Total users</div>
  </div>
  <div class="metric-chip">
    <div class="value">~42%</div>
    <div class="label">D30 streak baseline</div>
  </div>
  <div class="metric-chip">
    <div class="value">+8pp</div>
    <div class="label">Target lift (60 days)</div>
  </div>
</div>

<!-- Core insight -->
<div class="callout">
  <div class="callout-label">💡 Core Insight</div>
  <p>More notifications has diminishing returns and a <strong>real downside</strong> — fatigue → opt-out → the channel is lost permanently. When a user opts out, they almost never re-enable in device settings. The goal is <strong>habit retention, not notification volume</strong>. Sending right beats sending more.</p>
</div>

<h2>Background &amp; Problem</h2>
<p>Duolingo's retention engine runs on streaks. Loss aversion kicks in around day 3 and compounds — a 14-day streak is meaningfully more painful to lose than a 1-day streak. But the notification layer that supports streak maintenance is optimising for volume, not habit.</p>
<p><strong>Current state:</strong> Up to 3 push notifications/day for at-risk users. Open rate declining quarter-on-quarter. Opt-out rate creeping up. The system also uses passive-aggressive copy ("These reminders don't seem to be working. We'll stop sending them for now.") — a guilt-trigger that accelerates opt-out without proportional retention lift.</p>
<p><strong>The trust account framing:</strong> A notification opt-out destroys future retention capacity indefinitely. Each poor send is a permanent withdrawal. Sends matched to habit windows build the balance.</p>

<h3>Behavioural Economics at Play</h3>
<ul>
  <li><strong>Loss aversion (Kahneman):</strong> "You'll lose your 14-day streak" outperforms "Keep your 14-day streak" on streak-maintenance specifically</li>
  <li><strong>Variable reward (Skinner):</strong> Unpredictable content variation fights fatigue better than a reliable daily ping</li>
  <li><strong>Implementation intentions (Gollwitzer):</strong> Sends matched to the user's existing practice window increase follow-through vs. batch-job timing</li>
</ul>

<hr/>

<h2>Goals &amp; Non-Goals</h2>

<h3>Goals</h3>
<ul>
  <li>Personalise send-time to each user's historical practice window (ML-timed)</li>
  <li>Hard frequency cap: max 1 notification/day, 5/week, enforced at send layer</li>
  <li>Streak-loss-aversion copy: message references specific streak length and names the loss</li>
  <li>Content variation pool (min 6 variants per scenario) to fight repetition fatigue</li>
  <li>Lesson-completion suppression: no notification if lesson done that day</li>
  <li>Instrument per-notification opt-out rate and D30 streak-maintenance lift</li>
</ul>

<h3>Non-Goals</h3>
<ul>
  <li>New lesson types or content changes</li>
  <li>Changes to streak-freeze or streak-repair mechanics</li>
  <li>Changes to the lesson engine or scoring</li>
  <li>Paid-tier or Super Duolingo changes</li>
  <li>Win-back campaigns for users who have already uninstalled</li>
  <li>Email or in-app notification redesign (separate surface)</li>
</ul>

<hr/>

<h2>User Stories / JTBD</h2>
<ul>
  <li><em>When I'm at risk of losing a streak I care about, I want a reminder that feels personal so I act on it.</em></li>
  <li><em>When I've already done my lesson today, I don't want to receive a notification.</em></li>
  <li><em>When I've been nagged three days in a row with the same message, I want to turn off notifications — and then I do.</em></li>
  <li><em>When I get a passive-aggressive guilt notification, I feel manipulated and consider uninstalling.</em></li>
</ul>

<hr/>

<h2>Functional Requirements</h2>

<div class="priority-block p0">
  <div class="priority-label">P0 — Must Ship</div>
  <ul>
    <li>ML send-time personalisation: model each user's practice window (time-of-day + day-of-week); send within ±1h of that window</li>
    <li>Hard frequency cap: max 1/day, 5/week — enforced at send layer (not application layer), zero exceptions</li>
    <li>Streak-aware copy: message references specific streak length ("Your 14-day streak is at risk") — no generic copy</li>
    <li>Lesson-completion suppression: if lesson completed in past 12h, suppress all sends for that day</li>
    <li>Content variation: min 6 copy variants per send scenario; same variant not shown twice consecutively</li>
  </ul>
</div>

<div class="priority-block p1">
  <div class="priority-label">P1 — Should Ship</div>
  <ul>
    <li>Loss-framing A/B test: "You'll lose your 14-day streak" vs. "Keep your 14-day streak" — measured on D7 retention, not open rate</li>
    <li>Per-user opt-out rate monitoring dashboard (ops-facing, daily refresh)</li>
    <li>Retire the passive-aggressive notification type entirely</li>
  </ul>
</div>

<div class="priority-block p2">
  <div class="priority-label">P2 — Nice to Have</div>
  <ul>
    <li>Cross-channel coordination: suppress push if email was opened same-day</li>
    <li>Streak-milestone celebration (7, 30, 100 days) with variable reward (collectible badge teaser)</li>
    <li>Smart re-permission prompt for users who opted out &gt;30 days ago</li>
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
      <td><strong>Send-time personalisation</strong><br/>≥80% of sends occur within the user's historical ±1h practice window</td>
      <td><span class="pass-fail">Measurable from send logs</span></td>
    </tr>
    <tr>
      <td><strong>Frequency cap</strong><br/>No user receives &gt;1 notification in any 24h window</td>
      <td><span class="pass-fail">Enforced at send layer, query-verifiable</span></td>
    </tr>
    <tr>
      <td><strong>Copy specificity</strong><br/>100% of notifications reference the user's actual streak count</td>
      <td><span class="pass-fail">Zero generic-copy sends in production</span></td>
    </tr>
    <tr>
      <td><strong>Lesson suppression</strong><br/>0 notifications sent to users who completed a lesson in the past 12h</td>
      <td><span class="pass-fail">Join send log + lesson log, count violations</span></td>
    </tr>
  </tbody>
</table>

<hr/>

<h2>Success Metrics</h2>

<div class="north-star">
  <div class="ns-label">⭐ North-Star Metric</div>
  <div class="ns-metric">D30 streak-maintenance rate for notified users</div>
  <div class="ns-target">Baseline ~42% → Target ~50% (+8pp) in 60 days</div>
  <div class="guardrails">
    <p><strong>Guardrails (must not worsen):</strong></p>
    <p>Notification opt-out rate · App uninstall rate (D7) · Per-user frequency (hard cap, zero exceptions)</p>
    <p style="margin-top:8px;"><strong>We are NOT measuring:</strong> Open rate · Click-through rate · Total sends</p>
  </div>
</div>

<hr/>

<h2>Wireframes / User Flows</h2>

<div class="flow-label">Flow 1 — Send-time Personalisation</div>
<div class="flow">User completes lesson [timestamp logged]
→ ML model updates practice window
→ next-day send queued within ±1h window
→ lesson-completion check at send time
→ send or suppress</div>

<div class="flow-label">Flow 2 — Loss-framing Notification</div>
<div class="flow">Copy: "Your [N]-day streak ends at midnight. 3 minutes to keep it."
→ tap → lesson opens at next lesson in sequence
→ completion suppresses all sends for that day</div>

<div class="flow-label">Flow 3 — Content Variation Rotation</div>
<div class="flow">6+ variants per scenario
→ variant assignment avoids consecutive repeats
→ fatigue score tracked per user
→ copy refresh triggered when all variants exhausted</div>

<hr/>

<h2>Risks &amp; Open Questions</h2>

<div class="risk">
  <span class="risk-badge risk-known">Known</span>
  <p><strong>ML cold-start:</strong> New users have no historical practice window. Default to 8pm local time for first 7 days; personalise after 3+ data points.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-known">Known</span>
  <p><strong>Loss vs. gain framing:</strong> Loss framing increases streak maintenance short-term but may increase opt-outs for users who find it manipulative. Do not ship at 100% without A/B data — the test resolves this.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-known">Known</span>
  <p><strong>Passive-aggressive notification retirement:</strong> This type has non-zero CTR because guilt works short-term. Removing it will show a short-term CTR dip. Track D30 opt-out rate, not CTR, as the signal.</p>
</div>
<div class="risk">
  <span class="risk-badge risk-open">Open</span>
  <p><strong>Lesson-completion timestamp granularity:</strong> Does the current data pipeline log lesson completions with sub-1h granularity? Required for same-day suppression. Confirm with data eng before P0 commit.</p>
</div>

<hr/>

<h2>Rollout Plan</h2>

<div class="phase">
  <span class="phase-badge">Phase 1</span>
  <div class="phase-content">
    <p class="phase-title">Days 0–14 · 5% of D3–D30 streak holders</p>
    <p>Instrument opt-out rate + streak maintenance. Frequency cap hard-enforced. Decision gate: opt-out rate flat or declining and D7 retention flat or improving → proceed.</p>
  </div>
</div>
<div class="phase">
  <span class="phase-badge">Phase 2</span>
  <div class="phase-content">
    <p class="phase-title">Days 15–30 · 25% rollout</p>
    <p>Activate loss-framing A/B test. Lesson-completion suppression ships. Passive-aggressive notification retired for all users in cohort.</p>
  </div>
</div>
<div class="phase">
  <span class="phase-badge">Phase 3</span>
  <div class="phase-content">
    <p class="phase-title">Days 31–60 · 100% rollout</p>
    <p>Lock copy variation pool with content team sign-off. Evaluate P2 items. D30 retention measurement window opens.</p>
  </div>
</div>

</body>
</html>`;
