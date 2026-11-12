/**
 * Catalogue search scoring, shared by the server-side helpers in
 * lib/products-data.ts and the in-page product filters, so both rank results
 * the same way. Kept free of catalogue data so it costs almost nothing in a
 * client bundle.
 */

/** Light synonym expansion so buyers find products by the term they know. */
export const searchSynonyms: Record<string, string[]> = {
  wintergreen: ["methyl salicylate"],
  banana: ["isoamyl acetate"],
  jasmine: ["benzyl acetate"],
  mint: ["menthol", "peppermint"],
  clove: ["eugenol", "clove oil"],
  anise: ["anethole"],
  haldi: ["turmeric"],
  sonth: ["sunth", "ginger"],
  ginger: ["sunth"],
  haritaki: ["harad"],
  bibhitaki: ["baheda"],
  gokshura: ["gokhru"],
  vidanga: ["vavding"],
  na: ["sodium"],
  salt: ["sodium"],
  ppi: ["benzimidazole"],
  omeprazole: ["benzimidazole", "methoxybenzimidazole"],
  ptc: ["phase transfer catalyst"],
  quat: ["quaternary ammonium", "phosphonium"],
  teba: ["benzyl triethyl ammonium chloride"],
  tebac: ["benzyl triethyl ammonium chloride"],
  tbab: ["tetrabutyl ammonium bromide"],
  tbaf: ["tetrabutyl ammonium fluoride"],
  tbahs: ["tetrabutyl ammonium hydrogen sulphate"],
  tbai: ["tetrabutyl ammonium iodide"],
  teab: ["tetraethyl ammonium bromide"],
  teabf4: ["tetraethyl ammonium tetrafluoroborate"],
  etppb: ["ethyl triphenyl phosphonium bromide"],
  etppi: ["ethyl triphenyl phosphonium iodide"],
  mtppb: ["methyl triphenyl phosphonium bromide"],
  mmppc: ["methoxymethyl triphenyl phosphonium chloride"],
  wittig: ["phosphonium"],
  e211: ["sodium benzoate"],
  e202: ["potassium sorbate"],
  e282: ["calcium propionate"],
  e420: ["sorbitol"],
  preservative: ["sodium benzoate", "potassium sorbate", "calcium propionate"],
}

/** The query plus any synonym expansions of its words, lower-cased. */
export function searchTerms(query: string): Set<string> {
  const term = query.trim().toLowerCase()
  const terms = new Set<string>(term ? [term] : [])
  for (const word of term.split(/\s+/)) {
    for (const expansion of searchSynonyms[word] ?? []) terms.add(expansion)
  }
  return terms
}

/** Relevance of one product: exact and prefix name matches outrank mentions elsewhere. 0 = no match. */
export function matchScore(name: string, hay: string, terms: Set<string>): number {
  let score = 0
  for (const t of terms) {
    if (!hay.includes(t)) continue
    if (name === t) score += 100
    else if (name.startsWith(t)) score += 50
    else if (name.includes(t)) score += 30
    else score += 8
  }
  return score
}
