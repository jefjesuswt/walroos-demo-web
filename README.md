# walroos-demo-web

A small React + Vite frontend for [walroos-demo-api](https://github.com/jefjesuswt/walroos-demo-api), used to try [walroos](https://github.com/jefjesuswt/walroos) static sites. There's no Dockerfile: walroos finds its `bun.lock`, builds the site with Bun and serves `dist/`.

In walroos:
- Add an application from this repo and pick **Build: Static site**. The runtime, commands and publish folder are all detected.
- Set `VITE_API_URL` to the API's public URL, for example `https://notes-api.example.com`. Vite puts it into the bundle when the site builds, so a change applies on the next deploy.
- Optional: `BUN_VERSION=1.2` chooses the Bun version, as on Netlify.

Locally: `bun install && VITE_API_URL=http://localhost:3000 bun run dev`.
