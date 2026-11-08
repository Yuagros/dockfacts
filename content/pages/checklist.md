---
title: The Mac dual-monitor dock checklist
description: Twelve checks before you buy a dock for a Mac, from Apple's display limits to native display streams, cables, and charging.
eyebrow: Free checklist
updated: 2026-11-08
---

A dock is usually the easy part to return. The monitor, the cable, and the desk layout are not. Print this page (Ctrl/Cmd+P) and fill it in before you order.

## Before you buy

- ☐ **Write down your exact Mac model.** Apple's tech-spec page for that model is the only place that settles display count, maximum resolution, refresh rate, and whether the built-in screen can stay on.
- ☐ **Count the external displays you need, not the ports on the dock.** The Mac sets the ceiling. A four-output dock cannot add a third screen to a Mac that supports two.
- ☐ **Confirm native dual-display support.** If a dock only mentions MST or Windows, it will likely mirror the second screen on macOS. Look for Thunderbolt downstream ports or explicit macOS dual-display support.
- ☐ **Check the host link.** Thunderbolt 4 is 40Gb/s; Thunderbolt 5 is 80Gb/s, with up to 120Gb/s for video in Bandwidth Boost mode. A Thunderbolt 5 dock on a Thunderbolt 4 Mac runs at Thunderbolt 4 speed.
- ☐ **Check which ports carry video.** USB-C and USB-A ports on many docks are data-only. Monitors must connect to Thunderbolt, DisplayPort, or HDMI outputs.
- ☐ **Check the resolution and refresh chain.** 4K at 144Hz, 6K, and 8K generally need Display Stream Compression (DSC) plus a monitor and cable that support the same timing. A dock's "up to 8K" claim is not a promise for your panel.
- ☐ **Check downstream power.** A dock that charges the laptop at 140W may supply only 15W to its downstream Thunderbolt ports. If you charge an iPad or a bus-powered drive from the dock, note the per-port wattage.
- ☐ **Check Ethernet against your actual network.** 10GbE and 2.5GbE only help if the switch, NAS, and cable support them. Otherwise the link falls back to the slowest device.
- ☐ **Count USB ports and controllers.** Ten ports sharing one controller are not the same as ten ports across two controllers. Check the per-port speed and whether they share bandwidth with the displays.
- ☐ **Check the power supply, not just the wattage claim.** A dock rated for 140W needs a power supply sized to hold it while accessories are connected. The vendor's own page is the source; a retailer bullet is not.
- ☐ **Plan every cable.** Use the certified Thunderbolt cable that came with the dock, or a certified replacement. For high refresh rates, prefer USB-C to DisplayPort over an HDMI adapter where the Mac's HDMI limit is unclear.
- ☐ **Check the return window and firmware support.** Display negotiation bugs are fixed by firmware and macOS updates. A dock with no support page and a 14-day return window is a risk.

## Red flags

- "Dual HDMI" with no mention of macOS, Thunderbolt, or DisplayLink.
- "Up to 8K" with no host, refresh rate, or DSC context.
- A 140W charging claim paired with a power supply that cannot sustain it.
- A "Mac-compatible" claim that links only to a Windows driver page.
- A price that only exists in a countdown timer.

## The two questions that decide most purchases

1. **How many external displays does my exact Mac support, and at what resolution and refresh?** If the answer is one, a USB-C hub is usually enough. If it is two, the dock must carry two native display streams.
2. **What else is on the cable?** Two displays, a 10GbE NAS, and three SSDs are a different bandwidth budget from a keyboard and a mouse.

If you get stuck on either question, the [dual-monitor MacBook Air guide](/articles/best-dock-for-macbook-air-m5-dual-monitors/) walks through the current M5 Air, and the [hub-vs-dock test](/articles/usb-c-hub-vs-thunderbolt-dock-mac/) explains when a cheaper hub is the right answer.

## Sources

- [Apple — MacBook Air technical specifications](https://www.apple.com/macbook-air/specs/) (display count, Thunderbolt 4, DSC), checked 8 November 2026.
- [CalDigit — Thunderbolt 5 Dock TS5](https://www.caldigit.com/thunderbolt-5-dock-ts5/) (Thunderbolt 5 bandwidth, downstream power, display notes), checked 8 November 2026.
- [Plugable — Understanding multiple displays on Apple silicon Macs](https://plugable.com/blogs/news/understanding-multiple-displays-on-apple-silicon-macs) (MST, DisplayLink, native display limits), checked 8 November 2026.

*No affiliate links on this page. Print it, use it, ignore the upsell.*
