import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'mvp', 'wip']),
    decision: z.string(),
    metric: z.string(),
    stack: z.string(),
    order: z.number(),
    demo: z.string().optional(),
    repo: z.string().optional(),
    videos: z.string().optional(),
  }),
});

const prdCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    insight: z.string(),
    northStar: z.string(),
    order: z.number(),
    pdfPath: z.string().optional(),
  }),
});

export const collections = {
  work: workCollection,
  prd: prdCollection,
};
