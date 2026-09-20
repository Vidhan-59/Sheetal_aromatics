/**
 * Emits a JSON-LD block. Payloads are built server-side from our own data in
 * lib/seo.ts, never from user input, so the only escaping needed is to stop a
 * literal `</script>` sequence terminating the tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
