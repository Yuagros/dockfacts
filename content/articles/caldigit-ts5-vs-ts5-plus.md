---
title: CalDigit TS5 vs TS5 Plus: which Thunderbolt 5 dock fits your Mac?
description: Same 140W charging and 80Gb/s Thunderbolt 5 link. The difference is 10GbE, a DisplayPort output, five more USB ports, and $130 at launch.
date: 2026-11-09
updated: 2026-11-09
category: Buying guide
tags: caldigit, thunderbolt-5, comparison
draft: true
draft_note: Re-check both CalDigit pages and the launch-price source on 9 November 2026 before flipping draft to false.
---

CalDigit's two Thunderbolt 5 docks are close enough to be confusing. The **TS5** and **TS5 Plus** share the same 140W host charging, the same 80Gb/s Thunderbolt 5 link, and the same 120Gb/s Bandwidth Boost mode for video. Neither is faster than the other in any way your Mac will notice day to day.

The decision is about ports. The TS5 Plus adds 10GbE, a DisplayPort 2.1 output, five more USB ports, dual USB controllers, and 36W downstream Thunderbolt power. The TS5 is smaller, lighter, and was **$130 cheaper at launch**. This guide maps those differences to actual Mac setups, so you can pay for the one you will use.

We did not test either dock. Every specification below comes from CalDigit's own product pages, checked on 8 November 2026; launch prices come from The Verge's 2025 announcement and are labelled as launch prices, not current ones.

## Quick answer

- **Buy the TS5** if you have a MacBook Air or MacBook Pro on Thunderbolt 4, need two displays, and 2.5GbE is enough for your network.
- **Buy the TS5 Plus** if you have a 10GbE NAS or switch, a DisplayPort monitor, more than five USB peripherals, or an M5 Max desk that needs four displays.
- **Buy neither** if you only need one display and a few accessories. A USB-C hub is the correct spend; the [hub-vs-dock test](/articles/usb-c-hub-vs-thunderbolt-dock-mac/) explains why.

## Spec comparison

| Spec | CalDigit TS5 | CalDigit TS5 Plus |
| --- | --- | --- |
| Ports (CalDigit's count) | 15 | 20 |
| Thunderbolt 5 | 1 host + 3 downstream | 1 host + 2 downstream |
| USB | 3× USB-C 10Gb/s, 1× USB-A 10Gb/s, 1× USB-A 480Mb/s | 5× USB-C 10Gb/s, 5× USB-A 10Gb/s, dual 10Gb/s controllers |
| Ethernet | 2.5GbE | 10GbE |
| Video outputs | Thunderbolt 5 downstream only | DisplayPort 2.1 plus 2× Thunderbolt 5 downstream |
| Host charging | 140W | 140W |
| Downstream Thunderbolt power | 15W each | 36W each |
| Displays on a Thunderbolt 4 host | Dual | Dual |
| Displays on a Thunderbolt 5 host | Triple on supported hosts; four on M5 Max with a daisy-chained display | Triple on supported hosts; four on M5 Max |
| Power supply | 240W | 330W |
| Size / weight | 5.55 × 1.65 × 4.46 in, 1.41 lb | 6.10 × 1.85 × 5.03 in, 1.98 lb |
| Host compatibility | Thunderbolt 5/4/3, USB4, USB4 v2, USB-C | Thunderbolt 5/4/3, USB4, USB4 v2; no USB-C 5Gb/s or 10Gb/s host |
| Launch price (2025) | $369.99 | $499.99 |

Sources: [CalDigit TS5](https://www.caldigit.com/thunderbolt-5-dock-ts5/), [CalDigit TS5 Plus](https://www.caldigit.com/thunderbolt-5-dock-ts5-plus/), both checked 8 November 2026; launch prices from [The Verge](https://www.theverge.com/news/645134/caldigit-thunderbolt-5-dock-ts5-plus-pricing-availability). Current prices change; use the vendor links rather than the 2025 figures.

## What is the same

The shared specification is why this is a genuine choice rather than a tier list.

- **140W host charging.** Both can hold 140W for a 16-inch MacBook Pro, and both use power supplies sized to keep that promise when other ports are busy, according to CalDigit.
- **80Gb/s Thunderbolt 5, 120Gb/s Bandwidth Boost.** Both double the 40Gb/s of Thunderbolt 4 and support 64Gb/s PCIe 4.0 tunnelling, which CalDigit rates for SSD transfers up to 6,200MB/s.
- **SD and microSD 4.0 UHS-II** on the front, both usable at the same time.
- **3.5mm audio:** front combo in/out, plus rear audio in and out on both.
- **macOS 15 or newer** and a Thunderbolt 3 or newer host.
- **One 1.0m Thunderbolt 5 cable** in the box.

If your workload is two displays, a couple of SSDs, a keyboard, and wired Ethernet at 2.5Gb/s or slower, the extra TS5 Plus hardware is mostly idle.

## The five differences that matter

### 1. 10GbE instead of 2.5GbE

This is the biggest reason to pick the TS5 Plus. CalDigit puts a **10 Gigabit Ethernet** port on it and a **2.5GbE** port on the TS5. The 10GbE port also negotiates 5GbE, 2.5GbE, and 1GbE devices.

You only benefit if the rest of the path supports it: a 10GbE switch or router, a NAS with a 10GbE port, and Cat 6 or better cabling. Without those, the port falls back to the speed of the slowest link. For most home desks, 2.5GbE is typically faster than the internet connection and fast enough for a single-user NAS.

If you move large video files to a 10GbE NAS every week, the TS5 Plus is the only one of these two that has the port.

### 2. A DisplayPort 2.1 output instead of Thunderbolt-only video

The TS5 has no dedicated video output. Monitors connect to its downstream Thunderbolt 5 ports, which is fine for USB-C and Thunderbolt displays and needs a USB-C to HDMI or DisplayPort cable for older monitors.

The TS5 Plus adds a **DisplayPort 2.1** output. That is useful if you own a DisplayPort monitor and want to avoid an adapter, or if you want to reserve both downstream Thunderbolt ports for storage. On an M5 Pro, CalDigit's triple-display recipe for the TS5 Plus is two monitors on the downstream Thunderbolt ports and one on DisplayPort.

### 3. Twice the USB ports, and two controllers

The TS5 has five USB ports: three USB-C at 10Gb/s, one USB-A at 10Gb/s, and one USB-A at 480Mb/s for a keyboard or mouse.

The TS5 Plus has **ten USB ports**, all at 10Gb/s: five USB-C and five USB-A. It also uses two separate 10Gb/s USB controllers instead of one shared controller, which CalDigit says increases bandwidth when several high-speed USB devices are active at once.

That matters if you run multiple SSDs, a capture card, and a phone or tablet from the dock. It does not matter for a keyboard, mouse, and one backup drive.

### 4. More power for downstream devices

The TS5's downstream Thunderbolt 5 ports supply **15W each**. The TS5 Plus raises that to **36W each**, and its front USB-C port also supplies 36W. The remaining USB ports on both docks supply 7.5W.

If you charge an iPad, a phone, or a bus-powered accessory from the dock, the TS5 Plus is less likely to need a separate charger. If your devices have their own power, this difference is irrelevant.

### 5. Size, power supply, and host compatibility

The TS5 Plus is the larger dock: 1.98 lb versus 1.41 lb, with a 330W power supply instead of 240W. It needs more desk space and a bigger brick under the desk.

It is also stricter about hosts. CalDigit says the TS5 Plus supports Thunderbolt 5, Thunderbolt 4, Thunderbolt 3, USB4, and USB4 v2, but **not USB-C 5Gb/s or 10Gb/s hosts**. The TS5 accepts USB-C hosts with reduced functionality. Every Apple silicon Mac has Thunderbolt, so this is mainly a Windows-tablet or USB-C-only-device issue, but it is worth checking before buying for a mixed desk.

## Which Mac gets which displays

The dock does not raise your Mac's display ceiling. Apple sets that. Here is how the two docks map to the current Mac line, based on CalDigit's display notes and Apple's specs.

| Mac | Max external displays | TS5 | TS5 Plus |
| --- | --- | --- | --- |
| MacBook Air (M5, Thunderbolt 4) | Two, up to 6K60 or 4K144 each | Dual | Dual |
| MacBook Pro (M5 Pro, Thunderbolt 5) | Three, per CalDigit | Triple via three downstream TB5 ports | Triple via two downstream TB5 ports + DisplayPort |
| MacBook Pro (M5 Max, Thunderbolt 5) | Four, per CalDigit | Four, with one display daisy-chained | Four |

The MacBook Air row is the one most people get wrong. A Thunderbolt 4 Air can run two externals from a single cable, but it cannot use the TS5's or TS5 Plus's third display path. The [M5 Air dock guide](/articles/best-dock-for-macbook-air-m5-dual-monitors/) covers the cable and DSC details.

For the M5 Pro and M5 Max, CalDigit's footnotes add two caveats: triple displays require a Thunderbolt 5 host that supports them (M4 Macs do not, per CalDigit), and four displays on the TS5 require one daisy-chainable Thunderbolt display. The TS5 Plus has the DisplayPort output to build a four-display setup differently, but the monitor mix still decides whether it works.

## The 10GbE reality check

A 10GbE port is not a speed upgrade on its own. The chain is:

1. A 10GbE port in the NAS or server.
2. A 10GbE switch or a direct connection.
3. Cat 6 or better cable.
4. Fast enough storage at both ends.

If any link is 2.5GbE or 1GbE, the transfer runs at that speed. For cloud backups and video calls, the internet connection is the limit long before 10GbE.

The TS5 Plus's 10GbE port is still a legitimate reason to buy it if you already have that infrastructure. It replaces a separate Thunderbolt-to-10GbE adapter, which is the argument CalDigit makes on its product page. If you do not have the switch and the NAS, put the money toward storage instead.

One Windows note: CalDigit provides a Windows driver download for the 10GbE port. The product page does not list a separate macOS driver requirement, but check the current support page for your macOS version before relying on it.

## Price and value

At launch in 2025, The Verge reported the **TS5 at $369.99** and the **TS5 Plus at $499.99** — a $130 gap. CalDigit and retailers change prices, so treat those as historical positioning, not today's checkout price.

What the $130 bought at launch:

- 10GbE instead of 2.5GbE;
- a DisplayPort 2.1 output;
- five more USB ports and a second USB controller;
- 36W downstream Thunderbolt power instead of 15W;
- a larger chassis and a 330W power supply.

If you need one of the first three, the TS5 Plus is the rational buy. If you need none of them, the TS5 is the same Thunderbolt 5 link and the same 140W charging in a smaller box.

Do not buy the TS5 Plus for a Thunderbolt 4 MacBook Air on the theory that it is "more future-proof". The Air cannot use the 10GbE port without a 10GbE network, cannot use the extra display path, and will run either dock at Thunderbolt 4 speed. Buy it for the ports you will use now, or for a laptop you have already ordered.

## Verdict

| Your setup | Pick | Why |
| --- | --- | --- |
| MacBook Air or TB4 MacBook Pro, two displays, 2.5GbE or no wired network | [[aff:caldigit-ts5]] | Same 140W and TB5 headroom, smaller, lower launch price |
| 10GbE NAS or switch, DisplayPort monitor, many USB peripherals | [[aff:caldigit-ts5-plus]] | The only one of the two with 10GbE, DP 2.1, and ten USB ports |
| M5 Pro with three displays | Either | TS5 uses three TB5 ports; TS5 Plus uses two plus DisplayPort |
| M5 Max with four displays | Either, carefully | TS5 needs a daisy-chainable display; check the monitor mix |
| One display, keyboard, mouse | Neither | A USB-C hub is cheaper and sufficient |

## FAQ

### Is the TS5 Plus faster than the TS5?

No, not on the Thunderbolt link. Both are 80Gb/s docks with 120Gb/s Bandwidth Boost. The TS5 Plus can be faster for networking (10GbE) and for multiple USB SSDs (dual controllers), but only if your devices and network can use that bandwidth.

### Does the TS5 Plus work with a MacBook Air M5?

Yes, over Thunderbolt 4, with dual displays. It will not deliver Thunderbolt 5 bandwidth, and the 10GbE port is only useful if you have a 10GbE network. For most Air owners, the TS5 is the better fit.

### Do I need 10GbE?

Only if you already have a 10GbE NAS or switch and move large files across it. For internet traffic, video calls, and a single-user backup, 2.5GbE is usually the practical limit.

### Can the TS5 run three displays on an M5 Pro?

CalDigit says yes, with a Thunderbolt 5 host that supports triple displays: connect each monitor to a downstream Thunderbolt 5 port. A Thunderbolt 4 host cannot do triple through the TS5, per CalDigit's footnote.

## Sources

- [CalDigit — Thunderbolt 5 Dock TS5](https://www.caldigit.com/thunderbolt-5-dock-ts5/): port list, 140W, 15W downstream, 2.5GbE, display notes, size, 240W PSU. Checked 8 November 2026.
- [CalDigit — Thunderbolt 5 Dock TS5 Plus](https://www.caldigit.com/thunderbolt-5-dock-ts5-plus/): 20-port list, 10GbE, DisplayPort 2.1, 36W downstream, dual USB controllers, display notes, size, 330W PSU. Checked 8 November 2026.
- [The Verge — CalDigit's new Thunderbolt 5 docks bring plenty of ports](https://www.theverge.com/news/645134/caldigit-thunderbolt-5-dock-ts5-plus-pricing-availability): launch prices of $369.99 and $499.99. Published 2025; checked 8 November 2026.
- [Apple — MacBook Air technical specifications](https://www.apple.com/macbook-air/specs/): two external displays on the M5 Air, Thunderbolt 4. Checked 8 November 2026.

*Specs checked 8 November 2026. This is a documentary comparison, not a hands-on review; we have not measured either dock.*
