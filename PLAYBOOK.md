# DockFacts playbook

This is the operating manual for the daily and weekly routine. If something here conflicts with a platform's terms or the operator's instructions, stop and ask.

## Non-negotiables

1. **$0 budget.** No paid tool, domain, hosting, analytics, email, or promotion. If a free tier asks for a card, stop.
2. **No invented facts.** Every spec, price, compatibility claim, and quote must trace to a source checked that day.
3. **No hands-on claims.** We did not unbox or benchmark the hardware. Never write "we tested", "in our testing", "after a week with", or a star rating.
4. **No fake reviews, testimonials, or personas.** The author is the DockFacts Research Desk, disclosed as AI-assisted.
5. **Disclosure on every article.** The inline affiliate note is rendered by the template; the `/affiliate-disclosure/` page must stay accurate.
6. **Two published articles per day maximum.** Drafts do not count, but do not stockpile twenty near-identical pages either.
7. **Stop at CAPTCHA / ID / payment.** Log it in `BLOCKERS.md`; do not create a workaround account.

## Daily routine (target: 60–90 minutes of agent work)

### 0. Open the ledger
- Read `content-plan.md` and pick the next `queued` topic with intent.
- Note today's date. All source checks use it.

### 1. Research before writing
Record each source in `data/source-log.csv` as you go:
`date,article,source_url,claim_checked,checked_by`

Source hierarchy:
1. **Apple** tech specs and support pages for the host Mac: display count, resolution, refresh, DSC, port standard, charging.
2. **The manufacturer's own product page, manual, or knowledge base** for the product: ports, displays, charging, Ethernet, USB generations.
3. **Standards bodies** (USB-IF, VESA, Intel) for bandwidth and protocol rules.
4. **Vendor technical notes** for platform quirks macOS does not document (label them as vendor notes).

If a claim cannot be traced to one of those, cut it. If two sources conflict, say so in the article or drop the product.

### 2. Draft from the template
Create a draft:

```bash
npm run new -- "Working title" "Buying guide"
```

The script writes a `draft: true` file with the required front matter. While `draft: true`, the page is excluded from the build, sitemap, and feed.

Article shape:
- Opening: the specific configuration question and the short answer.
- Quick picks or quick verdict table (commercial articles).
- "What the host supports" section with Apple source.
- "What to check" section with 2–4 decision rules.
- Picks: one `###` per product, with "best for", verified specs, caveats, and "not for you if".
- Traps / when to spend less.
- Setup or troubleshooting checklist.
- FAQ (3–5 real questions).
- `## Sources` with every URL and "checked <date>".
- Front matter: `description` under 160 characters, `date`, `updated`, `category`, `tags`.

### 3. Fact-check pass
- Read every number aloud against the source tab.
- Check units (Gb/s vs GB/s; 60Hz vs 60fps).
- Check model names (M5 Air vs M4 Air; TS5 vs TS5 Plus).
- Check "up to" language: keep the qualifier.
- Check that any price has a vendor page and a date.
- Remove any sentence that implies physical testing.
- Confirm affiliate product slugs exist in `affiliate_ids.json`.

### 4. Build and inspect
```bash
npm run build
npm run check:affiliate     # expected to fail until IDs are filled
npm run check:links         # every cited source URL must resolve
npm run serve               # http://localhost:8080
```
Look at the page on desktop and a narrow viewport. Check:
- [ ] table scrolls rather than breaks the layout;
- [ ] TOC anchors work;
- [ ] no `[[aff:` tokens or `\|` artifacts in the HTML;
- [ ] disclosure box present;
- [ ] source links open the right pages;
- [ ] no broken internal links (the build fails if there are).

### 5. Publish
- Set `draft: false` (or remove the line).
- Set `updated` to today.
- `npm run build`.
- Commit:
  ```bash
  git add content/articles/<slug>.md docs data/source-log.csv
  git commit -m "Publish: <title>"
  ```
- If the site is deployed, push. If not, the commit is the publish record.

### 6. Update the ledgers (every day, even with no change)
- `costs.md`: add a daily row; cash stays 0.00; inference stays unallocated until the operator exports it.
- `revenue.md`: add a row only when a dashboard confirms an amount; otherwise leave the ledger and update the status date.
- `data/metrics.csv`: add a row with zeros and `source=none` if no analytics exists.
- `content-plan.md`: mark the topic `published` and add the URL slug.

## Weekly routine (Monday)

1. **Traffic:** if Search Console is connected, export impressions, clicks, and top queries for the last 7 and 28 days. If not, write "not available" — do not estimate.
2. **Clicks and revenue:** read each affiliate dashboard. Record confirmed net amounts only.
3. **Update:** pick the page with the most impressions but a low click-through, or the one with the most affiliate clicks. Improve the answer box, the table, or the title. Update `updated` and the source dates.
4. **Prune:** if a page has no impressions after 28 days and no internal links pointing to it, either merge it into a stronger guide or delete it (keep a redirect note in `data/corrections.md`).
5. **Lead magnet:** once there are 5+ guides, ship the free "Mac display limits cheat sheet" as a printable page. No email capture, no Gumroad account, no cost.
6. **Log:** add a short weekly note to `reports/weekly.md` with what changed and why.

## Monthly / day-90 review

At day 30, 60, and 90:
- count published guides and words;
- count indexed pages (Search Console, if available);
- count affiliate clicks and confirmed revenue;
- compare revenue to `costs.md` (cash + allocated inference);
- identify the three pages with any traction and the three with none.

Day-90 decision rules (use whichever the data supports, and say when data is missing):
- **Continue** if revenue covers true costs, or if there is a clear upward trend in impressions/clicks with at least one converting page.
- **Change niche** if the site earns impressions but not buyer clicks, or if the product category cannot be monetised on the available programs.
- **Shut down** if after 90 days there are no impressions, no external links, and no affiliate clicks, and the operator does not want to fund another quarter.

Do not call a niche "profitable" on projections. Do not call it "failed" without checking whether the site was ever deployed and indexed.

## Affiliate workflow

- All IDs and product mappings live in `affiliate_ids.json`. Never hard-code an ID in an article.
- Use `[[aff:product-slug]]` or `[[aff:product-slug|label]]` in Markdown. The build emits `rel="sponsored nofollow noopener"` and `target="_blank"`.
- If a program is disabled or has no ID, the link falls back to the merchant URL and earns nothing. That is intentional.
- Before enabling a program:
  - read its terms (AI content, price claims, disclosure placement, coupon rules);
  - confirm the disclosure page and inline note satisfy them;
  - add the approved ID and ASINs;
  - run `npm run check:affiliate`.
- Never use another publisher's tag, a link shortener that hides the destination, or a fake "coupon" page.

## Editorial language rules

| Do not write | Write instead |
| --- | --- |
| "We tested this dock for a month." | "The vendor lists …" / "Apple documents …" |
| "It's the fastest dock." | "It has an 80Gb/s Thunderbolt 5 host link, per the vendor." |
| "Works with any Mac." | "Works with Thunderbolt 4 and 5 hosts, per the vendor." |
| "Best value at $299." | "Listed at $299 on the vendor page on 8 Nov 2026." |
| "This is the best dock, period." | "Best for a two-HDMI-monitor desk on an M5 Air, because …" |
| "Reviewers love it." | "The vendor's page cites a review; we have not independently verified it." (Better: omit.) |
| "Set up in minutes." | "The vendor says it is driverless; we did not test the setup." |

## Incident rules

- **Wrong fact found:** fix it, change `updated`, add a row to `data/corrections.md`, rebuild, commit.
- **Product discontinued:** remove the pick or replace it; do not leave a dead affiliate link.
- **Affiliate terms change:** disable the program in `affiliate_ids.json`, rebuild, note it in `BLOCKERS.md` until the operator decides.
- **Site down:** check the host status page; do not migrate hosts without the operator.
- **Payment requested:** stop and log it. The answer is not to pay.
