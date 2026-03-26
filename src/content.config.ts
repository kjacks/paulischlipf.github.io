import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/works' }),
  schema: z.object({
    title_en: z.string(),
    title_de: z.string(),
    description_en: z.string(),
    description_de: z.string(),
    medium_en: z.string().optional(),
    medium_de: z.string().optional(),
    body_de: z.string().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const installations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/installations' }),
  schema: z.object({
    title_en: z.string(),
    title_de: z.string(),
    description_en: z.string(),
    description_de: z.string(),
    location_en: z.string().optional(),
    location_de: z.string().optional(),
    body_de: z.string().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, installations };

