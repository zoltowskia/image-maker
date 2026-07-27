# Hillsdale Image Generator (Gemini POC)

A two-step image generator UI wired to Google's Gemini image API through a
server-side API route, so the API key never reaches the browser.

## Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS

## Setup

```bash
npm install
cp .env.example .env.local
# then edit .env.local and paste your real Gemini API key
npm run dev
```

Get a Gemini API key at https://aistudio.google.com/apikey.

Open http://localhost:3000.

## How the key stays server-side

- `app/api/generate-image/route.ts` is a Next.js **Route Handler** — it only
  ever runs on the server (Node runtime), never in the browser bundle.
- It reads `process.env.GEMINI_API_KEY`, which comes from `.env.local`.
  `.env.local` is gitignored, so the key never gets committed.
- The browser only ever calls `POST /api/generate-image` with the form
  selections (property, category, style, tone, description, aspect ratio).
  It never sees the Gemini key or talks to Google directly.

## Project structure

```
app/
  layout.tsx                  Root layout, fonts
  page.tsx                    Main page (sidebar + views + footer)
  globals.css                 Tailwind entrypoint
  api/generate-image/route.ts Server route — calls Gemini, holds the key
components/
  Sidebar.tsx                 Left nav (Generator / Assets / Favorites)
  StepProgress.tsx            Step 1 / Step 2 progress bar
  Step1PropertySpecs.tsx      Property + aspect ratio
  Step2Describe.tsx           Category / style / tone / description
  GeneratorWizard.tsx         Wizard state + step switching
  ResultView.tsx              Generated image + download/regenerate
  LoadingView.tsx             Spinner while generating
  AssetGrid.tsx               Grid used by Assets & Favorites views
  Chip.tsx                    Reusable pill-button selector
  ShieldLogo.tsx               Logo mark
  SiteFooter.tsx               Footer
lib/
  types.ts                    Shared TypeScript types
  buildPrompt.ts               Turns form selections into a Gemini prompt
```

## Notes / next steps

- History and favorites are in-memory only (per browser session) — add a
  database or Google Drive/Cloud Storage if you want persistence across
  reloads or users.
- The API route currently generates one image per request. It's a small
  change to support multiple variations per generation if needed.
- Swap `GEMINI_IMAGE_MODEL` in `.env.local` to `gemini-3-pro-image-preview`
  for higher-quality (slower, pricier) output.
# Deployment trigger 2026-07-27T18:43:00Z
