# www

Public marketing / landing website for **Minder**.

Status: **MVP landing page** — tracked in [minderhq/www#1](https://github.com/minderhq/www/issues/1).
Part of the closed-core / open-ecosystem org layout: this site is public; the Minder core is a separate, private repo.

Built with [Astro](https://astro.build) as a static site (no backend). No production
domain is registered yet — see `astro.config.mjs`.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + static build to dist/
```

Pricing/tiers content is intentionally minimal for now: the free-tier boundary and
hosted-tier pricing are open product decisions (minderhq/minder#1295), not yet
finalized — this site won't get ahead of that decision with invented numbers.
