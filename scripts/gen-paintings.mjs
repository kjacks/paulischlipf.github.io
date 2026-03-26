import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../../');
const uploadsDir = path.join(root, 'public/uploads');
const contentDir = path.join(root, 'src/content/paintings');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

fs.mkdirSync(contentDir, { recursive: true });

const files = fs.readdirSync(uploadsDir)
  .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()));

for (const file of files) {
  const slug = path.basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const outPath = path.join(contentDir, slug + '.md');
  if (fs.existsSync(outPath)) {
    console.log('skip (exists)', slug + '.md');
    continue;
  }

  const imagePath = '/uploads/' + file;
  const content = `---
title_en: Untitled
title_de: Ohne Titel
description_en: >-
  Enter description here.
description_de: >-
  Beschreibung hier eingeben.
date: 2024-01-01
image: ${JSON.stringify(imagePath)}
---
`;
  fs.writeFileSync(outPath, content);
  console.log('created', slug + '.md');
}
