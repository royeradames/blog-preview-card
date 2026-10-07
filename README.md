# Blog preview card

The Frontend Mentor blog card on Next.js 16.3.6, React 19.2.8 and Tailwind 4.2.1. Server-rendered semantic content, a local licensed font and supplied artwork require no browser script to work.

The title opens MDN's introductory HTML/CSS material. A visible disclosure identifies the sample author and date. The page collects no data and has no account or storage layer. Original design/source notes are in `reference/SOURCES.md`.

## Development

Node 24 is used for verification. Run `npm ci`, then `npm run dev`. Validation uses `npm run typecheck`, `npm run lint` and `npm run build`. Local production build, types, lint, production audit and three browser contracts pass. Browser checks cover eight widths, native keyboard links and operation without JavaScript. The actual 1440px and 375px renders, loaded variable font and original icon were inspected. Hosted Lighthouse and release evidence remain pending; local checks are not a deployed result.
