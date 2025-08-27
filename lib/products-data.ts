export interface Product {
  id: string
  name: string
  category: string
  description: string
  casNumber?: string
  molecularFormula?: string
  molecularWeight?: string
  purity?: string
  physicalForm?: string
  applications: string[]
  keywords: string[]
  specifications?: string[]
  physicalProperties?: {
    appearance?: string
    odor?: string
    boilingPoint?: string
    meltingPoint?: string
    density?: string
    solubility?: string
  }
  safetyInfo?: {
    hazardClass?: string
    storageConditions?: string
    shelfLife?: string
  }
  synonyms?: string[]
}

export const productsDatabase: Product[] = [
  // Aromatic Chemicals
  {
    id: "benzyl-acetate",
    name: "Benzyl Acetate",
    category: "Aromatic Chemicals",
    description:
      "High-quality aromatic ester with sweet floral fragrance, widely used in perfumery and flavoring industries",
    casNumber: "140-11-4",
    molecularFormula: "C9H10O2",
    molecularWeight: "150.17 g/mol",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavoring", "Cosmetics", "Food Industry"],
    keywords: ["benzyl", "acetate", "ester", "fragrance", "floral", "sweet"],
    physicalProperties: {
      appearance: "Clear colorless liquid",
      odor: "Sweet floral, jasmine-like",
      boilingPoint: "213°C",
      density: "1.055 g/cm³ at 20°C",
    },
  },
  {
    id: "benzyl-alcohol",
    name: "Benzyl Alcohol",
    category: "Aromatic Chemicals",
    description: "Versatile aromatic alcohol used as solvent, preservative, and fragrance ingredient",
    casNumber: "100-51-6",
    molecularFormula: "C7H8O",
    molecularWeight: "108.14 g/mol",
    purity: "99.5%+",
    physicalForm: "Liquid",
    applications: ["Solvent", "Preservative", "Fragrance", "Pharmaceutical"],
    keywords: ["benzyl", "alcohol", "solvent", "preservative"],
    physicalProperties: {
      appearance: "Clear colorless liquid",
      odor: "Faint sweet odor",
      boilingPoint: "205.3°C",
    },
  },
  {
    id: "benzyl-benzoate",
    name: "Benzyl Benzoate",
    category: "Aromatic Chemicals",
    description: "Aromatic ester used in perfumery and as a solvent for various applications",
    casNumber: "120-51-4",
    molecularFormula: "C14H12O2",
    molecularWeight: "212.24 g/mol",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Solvent", "Pharmaceutical", "Cosmetics"],
    keywords: ["benzyl", "benzoate", "ester", "solvent", "fragrance"],
  },
  {
    id: "benzyl-propionate",
    name: "Benzyl Propionate",
    category: "Aromatic Chemicals",
    description: "Fruity aromatic ester with sweet honey-like fragrance",
    casNumber: "122-63-4",
    molecularFormula: "C10H12O2",
    purity: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavoring", "Cosmetics"],
    keywords: ["benzyl", "propionate", "fruity", "honey", "sweet"],
  },
  {
    id: "benzyl-butyrate",
    name: "Benzyl Butyrate",
    category: "Aromatic Chemicals",
    description: "Fruity aromatic ester with plum-like fragrance",
    casNumber: "103-37-7",
    molecularFormula: "C11H14O2",
    purity: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavoring", "Food Industry"],
    keywords: ["benzyl", "butyrate", "fruity", "plum", "ester"],
  },
  {
    id: "phenyl-ethyl-isobutyrate",
    name: "Phenyl Ethyl Isobutyrate",
    category: "Aromatic Chemicals",
    description: "Rose-like aromatic ester used in fine fragrances",
    casNumber: "103-48-0",
    molecularFormula: "C12H16O2",
    purity: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Fine Fragrances", "Cosmetics"],
    keywords: ["phenyl", "ethyl", "isobutyrate", "rose", "floral"],
  },
  {
    id: "phenoxy-ethyl-isobutyrate",
    name: "Phenoxy Ethyl Isobutyrate",
    category: "Aromatic Chemicals",
    description: "Honey-rose aromatic ester for perfumery applications",
    casNumber: "103-60-6",
    molecularFormula: "C12H16O3",
    purity: "98%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Fragrances", "Cosmetics"],
    keywords: ["phenoxy", "ethyl", "isobutyrate", "honey", "rose"],
  },
  {
    id: "isoamyl-acetate",
    name: "Isoamyl Acetate",
    category: "Aromatic Chemicals",
    description: "Banana-like fruity ester widely used in flavoring",
    casNumber: "123-92-2",
    molecularFormula: "C7H14O2",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Flavoring", "Food Industry", "Perfumery"],
    keywords: ["isoamyl", "acetate", "banana", "fruity", "flavoring"],
  },
  {
    id: "isoamyl-butyrate",
    name: "Isoamyl Butyrate",
    category: "Aromatic Chemicals",
    description: "Pear-like fruity ester for flavoring applications",
    casNumber: "106-27-4",
    molecularFormula: "C9H18O2",
    purity: "98%+",
    physicalForm: "Liquid",
    applications: ["Flavoring", "Food Industry", "Beverages"],
    keywords: ["isoamyl", "butyrate", "pear", "fruity"],
  },
  {
    id: "ethyl-benzoate",
    name: "Ethyl Benzoate",
    category: "Aromatic Chemicals",
    description: "Sweet aromatic ester with wintergreen-like odor",
    casNumber: "93-89-0",
    molecularFormula: "C9H10O2",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavoring", "Solvent"],
    keywords: ["ethyl", "benzoate", "sweet", "wintergreen"],
  },
  {
    id: "indole-powder",
    name: "Indole Powder",
    category: "Aromatic Chemicals",
    description: "Crystalline aromatic compound used in perfumery",
    casNumber: "120-72-9",
    molecularFormula: "C8H7N",
    purity: "99%+",
    physicalForm: "Powder",
    applications: ["Perfumery", "Fine Fragrances", "Chemical Synthesis"],
    keywords: ["indole", "powder", "crystalline", "aromatic"],
  },
  {
    id: "methyl-salicylate",
    name: "Methyl Salicylate",
    category: "Aromatic Chemicals",
    description: "Wintergreen oil with characteristic minty aroma",
    casNumber: "119-36-8",
    molecularFormula: "C8H8O3",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Pharmaceuticals", "Topical Applications", "Flavoring"],
    keywords: ["methyl", "salicylate", "wintergreen", "minty"],
  },
  {
    id: "menthol",
    name: "Menthol",
    category: "Aromatic Chemicals",
    description: "Cooling agent with refreshing mint aroma",
    casNumber: "89-78-1",
    molecularFormula: "C10H20O",
    purity: "99%+",
    physicalForm: "Crystals",
    applications: ["Pharmaceuticals", "Cosmetics", "Food Industry", "Oral Care"],
    keywords: ["menthol", "cooling", "mint", "refreshing"],
  },
  {
    id: "methyl-benzoate",
    name: "Methyl Benzoate",
    category: "Aromatic Chemicals",
    description: "Pleasant aromatic ester with fruity odor",
    casNumber: "93-58-3",
    molecularFormula: "C8H8O2",
    purity: "99%+",
    physicalForm: "Liquid",
    applications: ["Perfumery", "Flavoring", "Solvent"],
    keywords: ["methyl", "benzoate", "fruity", "pleasant"],
  },
  {
    id: "yara-yara-crystal",
    name: "Yara Yara Crystal",
    category: "Aromatic Chemicals",
    description: "Specialty aromatic crystal for perfumery applications",
    purity: "High Grade",
    physicalForm: "Crystals",
    applications: ["Perfumery", "Fine Fragrances", "Specialty Applications"],
    keywords: ["yara", "crystal", "specialty", "aromatic"],
  },

  // Essential Oils
  {
    id: "lemongrass-oil",
    name: "Lemongrass Oil",
    category: "Essential Oils",
    description: "Steam distilled lemongrass essential oil with fresh citrusy aroma",
    purity: "100% Pure",
    applications: ["Aromatherapy", "Perfumery", "Food Flavoring", "Insect Repellent"],
    keywords: ["lemongrass", "citrus", "fresh", "natural", "steam distilled"],
  },
  {
    id: "cinnamon-oil",
    name: "Cinnamon Oil",
    category: "Essential Oils",
    description: "Warm spicy essential oil with characteristic cinnamon aroma",
    purity: "100% Pure",
    applications: ["Aromatherapy", "Food Flavoring", "Perfumery", "Traditional Medicine"],
    keywords: ["cinnamon", "spicy", "warm", "aromatic", "natural"],
  },
  {
    id: "clove-oil",
    name: "Clove Oil",
    category: "Essential Oils",
    description: "Potent essential oil with strong spicy aroma, rich in eugenol",
    purity: "100% Pure",
    applications: ["Dental Care", "Aromatherapy", "Food Flavoring", "Traditional Medicine"],
    keywords: ["clove", "spicy", "eugenol", "dental", "potent"],
  },
  {
    id: "eucalyptus-oil",
    name: "Eucalyptus Oil",
    category: "Essential Oils",
    description: "Refreshing essential oil with camphoraceous aroma, rich in eucalyptol",
    purity: "100% Pure",
    applications: ["Pharmaceuticals", "Aromatherapy", "Personal Care", "Respiratory Care"],
    keywords: ["eucalyptus", "camphor", "refreshing", "medicinal", "eucalyptol"],
  },
  {
    id: "peppermint-oil",
    name: "Peppermint Oil",
    category: "Essential Oils",
    description: "Cooling essential oil with fresh minty aroma",
    purity: "100% Pure",
    applications: ["Food Industry", "Pharmaceuticals", "Cosmetics", "Oral Care"],
    keywords: ["peppermint", "cooling", "minty", "fresh", "menthol"],
  },
  {
    id: "patchouli-oil",
    name: "Patchouli Oil",
    category: "Essential Oils",
    description: "Earthy essential oil with deep, musky aroma",
    purity: "100% Pure",
    applications: ["Perfumery", "Aromatherapy", "Cosmetics", "Traditional Medicine"],
    keywords: ["patchouli", "earthy", "musky", "deep", "perfumery"],
  },
  {
    id: "eugenol",
    name: "Eugenol",
    category: "Essential Oils",
    description: "Phenolic compound with clove-like aroma, derived from clove oil",
    casNumber: "97-53-0",
    molecularFormula: "C10H12O2",
    purity: "99%+",
    applications: ["Dental Care", "Perfumery", "Food Flavoring", "Pharmaceuticals"],
    keywords: ["eugenol", "clove", "phenolic", "dental", "aromatic"],
  },
  {
    id: "methyl-eugenol",
    name: "Methyl Eugenol",
    category: "Essential Oils",
    description: "Sweet spicy aromatic compound with carnation-like odor",
    casNumber: "93-15-2",
    molecularFormula: "C11H14O2",
    purity: "99%+",
    applications: ["Perfumery", "Flavoring", "Cosmetics"],
    keywords: ["methyl", "eugenol", "sweet", "spicy", "carnation"],
  },
  {
    id: "anethole",
    name: "Anethole",
    category: "Essential Oils",
    description: "Sweet aromatic compound with anise-like flavor",
    casNumber: "104-46-1",
    molecularFormula: "C10H12O",
    purity: "99%+",
    applications: ["Food Flavoring", "Perfumery", "Pharmaceuticals"],
    keywords: ["anethole", "sweet", "anise", "flavoring", "aromatic"],
  },
  {
    id: "sandalwood-oil",
    name: "Sandalwood Oil",
    category: "Essential Oils",
    description: "Premium essential oil with woody, creamy aroma",
    purity: "100% Pure",
    applications: ["Perfumery", "Aromatherapy", "Cosmetics", "Traditional Medicine"],
    keywords: ["sandalwood", "woody", "creamy", "premium", "luxury"],
  },
  {
    id: "rosemary-oil",
    name: "Rosemary Oil",
    category: "Essential Oils",
    description: "Herbaceous essential oil with fresh, woody aroma",
    purity: "100% Pure",
    applications: ["Aromatherapy", "Hair Care", "Food Flavoring", "Natural Preservative"],
    keywords: ["rosemary", "herbaceous", "woody", "fresh", "hair care"],
  },
  {
    id: "tea-tree-oil",
    name: "Tea Tree Oil",
    category: "Essential Oils",
    description: "Antimicrobial essential oil with medicinal properties",
    purity: "100% Pure",
    applications: ["Skin Care", "Antimicrobial", "Aromatherapy", "Personal Care"],
    keywords: ["tea tree", "antimicrobial", "medicinal", "skin care", "natural"],
  },

  // Ayurvedic Herbs
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    category: "Ayurvedic Herbs",
    description: "Premium adaptogenic herb for wellness and stress management",
    purity: "Organic Grade",
    applications: ["Ayurvedic Medicine", "Dietary Supplements", "Stress Management"],
    keywords: ["ashwagandha", "adaptogen", "wellness", "stress", "immunity"],
  },
  {
    id: "amla",
    name: "Amla",
    category: "Ayurvedic Herbs",
    description: "Vitamin C rich fruit used in traditional Ayurvedic medicine",
    purity: "Natural Grade",
    applications: ["Dietary Supplements", "Hair Care", "Immunity", "Antioxidant"],
    keywords: ["amla", "vitamin c", "antioxidant", "immunity", "hair care"],
  },
  {
    id: "harad",
    name: "Harad",
    category: "Ayurvedic Herbs",
    description: "Traditional Ayurvedic herb known as the king of medicines",
    purity: "Natural Grade",
    applications: ["Digestive Health", "Ayurvedic Medicine", "Traditional Remedies"],
    keywords: ["harad", "digestive", "traditional", "ayurvedic", "medicine"],
  },
  {
    id: "baheda",
    name: "Baheda",
    category: "Ayurvedic Herbs",
    description: "Important component of Triphala, used for digestive health",
    purity: "Natural Grade",
    applications: ["Digestive Health", "Triphala", "Ayurvedic Medicine"],
    keywords: ["baheda", "triphala", "digestive", "ayurvedic", "health"],
  },
  {
    id: "gokhru",
    name: "Gokhru",
    category: "Ayurvedic Herbs",
    description: "Traditional herb used for urinary and reproductive health",
    purity: "Natural Grade",
    applications: ["Urinary Health", "Reproductive Health", "Traditional Medicine"],
    keywords: ["gokhru", "urinary", "reproductive", "traditional", "health"],
  },
  {
    id: "shatavari",
    name: "Shatavari",
    category: "Ayurvedic Herbs",
    description: "Women's wellness herb with rejuvenating properties",
    purity: "Natural Grade",
    applications: ["Women's Health", "Rejuvenation", "Ayurvedic Medicine"],
    keywords: ["shatavari", "women", "wellness", "rejuvenating", "health"],
  },
  {
    id: "jamun-beej",
    name: "Jamun Beej",
    category: "Ayurvedic Herbs",
    description: "Jamun seeds used for blood sugar management",
    purity: "Natural Grade",
    applications: ["Blood Sugar", "Diabetes Management", "Traditional Medicine"],
    keywords: ["jamun", "beej", "blood sugar", "diabetes", "seeds"],
  },
  {
    id: "karela",
    name: "Karela",
    category: "Ayurvedic Herbs",
    description: "Bitter gourd used for blood sugar and digestive health",
    purity: "Natural Grade",
    applications: ["Blood Sugar", "Digestive Health", "Traditional Medicine"],
    keywords: ["karela", "bitter gourd", "blood sugar", "digestive", "health"],
  },
  {
    id: "nasottar",
    name: "Nasottar",
    category: "Ayurvedic Herbs",
    description: "Traditional Ayurvedic herb for respiratory health",
    purity: "Natural Grade",
    applications: ["Respiratory Health", "Traditional Medicine", "Ayurvedic Remedies"],
    keywords: ["nasottar", "respiratory", "traditional", "ayurvedic", "health"],
  },
  {
    id: "vavding",
    name: "Vavding",
    category: "Ayurvedic Herbs",
    description: "Traditional herb used in Ayurvedic formulations",
    purity: "Natural Grade",
    applications: ["Traditional Medicine", "Ayurvedic Formulations", "Health Supplements"],
    keywords: ["vavding", "traditional", "ayurvedic", "formulations", "health"],
  },
  {
    id: "lindi-pepper",
    name: "Lindi Pepper",
    category: "Ayurvedic Herbs",
    description: "Traditional pepper variety with medicinal properties",
    purity: "Natural Grade",
    applications: ["Digestive Health", "Traditional Medicine", "Spice"],
    keywords: ["lindi", "pepper", "digestive", "medicinal", "spice"],
  },
  {
    id: "sunth-ginger",
    name: "Sunth (Ginger)",
    category: "Ayurvedic Herbs",
    description: "Dried ginger with warming and digestive properties",
    purity: "Natural Grade",
    applications: ["Digestive Health", "Warming", "Traditional Medicine", "Spice"],
    keywords: ["sunth", "ginger", "digestive", "warming", "spice"],
  },
  {
    id: "nimboda-beej",
    name: "Nimboda Beej",
    category: "Ayurvedic Herbs",
    description: "Traditional seeds used in Ayurvedic medicine",
    purity: "Natural Grade",
    applications: ["Traditional Medicine", "Ayurvedic Remedies", "Health Supplements"],
    keywords: ["nimboda", "beej", "seeds", "traditional", "ayurvedic"],
  },
  {
    id: "garcinia-cambogia",
    name: "Garcinia Cambogia",
    category: "Ayurvedic Herbs",
    description: "Tropical fruit extract used for weight management",
    purity: "Natural Grade",
    applications: ["Weight Management", "Dietary Supplements", "Traditional Medicine"],
    keywords: ["garcinia", "cambogia", "weight", "management", "extract"],
  },
  {
    id: "nagarmotha",
    name: "Nagarmotha",
    category: "Ayurvedic Herbs",
    description: "Traditional herb used for digestive and skin health",
    purity: "Natural Grade",
    applications: ["Digestive Health", "Skin Care", "Traditional Medicine"],
    keywords: ["nagarmotha", "digestive", "skin", "traditional", "health"],
  },
  {
    id: "danti-beej",
    name: "Danti Beej",
    category: "Ayurvedic Herbs",
    description: "Traditional seeds used in Ayurvedic formulations",
    purity: "Natural Grade",
    applications: ["Traditional Medicine", "Ayurvedic Formulations", "Health Remedies"],
    keywords: ["danti", "beej", "seeds", "traditional", "ayurvedic"],
  },

  // Ayurvedic Powders
  {
    id: "ashwagandha-powder",
    name: "Ashwagandha Powder",
    category: "Ayurvedic Powders",
    description: "Fine powder of adaptogenic Ashwagandha root",
    purity: "Organic Grade",
    physicalForm: "Powder",
    applications: ["Dietary Supplements", "Stress Management", "Wellness"],
    keywords: ["ashwagandha", "powder", "adaptogen", "stress", "wellness"],
  },
  {
    id: "amla-powder",
    name: "Amla Powder",
    category: "Ayurvedic Powders",
    description: "Vitamin C rich Amla fruit powder",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Dietary Supplements", "Hair Care", "Immunity", "Antioxidant"],
    keywords: ["amla", "powder", "vitamin c", "immunity", "antioxidant"],
  },
  {
    id: "harad-powder",
    name: "Harad Powder",
    category: "Ayurvedic Powders",
    description: "Fine powder of Harad for digestive health",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Digestive Health", "Ayurvedic Medicine", "Traditional Remedies"],
    keywords: ["harad", "powder", "digestive", "ayurvedic", "health"],
  },
  {
    id: "triphala-powder",
    name: "Triphala Powder",
    category: "Ayurvedic Powders",
    description: "Traditional blend of three fruits for digestive wellness",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Digestive Health", "Detoxification", "Ayurvedic Medicine"],
    keywords: ["triphala", "powder", "digestive", "detox", "three fruits"],
  },
  {
    id: "neem-powder",
    name: "Neem Powder",
    category: "Ayurvedic Powders",
    description: "Antimicrobial Neem leaf powder for skin and health",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Skin Care", "Antimicrobial", "Traditional Medicine", "Personal Care"],
    keywords: ["neem", "powder", "antimicrobial", "skin care", "natural"],
  },
  {
    id: "tulsi-powder",
    name: "Tulsi Powder",
    category: "Ayurvedic Powders",
    description: "Holy basil powder with adaptogenic properties",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Respiratory Health", "Immunity", "Stress Relief", "Traditional Medicine"],
    keywords: ["tulsi", "powder", "holy basil", "immunity", "respiratory"],
  },
  {
    id: "gokhru-powder",
    name: "Gokhru Powder",
    category: "Ayurvedic Powders",
    description: "Fine powder for urinary and reproductive health",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Urinary Health", "Reproductive Health", "Traditional Medicine"],
    keywords: ["gokhru", "powder", "urinary", "reproductive", "health"],
  },
  {
    id: "karela-powder",
    name: "Karela Powder",
    category: "Ayurvedic Powders",
    description: "Bitter gourd powder for blood sugar management",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Blood Sugar", "Diabetes Management", "Traditional Medicine"],
    keywords: ["karela", "powder", "bitter gourd", "blood sugar", "diabetes"],
  },
  {
    id: "sunth-powder",
    name: "Sunth Powder",
    category: "Ayurvedic Powders",
    description: "Dried ginger powder with warming properties",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Digestive Health", "Warming", "Traditional Medicine", "Spice"],
    keywords: ["sunth", "powder", "ginger", "digestive", "warming"],
  },
  {
    id: "garcinia-cambogia-powder",
    name: "Garcinia Cambogia Powder",
    category: "Ayurvedic Powders",
    description: "Weight management powder from tropical fruit extract",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Weight Management", "Dietary Supplements", "Traditional Medicine"],
    keywords: ["garcinia", "cambogia", "powder", "weight", "management"],
  },
  {
    id: "moringa-powder",
    name: "Moringa Powder",
    category: "Ayurvedic Powders",
    description: "Nutrient-rich superfood powder from Moringa leaves",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Nutrition", "Dietary Supplements", "Superfood", "Health"],
    keywords: ["moringa", "powder", "superfood", "nutrition", "health"],
  },
  {
    id: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Ayurvedic Powders",
    description: "High curcumin content turmeric powder with anti-inflammatory properties",
    purity: "Natural Grade",
    physicalForm: "Powder",
    applications: ["Food Industry", "Dietary Supplements", "Anti-inflammatory", "Traditional Medicine"],
    keywords: ["turmeric", "powder", "curcumin", "anti-inflammatory", "golden"],
  },
  {
    id: "shilajit-powder-3",
    name: "Shilajit Powder (3%)",
    category: "Ayurvedic Powders",
    description: "Premium Shilajit powder with 3% fulvic acid content",
    purity: "3% Fulvic Acid",
    physicalForm: "Powder",
    applications: ["Energy", "Vitality", "Traditional Medicine", "Dietary Supplements"],
    keywords: ["shilajit", "powder", "fulvic acid", "energy", "vitality"],
  },
  {
    id: "shilajit-powder-5",
    name: "Shilajit Powder (5%)",
    category: "Ayurvedic Powders",
    description: "Premium Shilajit powder with 5% fulvic acid content",
    purity: "5% Fulvic Acid",
    physicalForm: "Powder",
    applications: ["Energy", "Vitality", "Traditional Medicine", "Dietary Supplements"],
    keywords: ["shilajit", "powder", "fulvic acid", "energy", "vitality"],
  },
  {
    id: "shilajit-powder-7",
    name: "Shilajit Powder (7%)",
    category: "Ayurvedic Powders",
    description: "Premium Shilajit powder with 7% fulvic acid content",
    purity: "7% Fulvic Acid",
    physicalForm: "Powder",
    applications: ["Energy", "Vitality", "Traditional Medicine", "Dietary Supplements"],
    keywords: ["shilajit", "powder", "fulvic acid", "energy", "vitality"],
  },

  // Metals
  {
    id: "selenium-metal-powder",
    name: "Selenium Metal Powder (99.9%)",
    category: "Metals",
    description: "High purity selenium metal powder for industrial and pharmaceutical applications",
    casNumber: "7782-49-2",
    molecularFormula: "Se",
    molecularWeight: "78.96 g/mol",
    purity: "99.9%",
    physicalForm: "Powder",
    applications: ["Electronics", "Glass Industry", "Pharmaceuticals", "Research"],
    keywords: ["selenium", "metal", "powder", "high purity", "industrial"],
  },
  {
    id: "iodine",
    name: "Iodine (99.5%)",
    category: "Metals",
    description: "High purity iodine for pharmaceutical and industrial applications",
    casNumber: "7553-56-2",
    molecularFormula: "I2",
    molecularWeight: "253.81 g/mol",
    purity: "99.5%",
    physicalForm: "Solid",
    applications: ["Pharmaceuticals", "Antiseptic", "Industrial", "Research"],
    keywords: ["iodine", "high purity", "pharmaceutical", "antiseptic"],
  },

  // Pharma Intermediates
  {
    id: "diphenyl-acetonitrile",
    name: "Diphenyl Acetonitrile",
    category: "Pharma Intermediates",
    description: "Important pharmaceutical intermediate for drug synthesis",
    casNumber: "86-29-3",
    molecularFormula: "C14H11N",
    molecularWeight: "193.25 g/mol",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Chemical Manufacturing", "Research"],
    keywords: ["diphenyl", "acetonitrile", "intermediate", "pharmaceutical", "synthesis"],
  },
  {
    id: "diphenyl-acetic-acid",
    name: "Diphenyl Acetic Acid",
    category: "Pharma Intermediates",
    description: "Pharmaceutical intermediate for drug development",
    casNumber: "117-34-0",
    molecularFormula: "C14H12O2",
    molecularWeight: "212.24 g/mol",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Drug Development", "Chemical Manufacturing"],
    keywords: ["diphenyl", "acetic acid", "pharmaceutical", "intermediate"],
  },
  {
    id: "dimethyl-isopropyl-chloride-hydrochloride",
    name: "Dimethyl Isopropyl Chloride Hydrochloride",
    category: "Pharma Intermediates",
    description: "Specialized pharmaceutical intermediate compound",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Chemical Manufacturing", "Research"],
    keywords: ["dimethyl", "isopropyl", "chloride", "hydrochloride", "pharmaceutical"],
  },
  {
    id: "benhydryl-thioacetamide",
    name: "Benhydryl Thioacetamide",
    category: "Pharma Intermediates",
    description: "Pharmaceutical intermediate for drug synthesis",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Drug Development", "Chemical Manufacturing"],
    keywords: ["benhydryl", "thioacetamide", "pharmaceutical", "intermediate"],
  },
  {
    id: "diphenyl-bromo-butyronitrile",
    name: "2,2-Diphenyl-4-Bromo Butyronitrile",
    category: "Pharma Intermediates",
    description: "Specialized pharmaceutical intermediate for complex synthesis",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Chemical Manufacturing", "Research"],
    keywords: ["diphenyl", "bromo", "butyronitrile", "pharmaceutical", "synthesis"],
  },
  {
    id: "phenyl-butyric-acid",
    name: "2-Phenyl Butyric Acid",
    category: "Pharma Intermediates",
    description: "Pharmaceutical intermediate for drug development",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Drug Development", "Chemical Manufacturing"],
    keywords: ["phenyl", "butyric acid", "pharmaceutical", "intermediate"],
  },
  {
    id: "mercapto-benzimidazole",
    name: "2-Mercapto Benzimidazole",
    category: "Pharma Intermediates",
    description: "Important pharmaceutical intermediate with sulfur functionality",
    casNumber: "583-39-1",
    molecularFormula: "C7H6N2S",
    purity: "98%+",
    physicalForm: "Solid",
    applications: ["Pharmaceutical Synthesis", "Chemical Manufacturing", "Research"],
    keywords: ["mercapto", "benzimidazole", "pharmaceutical", "sulfur", "intermediate"],
  },
]

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return productsDatabase

  const searchTerm = query.toLowerCase().trim()

  return productsDatabase.filter((product) => {
    // Search in name
    if (product.name.toLowerCase().includes(searchTerm)) return true

    // Search in category
    if (product.category.toLowerCase().includes(searchTerm)) return true

    // Search in description
    if (product.description.toLowerCase().includes(searchTerm)) return true

    // Search in CAS number
    if (product.casNumber?.includes(searchTerm)) return true

    // Search in molecular formula
    if (product.molecularFormula?.toLowerCase().includes(searchTerm)) return true

    // Search in applications
    if (product.applications.some((app) => app.toLowerCase().includes(searchTerm))) return true

    // Search in keywords
    if (product.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm))) return true

    // Search in specifications
    if (product.specifications?.some((spec) => spec.toLowerCase().includes(searchTerm))) return true

    // Search in synonyms
    if (product.synonyms?.some((synonym) => synonym.toLowerCase().includes(searchTerm))) return true

    // Search in physical properties
    if (product.physicalProperties) {
      const props = Object.values(product.physicalProperties).join(" ").toLowerCase()
      if (props.includes(searchTerm)) return true
    }

    // Search in physical form
    if (product.physicalForm?.toLowerCase().includes(searchTerm)) return true

    return false
  })
}

export function getProductsByCategory(category: string): Product[] {
  return productsDatabase.filter((product) => product.category === category)
}

export function getProductById(id: string): Product | undefined {
  return productsDatabase.find((product) => product.id === id)
}
