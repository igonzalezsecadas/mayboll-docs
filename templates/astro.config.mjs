import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import maybollConfig from './mayboll.config.mjs';

const cssVariableTheme = {
  name: 'css-variables',
  type: 'dark',
  colors: {},
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: 'var(--shiki-token-comment)' },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['string', 'punctuation.definition.string', 'string punctuation'],
      settings: { foreground: 'var(--shiki-token-string)' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
    {
      scope: ['constant.numeric', 'constant.character.numeric'],
      settings: { foreground: 'var(--shiki-token-number)' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'entity.name.class', 'support.class'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['variable', 'meta.definition.variable.name'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['constant', 'support.constant'],
      settings: { foreground: 'var(--shiki-token-number)' },
    },
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
    {
      scope: ['markup.heading', 'punctuation.definition.heading'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['markup.bold', 'punctuation.definition.bold'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['markup.italic', 'punctuation.definition.italic'],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['markup.link.url', 'string.other.link'],
      settings: { foreground: 'var(--shiki-token-string)' },
    },
  ],
};

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: cssVariableTheme,
      wrap: true,
    },
  },
  site: 'https://example.com',
  outDir: './dist',
  base: maybollConfig.base || '',
});
