import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
      }),
    }),
    news: defineCollection({
      type: "page",
      source: "news/*.md",
      // スキーマ定義
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().nullable(),
        image_cover: z.boolean().default(true),
        published: z.boolean(),
        date: z.date().nullable(),
      })
    }),
    devlog: defineCollection({
      type: "page",
      source: "devlog/*.md",
      // スキーマ定義
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().nullable(),
        image_cover: z.boolean().default(true),
        published: z.boolean(),
        date: z.date().nullable(),
      })
    }),
  }
})