import { docsSchema } from '@levino/shipyard-docs'
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const docs = defineCollection({
  schema: docsSchema,
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
})

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    summary: z.string(),
  }),
})

export const collections = {
  docs,
  news,
}
