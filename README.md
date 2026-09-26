# Мало волшебство — website source

See `../START-HERE.html` and `../handoff/DEVELOPER-HANDOFF.md` for the handoff.

Requirements: Node.js 22.13.0 or newer and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Development URL: http://localhost:5173

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

`pnpm start` runs the built Cloudflare Worker locally through Wrangler; use the URL printed in the terminal (normally http://127.0.0.1:8787).

This is the approved three-page interactive mockup. The books are explicitly labeled examples; real PDFs and a PDF reading experience are still to be added.

All site navigation uses ordinary anchor links. Keep that behavior until any replacement navigation is verified on the destination host.

This export contains no deployed Site project identity, credentials, environment secrets, dependencies, Git history, or local runtime state. Install dependencies with the included pnpm lockfile. The existing private site is unaffected by this export.
