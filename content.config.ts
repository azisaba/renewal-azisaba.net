import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        title: z.string(),
      }),
    }),
    article: defineCollection({
      type: "page",
      source: "articles/*.md",
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date(),
        published: z.boolean().default(true),
        thumbnail: z.string(),
      }),
    }),
    recruit: defineCollection({
      type: "page",
      source: "recruits/*.md",
      schema: z.object({
        recruitId: z.string(),
        title: z.string(),
        summary: z.string(),
        date: z.date(),
        published: z.boolean().default(true),
        thumbnail: z.string(),
        tags: z.string().array(),
      }),
    }),
    rule: defineCollection({
      type: "page",
      source: "rules/*.md",
      schema: z.object({
        title: z.string(),
        category: z.enum(["general", "minecraft", "discord", "guideline", "other"]),
        lastUpdated: z.date(),
      }),
    }),
    server: defineCollection({
      type: "page",
      source: "servers/*.md",
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        status: z.enum(["available", "inDevelopment", "closed"]),
        iconSrc: z.string().nullable(),
        supportedVersion: z.string().array(),
      }),
    }),
    faq: defineCollection({
      type: "data",
      source: "faqs/*.yaml",
      schema: z.object({
        category: z.enum(["support", "recruitment"]),
        question: z.string(),
        answer: z.string(),
      }),
    }),
  },
});
