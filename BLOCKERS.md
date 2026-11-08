# Blockers — tasks only the operator can complete

The agent stopped at these instead of working around them. None of them may be solved with a fake identity, a disposable account, a CAPTCHA-solving service, or a paid upgrade.

## A. Required before the site can earn anything

### A1. Deploy the site (GitHub Pages or Cloudflare Pages)
- **Why blocked:** no GitHub CLI, no authenticated git remote, no Cloudflare token on this machine. Creating an account or connecting one requires the operator's identity and, for some paths, a CAPTCHA.
- **What the operator does:**
  1. Create a public GitHub repository named `dockfacts` (or any name).
  2. Push this folder (`git remote add origin ...`, `git push -u origin main`).
  3. Settings → Pages → Deploy from a branch → `main` / `/docs`.
  4. Edit `site.config.json`: set `baseUrl` to `https://<username>.github.io/dockfacts` and `repoUrl` to the repository URL.
  5. Run `npm run build` and commit the regenerated `docs/`.
- **After that:** the site is public at the Pages URL; the sitemap is live at `/sitemap.xml`.

### A2. Amazon Associates account and tracking ID
- **Why blocked:** the signup requires a real identity, a tax interview, and payment details. The agent cannot and must not complete it.
- **What the operator does:**
  1. Apply at <https://affiliate-program.amazon.com/> using the deployed site URL.
  2. Read the operating agreement and the disclosure requirements.
  3. Put the approved tracking ID in `affiliate_ids.json` → `programs.amazon_us.id`, set `enabled: true`.
  4. Add the ASIN for each product in `affiliate_ids.json` → `products.*.asin`.
  5. Run `npm run check:affiliate`, then `npm run build`.
- **Do not guess an ASIN or reuse another publisher's tag.** A wrong ASIN sends readers to the wrong product; a borrowed tag is a terms violation.

### A3. Google Search Console
- **Why blocked:** verification requires the operator's Google account and, depending on the method, DNS or HTML-file access.
- **What the operator does:** add the property, verify it, submit `https://<username>.github.io/dockfacts/sitemap.xml`.
- **Until then:** no impressions, queries, or clicks data exists. The weekly review must say "not available" rather than invent numbers.

### A4. Affiliate program decisions beyond Amazon
- **Why blocked:** each program has its own application, terms, cookie window, and disclosure requirements. Joining or accepting terms is a legal act for the operator.
- **Candidates to evaluate (not applications the agent can submit):** B&H Photo, Adorama, Impact/PartnerStack-hosted hardware programs, and direct programs from dock makers. Add a program to `affiliate_ids.json` only after reading its terms.
- **Rule:** if a program forbids AI-generated content, coupon use, or price claims, do not join it with this site. Record the conflict in this file.

## B. Optional, and deliberately not done

### B1. Custom domain
Costs money and requires registration. Not needed for launch; the free `github.io` subdomain is fine. If purchased later, update `baseUrl` and rebuild.

### B2. Analytics
No account has been created. If added, it must be privacy-friendly, disclosed on `/privacy/`, and free. A service that requires a credit card is out of budget.

### B3. Email capture / newsletter
Requires a service account, usually a mailing address and sometimes a card. Not part of the $0 plan. The free checklist can ship without email capture.

### B4. Gumroad product
Requires an account and payout details. Possible Phase 3 option, but not required; the free checklist is the default lead magnet.

### B5. Contact email
The operator has not supplied a monitored address. The site currently points to the repository issue tracker. Supply an address if you want one published.

## C. Content questions the agent will not guess

- **Prices:** never invented. Only list prices visible on a vendor page and dated in the article; otherwise "check current price".
- **Benchmarks:** no hands-on numbers are available, so none are published.
- **Compatibility:** if a vendor does not document macOS dual-display support, the product is not recommended for dual displays, even if a retailer claims it works.
- **Affiliate terms:** if a program's terms are unclear, the program is not activated.

## Status log

| Date | Blocker | Status |
| --- | --- | --- |
| 2026-11-08 | A1 deploy | Open — waiting on operator |
| 2026-11-08 | A2 Amazon | Open — application not submitted |
| 2026-11-08 | A3 Search Console | Open — no property |
| 2026-11-08 | B1–B5 | Deliberately deferred |
