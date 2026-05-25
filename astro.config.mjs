import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://PM-CyberSec.github.io',
  base: '/portfolio-site',
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
});
