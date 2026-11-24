# Cursor Lab

Browser-based editor for Windows .cur and .ani cursors. No build step, no dependencies, no network calls.

Run: open `index.html`, or serve the folder with any static host. Test: `npm test` (Node 18+).

## Before launch (not done in this repo)
- Connect your custom domain at your host (add the domain, then the DNS records the host gives you).
- Add a contact address to the privacy policy and terms if you want users to reach you.
- Have the privacy policy and terms reviewed for your jurisdiction. They are plain templates.

## Layout
css/app.css, js/ (core, engine, formats, state, ui, canvas, timeline, preview, packs, shell, app, extras), tests/formats.test.js, favicon.svg.
Scripts are classic files that share one global scope and must load in the order listed in index.html.

## Known limits
Frame-by-frame editing, crop, brush, eraser, grouping, GIF export, pack import and DIB-encoded .cur import are not implemented.
