#!/usr/bin/env node
/**
 * Check every external URL cited in content/, site.config.json and
 * affiliate_ids.json. Zero dependencies; uses Node 18+ fetch.
 *
 * Usage:
 *   node check-links.js           report statuses, exit 1 only on 404/410
 *   node check-links.js --strict  exit 1 on any non-2xx/3xx status
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const STRICT = process.argv.includes('--strict');
const UA = 'DockFactsLinkCheck/1.0 (+https://github.com/)';
const TIMEOUT = 20000;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(md|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function collect() {
  const files = [
    ...walk(path.join(ROOT, 'content')),
    path.join(ROOT, 'site.config.json'),
    path.join(ROOT, 'affiliate_ids.json')
  ];
  const urls = new Set();
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/https?:\/\/[^\s)"'<>]+/g)) {
      const url = match[0].replace(/[.,;:]+$/, '');
      if (/YOUR-USERNAME|example\.com|localhost|127\.0\.0\.1|[{}]/.test(url)) continue;
      urls.add(url);
    }
  }
  return [...urls].sort();
}

async function check(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT),
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    // We only need the status; do not download the body.
    if (res.body && res.body.cancel) await res.body.cancel();
    return res.status;
  } catch (err) {
    return `ERR ${err.name === 'TimeoutError' ? 'timeout' : err.message.slice(0, 60)}`;
  }
}

(async () => {
  const urls = collect();
  if (!urls.length) {
    console.log('No external URLs found.');
    return;
  }

  const results = [];
  const queue = [...urls];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      results.push([url, await check(url)]);
    }
  });
  await Promise.all(workers);
  results.sort((a, b) => String(a[1]).localeCompare(String(b[1])) || a[0].localeCompare(b[0]));

  let broken = 0;
  let blocked = 0;
  for (const [url, status] of results) {
    const label = status === 429 || status === 403 ? `${status} (blocked/rate-limited)` : status;
    console.log(`${String(label).padEnd(24)} ${url}`);
    if (status === 404 || status === 410) broken += 1;
    if (status === 429 || status === 403) blocked += 1;
  }

  console.log(`\n${results.length} URLs checked, ${broken} not found, ${blocked} blocked or rate-limited.`);
  console.log('403/429 usually means a bot wall, not a dead page; open it in a browser before changing a citation.');
  if (broken > 0) process.exit(1);
  if (STRICT) {
    const bad = results.filter(([, s]) => typeof s !== 'number' || s < 200 || s >= 400).length;
    if (bad > 0) process.exit(1);
  }
})();
