# SOPilot — AI SOP Builder
**by [Toastid Tech LLC](https://toastidtech.com)**

> Turn any business process into a professional Standard Operating Procedure in minutes — powered by AI.

[![Live App](https://img.shields.io/badge/Live%20App-SOPilot-C8943A?style=for-the-badge)](https://toastidtech.github.io/sopilot/)
[![Toastid Tech](https://img.shields.io/badge/Toastid%20Tech-LLC-0F0E0C?style=for-the-badge)](https://toastidtech.com)

---

## What is SOPilot?

SOPilot is a Progressive Web App (PWA) that uses AI to generate complete, role-assigned Standard Operating Procedures for small businesses. Owners and managers describe a process in plain English — SOPilot produces a formatted, interactive SOP document in seconds.

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
- **Refinement Chat** — ask SOPilot to revise, add steps, or change tone
- **Copy to Clipboard** — plaintext export ready to paste anywhere
- **PWA** — installable on Android/iOS, works offline after first load
- **Freemium** — 5 free SOPs, then subscription paywall

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML / CSS / JS (single file PWA) |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| Proxy | Cloudflare Worker (CORS handler) |
| Payments | Square payment links |
| Hosting | GitHub Pages |
| Fonts | Google Fonts (Fraunces, DM Sans, DM Mono) |

---

## Project Structure

```
sopilot/
├── index.html        # Main app (single-file PWA)
├── manifest.json     # PWA manifest
├── sw.js             # Service worker (cache-first)
├── 404.html          # GitHub Pages SPA routing
├── logo-192.png      # PWA icon (192×192)
├── logo-512.png      # PWA icon (512×512)
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
4. Bump `CACHE_NAME` in `sw.js` (e.g. `sopilot-v2`) to force cache refresh for existing users

---

## Cloudflare Worker

All Anthropic API calls are proxied through a Cloudflare Worker to prevent CORS issues and keep the API key server-side.

**Worker URL:** `https://muddy-violet-2a0d.toastidtechllc.workers.dev`

The Worker must:
1. Accept POST requests with a JSON body
2. Forward to `https://api.anthropic.com/v1/messages`
3. Return the Anthropic API response
4. Set appropriate CORS headers

---

## Pricing & Monetization

| Plan | Price | Link |
|---|---|---|
| SOPilot Standalone | $12.99/mo | *(Add Square link)* |
| Toastid Bundle (2 apps) | $19.99/mo | https://square.link/u/wAJSJVTD |

Promo codes managed via Square dashboard.

---

## Toastid Tech App Suite

| App | Description | Status |
|---|---|---|
| [Cope](https://toastidtech.github.io/cope/) | Mental wellness AI chat | ✅ Live |
| [Micro Habits](https://toastidtech.github.io/micro-habits/) | Habit tracking | ✅ Live |
| [SentryAI](https://toastidtech.github.io/sentryai/) | AI cybersecurity advisor | 🔜 Coming Soon |
| [SOPilot](https://toastidtech.github.io/sopilot/) | AI SOP builder | 🔜 Coming Soon |

---

## Brand

- **Primary Font:** Fraunces (display) + DM Sans (body)
- **Colors:** Ink `#0F0E0C` · Paper `#F5F0E8` · Gold `#C8943A`
- **Aesthetic:** Warm editorial — aged paper, ruled lines, premium document feel

---

## Contact

**Toastid Tech LLC**
- 🌐 [toastidtech.com](https://toastidtech.com)
- 📧 info@toastidtech.com
- 📱 (479) 339-1504
- 𝕏 [@ToastidTechLLC](https://twitter.com/ToastidTechLLC)

---

*© 2026 Toastid Tech LLC. All rights reserved.*
