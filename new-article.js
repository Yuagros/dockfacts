#!/usr/bin/env node
/**
 * Create a draft article from the DockFacts template.
 * Usage: node new-article.js "Working title" "Buying guide"
 * The draft has draft: true and is excluded from the build until you flip it.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const title = process.argv[2];
const category = process.argv[3] || 'Buying guide';
if (!title) {
  console.error('Usage: node new-article.js "Working title" "Buying guide"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80);

const now = new Date();
const date = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0')
].join('-');

const file = path.join(__dirname, 'content', 'articles', `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const template = `---
title: ${title}
description: 
date: ${date}
updated: ${date}
category: ${category}
tags: 
draft: true
---

[Opening: name the exact configuration and answer the question in the first two paragraphs. Do not claim hands-on testing.]

## Quick answer

[Three or four picks, each with the setup it is best for. Every product must exist in affiliate_ids.json.]

## What the host supports

[Apple tech specs for the exact Mac: display count, resolution, refresh, DSC, port standard, charging. Link the source and date the check.]

## What to check in the spec sheet

[Two to four decision rules. Explain native display streams vs MST, video-capable ports, bandwidth, or charging as relevant.]

## The picks

### Pick one

**Best for:** 

**Verified specs:** 

**Caveat:** 

**Not for you if:** 

## When to spend less

[The honest case for a cheaper hub or for keeping the current setup.]

## Setup checklist

1. 
2. 
3. 

## FAQ

### Question one?

Answer.

### Question two?

Answer.

## Sources

- [Source title](URL) — checked ${date}.

*Specs checked ${date}. We did not test this hardware; the links above are the evidence.*
`;

fs.writeFileSync(file, template, 'utf8');
console.log(`Draft created: ${path.relative(process.cwd(), file)}`);
console.log('Before publishing:');
console.log('  1. Fill in description (under 160 chars), tags, and every section.');
console.log('  2. Add a row per claim to data/source-log.csv.');
console.log('  3. Check every product slug exists in affiliate_ids.json.');
console.log('  4. npm run build && npm run serve');
console.log('  5. Set draft: false and updated to today.');
