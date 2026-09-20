# ToastidReady — AI SOP Builder
**by [Toastid Tech LLC](https://toastidtech.com)**

> Turn any business process into a professional Standard Operating Procedure in minutes — powered by AI.

*(Formerly "SOPilot" — rebranded September 2026.)*

[![Live App](https://img.shields.io/badge/Live%20App-ToastidReady-C8943A?style=for-the-badge)](https://toastidtech.github.io/sopilot/)
[![Toastid Tech](https://img.shields.io/badge/Toastid%20Tech-LLC-0F0E0C?style=for-the-badge)](https://toastidtech.com)

---

## What is ToastidReady?

ToastidReady is a Progressive Web App (PWA) that uses AI to generate complete, role-assigned Standard Operating Procedures for small businesses. Owners and managers describe a process in plain English — ToastidReady produces a formatted, interactive SOP document in seconds.

### Who it's for
- Small business owners who need SOPs but don't have time to write them
- Office managers standardizing team processes
- Consultants delivering SOPs to clients
- Any business preparing for compliance audits or team scaling

---

## Features

- **3-Step AI Wizard** — guided intake: process info → roles → details
- **Role Assignment** — every SOP step is assigned to a specific job title
- **Interactive Checklist** — tap steps to mark completion; live progress bar
- **Refinement Chat** — ask ToastidReady to revise, add steps, or change tone
- **Lead Capture** — first-visit name/email modal; syncs to HubSpot when configured, otherwise stored locally (never blocks the app)
- **Copy to Clipboard** — plaintext export ready to paste anywhere
- **PWA** — installable on Android/iOS, works offline after first load
- **Freemium** — 5 free SOPs, then $9.99/mo paywall

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML / CSS / JS (single file PWA) |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| Proxy | Cloudflare Worker (CORS handler) |
| Payments | Payment link ($9.99/mo) — see CONFIG |
| Hosting | GitHub Pages |
| Fonts | Google Fonts (Fraunces, DM Sans, DM Mono) |

---

## Before launch — CONFIG

Open `index.html` and fill in the `CONFIG` block at the top of the script (clearly marked **"SEAN: FILL THESE IN"**):

| Key | Value | Status |
|---|---|---|
| `AI_PROXY_URL` | Cloudflare Worker → Anthropic | ⚠️ **Action needed** — the current URL (`https://muddy-violet-2a0d.toastidtechllc.workers.dev`) 302-redirects to Cloudflare Access login, so it is NOT publicly callable. Make the worker public (remove Access) or use a working public worker URL. |
| `HUBSPOT_PORTAL_ID` | Your HubSpot portal ID | Optional — leave empty (with `HUBSPOT_FORM_GUID`) to keep leads local-only |
| `HUBSPOT_FORM_GUID` | HubSpot form GUID | Optional — see above |
| `PAYMENT_URL` | $9.99/mo payment link | Sean is creating this now — empty shows a disabled "Payment link coming soon" button (no fake URL) |
| `FREE_SOP_LIMIT` | `5` | Free SOP generations before the paywall |

---

## Project Structure

```
sopilot/                  # repo name unchanged (GitHub Pages URL stays /sopilot/)
├── index.html            # Main app (single-file PWA) — ToastidReady build
├── manifest.json         # PWA manifest (ToastidReady branding)
├── sw.js                 # Service worker (cache-first, toastidready-v1)
├── 404.html              # GitHub Pages SPA routing
├── logo-192.png          # PWA icon (192×192)
├── logo-512.png          # PWA icon (512×512)
├── .gitignore
└── README.md
```

---

## Deployment

This app is hosted on **GitHub Pages** at:
```
https://toastidtech.github.io/sopilot/
```

To deploy updates:
1. Edit `index.html` locally
2. Commit and push to `main`
3. GitHub Pages auto-deploys within ~60 seconds
4. Bump `CACHE_NAME` in `sw.js` (e.g. `toastidready-v2`) to force cache refresh for existing users

---

## Cloudflare Worker

All Anthropic API calls are proxied through a Cloudflare Worker to prevent CORS issues and keep the API key server-side.

**Worker URL:** `https://muddy-violet-2a0d.toastidtechllc.workers.dev` (see CONFIG warning above)

The Worker must:
1. Accept POST requests with a JSON body
2. Forward to `https://api.anthropic.com/v1/messages`
3. Return the Anthropic API response
4. Set appropriate CORS headers

The app sends the standard Anthropic Messages shape:
```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 4000,
  "system": "<SOP system prompt demanding a JSON object>",
  "messages": [{ "role": "user", "content": "<wizard answers>" }]
}
```
and defensively parses the JSON from the response (strips markdown fences if present).

---

## Pricing & Monetization

| Plan | Price | Link |
|---|---|---|
| ToastidReady | $9.99/mo | *(Sean is creating the payment link — set `PAYMENT_URL` in CONFIG)* |

5 free SOP generations, then the paywall appears. Counter stored in `localStorage` (`toastidready_sop_count`).

---

## Toastid Tech App Suite

| App | Description | Status |
|---|---|---|
| [Cope](https://toastidtech.github.io/cope/) | Mental wellness AI chat | ✅ Live |
| [Micro Habits](https://toastidtech.github.io/micro-habits/) | Habit tracking | ✅ Live |
| [SentryAI](https://toastidtech.github.io/sentryai/) | AI cybersecurity advisor | 🔜 Coming Soon |
| [ToastidReady](https://toastidtech.github.io/sopilot/) | AI SOP builder | 🔜 Coming Soon |

---

## Brand

- **Primary Font:** Fraunces (display) + DM Sans (body) + DM Mono (labels)
- **Colors:** Ink `#0F0E0C` · Paper `#F5F0E8` · Gold `#C8943A`
- **Aesthetic:** Warm editorial — aged paper, ruled lines, premium document feel

> Note: this warm editorial brand differs from Toastid Tech's usual dark electric-blue look — it was specced this way in the original SOPilot README and kept for the rebrand. Easy to restyle later if Sean wants brand alignment.

---

## Contact

**Toastid Tech LLC**
- 🌐 [toastidtech.com](https://toastidtech.com)
- 📧 info@toastidtech.com
- 📱 (479) 339-1504
- 𝕏 [@ToastidTechLLC](https://twitter.com/ToastidTechLLC)

---

*© 2026 Toastid Tech LLC. All rights reserved.*
