# Costs

All amounts in USD. The project budget is **$0.00**. Nothing on this site requires a paid service, and no paid service has been purchased.

## Cash ledger

| Date | Item | Amount | Payment | Note |
| --- | --- | ---: | --- | --- |
| 2026-11-08 | Static hosting (GitHub Pages) | 0.00 | — | Free tier; site is built but not yet deployed |
| 2026-11-08 | Domain | 0.00 | — | Using a `github.io` subdomain; no domain purchased |
| 2026-11-08 | Tooling (Node.js, git, Edge) | 0.00 | — | Already installed on the operator's machine |
| 2026-11-08 | Fonts, CSS, build system | 0.00 | — | System fonts; zero-dependency Node build |
| **Total cash** | | **0.00** | | |

## Inference (API) ledger

The agent's model calls are billed to the operator's DeepSeek account, not to a project card. The harness does not expose per-session token counts or an invoice inside the session, so the inference line is **unallocated** until the operator exports the figure from the provider dashboard.

| Date | Work | Tokens | USD | Basis |
| --- | --- | ---: | ---: | --- |
| 2026-11-08 | Niche selection, source research, site build, 2 articles | not exposed | unallocated | Billed to the operator's DeepSeek account. Export the month-to-date figure from the provider dashboard and enter it here. |

**Do not invent an API cost.** If the figure cannot be obtained, report revenue against $0.00 cash and state that inference is unallocated. A break-even claim without the real inference number is not a break-even claim.

## Break-even

```
true cost       = cash spend + allocated inference
break-even      = affiliate revenue (net of fees) >= true cost
cash break-even = affiliate revenue (net of fees) >= $0.00  (already true)
```

At launch, cash break-even is trivially met. The meaningful question at day 90 is whether net affiliate revenue covers the inference bill. That requires the operator's provider export.

## Rules

- No paid hosting, domains, themes, plugins, analytics, email, or AI subscriptions may be charged to this project.
- Free tiers only. If a free tier starts requiring a card, stop and log it in `BLOCKERS.md`.
- Do not buy traffic, links, reviews, or social promotion.
- Record costs on the day they occur, even if the amount is $0.00.

## Daily log

| Date | Cash added | Inference added | Notes |
| --- | ---: | ---: | --- |
| 2026-11-08 | 0.00 | unallocated | Day 1: build + 2 published guides |
