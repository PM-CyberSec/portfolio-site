import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { existsSync } from 'fs';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://PM-CyberSec.github.io',
  base: '/portfolio-site',
  integrations: [tailwind({ applyBaseStyles: false })],
  // Exclude admin page from production builds
  ...(isDev ? {} : {
    vite: {
      build: {
        rollupOptions: {
          external: [/admin/]
        }
      }
    }
  })
});
