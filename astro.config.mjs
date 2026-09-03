import { defineConfig } from 'astro/config';

// TODO(#1): no production domain is registered yet ("domainimiz yok şimdilik") — this
// placeholder only affects generated canonical/sitemap URLs during local build/preview.
// Replace with the real apex domain once one is registered.
export default defineConfig({
  site: 'https://minderhq.github.io',
  base: '/www',
  compressHTML: true,
});
