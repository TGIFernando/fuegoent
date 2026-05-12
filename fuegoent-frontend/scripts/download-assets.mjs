import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const assets = [
  // Home hero / event section images
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/Facetune_08-04-2026-22-16-11.jpg?v=1775711975&width=1920', dest: 'public/images/hero-main.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/collections/669AA9A9-E23E-4558-9746-14ED8ECC33E1.webp?v=1775720609&width=1920', dest: 'public/images/collections/archive-fridays.webp' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/collections/IMG_7580.jpg?v=1775720683&width=1920', dest: 'public/images/collections/traviesa-saturdays.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/collections/Screenshot_2026-04-09_at_12.21.10_AM.png?v=1775720774&width=1920', dest: 'public/images/collections/deseo-sundays.png' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/2FB28BA6-1733-4A16-B455-E9A865D7C43E.jpg?v=1777277098&width=1920', dest: 'public/images/events/event-1.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/2BC28306-5E2A-4E10-A4B0-27650D15CCA1.jpg?v=1777278075&width=1920', dest: 'public/images/events/event-2.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/80254ECB-7C8F-4936-BD01-FBF80FBD3F16.webp?v=1776853333&width=1920', dest: 'public/images/events/event-3.webp' },
  // Product images
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/5EAD7E99-20EA-4DCC-AD66-6AAE2549DBED.png?v=1777370249&width=500', dest: 'public/images/products/banda-night.png' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_9335.png?v=1777987661&width=500', dest: 'public/images/products/archive-fridays-58.png' },
  // Archive Fridays slideshow images
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8379.jpg?v=1776836317&width=1920', dest: 'public/images/archive/archive-1.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/B137A9BE-C916-4EA5-8C1F-C5024B4EA987.jpg?v=1775730781&width=1920', dest: 'public/images/archive/archive-2.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/4F2198AB-05F6-4A1B-98A7-993000D7B441.webp?v=1775717642&width=1920', dest: 'public/images/archive/archive-3.webp' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8386.jpg?v=1776836317&width=1920', dest: 'public/images/archive/archive-4.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8384.jpg?v=1776835394&width=1920', dest: 'public/images/archive/archive-5.jpg' },
  // Deseo Sundays images
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/AF74C715-24EC-47B2-BD05-E0C313969842.jpg?v=1775730781&width=1920', dest: 'public/images/deseo/deseo-1.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_0339.jpg?v=1776849859&width=1920', dest: 'public/images/deseo/deseo-2.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_9041.jpg?v=1776849938&width=1920', dest: 'public/images/deseo/deseo-3.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_6790.jpg?v=1777363317&width=1920', dest: 'public/images/deseo/deseo-4.jpg' },
  // Traviesa Saturdays images
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8774.jpg?v=1777365937&width=1920', dest: 'public/images/traviesa/traviesa-1.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8778.jpg?v=1777366006&width=1920', dest: 'public/images/traviesa/traviesa-2.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8776.jpg?v=1777366051&width=1920', dest: 'public/images/traviesa/traviesa-3.jpg' },
  { url: 'https://www.thisisfuegoent.com/cdn/shop/files/IMG_8777.jpg?v=1777366138&width=1920', dest: 'public/images/traviesa/traviesa-4.jpg' },
];

async function download(url, dest) {
  const fullDest = join(ROOT, dest);
  mkdirSync(dirname(fullDest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) { console.warn(`SKIP ${url} → ${res.status}`); return; }
  const buf = await res.arrayBuffer();
  writeFileSync(fullDest, Buffer.from(buf));
  console.log(`OK  ${dest}`);
}

// Batch 4 at a time
async function run() {
  for (let i = 0; i < assets.length; i += 4) {
    await Promise.all(assets.slice(i, i + 4).map(a => download(a.url, a.dest)));
  }
  console.log('Done.');
}

run().catch(console.error);
