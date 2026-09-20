# ToastidReady — Build Notes (2026-09-20)

Rebrand of **SOPilot → ToastidReady**, full single-file PWA build in this directory.
Built from the repo's README spec + Sean's direction ("same structure", lead capture, $9.99/mo).

## What was built

**`index.html`** (complete rewrite, ~1,150 lines, vanilla HTML/CSS/JS, no external JS libs)
- **CONFIG block** at the top of the script, clearly marked `★ SEAN: FILL THESE IN ★` — the only values Sean touches.
- **Landing view**: hero headline, "Build my SOP" CTA, how-it-works (3 steps), feature grid, $9.99/mo pricing teaser, who-it's-for sheet, footer.
- **3-step wizard**: ① Process (name, business type, description) → ② Roles (dynamic add/remove job-title list) → ③ Details (frequency, tools, tone, notes). Per-step validation.
- **Generating view**: animated quill + status.
- **Result view**: formatted SOP document (title, purpose, role chips, interactive checklist with live progress bar, pro tips), Copy / Refine / New SOP actions, refinement chat panel.
- **Lead capture modal** on first visit (name + email → `localStorage["toastidready_lead"]`). If `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_GUID` are set, POSTs to `api.hsforms.com` (firstname + email); otherwise local-only. Never blocks the app. Skippable.
- **Freemium**: `FREE_SOP_LIMIT: 5` generations (`localStorage["toastidready_sop_count"]`), then paywall modal at $9.99/mo. Empty `PAYMENT_URL` → disabled "Payment link coming soon" button (no invented URL).
- **AI**: POSTs Anthropic Messages shape `{model:"claude-sonnet-4-6", max_tokens:4000, system, messages}` to `AI_PROXY_URL`. System prompt demands a single JSON object `{title, purpose, roles[], steps[{role,title,detail}], tips[]}`. Defensive parse (strips markdown fences). On failure shows an honest error card ("AI service unreachable") — never fake content.
- **Refinement chat**: sends current SOP JSON + revision request, returns full updated JSON, re-renders.
- **Copy**: plaintext export (title, purpose, numbered `[Role]` steps, tips).
- Mobile-first responsive, PWA meta tags, service worker registration.

**`manifest.json`** — name/short_name "ToastidReady", ink theme color, paper background, scope/start_url `/sopilot/` (Pages URL unchanged).

**`sw.js`** — `CACHE_NAME = 'toastidready-v1'`, cache-first app shell, fonts network-first, AI-proxy + HubSpot traffic never cached.

**`404.html`** — title rebranded (redirect path `/sopilot/` unchanged).

**`README.md`** — full rebrand; pricing fixed to single **$9.99/mo** plan (replaced the wrong $12.99/$19.99 table); CONFIG table with Sean's action items; deploy instructions kept.

## SEAN must provide (exact CONFIG values)

| Key | Needed | Notes |
|---|---|---|
| `AI_PROXY_URL` | ⚠️ **BLOCKER** — working public worker URL | Current default `https://muddy-violet-2a0d.toastidtechllc.workers.dev` **302-redirects to Cloudflare Access login** (verified 2026-09-20) — not publicly callable. Make the worker public (remove Access) or supply a new URL. Until then, generation shows the error card. |
| `PAYMENT_URL` | $9.99/mo payment link | Sean is creating this now — paste into CONFIG. Empty = disabled "coming soon" button. |
| `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_GUID` | HubSpot portal ID + form GUID | Optional. Empty = leads stay in localStorage only. |
| `FREE_SOP_LIMIT` | `5` | Already set; change if desired. |

## ⚠️ Brand discrepancy (flagged per instructions)

The README specced a **warm editorial** brand (Ink `#0F0E0C`, Paper `#F5F0E8`, Gold `#C8943A`, Fraunces + DM Sans, aged-paper/ruled-lines document feel) — this build follows that spec faithfully. It differs from Sean's usual **dark electric-blue** Toastid Tech brand. If he wants brand alignment later, it's a CSS-variable-level restyle.

## Validation

- `node --check` on extracted script: **OK**
- HTML tag balance check: **OK** (no unclosed/mismatched tags)
- `manifest.json`: valid JSON
- No leftover "SOPilot" brand strings in app UI. Remaining "sopilot" occurrences are intentional: `/sopilot/` URL paths (repo/Pages URL unchanged), README historical note ("Formerly SOPilot"), and this file.
- All CONFIG placeholders obvious (`★ SEAN: FILL THESE IN ★`).

## Deploy (Sean pushes — no git auth in this environment)

```bash
cd ~/workspace/sopilot-build
git add -A && git commit -m "Rebrand to ToastidReady: full PWA build, \$9.99/mo, lead capture" && git push origin main
# Pages auto-deploys in ~60s. Bump CACHE_NAME in sw.js (e.g. toastidready-v2) if pushing a fix later.
```

## Files changed
- `index.html` (rewritten)
- `manifest.json` (rebranded)
- `sw.js` (rebranded, cache bumped)
- `404.html` (title)
- `README.md` (rebranded, pricing fixed)
- `BUILD_NOTES.md` (this file)
- Unchanged: `logo-192.png`, `logo-512.png`, `.gitignore`
