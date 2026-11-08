---
title: Best dock for a dual-monitor MacBook Air (M5)
description: The M5 MacBook Air can drive two 6K displays over one cable. These are the dock specs that make it work, four docks that fit, and the traps to avoid.
date: 2026-11-08
updated: 2026-11-08
category: Buying guide
tags: macbook-air, dual-monitor, thunderbolt
---

The MacBook Air's display support changed a piece of advice that was true for years. Apple now lists the M5 Air as supporting **two external displays over a single Thunderbolt port**, with the built-in screen still on. That means one cable to a dock can drive a proper two-monitor desk — no lid-closed workaround, no DisplayLink driver, no second cable to the laptop.

The catch is the dock. "Dual HDMI" on the box does not tell you whether the dock carries two native DisplayPort streams or splits one with MST, and macOS treats those two designs very differently. This guide covers what the Air can actually drive, the three specs that decide whether a dock works, and four docks matched to different desks.

We did not test these units. Every specification below is linked to the vendor or platform source we checked on 8 November 2026, and the [method page](/how-we-research/) explains the limits of that approach.

## Quick picks

| Pick | Best for | Displays | Charging | Price |
| --- | --- | --- | --- | --- |
| [[aff:plugable-tbt-udh2]] | Dual HDMI | 2× HDMI 2.1 up to 8K60/4K144, plus 1 downstream TB5 | 140W | $349.95 |
| [[aff:caldigit-ts5]] | Future TB5 Mac | Dual on TB4; triple on TB5 | 140W | Check |
| [[aff:caldigit-ts4]] | DisplayPort + USB-A | Dual 6K60 | 98W | Check |
| [[aff:anker-555]] | Single display | 1× HDMI 2.0 at 4K60 | 85W | Check |

Prices: the Plugable list price was checked on 8 November 2026; the others change, so use the links rather than a snapshot. Host connections: the Plugable TBT-UDH2 is Thunderbolt 5 (and works with Thunderbolt 4); the CalDigit TS5 is Thunderbolt 5, 4, and 3 plus USB4; the CalDigit TS4 is Thunderbolt 4; the Anker 555 is USB-C with DisplayPort Alt Mode, not Thunderbolt.

The last row is deliberately not a dual-monitor answer. It is included because a lot of people searching for a "dock" only need one screen, Ethernet, and a card reader — and paying for Thunderbolt would be waste.

## What the M5 Air can actually drive

Apple's tech specs for the current MacBook Air are unusually clear. Checked on 8 November 2026, they say:

| Setup | Apple's stated support |
| --- | --- |
| Two external displays | Up to 6K at 60Hz or 4K at 144Hz each |
| One external display | Up to 8K at 60Hz, 5K at 120Hz, or 4K at 240Hz |
| Built-in display | Supported simultaneously at full native resolution |
| Connection | Two external displays over a single Thunderbolt port |
| Port standard | Two Thunderbolt 4 (USB-C) ports, up to 40Gb/s |
| Display pipeline | Native DisplayPort 1.4 at HBR3 speeds, with DSC capability |

Source: [Apple — MacBook Air technical specifications](https://www.apple.com/macbook-air/specs/), checked 8 November 2026.

Three things follow from that table.

**First, the Air, not the dock, sets the display ceiling.** A dock cannot add a third external display to this machine. If you need three externals plus the built-in screen, you need a Mac with more display engines, not a more expensive dock. CalDigit's own product pages make the same point in reverse: its Thunderbolt 5 docks can drive three or four displays only on hosts that support them, such as M5 Pro and M5 Max machines.

**Second, one cable really is enough.** The "two displays over a single Thunderbolt port" line is the important one. A dock connected to one of the Air's two ports can carry both display streams. You do not need to occupy the second port with a display adapter.

**Third, the high-end numbers depend on compression.** 6K at 60Hz and 4K at 144Hz are not free bandwidth. Apple lists Display Stream Compression (DSC) capability, and CalDigit's footnotes state that DSC is required for 6K and 8K resolutions. Your monitor and cable have to cooperate. A dock spec that says "8K" is a capability claim, not a promise for your particular panel.

### What about a Thunderbolt 5 dock on a Thunderbolt 4 Air?

It works, but it runs at Thunderbolt 4 speed. Thunderbolt 5 is an 80Gb/s link, or up to 120Gb/s in Bandwidth Boost mode for video, according to [CalDigit's TS5 documentation](https://www.caldigit.com/thunderbolt-5-dock-ts5/). The Air's port is 40Gb/s. Buying a Thunderbolt 5 dock for an M5 Air is a bet on your next laptop, not a speed upgrade for this one.

That can still be rational. A Thunderbolt 5 dock may have better port selection, higher charging headroom, or dual HDMI outputs that a cheaper Thunderbolt 4 dock lacks. Just do not buy it expecting the Air to exceed Apple's published display limits.

## Three specs that decide if a dock works

### 1. Native display streams, not MST

This is the trap. Many inexpensive "dual HDMI" USB-C hubs use Multi-Stream Transport (MST) to split one DisplayPort signal into two. On Windows, that usually produces two independent extended displays. On macOS, it does not.

Plugable's technical guide puts it plainly: "macOS does not support MST for extending multiple independent displays," and an MST-based dock on a Mac will typically cause the monitors to mirror each other. Its Apple silicon display guide repeats the point: "If you plug an MST dock into a Mac (even the new M5 Max), both monitors will show the same image."

So a dock that says "dual display" is not automatically a Mac dual-display dock. The vendor has to document native macOS support, and the design has to provide two independent display paths — two downstream Thunderbolt/USB4 ports, or dedicated video outputs fed by separate streams. If a product page only says "MST" and "Windows extended display", assume it will mirror on your Air.

### 2. Video-capable ports, not just USB-C ports

Docks increasingly have data-only USB-C ports and separate Thunderbolt or HDMI outputs. CalDigit is explicit about this on the TS5: the USB-C and USB-A ports are for data, and monitors must connect to the spare Thunderbolt 5/USB4 ports.

That matters when you count ports on a spec sheet. "Four USB-C ports" can mean four places to plug a keyboard, drive, and phone — and zero places to plug a monitor. Look for the words DisplayPort, HDMI, or Thunderbolt next to the port, not just the connector shape.

### 3. Enough charging headroom, and honest wattage

The Air does not need 140W. It will draw what it needs, and the dock will supply only that. But a dock that advertises 100W and then redirects power to its own USB ports under load can leave a laptop charging slowly during a video call.

CalDigit makes a point of claiming sustained 140W on the TS5 and sustained 98W on the TS4 because the power supply is sized for the whole dock. That is a vendor claim, not an independent measurement, but it is the right question to ask: does the advertised laptop wattage survive when the other ports are busy?

## The picks

### Best for two HDMI monitors: Plugable TBT-UDH2

The TBT-UDH2 is the most directly useful dock for an Air owner with two HDMI monitors. Plugable describes it as a 16-in-1 Thunderbolt 5 dock with **two HDMI 2.1 ports**, each rated up to 8K at 60Hz or 4K at 144Hz, plus a downstream Thunderbolt 5 port that can add a third display on M5 Pro and Max machines. It also includes 140W host charging, 2.5GbE, SD 4.0 and microSD readers, and a 3.5mm headset jack.

The reason it tops this list is not the port count. It is that Plugable says the dock drives two high-resolution displays **natively, without dongles or adapters**, and lists compatibility with Thunderbolt 5, Thunderbolt 4, and USB4 laptops. On the Air, it will negotiate a Thunderbolt 4 link; the displays do not need DisplayLink.

What to check before buying:

- Your monitors' HDMI version and DSC support. The dock's "up to 4K144" rating is a ceiling, not a guarantee for a 4K60 panel or a marginal cable.
- The Air's own limit: two externals, full stop. The third downstream port is for a future Pro or Max Mac.
- List price was **$349.95** on Plugable's page when checked on 8 November 2026. Confirm it at checkout; prices move.

### Best if you will upgrade the Mac: CalDigit TS5

The TS5 is the "buy once" option. It has **15 ports**, including four Thunderbolt 5 ports, 140W charging, 2.5GbE, and five USB ports (four at 10Gb/s plus one USB 2.0 port for a keyboard or mouse). CalDigit rates it for dual displays on Thunderbolt 4 hosts and up to three displays on supported Thunderbolt 5 hosts, with four displays possible on an M5 Max.

On your Air today, that means dual displays and Thunderbolt 4 bandwidth. On a future M5 Pro or Max laptop, the same dock can drive more screens and 80Gb/s devices. That is the argument for paying for it now.

The trade-off: there is no dedicated HDMI or DisplayPort output. Monitors connect to the spare Thunderbolt 5 ports, which is fine for USB-C and Thunderbolt displays and requires a USB-C to HDMI or DisplayPort adapter for older monitors. CalDigit also notes that M1 through M4 Macs are limited to HDMI 2.0b over their Thunderbolt ports, so a USB-C to DisplayPort cable is the better path for high refresh rates on those machines. The M5 Air is not in that footnote; if you are chasing 4K144, use DisplayPort where you can and verify the whole chain.

### Best for a DisplayPort monitor and a USB-A collection: CalDigit TS4

The TS4 is the Thunderbolt 4 workhorse: **18 ports**, 98W charging, 2.5GbE, a dedicated DisplayPort 1.4 output, and two downstream Thunderbolt 4 ports. CalDigit rates it for a single 8K or dual 6K displays at 60Hz with Thunderbolt hosts.

For an Air owner, the appeal is the port mix. If you have a DisplayPort monitor, a couple of USB-A drives, wired Ethernet, and a headset, the TS4 covers all of it without adapters, and its Thunderbolt 4 design matches the Air's own port. The limitation is the same as every dock here: the Air still caps you at two external displays.

### Best for one display only: Anker 555 USB-C Hub

The Anker 555 is an 8-in-1 USB-C hub, not a Thunderbolt dock. It provides one HDMI 2.0 port at 4K60, 100W pass-through charging (Anker says 85W to the laptop), 1GbE Ethernet, SD and microSD slots, and USB-A ports.

If your plan is one 4K60 monitor plus a wired network and a card reader, this is the sensible spend. It is not a dual-monitor solution, and it is not marketed as one. Two hubs is not a documented dual-display setup and it occupies both of the Air's ports; a dock with two native streams is the safer purchase.

## The cheap dual-HDMI hub trap

A cheap hub with two HDMI ports is a common bad purchase in this category. It may work beautifully on a Windows laptop and mirror on a Mac, because the two designs rely on different display technologies.

There is a legitimate exception: **DisplayLink**. A DisplayLink dock or adapter uses a driver and a chipset to compress video and send it over USB data. It can add displays beyond what the Mac's native display engines support, which is why it is often used with base-model Macs and mixed Mac/Windows fleets.

It is not the same as native video. Plugable's guide notes that DisplayLink on macOS requires the DisplayLink Manager app and Screen Recording permission, and that it is "not identical to native GPU video" for latency-sensitive, colour-critical, or graphics-intensive work. For email, documents, and a chat window, that trade-off can be fine. For colour grading or gaming, it is the wrong tool.

If a product page does not say "native macOS dual display", "Thunderbolt", or "DisplayLink", treat its dual-HDMI claim as unproven for your Air.

## Setup checklist

1. **Connect the displays to video ports.** On the TS5, that means the Thunderbolt ports, not the USB-C data ports. On the TBT-UDH2, use the HDMI ports.
2. **Use the cable that came with the dock, or a certified Thunderbolt cable.** Display problems are often cable problems, especially at 4K144 and 6K.
3. **Prefer DisplayPort or USB-C video over HDMI adapters for high refresh rates.** CalDigit's HDMI 2.0b note for M1–M4 Macs is the kind of limit that does not appear on the monitor's box.
4. **Set the mode in System Settings → Displays.** Check that the second screen is set to "Extend", not "Mirror", and confirm the refresh rate in the display's own menu.
5. **Test with the lid open first.** Apple says the built-in display is supported alongside two externals. If the setup misbehaves, closing the lid is a useful diagnostic, not a permanent workaround.
6. **Update macOS and dock firmware.** Display negotiation bugs get fixed on both sides.

## FAQ

### Can the M5 MacBook Air run three external monitors?

No. Apple lists two external displays, plus the built-in display. A dock with three or four video outputs cannot exceed that limit on this machine.

### Does a Thunderbolt 5 dock make the Air faster?

No. The Air's Thunderbolt 4 port is a 40Gb/s link. A Thunderbolt 5 dock will run at Thunderbolt 4 speed. It may still be worth buying for port selection, charging, or a future laptop.

### Will any dual-HDMI dock work with a Mac?

No. If the dock splits one DisplayPort stream with MST, macOS will typically mirror the two screens. Look for native macOS dual-display support or Thunderbolt downstream ports.

### Is DisplayLink good enough for two monitors?

For office work, often yes. It requires a driver and Screen Recording permission, adds compression, and is not ideal for colour-critical or latency-sensitive work.

### Do I need a 140W dock for a MacBook Air?

No. The Air will only draw the power its own charging system accepts, so a 140W dock will not charge it faster than the laptop allows. Buy the dock for its display paths and ports; the wattage headroom matters if you later move to a 16-inch MacBook Pro.

If you are still comparing, the [printable dock checklist](/checklist/) turns this guide into a twelve-point buying check.

## Sources

- [Apple — MacBook Air technical specifications](https://www.apple.com/macbook-air/specs/) (display support, ports, DSC), checked 8 November 2026.
- [CalDigit — Thunderbolt 5 Dock TS5](https://www.caldigit.com/thunderbolt-5-dock-ts5/) (ports, charging, display support, HDMI 2.0b footnote), checked 8 November 2026.
- [CalDigit — Thunderbolt Station 4](https://www.caldigit.com/thunderbolt-station-4/) (ports, 98W, dual 6K), checked 8 November 2026.
- [Plugable — 140W 16-in-1 Thunderbolt 5 Dock announcement](https://plugable.com/blogs/news/plugable-s-140w-16-in-1-thunderbolt-5-dock-packs-power-and-ports-including-dual-hdmi-2-1) (TBT-UDH2 ports, display ratings, list price), checked 8 November 2026.
- [Plugable — Understanding multiple displays on Apple silicon Macs](https://plugable.com/blogs/news/understanding-multiple-displays-on-apple-silicon-macs) (MST mirroring, DisplayLink requirements), checked 8 November 2026.
- [Plugable — USB-C docking guide: Alt Mode, MST, DisplayLink and Thunderbolt](https://plugable.com/blogs/news/navigating-usb-c-docking-understanding-alt-mode-mst-displaylink-and-thunderbolt), checked 8 November 2026.
- [Anker — 555 USB-C Hub (8-in-1)](https://www.anker.com/products/a8383) (HDMI 2.0 4K60, 100W pass-through, 85W laptop charging, 1GbE), checked 8 November 2026.

*Specs checked 8 November 2026. If a vendor changes a product page, the source links above are how you catch us.*
