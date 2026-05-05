import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import maybollConfig from './mayboll.config.mjs';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://example.com',
  outDir: './dist',
  base: maybollConfig.base || '',
});
