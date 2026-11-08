---
title: How we research
description: The DockFacts method: start with the host's documented limits, verify product claims against the vendor's own spec page, date every check, and publish the sources.
eyebrow: Method
updated: 2026-11-08
---

This page is the receipt for everything else on the site. It explains how a DockFacts guide is built, what counts as a source, and where the limits of the method are.

## 1. Start with the host, not the dock

The Mac sets the ceiling. Before looking at a single dock, we record what the host machine can do:

- **Display count and resolution.** Apple's tech-spec page for the exact model is the primary source. We note whether the built-in display can stay open, how many external displays are supported, and the maximum resolution and refresh rate.
- **Port standard.** Thunderbolt 3, Thunderbolt 4, Thunderbolt 5, or plain USB-C with DisplayPort Alt Mode. The generation determines bandwidth, charging, and how many native display streams can travel over one cable.
- **Display compression.** Whether the host supports Display Stream Compression (DSC) matters for 5K, 6K, 8K, and high refresh rates. Apple documents DSC support on newer Macs; we quote the page rather than assume.
- **macOS behaviour.** Native display support is not the same as what a particular hub can negotiate. We separate the two.

A dock cannot exceed the host's limits. Most bad buying advice starts by ignoring that sentence.

## 2. Verify product claims at the source

For each product we consider, we use the manufacturer's own spec page, manual, or knowledge base — not a retailer listing, not a search-result snippet, and not another affiliate site.

We record:

- the exact port list and which ports carry video;
- the maximum number of displays the vendor claims, and under which host conditions;
- host charging wattage and whether the vendor says it is sustained;
- Ethernet speed, card readers, audio, and USB generations;
- the date we checked the page.

If the vendor does not publish a number, we do not invent one. If a claim is ambiguous — for example, "up to 8K" without saying at what refresh rate or on which host — we either quote the ambiguity or leave the product out.

## 3. Use standards for the things vendors blur

Marketing pages are good at port counts and bad at bandwidth maths. For the underlying rules we use the standards bodies and platform documentation:

- **USB Implementers Forum** for USB-C, USB4, and power delivery.
- **Intel** for Thunderbolt generations and their bandwidth guarantees.
- **VESA** for DisplayPort, DSC, and MST behaviour.
- **Apple** for macOS display handling and host limits.
- When Apple's documentation is silent on a behaviour — for example, macOS mirroring an MST-based display split — we cite a vendor technical note and label it as vendor documentation, such as [Plugable's explanation of Apple silicon display behaviour](https://plugable.com/blogs/news/understanding-multiple-displays-on-apple-silicon-macs).
- **Vendor knowledge bases** (CalDigit, Plugable, OWC and others) for documented platform quirks, clearly labelled as vendor sources rather than independent tests.

## 4. Cross-check, then state the uncertainty

Two sources rarely agree perfectly. When they conflict, we do three things in order:

1. Prefer the primary source (Apple for macOS, the manufacturer for its own product).
2. Look for a second document from the same manufacturer that resolves the conflict.
3. If it is still unresolved, say so in the article and avoid a definitive recommendation.

"That depends" is a valid answer when the sources genuinely disagree. A confident wrong answer is worse than a caveat.

## 5. Prices: link, do not mirror

Retail prices change constantly and vary by region. We do not publish a price unless we can point to a live vendor page we checked on the date shown, and even then we call it a list price, not a deal.

For everything else we link to the merchant so you see the current price. We do not claim a product is "cheap", "on sale", or "the best value" without evidence we can date.

## 6. What we do not do

- We do not claim hands-on testing, unboxing, or long-term use.
- We do not publish synthetic benchmark scores or invented latency numbers.
- We do not assign star ratings or "editor's choice" badges that imply laboratory testing.
- We do not scrape or republish customer reviews.
- We do not use "best" in a title unless the article explains the criteria and the specific setup the pick is best for.

## 7. AI assistance

DockFacts is written by an AI research agent following a human editorial brief. The agent reads the sources, drafts the guide, and runs the static-site build. A human operator controls the domain, the affiliate accounts, and publication.

We disclose this on every article's author box. The compensation for the limitation is traceability: every factual claim that matters has a source link and a check date.

## 8. Corrections and updates

When a source changes, we update the article, change the "specs checked" date, and log the change in the correction log. If a product is discontinued or a claim can no longer be verified, we remove the recommendation rather than leave a stale link.

If you find an error, the repository issue tracker (linked in the footer once the site is live) is the fastest route. Please include the URL and the source you believe is correct.

## 9. Independence

Affiliate links may pay for the site. They do not buy placement. The order of picks is decided by fit to the documented setup, not by commission rate. If a product is a bad fit for a configuration, it does not appear, regardless of what it pays.

*Method last reviewed: 8 November 2026.*
