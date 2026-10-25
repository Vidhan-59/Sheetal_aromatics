/**
 * Adds AI-generated product images to the site.
 *
 *   npx tsx scripts/add-product-images.mts <manifest.json>
 *
 * The manifest is a JSON array of { slug, file, alt, generator }:
 *   - slug:      product slug from lib/products-data.ts
 *   - file:      path to the source image (any size; cropped to 4:3)
 *   - alt:       what the image shows, e.g. "White crystalline powder in a glass petri dish"
 *   - generator: e.g. "Figma AI" or "Canva AI"
 *
 * For each entry it writes public/images/products/<slug>.webp (1200×900),
 * <slug>-600.webp (600×450) and og/<slug>.jpg (600×450), then replaces the
 * product's entry in lib/product-images.ts with a "generated" image. The
 * chemical structure stays available through `productStructures`.
 * Finally it removes the product from scripts/product-image-queue.json.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

interface Entry {
  slug: string
  file: string
  alt: string
  generator: string
}

const manifestPath = process.argv[2]
if (!manifestPath) {
  console.error("Usage: npx tsx scripts/add-product-images.mts <manifest.json>")
  process.exit(1)
}

const entries: Entry[] = JSON.parse(readFileSync(manifestPath, "utf8"))
const OUT = "public/images/products"
const IMAGES_TS = "lib/product-images.ts"
// Normalise line endings: the file may have CRLF after a Windows checkout.
let ts = readFileSync(IMAGES_TS, "utf8").replace(/\r\n/g, "\n")

const q = (v: string) => JSON.stringify(v)

for (const e of entries) {
  if (!existsSync(e.file)) throw new Error(`Missing source image for ${e.slug}: ${e.file}`)

  const img = sharp(e.file).rotate()
  const crop = { fit: "cover" as const, position: "centre" }
  await img.clone().resize(1200, 900, crop).webp({ quality: 80, effort: 6 }).toFile(path.join(OUT, `${e.slug}.webp`))
  await img.clone().resize(600, 450, crop).webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${e.slug}-600.webp`))
  await img.clone().resize(600, 450, crop).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, "og", `${e.slug}.jpg`))

  const block = [
    `  ${q(e.slug)}: {`,
    `    kind: "generated",`,
    `    src: ${q(`/images/products/${e.slug}.webp`)},`,
    `    srcSmall: ${q(`/images/products/${e.slug}-600.webp`)},`,
    `    og: ${q(`/images/products/og/${e.slug}.jpg`)},`,
    `    alt: ${q(e.alt)},`,
    `    generator: ${q(e.generator)},`,
    `  },`,
  ].join("\n")

  // Replace an existing one-line structure entry, or a multi-line photo/generated entry.
  const key = q(e.slug)
  const oneLine = new RegExp(`^  ${escapeRe(key)}: \\{ kind: "structure"[^\\n]*\\},\\n`, "m")
  const multiLine = new RegExp(`^  ${escapeRe(key)}: \\{\\n[\\s\\S]*?\\n  \\},\\n`, "m")
  const mapStart = ts.indexOf("export const productImages")
  const mapEnd = ts.indexOf("\n}\n", mapStart)
  if (mapStart < 0 || mapEnd < 0) throw new Error("Could not find the productImages map in lib/product-images.ts")
  const before = ts.slice(0, mapStart)
  let map = ts.slice(mapStart, mapEnd)
  const after = ts.slice(mapEnd)
  if (oneLine.test(map)) map = map.replace(oneLine, block + "\n")
  else if (multiLine.test(map)) map = map.replace(multiLine, block + "\n")
  else map = map + "\n" + block
  ts = before + map + after
  console.log(`added ${e.slug}`)
}

writeFileSync(IMAGES_TS, ts)

const queuePath = "scripts/product-image-queue.json"
if (existsSync(queuePath)) {
  const queue = JSON.parse(readFileSync(queuePath, "utf8"))
  const done = new Set(entries.map((e) => e.slug))
  queue.queue = queue.queue.filter((item: { slug: string }) => !done.has(item.slug))
  writeFileSync(queuePath, JSON.stringify(queue, null, 2))
  console.log(`queue: ${queue.queue.length} remaining`)
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
