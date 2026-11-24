# Design brief and system (read before changing the UI)

Purpose: help one person make a Windows cursor and install it. Tone: plain, direct, short sentences, left aligned.

## Rules
- No gradients except the transparency checkerboard. No glow. No pill buttons. No emoji or stock icons. No em dashes. No fake photos, reviews or numbers.
- No animation on the site cursor. Motion only for feedback, spatial continuity or state change. Never on high-frequency actions (canvas, shortcuts, command menu).
- Every error says what happened and what to do next.

## Tokens
- Colors (three): ink `--tx`, paper `--bg/--sf/--s2`, one accent `--ac`. Functional marker: the hotspot ring is red so it never blends with the accent.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48 (`--p1` to `--p7`). Nothing else.
- Radius: one value, `--r` (8px), on every surface, control and thumbnail.
- Type: IBM Plex Sans, then system-ui. Body 16px. Headings tight (-0.02em), `text-wrap: balance`. Body `text-wrap: pretty`.
- Hit area: 40px minimum (Fitts). Focus ring: 2px accent.

## Laws applied
Hick: few choices per view, advanced controls collapsed. Miller: menus under 7 items. Jakob: File and Export menus, tabs, Ctrl+Z. Doherty: feedback under 400ms, toasts for async work. Frequency of use: keyboard and canvas actions never animate.
