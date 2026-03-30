import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseCommonFields = {
  title_en: z.string(),
  title_de: z.string(),
  description_en: z.string(),
  description_de: z.string(),
  date: z.coerce.date(),
};

const itemCommonFields = {
  ...baseCommonFields,
  image: z.string().optional(),
  medium_en: z.string().optional(),
  medium_de: z.string().optional(),
  dimensions: z.string().optional(),
};

const paintings = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/paintings' }),
  schema: ({ image }) => z.object({
    ...itemCommonFields,
    image: image().optional(),
  }),
});

const objects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/objects' }),
  schema: ({ image }) => z.object({
    ...itemCommonFields,
    image: image().optional(),
  }),
});

const installations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/installations' }),
  schema: ({ image }) => z.object({ ...baseCommonFields,
    images: z.array(image()).optional(),
    location_en: z.string().optional(),
    location_de: z.string().optional()
  }),
});

const bio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/bio' }),
  schema: ({ image }) => z.object({
    title_en: z.string(),
    title_de: z.string(),
    body_en: z.string().optional(),
    body_de: z.string().optional(),
    image: image().optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/contact' }),
  schema: z.object({
    title_en: z.string(),
    title_de: z.string(),
    email: z.string().optional(),
    instagram: z.string().optional(),
    body_en: z.string().optional(),
    body_de: z.string().optional(),
  }),
});

export const collections = { paintings, objects, installations, bio, contact };

