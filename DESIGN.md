# Design brief and system (read before changing the UI)

Purpose: help one person make a Windows cursor and install it. Tone: plain, direct, short sentences. Approach: Apple Human Interface Guidelines, adapted for the web.

## Rules
- Two layers. Content (panels, canvas, lists) is opaque. Glass (`--gl` with backdrop-filter) is only for the floating layer: sticky header, menus, command palette, mobile tab bar.
- Glass falls back to an opaque surface under `prefers-reduced-transparency` and `prefers-contrast: more`. Motion falls back under `prefers-reduced-motion`.
- One accent (`--ac`) for the primary action (Download) and the selected state. Everything else is neutral.
- No emoji, no stock icons, no fake numbers. Every error says what happened and what to do next.
- No animation on the canvas, shortcuts or command menu. Motion only for feedback and state change.
- Nothing loads from the network. System font stack only.

## Tokens
- Colors: ink `--tx`, surfaces `--bg/--sf/--s2`, secondary text `--mu`, accent `--ac`. Light and dark both defined. Text contrast at least 4.5:1. The hotspot ring is red so it never blends with the accent.
- Spacing: 4, 8, 12, 16, 24, 32, 48 (`--p1` to `--p7`).
- Radius: `--r` 12px for surfaces, `--rc` 10px for controls.
- Type: system UI stack (SF Pro, Segoe UI Variable). Body 16px. Headings tight (-0.022em).
- Hit area: 40px, 44px on touch (`--hit`). Focus ring: 2px accent.

## Signature
The actual-size preview under the canvas: the cursor at 1:1, exactly as Windows draws it.

## Navigation
Desktop: tabs in the header. Phone (720px and below): the tabs become a floating bottom bar. The inspector becomes a bottom sheet (960px and below).
