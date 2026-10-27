/**
 * Product imagery, keyed by product slug.
 *
 * Every product's primary image is one of:
 *  - "photo": a freely licensed photograph (Wikimedia Commons). Author and
 *    licence are shown next to the image and on /image-credits, as the licences
 *    require. `representative` marks photos of the source plant or a comparable
 *    material rather than the exact traded form.
 *  - "generated": an AI-generated illustrative image of the product's documented
 *    physical appearance (form and colour). Always captioned as illustrative —
 *    never presented as a photograph of supplied material.
 *  - "structure": the 2D chemical structure drawn from the PubChem record, used
 *    where no appearance image exists yet.
 *
 * `productStructures` keeps the structure for every chemical, so product pages
 * can show it alongside a photo or generated image.
 *
 * Products without an entry fall back to the drawn <ProductVisual />.
 * To add an image: save 1200×900 and 600×450 WebP renditions to
 * public/images/products/ (<slug>.webp, <slug>-600.webp), a 600×450 JPEG at
 * public/images/products/og/<slug>.jpg for share cards, and add an entry here.
 * Pending generations are listed in scripts/product-image-queue.json.
 */

import { categoryName, type Product } from "@/lib/products-data"

export interface PhotoCredit {
  author: string
  license: string
  licenseUrl?: string
  /** File page on Wikimedia Commons. */
  sourceUrl: string
}

interface RasterImage {
  /** 1200×900 WebP. */
  src: string
  /** 600×450 WebP for cards and thumbnails. */
  srcSmall: string
  /** 600×450 JPEG used by the generated share card (Open Graph cannot use WebP). */
  og: string
  alt: string
}

export interface StructureImage {
  kind: "structure"
  src: string
  pubchemCid: number
}

export type ProductImage =
  | StructureImage
  | (RasterImage & { kind: "photo"; representative?: boolean; credit: PhotoCredit })
  | (RasterImage & { kind: "generated"; generator: string })

export const productImages: Record<string, ProductImage> = {
  "2-2-diphenyl-4-bromo-butyronitrile": {
    kind: "generated",
    src: "/images/products/2-2-diphenyl-4-bromo-butyronitrile.webp",
    srcSmall: "/images/products/2-2-diphenyl-4-bromo-butyronitrile-600.webp",
    og: "/images/products/og/2-2-diphenyl-4-bromo-butyronitrile.jpg",
    alt: "White to off-white crystalline powder on a watch glass beside a capped glass vial",
    generator: "Figma AI",
  },
  "2-mercapto-5-methoxybenzimidazole": {
    kind: "generated",
    src: "/images/products/2-mercapto-5-methoxybenzimidazole.webp",
    srcSmall: "/images/products/2-mercapto-5-methoxybenzimidazole-600.webp",
    og: "/images/products/og/2-mercapto-5-methoxybenzimidazole.jpg",
    alt: "Off-white to pale beige fine powder in a glass petri dish",
    generator: "Canva AI",
  },
  "2-mercapto-benzimidazole": {
    kind: "generated",
    src: "/images/products/2-mercapto-benzimidazole.webp",
    srcSmall: "/images/products/2-mercapto-benzimidazole-600.webp",
    og: "/images/products/og/2-mercapto-benzimidazole.jpg",
    alt: "Pale cream crystalline powder in a white weighing boat",
    generator: "Canva AI",
  },
  "2-phenyl-butyric-acid": {
    kind: "generated",
    src: "/images/products/2-phenyl-butyric-acid.webp",
    srcSmall: "/images/products/2-phenyl-butyric-acid-600.webp",
    og: "/images/products/og/2-phenyl-butyric-acid.jpg",
    alt: "Colourless to white waxy crystalline solid in a glass petri dish",
    generator: "Figma AI",
  },
  "amla": {
    kind: "photo",
    src: "/images/products/amla.webp",
    srcSmall: "/images/products/amla-600.webp",
    og: "/images/products/og/amla.jpg",
    alt: "Fresh Amla / Indian gooseberry (Phyllanthus emblica) fruits",
    credit: {
      author: "Ji-Elle",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fruits_de_Phyllanthus_emblica_%C3%A0_Pushkar_(Rajasthan)_(2).jpg",
    },
  },
  "amla-powder": {
    kind: "photo",
    src: "/images/products/amla-powder.webp",
    srcSmall: "/images/products/amla-powder-600.webp",
    og: "/images/products/og/amla-powder.jpg",
    alt: "Fresh amla (Indian gooseberry) fruit, the source of amla powder",
    representative: true,
    credit: {
      author: "Ji-Elle",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fruits_de_Phyllanthus_emblica_%C3%A0_Pushkar_(Rajasthan)_(2).jpg",
    },
  },
  "anethole": {
    kind: "generated",
    src: "/images/products/anethole.webp",
    srcSmall: "/images/products/anethole-600.webp",
    og: "/images/products/og/anethole.jpg",
    alt: "Clear colourless liquid in a stoppered glass bottle beside a glass dish of white crystals",
    generator: "Canva AI",
  },
  "ashwagandha": {
    kind: "photo",
    src: "/images/products/ashwagandha.webp",
    srcSmall: "/images/products/ashwagandha-600.webp",
    og: "/images/products/og/ashwagandha.jpg",
    alt: "Dried Ashwagandha (Withania somnifera) roots",
    credit: {
      author: "Piyush Kothari",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ashwagandha_Roots.jpg",
    },
  },
  "ashwagandha-powder": {
    kind: "photo",
    src: "/images/products/ashwagandha-powder.webp",
    srcSmall: "/images/products/ashwagandha-powder-600.webp",
    og: "/images/products/og/ashwagandha-powder.jpg",
    alt: "Ashwagandha root powder and dried ashwagandha roots on wooden spoons",
    credit: {
      author: "formulatehealth",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ashwagandha_Powder_and_Root_on_Spoons_-_50191697031.jpg",
    },
  },
  "baheda": {
    kind: "photo",
    src: "/images/products/baheda.webp",
    srcSmall: "/images/products/baheda-600.webp",
    og: "/images/products/og/baheda.jpg",
    alt: "Dried Bibhitaki / Baheda (Terminalia bellirica) fruits on a plate",
    credit: {
      author: "Salil Kumar Mukherjee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bahera_(Terminalia_bellirica)_fruits.jpg",
    },
  },
  "benzhydryl-thioacetamide": {
    kind: "generated",
    src: "/images/products/benzhydryl-thioacetamide.webp",
    srcSmall: "/images/products/benzhydryl-thioacetamide-600.webp",
    og: "/images/products/og/benzhydryl-thioacetamide.jpg",
    alt: "Off-white fine powder in an open amber glass jar",
    generator: "Canva AI",
  },
  "benzyl-acetate": {
    kind: "generated",
    src: "/images/products/benzyl-acetate.webp",
    srcSmall: "/images/products/benzyl-acetate-600.webp",
    og: "/images/products/og/benzyl-acetate.jpg",
    alt: "Clear colourless liquid in a glass reagent bottle with its stopper beside it",
    generator: "Canva AI",
  },
  "benzyl-alcohol": {
    kind: "generated",
    src: "/images/products/benzyl-alcohol.webp",
    srcSmall: "/images/products/benzyl-alcohol-600.webp",
    og: "/images/products/og/benzyl-alcohol.jpg",
    alt: "Clear colourless liquid in a graduated cylinder and a small beaker",
    generator: "Canva AI",
  },
  "benzyl-benzoate": {
    kind: "generated",
    src: "/images/products/benzyl-benzoate.webp",
    srcSmall: "/images/products/benzyl-benzoate-600.webp",
    og: "/images/products/og/benzyl-benzoate.jpg",
    alt: "Clear colourless oily liquid in a round-bottom flask on a cork ring",
    generator: "Canva AI",
  },
  "benzyl-butyrate": {
    kind: "generated",
    src: "/images/products/benzyl-butyrate.webp",
    srcSmall: "/images/products/benzyl-butyrate-600.webp",
    og: "/images/products/og/benzyl-butyrate.jpg",
    alt: "Clear colourless liquid in a small sample vial beside blank perfumery smelling strips",
    generator: "Canva AI",
  },
  "benzyl-propionate": {
    kind: "generated",
    src: "/images/products/benzyl-propionate.webp",
    srcSmall: "/images/products/benzyl-propionate-600.webp",
    og: "/images/products/og/benzyl-propionate.jpg",
    alt: "Clear colourless liquid in an amber dropper bottle with a drop on a watch glass",
    generator: "Canva AI",
  },
  "benzyl-tributyl-ammonium-chloride": {
    kind: "generated",
    src: "/images/products/benzyl-tributyl-ammonium-chloride.webp",
    srcSmall: "/images/products/benzyl-tributyl-ammonium-chloride-600.webp",
    og: "/images/products/og/benzyl-tributyl-ammonium-chloride.jpg",
    alt: "White crystalline powder in an open glass jar",
    generator: "Figma AI",
  },
  "benzyl-triethyl-ammonium-chloride": {
    kind: "generated",
    src: "/images/products/benzyl-triethyl-ammonium-chloride.webp",
    srcSmall: "/images/products/benzyl-triethyl-ammonium-chloride-600.webp",
    og: "/images/products/og/benzyl-triethyl-ammonium-chloride.jpg",
    alt: "White to off-white crystalline powder in a glass petri dish",
    generator: "Figma AI",
  },
  "benzyl-triphenyl-phosphonium-chloride": {
    kind: "generated",
    src: "/images/products/benzyl-triphenyl-phosphonium-chloride.webp",
    srcSmall: "/images/products/benzyl-triphenyl-phosphonium-chloride-600.webp",
    og: "/images/products/og/benzyl-triphenyl-phosphonium-chloride.jpg",
    alt: "White crystalline powder in a glass crystallising dish",
    generator: "Figma AI",
  },
  "butyl-triphenyl-phosphonium-chloride": {
    kind: "generated",
    src: "/images/products/butyl-triphenyl-phosphonium-chloride.webp",
    srcSmall: "/images/products/butyl-triphenyl-phosphonium-chloride-600.webp",
    og: "/images/products/og/butyl-triphenyl-phosphonium-chloride.jpg",
    alt: "White crystalline powder on weighing paper",
    generator: "Figma AI",
  },
  "calcium-propionate": {
    kind: "generated",
    src: "/images/products/calcium-propionate.webp",
    srcSmall: "/images/products/calcium-propionate-600.webp",
    og: "/images/products/og/calcium-propionate.jpg",
    alt: "Fine white free-flowing powder in a glass bowl with a steel scoop",
    generator: "Canva AI",
  },
  "cinnamon-oil": {
    kind: "photo",
    src: "/images/products/cinnamon-oil.webp",
    srcSmall: "/images/products/cinnamon-oil-600.webp",
    og: "/images/products/og/cinnamon-oil.jpg",
    alt: "Ceylon cinnamon (Cinnamomum verum) quills with ground cinnamon and dried cinnamon flowers on white",
    credit: {
      author: "Simon A. Eugster",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cinnamomum_verum_spices.jpg",
    },
  },
  "clove-oil": {
    kind: "photo",
    src: "/images/products/clove-oil.webp",
    srcSmall: "/images/products/clove-oil-600.webp",
    og: "/images/products/og/clove-oil.jpg",
    alt: "Dried clove buds (Syzygium aromaticum) on white",
    credit: {
      author: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2023_Go%C5%BAdziki.jpg",
    },
  },
  "danti-beej": {
    kind: "photo",
    src: "/images/products/danti-beej.webp",
    srcSmall: "/images/products/danti-beej-600.webp",
    og: "/images/products/og/danti-beej.jpg",
    alt: "Mottled brown-and-cream seeds of Baliospermum solanifolium (danti, red physic nut) on white foam",
    credit: {
      author: "Omar Hoftun",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Baliospermum_solanifolium_seeds,_by_Omar_Hoftun.jpg",
    },
  },
  "diphenyl-acetic-acid": {
    kind: "generated",
    src: "/images/products/diphenyl-acetic-acid.webp",
    srcSmall: "/images/products/diphenyl-acetic-acid-600.webp",
    og: "/images/products/og/diphenyl-acetic-acid.jpg",
    alt: "White crystalline powder in a glass beaker with a stainless steel spatula",
    generator: "Canva AI",
  },
  "diphenyl-acetonitrile": {
    kind: "generated",
    src: "/images/products/diphenyl-acetonitrile.webp",
    srcSmall: "/images/products/diphenyl-acetonitrile-600.webp",
    og: "/images/products/og/diphenyl-acetonitrile.jpg",
    alt: "White to pale yellowish crystalline flakes in a glass crystallising dish",
    generator: "Canva AI",
  },
  "ethyl-benzoate": {
    kind: "generated",
    src: "/images/products/ethyl-benzoate.webp",
    srcSmall: "/images/products/ethyl-benzoate-600.webp",
    og: "/images/products/og/ethyl-benzoate.jpg",
    alt: "Clear colourless liquid in a stoppered glass reagent bottle beside a small measuring cylinder",
    generator: "Canva AI",
  },
  "ethyl-triphenyl-phosphonium-bromide": {
    kind: "generated",
    src: "/images/products/ethyl-triphenyl-phosphonium-bromide.webp",
    srcSmall: "/images/products/ethyl-triphenyl-phosphonium-bromide-600.webp",
    og: "/images/products/og/ethyl-triphenyl-phosphonium-bromide.jpg",
    alt: "White crystalline powder in a glass sample bottle and on a watch glass",
    generator: "Figma AI",
  },
  "ethyl-triphenyl-phosphonium-iodide": {
    kind: "generated",
    src: "/images/products/ethyl-triphenyl-phosphonium-iodide.webp",
    srcSmall: "/images/products/ethyl-triphenyl-phosphonium-iodide-600.webp",
    og: "/images/products/og/ethyl-triphenyl-phosphonium-iodide.jpg",
    alt: "Pale cream to light yellow crystalline powder with an amber glass jar",
    generator: "Figma AI",
  },
  "eucalyptus-oil": {
    kind: "photo",
    src: "/images/products/eucalyptus-oil.webp",
    srcSmall: "/images/products/eucalyptus-oil-600.webp",
    og: "/images/products/og/eucalyptus-oil.jpg",
    alt: "Eucalyptus globulus leaves and white flowers on a branch",
    credit: {
      author: "Alexkom000",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2026-01-10_Flower_buds_of_Eucalyptus_globulus.jpg",
    },
  },
  "eugenol": {
    kind: "generated",
    src: "/images/products/eugenol.webp",
    srcSmall: "/images/products/eugenol-600.webp",
    og: "/images/products/og/eugenol.jpg",
    alt: "Pale yellow clear oily liquid in an amber glass bottle and a small glass beaker",
    generator: "Canva AI",
  },
  "garcinia-cambogia": {
    kind: "photo",
    src: "/images/products/garcinia-cambogia.webp",
    srcSmall: "/images/products/garcinia-cambogia-600.webp",
    og: "/images/products/og/garcinia-cambogia.jpg",
    alt: "Garcinia gummi-gutta (kudampuli) fruit laid out to dry",
    credit: {
      author: "Tonynirappathu",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kudampuli.JPG",
    },
  },
  "garcinia-cambogia-powder": {
    kind: "photo",
    src: "/images/products/garcinia-cambogia-powder.webp",
    srcSmall: "/images/products/garcinia-cambogia-powder-600.webp",
    og: "/images/products/og/garcinia-cambogia-powder.jpg",
    alt: "Garcinia gummi-gutta fruit, the source of garcinia powder",
    representative: true,
    credit: {
      author: "Tonynirappathu",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kudampuli.JPG",
    },
  },
  "gokhru": {
    kind: "photo",
    src: "/images/products/gokhru.webp",
    srcSmall: "/images/products/gokhru-600.webp",
    og: "/images/products/og/gokhru.jpg",
    alt: "Dried Gokhru (Tribulus terrestris) spiny fruits",
    credit: {
      author: "Miansari66",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gokhru_(Pakhra).JPG",
    },
  },
  "gokhru-powder": {
    kind: "photo",
    src: "/images/products/gokhru-powder.webp",
    srcSmall: "/images/products/gokhru-powder-600.webp",
    og: "/images/products/og/gokhru-powder.jpg",
    alt: "Dried Tribulus terrestris fruit, the source of gokhru powder",
    representative: true,
    credit: {
      author: "Miansari66",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gokhru_(Pakhra).JPG",
    },
  },
  "harad": {
    kind: "photo",
    src: "/images/products/harad.webp",
    srcSmall: "/images/products/harad-600.webp",
    og: "/images/products/og/harad.jpg",
    alt: "Dried Haritaki (Terminalia chebula) fruits",
    credit: {
      author: "Salil Kumar Mukherjee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Haritaki_(Terminalia_chebula)_fruits_01.jpg",
    },
  },
  "harad-powder": {
    kind: "photo",
    src: "/images/products/harad-powder.webp",
    srcSmall: "/images/products/harad-powder-600.webp",
    og: "/images/products/og/harad-powder.jpg",
    alt: "Dried haritaki (Terminalia chebula) fruit, the source of harad powder",
    representative: true,
    credit: {
      author: "Salil Kumar Mukherjee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Haritaki_(Terminalia_chebula)_fruits_01.jpg",
    },
  },
  "indole-powder": {
    kind: "generated",
    src: "/images/products/indole-powder.webp",
    srcSmall: "/images/products/indole-powder-600.webp",
    og: "/images/products/og/indole-powder.jpg",
    alt: "White to faintly yellowish crystalline flakes heaped on a glass watch glass",
    generator: "Canva AI",
  },
  "iodine": {
    kind: "photo",
    src: "/images/products/iodine.webp",
    srcSmall: "/images/products/iodine-600.webp",
    og: "/images/products/og/iodine.jpg",
    alt: "Dark violet-black iodine crystals on white",
    credit: {
      author: "Dnn87",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:IIod.JPG",
    },
  },
  "isoamyl-acetate": {
    kind: "generated",
    src: "/images/products/isoamyl-acetate.webp",
    srcSmall: "/images/products/isoamyl-acetate-600.webp",
    og: "/images/products/og/isoamyl-acetate.jpg",
    alt: "Clear colourless liquid in a narrow glass bottle with a black screw cap and a glass pipette beside it",
    generator: "Canva AI",
  },
  "isoamyl-butyrate": {
    kind: "generated",
    src: "/images/products/isoamyl-butyrate.webp",
    srcSmall: "/images/products/isoamyl-butyrate-600.webp",
    og: "/images/products/og/isoamyl-butyrate.jpg",
    alt: "Clear colourless liquid in a stoppered glass volumetric flask",
    generator: "Canva AI",
  },
  "jamun-beej": {
    kind: "photo",
    src: "/images/products/jamun-beej.webp",
    srcSmall: "/images/products/jamun-beej-600.webp",
    og: "/images/products/og/jamun-beej.jpg",
    alt: "Jamun (Syzygium cumini) seeds",
    credit: {
      author: "Salil Kumar Mukherjee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Java_plum_(Syzygium_cumini)_seeds.jpg",
    },
  },
  "karela": {
    kind: "photo",
    src: "/images/products/karela.webp",
    srcSmall: "/images/products/karela-600.webp",
    og: "/images/products/og/karela.jpg",
    alt: "Dried bitter gourd (Momordica charantia) slices",
    credit: {
      author: "Fumikas Sagisavas",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dried_bitter_melon_slices_(20240123).jpg",
    },
  },
  "karela-powder": {
    kind: "photo",
    src: "/images/products/karela-powder.webp",
    srcSmall: "/images/products/karela-powder-600.webp",
    og: "/images/products/og/karela-powder.jpg",
    alt: "Dried bitter gourd slices, the source of karela powder",
    representative: true,
    credit: {
      author: "Fumikas Sagisavas",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dried_bitter_melon_slices_(20240123).jpg",
    },
  },
  "lemongrass-oil": {
    kind: "photo",
    src: "/images/products/lemongrass-oil.webp",
    srcSmall: "/images/products/lemongrass-oil-600.webp",
    og: "/images/products/og/lemongrass-oil.jpg",
    alt: "Clump of lemongrass (Cymbopogon citratus) growing in a garden",
    credit: {
      author: "Obsidian Soul",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tanglad_(lemongrass,_Cymbopogon_citratus)_-_Philippines.jpg",
    },
  },
  "lindi-pepper": {
    kind: "photo",
    src: "/images/products/lindi-pepper.webp",
    srcSmall: "/images/products/lindi-pepper-600.webp",
    og: "/images/products/og/lindi-pepper.jpg",
    alt: "Dried long pepper (Piper longum) spikes",
    credit: {
      author: "Miansari66",
      license: "Public domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Long_pepper.JPG",
    },
  },
  "menthol": {
    kind: "photo",
    src: "/images/products/menthol.webp",
    srcSmall: "/images/products/menthol-600.webp",
    og: "/images/products/og/menthol.jpg",
    alt: "Pile of colourless needle-like menthol crystals on a black background",
    credit: {
      author: "Miansari66",
      license: "Public domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Menthol_Crystals.JPG",
    },
  },
  "methoxymethyl-triphenyl-phosphonium-chloride": {
    kind: "generated",
    src: "/images/products/methoxymethyl-triphenyl-phosphonium-chloride.webp",
    srcSmall: "/images/products/methoxymethyl-triphenyl-phosphonium-chloride-600.webp",
    og: "/images/products/og/methoxymethyl-triphenyl-phosphonium-chloride.jpg",
    alt: "Off-white fine powder spilling from a glass beaker",
    generator: "Figma AI",
  },
  "methyl-benzoate": {
    kind: "generated",
    src: "/images/products/methyl-benzoate.webp",
    srcSmall: "/images/products/methyl-benzoate-600.webp",
    og: "/images/products/og/methyl-benzoate.jpg",
    alt: "Clear liquid in an amber glass bottle with a glass dropper resting on a watch glass",
    generator: "Canva AI",
  },
  "methyl-eugenol": {
    kind: "generated",
    src: "/images/products/methyl-eugenol.webp",
    srcSmall: "/images/products/methyl-eugenol-600.webp",
    og: "/images/products/og/methyl-eugenol.jpg",
    alt: "Very pale yellow clear liquid in a stoppered glass bottle beside a watch glass",
    generator: "Canva AI",
  },
  "methyl-salicylate": {
    kind: "photo",
    src: "/images/products/methyl-salicylate.webp",
    srcSmall: "/images/products/methyl-salicylate-600.webp",
    og: "/images/products/og/methyl-salicylate.jpg",
    alt: "Clear colourless methyl salicylate in an unlabelled glass bottle with red cap",
    credit: {
      author: "LHcheM",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sample_of_methyl_salicylate.jpg",
    },
  },
  "methyl-triphenyl-phosphonium-bromide": {
    kind: "generated",
    src: "/images/products/methyl-triphenyl-phosphonium-bromide.webp",
    srcSmall: "/images/products/methyl-triphenyl-phosphonium-bromide-600.webp",
    og: "/images/products/og/methyl-triphenyl-phosphonium-bromide.jpg",
    alt: "Fine white crystalline powder in a porcelain dish",
    generator: "Figma AI",
  },
  "moringa-powder": {
    kind: "photo",
    src: "/images/products/moringa-powder.webp",
    srcSmall: "/images/products/moringa-powder-600.webp",
    og: "/images/products/og/moringa-powder.jpg",
    alt: "Moringa leaf powder in a wooden tray",
    credit: {
      author: "CNEcija12345",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Moringa_oleifera_powder.jpg",
    },
  },
  "nagarmotha": {
    kind: "photo",
    src: "/images/products/nagarmotha.webp",
    srcSmall: "/images/products/nagarmotha-600.webp",
    og: "/images/products/og/nagarmotha.jpg",
    alt: "Close-up of a dark Cyperus rotundus (nut grass) tuber with fibrous roots on a grey background",
    credit: {
      author: "Stefan.lefnaer",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cyperus_rotundus_sl62.jpg",
    },
  },
  "neem-powder": {
    kind: "photo",
    src: "/images/products/neem-powder.webp",
    srcSmall: "/images/products/neem-powder-600.webp",
    og: "/images/products/og/neem-powder.jpg",
    alt: "Fresh neem (Azadirachta indica) leaves, the source of neem leaf powder",
    representative: true,
    credit: {
      author: "Thendral Muthusami (English Wikipedia)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Neem_leaves_Neem_Leaves.jpg",
    },
  },
  "nimboda-beej": {
    kind: "photo",
    src: "/images/products/nimboda-beej.webp",
    srcSmall: "/images/products/nimboda-beej-600.webp",
    og: "/images/products/og/nimboda-beej.jpg",
    alt: "Neem (Azadirachta indica) seeds and fruits in a clay bowl",
    credit: {
      author: "Paryavarana Margadarsi Vaisakhi",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Collected_fruits_and_seeds_of_(Azadirachta_indica)_Neem_tree_in_Visakhapatnam.jpg",
    },
  },
  "patchouli-oil": {
    kind: "photo",
    src: "/images/products/patchouli-oil.webp",
    srcSmall: "/images/products/patchouli-oil-600.webp",
    og: "/images/products/og/patchouli-oil.jpg",
    alt: "Patchouli (Pogostemon cablin) leaves",
    credit: {
      author: "Ayuwadala",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nilam_(Pogostemon_cablin_Benth.)_1.jpg",
    },
  },
  "peppermint-oil": {
    kind: "photo",
    src: "/images/products/peppermint-oil.webp",
    srcSmall: "/images/products/peppermint-oil-600.webp",
    og: "/images/products/og/peppermint-oil.jpg",
    alt: "Fresh peppermint (Mentha x piperita) leaves",
    credit: {
      author: "Kızıl",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mentha_%C3%97_piperita%E2%80%93IMG_6075.jpg",
    },
  },
  "phenoxy-ethyl-isobutyrate": {
    kind: "generated",
    src: "/images/products/phenoxy-ethyl-isobutyrate.webp",
    srcSmall: "/images/products/phenoxy-ethyl-isobutyrate-600.webp",
    og: "/images/products/og/phenoxy-ethyl-isobutyrate.jpg",
    alt: "Clear colourless liquid in a glass beaker with a stirring rod",
    generator: "Canva AI",
  },
  "phenyl-ethyl-isobutyrate": {
    kind: "generated",
    src: "/images/products/phenyl-ethyl-isobutyrate.webp",
    srcSmall: "/images/products/phenyl-ethyl-isobutyrate-600.webp",
    og: "/images/products/og/phenyl-ethyl-isobutyrate.jpg",
    alt: "Clear colourless liquid in an Erlenmeyer flask with blank smelling strips",
    generator: "Canva AI",
  },
  "phenyl-trimethyl-ammonium-chloride": {
    kind: "generated",
    src: "/images/products/phenyl-trimethyl-ammonium-chloride.webp",
    srcSmall: "/images/products/phenyl-trimethyl-ammonium-chloride-600.webp",
    og: "/images/products/og/phenyl-trimethyl-ammonium-chloride.jpg",
    alt: "Fine white crystalline powder in a weighing boat",
    generator: "Figma AI",
  },
  "potassium-sorbate": {
    kind: "generated",
    src: "/images/products/potassium-sorbate.webp",
    srcSmall: "/images/products/potassium-sorbate-600.webp",
    og: "/images/products/og/potassium-sorbate.jpg",
    alt: "Small white cylindrical granules in a stainless steel scoop",
    generator: "Canva AI",
  },
  "rosemary-oil": {
    kind: "photo",
    src: "/images/products/rosemary-oil.webp",
    srcSmall: "/images/products/rosemary-oil-600.webp",
    og: "/images/products/og/rosemary-oil.jpg",
    alt: "Fresh rosemary (Salvia rosmarinus) sprig",
    credit: {
      author: "Plenuska",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rosmarin,_Rosmarinus_officinales_(03).jpg",
    },
  },
  "sandalwood-oil": {
    kind: "photo",
    src: "/images/products/sandalwood-oil.webp",
    srcSmall: "/images/products/sandalwood-oil-600.webp",
    og: "/images/products/og/sandalwood-oil.jpg",
    alt: "Sandalwood heartwood sticks in a red bowl",
    credit: {
      author: "Fumikas Sagisavas",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sandalwood_sticks_on_a_plate.jpg",
    },
  },
  "selenium-metal-powder": {
    kind: "photo",
    src: "/images/products/selenium-metal-powder.webp",
    srcSmall: "/images/products/selenium-metal-powder-600.webp",
    og: "/images/products/og/selenium-metal-powder.jpg",
    alt: "Lustrous grey selenium metal pieces",
    representative: true,
    credit: {
      author: "Milda 444",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Selen2.jpg",
    },
  },
  "shatavari": {
    kind: "photo",
    src: "/images/products/shatavari.webp",
    srcSmall: "/images/products/shatavari-600.webp",
    og: "/images/products/og/shatavari.jpg",
    alt: "Shatavari (Asparagus racemosus) foliage showing its curved needle-like cladodes",
    representative: true,
    credit: {
      author: "Vengolis",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Asparagus_racemosus_0775.jpg",
    },
  },
  "shilajit-powder": {
    kind: "photo",
    src: "/images/products/shilajit.webp",
    srcSmall: "/images/products/shilajit-600.webp",
    og: "/images/products/og/shilajit.jpg",
    alt: "A piece of purified shilajit resin on a white background",
    credit: {
      author: "Valentin",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Purified_Shilajit,_Mumio.jpg",
    },
  },
  "sodium-benzoate": {
    kind: "photo",
    src: "/images/products/sodium-benzoate.webp",
    srcSmall: "/images/products/sodium-benzoate-600.webp",
    og: "/images/products/og/sodium-benzoate.jpg",
    alt: "White sodium benzoate powder in a porcelain evaporating dish",
    credit: {
      author: "Chemik10 at Polish Wikipedia",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sodium_benzoate-substance.jpg",
    },
  },
  "sodium-metal": {
    kind: "photo",
    src: "/images/products/sodium-metal.webp",
    srcSmall: "/images/products/sodium-metal-600.webp",
    og: "/images/products/og/sodium-metal.jpg",
    alt: "Freshly cut pieces of sodium metal",
    credit: {
      author: "Dnn87 (English Wikipedia)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Na_(Sodium).jpg",
    },
  },
  "sorbitol-70-solution": {
    kind: "generated",
    src: "/images/products/sorbitol-70-solution.webp",
    srcSmall: "/images/products/sorbitol-70-solution-600.webp",
    og: "/images/products/og/sorbitol-70-solution.jpg",
    alt: "Clear colourless viscous liquid pouring between glass beakers",
    generator: "Canva AI",
  },
  "sunth-ginger": {
    kind: "photo",
    src: "/images/products/sunth-ginger.webp",
    srcSmall: "/images/products/sunth-ginger-600.webp",
    og: "/images/products/og/sunth-ginger.jpg",
    alt: "Dried ginger (sonth) rhizomes in a glass bowl with ginger powder",
    credit: {
      author: "Piyush Kothari",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dry_Ginger_1.jpg",
    },
  },
  "sunth-powder": {
    kind: "photo",
    src: "/images/products/sunth-powder.webp",
    srcSmall: "/images/products/sunth-powder-600.webp",
    og: "/images/products/og/sunth-powder.jpg",
    alt: "Dry ginger powder in a bowl with dried ginger rhizomes on a dark background",
    credit: {
      author: "Piyush Kothari",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dry_Ginger_1.jpg",
    },
  },
  "tea-tree-oil": {
    kind: "photo",
    src: "/images/products/tea-tree-oil.webp",
    srcSmall: "/images/products/tea-tree-oil-600.webp",
    og: "/images/products/og/tea-tree-oil.jpg",
    alt: "Tea tree (Melaleuca alternifolia) white flowers and needle-like leaves",
    credit: {
      author: "Geoff Derrin",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Melaleuca_alternifolia_flowers.jpg",
    },
  },
  "tetrabutyl-ammonium-bromide": {
    kind: "photo",
    src: "/images/products/tetrabutyl-ammonium-bromide.webp",
    srcSmall: "/images/products/tetrabutyl-ammonium-bromide-600.webp",
    og: "/images/products/og/tetrabutyl-ammonium-bromide.jpg",
    alt: "White crystalline tetrabutylammonium bromide (TBAB) in a small white plastic cup",
    credit: {
      author: "Leiem",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tetrabutylammonium_bromide.jpg",
    },
  },
  "tetrabutyl-ammonium-fluoride": {
    kind: "generated",
    src: "/images/products/tetrabutyl-ammonium-fluoride.webp",
    srcSmall: "/images/products/tetrabutyl-ammonium-fluoride-600.webp",
    og: "/images/products/og/tetrabutyl-ammonium-fluoride.jpg",
    alt: "Translucent white waxy crystalline lumps in a glass jar with its lid beside it",
    generator: "Canva AI",
  },
  "tetrabutyl-ammonium-hydrogen-sulphate": {
    kind: "generated",
    src: "/images/products/tetrabutyl-ammonium-hydrogen-sulphate.webp",
    srcSmall: "/images/products/tetrabutyl-ammonium-hydrogen-sulphate-600.webp",
    og: "/images/products/og/tetrabutyl-ammonium-hydrogen-sulphate.jpg",
    alt: "Pure white fine crystalline powder in a glass petri dish beside a rack of HPLC vials",
    generator: "Canva AI",
  },
  "tetrabutyl-ammonium-iodide": {
    kind: "generated",
    src: "/images/products/tetrabutyl-ammonium-iodide.webp",
    srcSmall: "/images/products/tetrabutyl-ammonium-iodide-600.webp",
    og: "/images/products/og/tetrabutyl-ammonium-iodide.jpg",
    alt: "Off-white crystalline powder in an amber glass petri dish with a steel scoop",
    generator: "Canva AI",
  },
  "tetraethyl-ammonium-bromide": {
    kind: "generated",
    src: "/images/products/tetraethyl-ammonium-bromide.webp",
    srcSmall: "/images/products/tetraethyl-ammonium-bromide-600.webp",
    og: "/images/products/og/tetraethyl-ammonium-bromide.jpg",
    alt: "Fine white crystalline powder in a shallow stainless steel tray with a scoop",
    generator: "Canva AI",
  },
  "tetraethyl-ammonium-tetrafluoroborate": {
    kind: "generated",
    src: "/images/products/tetraethyl-ammonium-tetrafluoroborate.webp",
    srcSmall: "/images/products/tetraethyl-ammonium-tetrafluoroborate-600.webp",
    og: "/images/products/og/tetraethyl-ammonium-tetrafluoroborate.jpg",
    alt: "Fine white crystalline powder in a capped glass bottle and on a watch glass beside a glass desiccator",
    generator: "Canva AI",
  },
  "tulsi-powder": {
    kind: "photo",
    src: "/images/products/tulsi-powder.webp",
    srcSmall: "/images/products/tulsi-powder-600.webp",
    og: "/images/products/og/tulsi-powder.jpg",
    alt: "Fresh holy basil (tulsi) leaves, the source of tulsi powder",
    representative: true,
    credit: {
      author: "Satheesh Sankaran",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Holy_Basil_plant_leaves.jpg",
    },
  },
  "turmeric-powder": {
    kind: "photo",
    src: "/images/products/turmeric-powder.webp",
    srcSmall: "/images/products/turmeric-powder-600.webp",
    og: "/images/products/og/turmeric-powder.jpg",
    alt: "Turmeric powder on a wooden spoon against a black background",
    credit: {
      author: "formulatehealth",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Turmeric_Powder_on_a_Spoon_-_Black_Background.jpg",
    },
  },
  "vavding": {
    kind: "photo",
    src: "/images/products/vavding.webp",
    srcSmall: "/images/products/vavding-600.webp",
    og: "/images/products/og/vavding.jpg",
    alt: "Embelia ribes (Vidanga) plant with clusters of young fruits",
    representative: true,
    credit: {
      author: "Dinesh Valke from Thane, India",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Embelia_ribes_(17146786429).jpg",
    },
  },
  "yara-yara-crystal": {
    kind: "generated",
    src: "/images/products/yara-yara-crystal.webp",
    srcSmall: "/images/products/yara-yara-crystal-600.webp",
    og: "/images/products/og/yara-yara-crystal.jpg",
    alt: "White crystalline flakes heaped in a white porcelain dish",
    generator: "Canva AI",
  },
  "triphala-powder": {
    kind: "generated",
    src: "/images/products/triphala-powder.webp",
    srcSmall: "/images/products/triphala-powder-600.webp",
    og: "/images/products/og/triphala-powder.jpg",
    alt: "Fine brown herbal powder in a wooden bowl with dried haritaki, bibhitaki and amla fruits on linen",
    generator: "Canva AI",
  },
  "nasottar": {
    kind: "generated",
    src: "/images/products/nasottar.webp",
    srcSmall: "/images/products/nasottar-600.webp",
    og: "/images/products/og/nasottar.jpg",
    alt: "Dried root pieces heaped in a woven bamboo tray on linen",
    generator: "Figma AI",
  },
  "dimethyl-isopropyl-chloride-hydrochloride": {
    kind: "generated",
    src: "/images/products/dimethyl-isopropyl-chloride-hydrochloride.webp",
    srcSmall: "/images/products/dimethyl-isopropyl-chloride-hydrochloride-600.webp",
    og: "/images/products/og/dimethyl-isopropyl-chloride-hydrochloride.jpg",
    alt: "White crystalline powder in a glass jar with a steel spatula in front",
    generator: "Figma AI",
  },
}

/** 2D structures for every chemical, shown on product pages next to the primary image. */
export const productStructures: Record<string, { src: string; pubchemCid: number }> = {
  "2-2-diphenyl-4-bromo-butyronitrile": { src: "/images/structures/2-2-diphenyl-4-bromo-butyronitrile.svg", pubchemCid: 96575 },
  "2-mercapto-5-methoxybenzimidazole": { src: "/images/structures/2-mercapto-5-methoxybenzimidazole.svg", pubchemCid: 665603 },
  "2-mercapto-benzimidazole": { src: "/images/structures/2-mercapto-benzimidazole.svg", pubchemCid: 707035 },
  "2-phenyl-butyric-acid": { src: "/images/structures/2-phenyl-butyric-acid.svg", pubchemCid: 7012 },
  "anethole": { src: "/images/structures/anethole.svg", pubchemCid: 637563 },
  "benzhydryl-thioacetamide": { src: "/images/structures/benzhydryl-thioacetamide.svg", pubchemCid: 9965017 },
  "benzyl-acetate": { src: "/images/structures/benzyl-acetate.svg", pubchemCid: 8785 },
  "benzyl-alcohol": { src: "/images/structures/benzyl-alcohol.svg", pubchemCid: 244 },
  "benzyl-benzoate": { src: "/images/structures/benzyl-benzoate.svg", pubchemCid: 2345 },
  "benzyl-butyrate": { src: "/images/structures/benzyl-butyrate.svg", pubchemCid: 7650 },
  "benzyl-propionate": { src: "/images/structures/benzyl-propionate.svg", pubchemCid: 31219 },
  "benzyl-tributyl-ammonium-chloride": { src: "/images/structures/benzyl-tributyl-ammonium-chloride.svg", pubchemCid: 159952 },
  "benzyl-triethyl-ammonium-chloride": { src: "/images/structures/benzyl-triethyl-ammonium-chloride.svg", pubchemCid: 66133 },
  "benzyl-triphenyl-phosphonium-chloride": { src: "/images/structures/benzyl-triphenyl-phosphonium-chloride.svg", pubchemCid: 70671 },
  "butyl-triphenyl-phosphonium-chloride": { src: "/images/structures/butyl-triphenyl-phosphonium-chloride.svg", pubchemCid: 166797 },
  "calcium-propionate": { src: "/images/structures/calcium-propionate.svg", pubchemCid: 19999 },
  "diphenyl-acetic-acid": { src: "/images/structures/diphenyl-acetic-acid.svg", pubchemCid: 8333 },
  "diphenyl-acetonitrile": { src: "/images/structures/diphenyl-acetonitrile.svg", pubchemCid: 6837 },
  "ethyl-benzoate": { src: "/images/structures/ethyl-benzoate.svg", pubchemCid: 7165 },
  "ethyl-triphenyl-phosphonium-bromide": { src: "/images/structures/ethyl-triphenyl-phosphonium-bromide.svg", pubchemCid: 73727 },
  "ethyl-triphenyl-phosphonium-iodide": { src: "/images/structures/ethyl-triphenyl-phosphonium-iodide.svg", pubchemCid: 78474 },
  "eugenol": { src: "/images/structures/eugenol.svg", pubchemCid: 3314 },
  "indole-powder": { src: "/images/structures/indole-powder.svg", pubchemCid: 798 },
  "isoamyl-acetate": { src: "/images/structures/isoamyl-acetate.svg", pubchemCid: 31276 },
  "isoamyl-butyrate": { src: "/images/structures/isoamyl-butyrate.svg", pubchemCid: 7795 },
  "menthol": { src: "/images/structures/menthol.svg", pubchemCid: 1254 },
  "methoxymethyl-triphenyl-phosphonium-chloride": { src: "/images/structures/methoxymethyl-triphenyl-phosphonium-chloride.svg", pubchemCid: 2723799 },
  "methyl-benzoate": { src: "/images/structures/methyl-benzoate.svg", pubchemCid: 7150 },
  "methyl-eugenol": { src: "/images/structures/methyl-eugenol.svg", pubchemCid: 7127 },
  "methyl-salicylate": { src: "/images/structures/methyl-salicylate.svg", pubchemCid: 4133 },
  "methyl-triphenyl-phosphonium-bromide": { src: "/images/structures/methyl-triphenyl-phosphonium-bromide.svg", pubchemCid: 74505 },
  "phenoxy-ethyl-isobutyrate": { src: "/images/structures/phenoxy-ethyl-isobutyrate.svg", pubchemCid: 61005 },
  "phenyl-ethyl-isobutyrate": { src: "/images/structures/phenyl-ethyl-isobutyrate.svg", pubchemCid: 7655 },
  "phenyl-trimethyl-ammonium-chloride": { src: "/images/structures/phenyl-trimethyl-ammonium-chloride.svg", pubchemCid: 67309 },
  "potassium-sorbate": { src: "/images/structures/potassium-sorbate.svg", pubchemCid: 23676745 },
  "sodium-benzoate": { src: "/images/structures/sodium-benzoate.svg", pubchemCid: 517055 },
  "sorbitol-70-solution": { src: "/images/structures/sorbitol-70-solution.svg", pubchemCid: 5780 },
  "tetrabutyl-ammonium-bromide": { src: "/images/structures/tetrabutyl-ammonium-bromide.svg", pubchemCid: 74236 },
  "tetrabutyl-ammonium-fluoride": { src: "/images/structures/tetrabutyl-ammonium-fluoride.svg", pubchemCid: 2724141 },
  "tetrabutyl-ammonium-hydrogen-sulphate": { src: "/images/structures/tetrabutyl-ammonium-hydrogen-sulphate.svg", pubchemCid: 94433 },
  "tetrabutyl-ammonium-iodide": { src: "/images/structures/tetrabutyl-ammonium-iodide.svg", pubchemCid: 67553 },
  "tetraethyl-ammonium-bromide": { src: "/images/structures/tetraethyl-ammonium-bromide.svg", pubchemCid: 6285 },
  "tetraethyl-ammonium-tetrafluoroborate": { src: "/images/structures/tetraethyl-ammonium-tetrafluoroborate.svg", pubchemCid: 2724277 },
  "yara-yara-crystal": { src: "/images/structures/yara-yara-crystal.svg", pubchemCid: 7119 },
}

export function productImageFor(slug: string): ProductImage | undefined {
  return productImages[slug]
}

export function productStructureFor(slug: string): { src: string; pubchemCid: number } | undefined {
  return productStructures[slug]
}

/** Alt text for a product's image, shared by the page markup and structured data. */
export function productImageAlt(product: Product, image = productImageFor(product.slug)): string {
  if (image?.kind === "photo") return `${product.name} — ${image.alt}`
  if (image?.kind === "generated") return `${product.name} — ${image.alt} (illustrative image)`
  if (image?.kind === "structure") {
    return `Chemical structure of ${product.name}${product.molecularFormula ? ` (${product.molecularFormula})` : ""}`
  }
  return `${product.name} — ${categoryName(product.category).toLowerCase()} supplied by Sheetal Aromatics`
}
