import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { rehypeShiki } from '@astrojs/markdown-remark';
import rehypeMermaid from 'rehype-mermaid';
import { remarkReadingTime } from './remark-reading-time.mjs';

export default defineConfig({
  site: 'https://dhanushka2001.github.io',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeMermaid, rehypeShiki],
    shikiConfig: { theme: 'monokai' },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
    // No need to install anything extra for content collections!
  ],
});
