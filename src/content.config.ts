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
    body_en: z.string().optional(),
    body_de: z.string().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const bio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/bio' }),
  schema: z.object({
    title_en: z.string(),
    title_de: z.string(),
    body_en: z.string().optional(),
    body_de: z.string().optional(),
    image: z.string().optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/contact' }),
  schema: z.object({
    title_en: z.string(),
    title_de: z.string(),
    email: z.string().optional(),
    body_en: z.string().optional(),
    body_de: z.string().optional(),
  }),
});

export const collections = { works, installations, bio, contact };

