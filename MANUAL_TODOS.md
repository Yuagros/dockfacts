# Manual to-dos — operator only

These are the tasks the agent cannot do: account creation, identity, tax/payment details, and deploying to an account the agent does not control. Everything here is free. Work in this order.

Project folder:

```text
C:\Users\mink\Desktop\Main Things\Projects\YS\dockfacts
```

Open PowerShell in that folder before running commands:

```powershell
cd "C:\Users\mink\Desktop\Main Things\Projects\YS\dockfacts"
```

---

## 1. Deploy to GitHub Pages (about 15 minutes)

### 1.1 Create the repository

1. Sign in at <https://github.com> (create a free account if needed).
2. Go to <https://github.com/new>.
3. Repository name: **`dockfacts`**.
4. Visibility: **Public**. GitHub Pages on a free account needs a public repository.
5. Do **not** add a README, .gitignore, or license — this folder already has them.
6. Click **Create repository**.

### 1.2 Put your real URL in the config

Edit [site.config.json](site.config.json) in Notepad:

```powershell
notepad site.config.json
```

Replace both placeholders. Use your **lowercase** GitHub username and no trailing slash:

```json
"baseUrl": "https://YOURNAME.github.io/dockfacts",
"repoUrl": "https://github.com/YOURNAME/dockfacts",
```

If you named the repository something other than `dockfacts`, change both paths to match. Keep the two values consistent.

### 1.3 Set your Git identity (optional but recommended)

The repo currently commits as `DockSpec Agent <agent@localhost>`. Set your own:

```powershell
git config user.name "Your Name"
git config user.email "you@example.com"
```

### 1.4 Build and commit the production URLs

```powershell
node build.js
node check-links.js
git add -A
git commit -m "Configure production URL"
```

The build warning about `YOUR-USERNAME` should disappear. If it does not, the config still has a placeholder.

### 1.5 Push

```powershell
git remote add origin https://github.com/YOURNAME/dockfacts.git
git push -u origin main
```

If Git says the remote already exists, use `git remote set-url origin ...` instead.

**Authentication:** GitHub no longer accepts your account password on the command line. If a browser window opens, sign in there. If Git asks for a password, create a fine-grained personal access token with **Contents: Read and write** for this repository and paste the token as the password. Do not send the token to anyone.

If command-line Git is painful, install **GitHub Desktop**, choose *Add local repository*, select this folder, and publish it. That is still free and uses your browser login.

### 1.6 Turn on Pages

In the repository:

1. **Settings** → **Pages**.
2. **Build and deployment** → Source: **Deploy from a branch**.
3. Branch: **main**, folder: **/docs**.
4. **Save**.
5. Wait 1–3 minutes.

### 1.7 Verify

Open these and confirm they load over HTTPS:

- `https://YOURNAME.github.io/dockfacts/`
- `https://YOURNAME.github.io/dockfacts/articles/best-dock-for-macbook-air-m5-dual-monitors/`
- `https://YOURNAME.github.io/dockfacts/sitemap.xml`
- `https://YOURNAME.github.io/dockfacts/robots.txt`

In the page source, confirm `<link rel="canonical" href="https://YOURNAME.github.io/dockfacts/...">` uses your real URL.

Do not submit the sitemap until these pages are live.

---

## 2. Google Search Console (about 10 minutes)

1. Go to <https://search.google.com/search-console>.
2. **Add property** → **URL prefix** → enter:
   `https://YOURNAME.github.io/dockfacts/`
3. Choose **HTML tag** verification. Copy only the value inside `content="..."` — not the whole tag.
4. Put it in [site.config.json](site.config.json):

```json
"googleSiteVerification": "PASTE_TOKEN_HERE",
```

5. Rebuild and push:

```powershell
node build.js
git add -A
git commit -m "Add Search Console verification"
git push
```

6. Wait for Pages to redeploy (1–3 minutes), then click **Verify** in Search Console.
7. Open **Sitemaps** and submit:
   `https://YOURNAME.github.io/dockfacts/sitemap.xml`
8. Optional: use **URL Inspection** on the home page and the two published articles, then **Request indexing**.

Indexing is not instant. Check again in 3–7 days. Do not buy traffic or links.

Do **not** use the HTML-file verification method: `node build.js` regenerates `docs/` and would delete the file.

---

## 3. Amazon Associates (application now, links after approval)

Apply only after the site is live and the disclosure page is reachable.

1. Go to <https://affiliate-program.amazon.com/> and sign in with your Amazon account.
2. Add your website:
   - URL: `https://YOURNAME.github.io/dockfacts/`
   - Description: “Independent, spec-verified guides to Mac docking stations and multi-display setups. Original comparisons, dated sources, and a visible affiliate disclosure.”
   - Disclosure page: `https://YOURNAME.github.io/dockfacts/affiliate-disclosure/`
3. Complete the tax interview and payment details. This is why the agent stopped: it requires your identity and tax information.
4. Wait for approval. Amazon may approve provisionally and review the account after sales. Approval is not guaranteed for a new site.
5. When approved, copy your **Tracking ID** (often `yourname-20`).

### 3.1 Activate the program

Edit [affiliate_ids.json](affiliate_ids.json):

```json
"amazon_us": {
  "enabled": true,
  "id": "your-tracking-id-20",
  ...
}
```

Do not enable it before approval. Do not use anyone else's tag.

### 3.2 Add ASINs for the products the articles actually use

The build only requires ASINs for products referenced in published or draft articles:

| Product key | Product | Where to find it |
| --- | --- | --- |
| `caldigit-ts5` | CalDigit TS5 | Amazon search for the exact model |
| `caldigit-ts5-plus` | CalDigit TS5 Plus | Amazon search for the exact model |
| `caldigit-ts4` | CalDigit TS4 | Amazon search for the exact model |
| `plugable-tbt-udh2` | Plugable TBT-UDH2 | Amazon search for the exact model |
| `anker-555` | Anker 555 USB-C Hub (8-in-1) | Amazon search for the exact model |

For each one:

1. Open the exact product page on Amazon US.
2. Confirm the title and model match (TS5, TS5 Plus, and TS4 are different products; do not substitute).
3. Copy the 10-character ASIN from the `/dp/ASIN` part of the URL.
4. Paste it into the product's `"asin"` field.

If the exact model is not sold on Amazon, or the listing is a bundle or different variant, **leave `asin` empty**. The article will keep using the vendor's plain link. Do not guess.

### 3.3 Build, check, commit

```powershell
node build.js
node build.js --check-affiliate
node check-links.js
git add -A
git commit -m "Activate Amazon affiliate links"
git push
```

Expected result from `check:affiliate`:

```text
active programs: amazon_us (Amazon Associates (US))
products missing ASIN: none
verdict: ready to earn
```

If a product is missing an ASIN, the check fails and lists it. Fix that product or remove it from the article before publishing.

### 3.4 Read the terms

At minimum, confirm the operating agreement’s rules on disclosure, prices, coupons, and trademark use. The site already carries an inline disclosure and the `/affiliate-disclosure/` page. If a term conflicts with the site, disable the program and log it.

If Amazon rejects the application, note the reason in [BLOCKERS.md](BLOCKERS.md). Do not open a second account.

---

## 4. Optional, not required to launch

- **Custom domain:** costs money; skip until there is revenue. If you buy one later, update `baseUrl` and rebuild.
- **Analytics:** a free privacy-friendly account (for example GoatCounter or Cloudflare Web Analytics) requires signup and a privacy-page update. The site currently sets no cookies and has no tracking.
- **Contact email:** supply a monitored address if you want one published. There is no contact form.
- **Gumroad product:** requires an account and payout details. The free checklist is already live and needs none.

---

## 5. Publishing after deployment

The agent can re-check and publish the queued drafts on the daily schedule. If you want to do it manually:

1. Open the draft in `content/articles/`.
2. Re-check every vendor source and update the “checked” dates.
3. Change `draft: true` to `draft: false` and set `date`/`updated` to today.
4. Run:

```powershell
node build.js
node check-links.js
git add -A
git commit -m "Publish: <title>"
git push
```

5. Publish at most 2 articles per day.

Current queue:

1. CalDigit TS5 vs TS5 Plus
2. CalDigit TS4 vs TS5
3. Plugable TBT-UDH2 vs CalDigit TS5

Do not publish a draft without re-checking it; prices and product pages change.

---

## 6. What not to do

- Do not pay for hosting, a theme, analytics, email, traffic, links, or reviews.
- Do not invent an ASIN, tracking ID, spec, price, or review.
- Do not deploy before setting `baseUrl`.
- Do not submit the sitemap before the site is live.
- Do not expect indexing or revenue within days.
- Do not join a program whose terms conflict with the site.
- Do not paste API keys or tokens into the repository.

---

## 7. When you are done

Reply with:

- the live site URL;
- Amazon status: not applied / pending / approved / rejected;
- Search Console: verified yes/no;
- any point where a CAPTCHA, ID check, or payment step stopped you.

The agent can then confirm the production build, enable the affiliate links, run the checks, and continue the daily publishing routine.
