import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        updated: z.date().optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        draft: z.boolean().default(false),
        guid: z.string().optional(),
        feedDescription: z.string().optional(),
      }),
    }),
  },
})
