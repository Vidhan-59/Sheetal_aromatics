/**
 * Product imagery, keyed by product slug.
 *
 * Two kinds of image are used, chosen so that every picture is accurate:
 *  - "structure": the 2D chemical structure, drawn in the site palette from the
 *    PubChem record for the product's CAS number. Used for single substances.
 *  - "photo": a freely licensed photograph from Wikimedia Commons, used for
 *    botanicals, essential oils and elemental metals. Author and licence are
 *    kept here and shown next to the image and on /image-credits, as the
 *    licences require. `representative` marks photos that show the source plant
 *    or a comparable material rather than the exact traded form.
 *
 * Products without an entry fall back to the drawn <ProductVisual />.
 * To add a photo: save a 4:3 image as public/images/products/<slug>.webp
 * (1200×900) and <slug>-600.webp (600×450), a 600×450 JPEG at
 * public/images/products/og/<slug>.jpg for share cards, and add an entry here.
 */

import { categoryName, type Product } from "@/lib/products-data"

export interface PhotoCredit {
  author: string
  license: string
  licenseUrl?: string
  /** File page on Wikimedia Commons. */
  sourceUrl: string
}

export type ProductImage =
  | { kind: "structure"; src: string; pubchemCid: number }
  | {
      kind: "photo"
      /** 1200×900 WebP. */
      src: string
      /** 600×450 WebP for cards and thumbnails. */
      srcSmall: string
      /** 600×450 JPEG used by the generated share card (Open Graph cannot use WebP). */
      og: string
      alt: string
      representative?: boolean
      credit: PhotoCredit
    }

export const productImages: Record<string, ProductImage> = {
  "2-2-diphenyl-4-bromo-butyronitrile": { kind: "structure", src: "/images/structures/2-2-diphenyl-4-bromo-butyronitrile.svg", pubchemCid: 96575 },
  "2-mercapto-5-methoxybenzimidazole": { kind: "structure", src: "/images/structures/2-mercapto-5-methoxybenzimidazole.svg", pubchemCid: 665603 },
  "2-mercapto-benzimidazole": { kind: "structure", src: "/images/structures/2-mercapto-benzimidazole.svg", pubchemCid: 707035 },
  "2-phenyl-butyric-acid": { kind: "structure", src: "/images/structures/2-phenyl-butyric-acid.svg", pubchemCid: 7012 },
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
  "anethole": { kind: "structure", src: "/images/structures/anethole.svg", pubchemCid: 637563 },
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
  "benzhydryl-thioacetamide": { kind: "structure", src: "/images/structures/benzhydryl-thioacetamide.svg", pubchemCid: 9965017 },
  "benzyl-acetate": { kind: "structure", src: "/images/structures/benzyl-acetate.svg", pubchemCid: 8785 },
  "benzyl-alcohol": { kind: "structure", src: "/images/structures/benzyl-alcohol.svg", pubchemCid: 244 },
  "benzyl-benzoate": { kind: "structure", src: "/images/structures/benzyl-benzoate.svg", pubchemCid: 2345 },
  "benzyl-butyrate": { kind: "structure", src: "/images/structures/benzyl-butyrate.svg", pubchemCid: 7650 },
  "benzyl-propionate": { kind: "structure", src: "/images/structures/benzyl-propionate.svg", pubchemCid: 31219 },
  "benzyl-tributyl-ammonium-chloride": { kind: "structure", src: "/images/structures/benzyl-tributyl-ammonium-chloride.svg", pubchemCid: 159952 },
  "benzyl-triethyl-ammonium-chloride": { kind: "structure", src: "/images/structures/benzyl-triethyl-ammonium-chloride.svg", pubchemCid: 66133 },
  "benzyl-triphenyl-phosphonium-chloride": { kind: "structure", src: "/images/structures/benzyl-triphenyl-phosphonium-chloride.svg", pubchemCid: 70671 },
  "butyl-triphenyl-phosphonium-chloride": { kind: "structure", src: "/images/structures/butyl-triphenyl-phosphonium-chloride.svg", pubchemCid: 166797 },
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
  "diphenyl-acetic-acid": { kind: "structure", src: "/images/structures/diphenyl-acetic-acid.svg", pubchemCid: 8333 },
  "diphenyl-acetonitrile": { kind: "structure", src: "/images/structures/diphenyl-acetonitrile.svg", pubchemCid: 6837 },
  "ethyl-benzoate": { kind: "structure", src: "/images/structures/ethyl-benzoate.svg", pubchemCid: 7165 },
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
  "eugenol": { kind: "structure", src: "/images/structures/eugenol.svg", pubchemCid: 3314 },
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
  "indole-powder": { kind: "structure", src: "/images/structures/indole-powder.svg", pubchemCid: 798 },
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
  "isoamyl-acetate": { kind: "structure", src: "/images/structures/isoamyl-acetate.svg", pubchemCid: 31276 },
  "isoamyl-butyrate": { kind: "structure", src: "/images/structures/isoamyl-butyrate.svg", pubchemCid: 7795 },
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
  "menthol": { kind: "structure", src: "/images/structures/menthol.svg", pubchemCid: 1254 },
  "methyl-benzoate": { kind: "structure", src: "/images/structures/methyl-benzoate.svg", pubchemCid: 7150 },
  "methyl-eugenol": { kind: "structure", src: "/images/structures/methyl-eugenol.svg", pubchemCid: 7127 },
  "methyl-salicylate": { kind: "structure", src: "/images/structures/methyl-salicylate.svg", pubchemCid: 4133 },
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
  "phenoxy-ethyl-isobutyrate": { kind: "structure", src: "/images/structures/phenoxy-ethyl-isobutyrate.svg", pubchemCid: 61005 },
  "phenyl-ethyl-isobutyrate": { kind: "structure", src: "/images/structures/phenyl-ethyl-isobutyrate.svg", pubchemCid: 7655 },
  "phenyl-trimethyl-ammonium-chloride": { kind: "structure", src: "/images/structures/phenyl-trimethyl-ammonium-chloride.svg", pubchemCid: 67309 },
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
  "shilajit-powder-3": {
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
  "shilajit-powder-5": {
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
  "shilajit-powder-7": {
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
  "yara-yara-crystal": { kind: "structure", src: "/images/structures/yara-yara-crystal.svg", pubchemCid: 7119 },
}

export function productImageFor(slug: string): ProductImage | undefined {
  return productImages[slug]
}

/** Alt text for a product's image, shared by the page markup and structured data. */
export function productImageAlt(product: Product, image = productImageFor(product.slug)): string {
  if (image?.kind === "photo") return `${product.name} — ${image.alt}`
  if (image?.kind === "structure") {
    return `Chemical structure of ${product.name}${product.molecularFormula ? ` (${product.molecularFormula})` : ""}`
  }
  return `${product.name} — ${categoryName(product.category).toLowerCase()} supplied by Sheetal Aromatics`
}
