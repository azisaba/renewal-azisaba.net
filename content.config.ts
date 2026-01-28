import {defineContentConfig, defineCollection, z, defineCollectionSource} from '@nuxt/content';

export default defineContentConfig({
    collections: {
        connect: defineCollection({
            type: 'page',
            source: 'connect/*.md',
            schema: z.object({
                title: z.string()
            })
        }),
        donation: defineCollection({
            type: 'page',
            source: 'donation/*.md'
        }),
        links: defineCollection({
            type: 'page',
            source: 'links/*.md'
        }),
        news: defineCollection({
            type: 'page',
            source: 'news/*.md'
        }),
        /*
        news: defineCollection({
            type: 'data',
            source: defineCollectionSource({
                getKeys(): Promise<string[]> {
                    return fetch('http://localhost:8056/items/news?fields=uuid')
                        .then(res => res.json())
                        .then(data => data.data.map((obj: {uuid: string}) => `${obj["uuid"]}.json`))
                },
                getItem(id: string): Promise<string> {
                    return fetch(`http://localhost:8056/items/news/${id.replace(/\.json/g, "")}`)
                        .then(res => res.json())
                        .then(data=> data["data"])
                }
            }),
            schema: z.object({
                uuid: z.string(),
                title: z.string(),
                contents: z.string(),
                body: z.string()
            })
        }),
        */
        rules: defineCollection({
            type: 'page',
            source: 'rules/*.md'
        }),
        support: defineCollection({
            type: 'page',
            source: 'support/*.md'
        }),
    }
});