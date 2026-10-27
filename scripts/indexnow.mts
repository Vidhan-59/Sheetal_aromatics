/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver — Bing also feeds
 * ChatGPT search and Copilot) that pages changed, so they recrawl in hours
 * rather than weeks. Google does not use IndexNow; it reads the sitemap.
 *
 *   npx tsx scripts/indexnow.mts            # every URL in the live sitemap
 *   npx tsx scripts/indexnow.mts /products  # only these paths
 *
 * Run it after a deploy has finished. The key is public by design: it is
 * served at /<key>.txt so the search engines can confirm the site owns it.
 */
const HOST = "www.sheetalaromatics.com"
const KEY = "0f97b13c852662cc3c4259cb4f7334d1"
const BASE = `https://${HOST}`

const paths = process.argv.slice(2)
let urls: string[]
if (paths.length) {
  urls = paths.map((p) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`)
} else {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

const keyCheck = await fetch(`${BASE}/${KEY}.txt`)
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live yet — deploy first.`)
  process.exit(1)
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls }),
})
// 200 = accepted, 202 = accepted and key validation pending.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`)
if (!res.ok) process.exit(1)
