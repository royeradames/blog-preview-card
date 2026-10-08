# Blog preview card

The Frontend Mentor blog card on Next.js 16.3.6, React 19.2.8 and Tailwind 4.2.1. Server-rendered semantic content, a local licensed font and supplied artwork require no browser script to work.

The title opens MDN's introductory HTML/CSS material. A visible disclosure identifies the sample author and date. The page collects no data and has no account or storage layer. Original design/source notes are in `reference/SOURCES.md`.

## Development

Live: https://blog-preview-card.royeradames.com/

Node 24. Run `npm ci`, then `npm run dev`. Validation uses `npm run lint`, `npm run typecheck`, `npm run build` and `npm test` (Playwright with installed Chrome; `PORT` overrides 4327). `tests/design.spec.ts` checks the Figma desktop, hover and mobile frames, the site identity, and every width from 320 to 1600 px in 10 px steps.

Design choices: the design's 12 and 14 px text is raised to the 16 px family floor. The Card Hover state grows the shadow to 16 px anywhere on the card, because the title link covers the card. The hovered title uses dark gold (#7a5a00) rather than the design's yellow, which is 1.6:1 on white. `og:site_name` and WebSite JSON-LD name the site "Blog Preview Card".
