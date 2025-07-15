import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      z.date()
    ),
    updateDate: z.preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      z.date().optional()
    ),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
