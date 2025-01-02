// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { expressiveCodeOptions } from './src/site.config';
import icon from 'astro-icon';
import remarkUnwrapImages from 'remark-unwrap-images';
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts';
import rehypeExternalLinks from 'rehype-external-links';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.victorolmos.com',

  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap(),
    mdx(),
    icon()
  ],

  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer']
        }
      ]
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  },

  prefetch: true,
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});