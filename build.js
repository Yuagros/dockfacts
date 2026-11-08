#!/usr/bin/env node
/**
 * DockFacts static site generator.
 * Zero dependencies. Markdown in content/, HTML out to docs/.
 *
 * Usage:
 *   node build.js                 build, warn about unconfigured affiliate programs
 *   node build.js --strict        treat warnings as errors
 *   node build.js --check-affiliate  report affiliate readiness and exit non-zero if not ready
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'docs');
const ARGS = new Set(process.argv.slice(2));
const STRICT = ARGS.has('--strict');
const CHECK_AFF = ARGS.has('--check-affiliate');

const site = readJson(path.join(ROOT, 'site.config.json'));
const aff = readJson(path.join(ROOT, 'affiliate_ids.json'));

const warnings = [];
const errors = [];
const counts = { tagged: 0, plain: 0, untagged: 0 };

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Cannot read ${file}: ${err.message}`);
    process.exit(1);
  }
}

function warn(msg) {
  warnings.push(msg);
}

function error(msg) {
  errors.push(msg);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });
}

function rootPrefix(relPath) {
  const dir = path.posix.dirname(relPath.split(path.sep).join('/'));
  if (dir === '.' || dir === '') return './';
  return '../'.repeat(dir.split('/').length);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(relPath, contents) {
  const full = path.join(OUT, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, contents, 'utf8');
}

function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ */
/* Front matter + collection loading                                  */
/* ------------------------------------------------------------------ */

function parseFrontMatter(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) return { data: {}, body: text };
  const end = text.indexOf('\n---', 4);
  if (end === -1) return { data: {}, body: text };
  const block = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n+/, '');
  const data = {};
  for (const line of block.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    data[key] = value;
  }
  return { data, body };
}

function loadCollection(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, body } = parseFrontMatter(raw);
      return {
        ...data,
        slug: data.slug || file.replace(/\.md$/, ''),
        body,
        file
      };
    });
}

/* ------------------------------------------------------------------ */
/* Affiliate links                                                    */
/* ------------------------------------------------------------------ */

function affiliateUrl(slug) {
  const product = aff.products && aff.products[slug];
  if (!product) {
    error(`affiliate_ids.json has no product "${slug}"`);
    return { url: '#', status: 'missing' };
  }
  const program = aff.programs && aff.programs[product.program];
  if (!program) {
    error(`product "${slug}" points at unknown program "${product.program}"`);
    return { url: product.fallbackUrl, status: 'missing' };
  }
  if (program.enabled && program.id) {
    if (!product.asin) {
      warn(`"${slug}" is in an active program but has no ASIN; using plain link`);
      return { url: product.fallbackUrl, status: 'untagged' };
    }
    const url = program.urlTemplate
      .replace('{asin}', encodeURIComponent(product.asin))
      .replace('{id}', encodeURIComponent(program.id));
    counts.tagged += 1;
    return { url, status: 'tagged' };
  }
  counts.plain += 1;
  return { url: product.fallbackUrl, status: 'plain' };
}

function affLink(slug, label) {
  const { url, status } = affiliateUrl(slug);
  const product = (aff.products && aff.products[slug]) || {};
  const text = label || escapeHtml(product.name || slug);
  const safeUrl = /^https?:\/\//i.test(url) ? url : '#';
  const rel = status === 'tagged' ? 'sponsored nofollow noopener' : 'noopener';
  return `<a class="aff-link" href="${escapeHtml(safeUrl)}" rel="${rel}" target="_blank" data-product="${escapeHtml(slug)}" data-aff="${status}">${text}</a>`;
}

/* ------------------------------------------------------------------ */
/* Markdown                                                           */
/* ------------------------------------------------------------------ */

function renderInline(text, ctx) {
  let out = escapeHtml(text);
  const codes = [];
  out = out.replace(/`([^`]+)`/g, (m, code) => {
    codes.push(code);
    return `\u0000C${codes.length - 1}\u0000`;
  });

  // A pipe inside a Markdown table cell is escaped as \| — unescape before matching.
  out = out.replace(/\\\|/g, '|');
  out = out.replace(/\[\[aff:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (m, slug, label) => affLink(slug, label));

  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
    let h = href;
    if (/^javascript:/i.test(h)) return label;
    if (h.startsWith('/')) h = `${ctx.root}${h.slice(1)}`;
    const external = /^https?:\/\//i.test(h);
    const rel = external ? ' rel="noopener"' : '';
    const target = external ? ' target="_blank"' : '';
    return `<a href="${h}"${rel}${target}>${label}</a>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  out = out.replace(/\u0000C(\d+)\u0000/g, (m, i) => `<code>${codes[Number(i)]}</code>`);
  return out;
}

function collectHeadings(md) {
  const headings = [];
  let inCode = false;
  for (const line of md.split('\n')) {
    if (/^```/.test(line.trim())) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (m) {
      const text = m[2].replace(/\[\[aff:[^|]+\|([^\]]+)\]\]/g, '$1').replace(/[*`]/g, '').trim();
      headings.push({ level: m[1].length, text, id: slugify(text) });
    }
  }
  const seen = new Map();
  for (const h of headings) {
    const base = h.id;
    const n = seen.get(base) || 0;
    if (n) h.id = `${base}-${n + 1}`;
    seen.set(base, n + 1);
  }
  return headings;
}

function renderMarkdown(md, ctx) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let i = 0;

  const isBlockStart = (line) =>
    /^(#{2,4})\s/.test(line) ||
    /^```/.test(line.trim()) ||
    /^>\s?/.test(line) ||
    /^([-*]|\d+\.)\s+/.test(line) ||
    /^\|/.test(line) ||
    /^(-{3,}|\*{3,})$/.test(line.trim());

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i += 1; continue; }

    // Fenced code
    if (/^```/.test(trimmed)) {
      const lang = trimmed.slice(3).trim();
      const buf = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : '';
      html.push(`<pre><code${cls}>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // Headings
    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text.replace(/\[\[aff:[^|]+\|([^\]]+)\]\]/g, '$1').replace(/[*`]/g, ''));
      html.push(`<h${level} id="${id}">${renderInline(text, ctx)}</h${level}>`);
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      html.push('<hr>');
      i += 1;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      html.push(`<blockquote><p>${renderInline(buf.join(' '), ctx)}</p></blockquote>`);
      continue;
    }

    // Table
    if (/^\|/.test(trimmed) && i + 1 < lines.length && /^\|?[\s:|-]+\|?$/.test(lines[i + 1].trim()) && lines[i + 1].includes('-')) {
      const splitRow = (row) =>
        row.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim());
      const head = splitRow(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      const th = head.map((c) => `<th scope="col">${renderInline(c, ctx)}</th>`).join('');
      const tb = rows.map((r) => `<tr>${r.map((c) => `<td>${renderInline(c, ctx)}</td>`).join('')}</tr>`).join('');
      html.push(`<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table></div>`);
      continue;
    }

    // Lists
    if (/^([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && /^([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        i += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      html.push(`<${tag}>${items.map((it) => `<li>${renderInline(it, ctx)}</li>`).join('')}</${tag}>`);
      continue;
    }

    // Paragraph
    const buf = [line.trim()];
    i += 1;
    while (i < lines.length) {
      const next = lines[i];
      if (!next.trim()) break;
      if (isBlockStart(next)) break;
      buf.push(next.trim());
      i += 1;
    }
    html.push(`<p>${renderInline(buf.join(' '), ctx)}</p>`);
  }

  return html.join('\n');
}

function readingTime(md) {
  const text = md
    .replace(/\[\[aff:[^|]+\|([^\]]+)\]\]/g, '$1')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`|_-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function tocHtml(headings) {
  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 3) return '';
  return `<nav class="toc" aria-label="On this page">
  <p class="toc-title">On this page</p>
  <ol>${h2s.map((h) => `<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('')}</ol>
</nav>`;
}

/* ------------------------------------------------------------------ */
/* Page templates                                                     */
/* ------------------------------------------------------------------ */

function canonical(route) {
  return `${String(site.baseUrl).replace(/\/+$/, '')}${route}`;
}

function layout({ title, description, route, body, root, schema, noindex }) {
  const pageTitle = title === site.name
    ? `${site.name} — ${site.titleTag || site.tagline}`
    : `${title} — ${site.name}`;
  const canonicalUrl = canonical(route);
  const year = new Date().getUTCFullYear();
  const repoLive = site.repoUrl && !String(site.repoUrl).includes('YOUR-USERNAME');
  const schemaJson = schema
    ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:site_name" content="${escapeHtml(site.name)}">
<meta property="og:type" content="${route.startsWith('/articles/') ? 'article' : 'website'}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonicalUrl)}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#f7f5f0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#101416" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}assets/style.css">
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.name)}" href="${root}feed.xml">
${schemaJson}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${root}" aria-label="${escapeHtml(site.name)} home">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="2.5" y="4.5" width="23" height="14" rx="2.5"/>
          <path d="M8 22.5h12M14 18.5v4"/>
          <path d="M7.5 9h5M7.5 12.5h9M7.5 16h4" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="brand-text">${escapeHtml(site.name)}</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      <a href="${root}articles/">Guides</a>
      <a href="${root}how-we-research/">How we research</a>
      <a href="${root}about/">About</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-about">
      <p class="footer-brand">${escapeHtml(site.name)}</p>
      <p>Mac docking and display compatibility, checked against the spec sheet. We do not claim hands-on testing, and we do not sell rankings.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer">
      <a href="${root}articles/">All guides</a>
      <a href="${root}how-we-research/">How we research</a>
      <a href="${root}about/">About</a>
      <a href="${root}affiliate-disclosure/">Affiliate disclosure</a>
      <a href="${root}privacy/">Privacy</a>
      ${repoLive ? `<a href="${escapeHtml(site.repoUrl)}/issues">Report an error</a>` : ''}
    </nav>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${year} ${escapeHtml(site.name)}. Specs checked and dated; prices linked, never mirrored.</p>
    <p>Affiliate links, where active, are disclosed. <a href="${root}affiliate-disclosure/">Read the disclosure</a>.</p>
  </div>
</footer>
</body>
</html>
`;
}

function articleCard(article, root) {
  return `<article class="card">
  <p class="card-meta">${escapeHtml(article.category || 'Guide')} · ${escapeHtml(formatDate(article.date))}</p>
  <h3><a href="${root}articles/${article.slug}/">${escapeHtml(article.title)}</a></h3>
  <p>${escapeHtml(article.description)}</p>
  <p class="card-link"><a href="${root}articles/${article.slug}/">Read the guide <span aria-hidden="true">→</span></a></p>
</article>`;
}

function articlePage(article, allArticles) {
  const relPath = path.join('articles', article.slug, 'index.html');
  const root = rootPrefix(relPath);
  const ctx = { root };
  const bodyHtml = renderMarkdown(article.body, ctx).replace(/href="\/(?!\/)([^"]*)"/g, (m, p) => `href="${root}${p}"`);
  const headings = collectHeadings(article.body);
  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (a.category === article.category ? -1 : 0) - (b.category === article.category ? -1 : 0))
    .slice(0, 2);
  const idx = allArticles.findIndex((a) => a.slug === article.slug);
  const newer = idx > 0 ? allArticles[idx - 1] : null;
  const older = idx >= 0 ? allArticles[idx + 1] : null;
  const affSlugs = [...article.body.matchAll(/\[\[aff:([a-z0-9-]+)/g)].map((m) => m[1]);
  const pageTagged = affSlugs.some((slug) => {
    const product = aff.products && aff.products[slug];
    const program = product && aff.programs && aff.programs[product.program];
    return Boolean(program && program.enabled && program.id && product.asin);
  });
  const amazon = aff.programs && aff.programs.amazon_us;
  const amazonActive = Boolean(amazon && amazon.enabled && amazon.id);
  const amazonLine = amazonActive ? ' As an Amazon Associate, we earn from qualifying purchases.' : '';
  const disclosure = pageTagged
    ? `<strong>Reader-supported.</strong> Some links on this page are affiliate links. If you buy through one, we may earn a commission at no extra cost to you.${amazonLine} No brand pays for a placement or approves a verdict. <a href="${root}affiliate-disclosure/">Full disclosure</a>.`
    : `<strong>Funding status.</strong> No affiliate link is active on this page yet, so product links go straight to the merchant and earn DockFacts nothing. If a program is activated, a disclosure will appear here before any tracked link does. <a href="${root}affiliate-disclosure/">How funding works</a>.`;

  const body = `<article class="article">
  <div class="wrap article-wrap">
    <header class="article-head">
      <p class="eyebrow"><a href="${root}articles/">${escapeHtml(article.category || 'Guide')}</a></p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="dek">${escapeHtml(article.description)}</p>
      <div class="meta">
        <span>Published ${escapeHtml(formatDate(article.date))}</span>
        ${article.updated && article.updated !== article.date ? `<span>Updated ${escapeHtml(formatDate(article.updated))}</span>` : ''}
        <span>${readingTime(article.body)} min read</span>
        <span class="spec-pill">Specs checked ${escapeHtml(formatDate(article.updated || article.date))}</span>
      </div>
    </header>
    <aside class="disclosure" aria-label="Affiliate disclosure">
      ${disclosure}
    </aside>
    <div class="article-body">
      ${tocHtml(headings)}
      ${bodyHtml}
    </div>
    <aside class="author-box">
      <p class="author-name">${escapeHtml(site.author.name)}</p>
      <p>DockFacts is an AI-assisted research desk, not a review lab. We do not claim hands-on testing. Every spec and price in this guide is linked to the source we checked on the date shown above. If a vendor changes a product, the source link is how you catch us. <a href="${root}how-we-research/">How we research</a>.</p>
    </aside>
    <nav class="prevnext" aria-label="More guides">
      ${older ? `<a class="prevnext-item" href="${root}articles/${older.slug}/"><span>Previous</span>${escapeHtml(older.title)}</a>` : '<span></span>'}
      ${newer ? `<a class="prevnext-item next" href="${root}articles/${newer.slug}/"><span>Next</span>${escapeHtml(newer.title)}</a>` : '<span></span>'}
    </nav>
    ${related.length ? `<section class="related" aria-labelledby="related-title">
      <h2 id="related-title">Keep reading</h2>
      <div class="card-grid">${related.map((a) => articleCard(a, root)).join('')}</div>
    </section>` : ''}
  </div>
</article>`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: { '@type': site.author.type || 'Organization', name: site.author.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: canonical(`/articles/${article.slug}/`),
    isAccessibleForFree: true
  };

  return {
    html: layout({
      title: article.title,
      description: article.description,
      route: `/articles/${article.slug}/`,
      body,
      root,
      schema
    }),
    relPath
  };
}

function pageHtml(page) {
  const relPath = path.join(page.slug, 'index.html');
  const root = rootPrefix(relPath);
  const ctx = { root };
  const amazon = aff.programs && aff.programs.amazon_us;
  const amazonActive = Boolean(amazon && amazon.enabled && amazon.id);
  const statusLine = amazonActive
    ? 'As an Amazon Associate, DockFacts earns from qualifying purchases.'
    : 'No affiliate program is active on this site yet, so every product link is a plain merchant link and DockFacts earns nothing from it.';
  const bodyHtml = renderMarkdown(page.body, ctx)
    .replace(/href="\/(?!\/)([^"]*)"/g, (m, p) => `href="${root}${p}"`)
    .replace(/\{\{AMAZON_DISCLOSURE\}\}/g, statusLine);
  const body = `<article class="page">
  <div class="wrap page-wrap">
    <header class="article-head">
      <p class="eyebrow">${escapeHtml(page.eyebrow || site.name)}</p>
      <h1>${escapeHtml(page.title)}</h1>
      ${page.description ? `<p class="dek">${escapeHtml(page.description)}</p>` : ''}
      ${page.updated ? `<div class="meta"><span>Updated ${escapeHtml(formatDate(page.updated))}</span></div>` : ''}
    </header>
    <div class="article-body page-body">
      ${bodyHtml}
    </div>
  </div>
</article>`;
  return {
    html: layout({
      title: page.title,
      description: page.description || site.description,
      route: `/${page.slug}/`,
      body,
      root
    }),
    relPath
  };
}

function homePage(articles) {
  const root = './';
  const featured = articles.slice(0, 2);
  const latest = articles.slice(2, 6);
  const lead = articles[0];
  const featureCard = (a) => `<article class="card card-feature">
  <p class="card-meta">${escapeHtml(a.category || 'Guide')}</p>
  <h3><a href="${root}articles/${a.slug}/">${escapeHtml(a.title)}</a></h3>
  <p>${escapeHtml(a.description)}</p>
</article>`;
  const body = `<section class="hero">
  <div class="wrap hero-inner">
    <p class="eyebrow">Independent · spec-first · no hands-on claims</p>
    <h1>The right dock for your Mac, chosen from the spec sheet.</h1>
    <p class="lede">Apple silicon Macs have precise, confusing display limits. We read the platform documentation and the vendor spec pages, date every claim, and recommend only what the ports can actually do.</p>
    <div class="hero-actions">
      ${lead ? `<a class="btn" href="${root}articles/${lead.slug}/">Read the latest guide</a>` : ''}
      <a class="btn btn-ghost" href="${root}how-we-research/">How we research</a>
    </div>
    <p class="hero-note">No sponsored rankings. No invented benchmarks. No price snapshots we cannot verify.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>Start with your Mac</h2>
      <p>Two questions decide almost every Mac dock purchase: how many displays, and which Thunderbolt generation.</p>
    </div>
    <div class="card-grid">${featured.map(featureCard).join('')}</div>
  </div>
</section>

${latest.length ? `<section class="section section-alt">
  <div class="wrap">
    <div class="section-head">
      <h2>Latest guides</h2>
      <p>New research is added in small batches. Every guide lists its sources and the date they were checked.</p>
    </div>
    <div class="card-grid">${latest.map((a) => articleCard(a, root)).join('')}</div>
    <p class="section-more"><a href="${root}articles/">All guides <span aria-hidden="true">→</span></a></p>
  </div>
</section>` : ''}

<section class="section">
  <div class="wrap method-strip">
    <div>
      <h2>What this site is — and is not</h2>
    </div>
    <div class="method-cols">
      <div>
        <h3>Documentary, not theatrical</h3>
        <p>We compare published specs, platform limits, and standards. We do not claim to have unboxed, measured, or benchmarked hardware we have not touched.</p>
      </div>
      <div>
        <h3>Dated, not timeless</h3>
        <p>Specs and prices change. Each guide shows the date its sources were checked, and links to the exact vendor page so you can re-check it.</p>
      </div>
      <div>
        <h3>Reader-funded, not brand-funded</h3>
        <p>Affiliate commissions may pay for the site. Brands never pay for a pick, see a draft, or get a verdict changed. <a href="${root}affiliate-disclosure/">How that works</a>.</p>
      </div>
    </div>
  </div>
</section>`;

  return {
    html: layout({
      title: site.name,
      description: site.description,
      route: '/',
      body,
      root,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: canonical('/'),
        description: site.description
      }
    }),
    relPath: 'index.html'
  };
}

function articlesIndex(articles) {
  const root = '../';
  const body = `<section class="section">
  <div class="wrap">
    <header class="index-head">
      <p class="eyebrow">All guides</p>
      <h1>Mac docking and display guides</h1>
      <p class="lede">Buying guides answer a specific configuration question. Explainers cover the standards that make those answers true. Every page lists its sources.</p>
    </header>
    <div class="card-grid card-grid-wide">${articles.map((a) => articleCard(a, root)).join('')}</div>
  </div>
</section>`;
  return {
    html: layout({
      title: 'All guides',
      description: 'Every DockFacts guide to Mac docking stations, display limits, and multi-monitor setups, with dated sources.',
      route: '/articles/',
      body,
      root
    }),
    relPath: path.join('articles', 'index.html')
  };
}

function notFoundPage() {
  const body = `<section class="section">
  <div class="wrap narrow">
    <p class="eyebrow">404</p>
    <h1>That page is not on the dock.</h1>
    <p class="lede">The link may be old, or the guide may have moved. Start from the home page or the full guide index.</p>
    <p><a class="btn" href="${site.baseUrl.replace(/\/+$/, '')}/">Go home</a> <a class="btn btn-ghost" href="${site.baseUrl.replace(/\/+$/, '')}/articles/">All guides</a></p>
  </div>
</section>`;
  return {
    html: layout({
      title: 'Page not found',
      description: 'Page not found.',
      route: '/404.html',
      body,
      root: './',
      noindex: true
    }),
    relPath: '404.html'
  };
}

/* ------------------------------------------------------------------ */
/* Feeds + sitemap                                                    */
/* ------------------------------------------------------------------ */

function sitemap(entries) {
  const urls = entries.map((e) => `  <url>
    <loc>${escapeHtml(canonical(e.route))}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function feed(articles) {
  const items = articles.slice(0, 20).map((a) => `    <item>
      <title>${escapeHtml(a.title)}</title>
      <link>${escapeHtml(canonical(`/articles/${a.slug}/`))}</link>
      <guid>${escapeHtml(canonical(`/articles/${a.slug}/`))}</guid>
      <pubDate>${new Date(`${a.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(a.description)}</description>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(site.name)}</title>
    <link>${escapeHtml(canonical('/'))}</link>
    <description>${escapeHtml(site.description)}</description>
    <language>en</language>
    <atom:link href="${escapeHtml(canonical('/feed.xml'))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

/* ------------------------------------------------------------------ */
/* Build                                                              */
/* ------------------------------------------------------------------ */

function main() {
  if (site.baseUrl.includes('YOUR-USERNAME')) {
    warn('site.config.json still has the placeholder baseUrl; sitemap, canonical tags, and feed links will be wrong until it is set.');
  }
  if (!fs.existsSync(path.join(ROOT, 'assets', 'style.css'))) {
    error('assets/style.css is missing');
  }

  const pages = loadCollection(path.join(ROOT, 'content', 'pages'))
    .filter((p) => !p.draft);
  const allArticleFiles = loadCollection(path.join(ROOT, 'content', 'articles'));
  const draftFiles = allArticleFiles.filter((a) => a.draft);
  const articleFiles = allArticleFiles.filter((a) => !a.draft);

  // Drafts are not published, but they still have to be safe to publish later.
  for (const d of draftFiles) {
    const draftSlugs = new Set([...d.body.matchAll(/\[\[aff:([a-z0-9-]+)/g)].map((m) => m[1]));
    for (const slug of draftSlugs) {
      if (!aff.products || !aff.products[slug]) {
        error(`draft ${d.file} references unknown affiliate product "${slug}"`);
      }
    }
    if (d.description && d.description.length > 170) {
      warn(`draft ${d.file} description is ${d.description.length} chars; keep it under 170`);
    }
  }

  const allSlugs = new Set();
  for (const a of allArticleFiles) {
    if (allSlugs.has(a.slug)) error(`duplicate article slug "${a.slug}" (published or draft)`);
    allSlugs.add(a.slug);
  }

  for (const a of articleFiles) {
    for (const field of ['title', 'description', 'date']) {
      if (!a[field]) error(`article ${a.file} is missing "${field}"`);
    }
    if (a.description && a.description.length > 170) {
      warn(`article ${a.file} description is ${a.description.length} chars; keep it under 170`);
    }
    if (!/^##\s+Sources/im.test(a.body)) {
      warn(`article ${a.file} has no "## Sources" section`);
    }
  }

  const articles = articleFiles.sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.title.localeCompare(b.title));

  const slugs = new Set();
  for (const a of articles) {
    if (slugs.has(a.slug)) error(`duplicate article slug "${a.slug}"`);
    slugs.add(a.slug);
  }

  // Clean output
  fs.rmSync(OUT, { recursive: true, force: true });
  ensureDir(OUT);
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

  const outputs = [];
  const entries = [];

  outputs.push(homePage(articles));
  entries.push({ route: '/', lastmod: articles[0] ? articles[0].updated || articles[0].date : site.launchDate });

  const index = articlesIndex(articles);
  outputs.push(index);
  entries.push({ route: '/articles/', lastmod: articles[0] ? articles[0].updated || articles[0].date : site.launchDate });

  for (const article of articles) {
    const out = articlePage(article, articles);
    outputs.push(out);
    entries.push({
      route: `/articles/${article.slug}/`,
      lastmod: article.updated || article.date
    });
  }

  for (const page of pages) {
    if (!page.title) error(`page ${page.file} is missing a title`);
    const out = pageHtml(page);
    outputs.push(out);
    entries.push({ route: `/${page.slug}/`, lastmod: page.updated || site.launchDate });
  }

  for (const out of outputs) write(out.relPath, out.html);

  // 404
  const nf = notFoundPage();
  write(nf.relPath, nf.html);

  // Static
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${canonical('/sitemap.xml')}\n`);
  write('sitemap.xml', sitemap(entries));
  write('feed.xml', feed(articles));

  const assetsDir = path.join(ROOT, 'assets');
  if (fs.existsSync(assetsDir)) {
    ensureDir(path.join(OUT, 'assets'));
    for (const file of fs.readdirSync(assetsDir)) {
      fs.copyFileSync(path.join(assetsDir, file), path.join(OUT, 'assets', file));
    }
  }

  // Internal link check
  const urlToFile = new Map();
  for (const out of outputs) {
    const rel = out.relPath.split(path.sep).join('/');
    urlToFile.set(rel, true);
    if (rel.endsWith('/index.html')) urlToFile.set(rel.slice(0, -'index.html'.length), true);
    if (rel === 'index.html') urlToFile.set('/', true);
  }
  urlToFile.set('404.html', true);
  urlToFile.set('sitemap.xml', true);
  urlToFile.set('feed.xml', true);
  urlToFile.set('robots.txt', true);
  ['style.css', 'favicon.svg'].forEach((f) => urlToFile.set(`assets/${f}`, true));

  for (const out of [...outputs, nf]) {
    const rel = out.relPath.split(path.sep).join('/');
    const dir = path.posix.dirname(rel);
    const hrefs = out.html.match(/href="([^"]+)"/g) || [];
    for (const raw of hrefs) {
      const href = raw.slice(6, -1);
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      let target = href.split('#')[0].split('?')[0];
      if (!target) continue;
      const resolved = path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, target));
      let clean = resolved.replace(/^\.\//, '').replace(/^\/+/, '');
      if (!clean || clean === '.') clean = 'index.html';
      if (clean.endsWith('/')) clean += 'index.html';
      const candidates = new Set([clean, clean.replace(/index\.html$/, ''), clean + '/index.html']);
      if (![...candidates].some((c) => urlToFile.has(c))) {
        error(`broken internal link in ${rel}: ${href}`);
      }
    }
  }

  // Affiliate readiness report
  const enabled = Object.entries(aff.programs || {}).filter(([, p]) => p.enabled && p.id);
  const disabled = Object.entries(aff.programs || {}).filter(([, p]) => !p.enabled || !p.id);
  const productsMissingAsin = Object.entries(aff.products || {})
    .filter(([, p]) => {
      const prog = aff.programs[p.program];
      return prog && prog.enabled && !p.asin;
    })
    .map(([slug]) => slug);

  const status = {
    builtAt: new Date().toISOString(),
    articles: articles.length,
    pages: pages.length,
    words: articles.reduce((n, a) => n + a.body.split(/\s+/).length, 0),
    affiliate: {
      activePrograms: enabled.map(([k]) => k),
      inactivePrograms: disabled.map(([k]) => k),
      missingAsins: productsMissingAsin,
      taggedLinks: counts.tagged,
      plainLinks: counts.plain,
      untaggedLinks: counts.untagged
    },
    warnings,
    errors
  };
  fs.writeFileSync(path.join(ROOT, 'data', 'build-status.json'), `${JSON.stringify(status, null, 2)}\n`);

  console.log(`\n${site.name} build`);
  console.log(`  ${articles.length} articles, ${pages.length} pages, ${status.words.toLocaleString()} words`);
  console.log(`  affiliate links: ${counts.tagged} tagged, ${counts.plain} plain`);
  if (enabled.length === 0) console.log('  affiliate programs active: none — all product links are plain merchant links');
  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (errors.length) {
    console.log(`\nErrors (${errors.length}):`);
    errors.forEach((e) => console.log(`  - ${e}`));
  }

  if (CHECK_AFF) {
    const ready = enabled.length > 0 && productsMissingAsin.length === 0;
    console.log('\nAffiliate readiness');
    console.log(`  active programs: ${enabled.length ? enabled.map(([k, p]) => `${k} (${p.name})`).join(', ') : 'none'}`);
    console.log(`  inactive: ${disabled.map(([k]) => k).join(', ') || 'none'}`);
    console.log(`  products missing ASIN: ${productsMissingAsin.join(', ') || 'none'}`);
    console.log(`  verdict: ${ready ? 'ready to earn' : 'NOT ready — add approved IDs/ASINs to affiliate_ids.json'}`);
    process.exit(ready && errors.length === 0 ? 0 : 1);
  }

  if (errors.length || (STRICT && warnings.length)) process.exit(1);
}

main();
