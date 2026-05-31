export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --paper: #FAF8F4;
    --ink: #0D0D0D;
    --ink-2: #3A3A3A;
    --muted: #6B6B6B;
    --accent: #1B3BFF;
    --rule: #E2DED8;
    --p0-bg: #EFF6FF;
    --p0-border: #BFDBFE;
    --p0-text: #1E40AF;
    --p1-bg: #FFFBEB;
    --p1-border: #FDE68A;
    --p1-text: #92400E;
    --p2-bg: #F9FAFB;
    --p2-border: #E5E7EB;
    --p2-text: #4B5563;
    --callout-bg: #F0EDE8;
    --metric-bg: #EFF6FF;
  }

  html { background: var(--paper); color: var(--ink); }

  body {
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 11.5px;
    line-height: 1.7;
    background: var(--paper);
    color: var(--ink-2);
    padding: 48px 56px;
    max-width: 800px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .doc-header {
    border-bottom: 2px solid var(--ink);
    padding-bottom: 24px;
    margin-bottom: 36px;
  }
  .doc-tag {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 10px;
  }
  .doc-title {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .doc-tagline {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 16px;
  }
  .doc-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .doc-meta-item { font-size: 10px; color: var(--muted); }
  .doc-meta-item strong { color: var(--ink); font-weight: 500; }

  /* ── Callout blocks ── */
  .callout {
    background: var(--callout-bg);
    border-left: 3px solid var(--accent);
    border-radius: 4px;
    padding: 14px 18px;
    margin: 20px 0;
  }
  .callout-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 6px;
  }
  .callout p { font-size: 11.5px; color: var(--ink); line-height: 1.65; margin: 0; }
  .callout p + p { margin-top: 6px; }

  /* ── Metric chips ── */
  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 20px 0;
  }
  .metric-chip {
    background: var(--metric-bg);
    border: 1px solid var(--p0-border);
    border-radius: 4px;
    padding: 12px 14px;
  }
  .metric-chip .value {
    font-family: 'DM Mono', monospace;
    font-size: 20px;
    font-weight: 500;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 4px;
  }
  .metric-chip .label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── Section headings ── */
  h2 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-top: 36px;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--rule);
  }
  h3 {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--ink);
    margin-top: 18px;
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }

  p { margin-bottom: 10px; color: var(--ink-2); font-size: 11.5px; line-height: 1.7; }

  /* ── Lists ── */
  ul { list-style: none; padding: 0; margin-bottom: 12px; }
  ul li {
    padding-left: 16px;
    position: relative;
    margin-bottom: 5px;
    font-size: 11.5px;
    color: var(--ink-2);
    line-height: 1.6;
  }
  ul li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }

  ol { padding-left: 18px; margin-bottom: 12px; }
  ol li { margin-bottom: 5px; font-size: 11.5px; color: var(--ink-2); line-height: 1.6; }

  strong { color: var(--ink); font-weight: 600; }
  em { font-style: italic; }

  /* ── Priority blocks ── */
  .priority-block {
    border-radius: 4px;
    padding: 14px 16px;
    margin-bottom: 10px;
  }
  .priority-block.p0 { background: var(--p0-bg); border: 1px solid var(--p0-border); }
  .priority-block.p1 { background: var(--p1-bg); border: 1px solid var(--p1-border); }
  .priority-block.p2 { background: var(--p2-bg); border: 1px solid var(--p2-border); }
  .priority-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .p0 .priority-label { color: var(--p0-text); }
  .p1 .priority-label { color: var(--p1-text); }
  .p2 .priority-label { color: var(--p2-text); }
  .priority-block ul { margin: 0; }
  .priority-block li::before { color: inherit; opacity: 0.6; }

  /* ── Table ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 10.5px;
  }
  th {
    background: var(--ink);
    color: var(--paper);
    padding: 8px 12px;
    text-align: left;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 500;
  }
  td {
    padding: 9px 12px;
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
    line-height: 1.55;
    color: var(--ink-2);
  }
  tr:nth-child(even) td { background: #F5F2ED; }
  tr:last-child td { border-bottom: none; }
  .pass-fail {
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--accent);
  }

  /* ── North star metric ── */
  .north-star {
    background: var(--ink);
    color: var(--paper);
    border-radius: 4px;
    padding: 16px 18px;
    margin: 16px 0;
  }
  .north-star .ns-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8B93C0;
    margin-bottom: 6px;
  }
  .north-star .ns-metric {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .north-star .ns-target {
    font-size: 10.5px;
    color: #C0C7E8;
  }
  .guardrails { margin-top: 12px; }
  .guardrails p { font-size: 10.5px; color: #C0C7E8; margin: 0; }
  .guardrails p strong { color: #fff; }

  /* ── Rollout phase ── */
  .phase {
    display: flex;
    gap: 14px;
    margin-bottom: 12px;
    align-items: flex-start;
  }
  .phase-badge {
    flex-shrink: 0;
    background: var(--accent);
    color: white;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 3px;
    margin-top: 2px;
  }
  .phase-content p { margin: 0; font-size: 11px; }
  .phase-content .phase-title { color: var(--ink); font-weight: 600; margin-bottom: 3px; }

  /* ── Flow diagram ── */
  .flow {
    background: var(--callout-bg);
    border: 1px solid var(--rule);
    border-radius: 4px;
    padding: 12px 16px;
    margin: 10px 0;
    font-size: 10.5px;
    color: var(--ink);
    line-height: 1.8;
    font-family: 'DM Mono', monospace;
  }
  .flow-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
    margin-bottom: 4px;
  }

  /* ── Divider ── */
  hr { border: none; border-top: 1px solid var(--rule); margin: 28px 0; }

  /* ── Risk tag ── */
  .risk { display: flex; gap: 10px; margin-bottom: 10px; }
  .risk-badge {
    flex-shrink: 0;
    font-size: 8px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
    padding: 3px 7px;
    border-radius: 3px;
    margin-top: 2px;
  }
  .risk-open { background: #FEF3C7; color: #92400E; }
  .risk-known { background: #FEE2E2; color: #991B1B; }
  .risk p { margin: 0; font-size: 11px; line-height: 1.55; }

  /* ── Print ── */
  @media print {
    body { padding: 0; }
    h2 { page-break-after: avoid; }
    .priority-block, .callout, table { page-break-inside: avoid; }
  }
`;
