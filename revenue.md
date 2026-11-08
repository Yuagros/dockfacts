# Revenue

All amounts in USD, net of payment-processor and affiliate-network fees where known.

## Status as of 2026-11-08

**$0.00 confirmed.** This is not a disappointing month; it is day one. The site is built but not deployed, no affiliate program is active, and `affiliate_ids.json` contains empty IDs. There is no traffic to monetise yet, and no dashboard to read.

## Ledger

| Date | Source | Gross | Fees | Net | Evidence |
| --- | --- | ---: | ---: | ---: | --- |
| 2026-11-08 | No active source | 0.00 | 0.00 | 0.00 | No affiliate account connected; site not public |
| **Total** | | **0.00** | **0.00** | **0.00** | |

## Pipeline (not revenue)

| Item | Status | Blocker |
| --- | --- | --- |
| Amazon Associates (US) | Not applied | Account, tax interview, and payment details are the operator's to complete |
| GitHub Pages deployment | Not deployed | No authenticated GitHub account or repository on this machine |
| Google Search Console | Not connected | Needs the live URL and operator verification |
| Free checklist lead magnet | Planned | No account needed; can ship as a static page |
| Gumroad product | Not planned yet | Gumroad requires an account and payout details; possible Phase 3 option only if the operator wants it |

## How revenue will be recorded

1. Affiliate dashboards report clicks, orders, and commissions with a delay (often 24–72 hours; Amazon pays out on a separate schedule).
2. Record **net** commission in this file on the day it is reported, with the program and reporting period in `Evidence`.
3. Do not record "pending" or estimated commissions as revenue. Use a separate `Pipeline` line until the network confirms the amount.
4. If a sale is reversed, add a negative row. Do not edit history.
5. Reconcile the monthly total against the affiliate dashboard export before the day-90 report.

## Day-90 test

Revenue will be compared with the true cost in `costs.md` (cash + allocated inference). If inference remains unallocated, the report will say so explicitly and will not claim break-even.
