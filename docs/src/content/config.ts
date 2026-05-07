import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    sidebar_label: z.string().optional(),
  }),
});

export const collections = { docs };
