import type { ProductContentMap } from "./types"

/**
 * Ayurvedic "Herbs & Raw Materials" group. Describes each item as a traded raw
 * material only: identity, plant part, form, buyers and the parameters buyers
 * specify. Follows the accuracy rules in ./types.ts: no claims about effects
 * on the body, and no specification, origin, certification or pack size
 * beyond lib/products-data.ts.
 */
export const ayurvedicHerbsContent: ProductContentMap = {
  ashwagandha: {
    overview:
      "Ashwagandha is the dried root of Withania somnifera, a shrub of the nightshade family, Solanaceae. Also traded as Asgandh in Hindi and as Indian winter cherry in English, it is one of the most widely traded Ayurvedic raw materials. Buyers include Ayurvedic formulation manufacturers, dietary supplement producers and extraction units. When requesting a quote, state whole or cut root, the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add withanolide content and heavy metal, microbial and pesticide limits. The milled root is listed separately as Ashwagandha Powder.",
    faqs: [
      {
        question: "What is the botanical name of Ashwagandha?",
        answer:
          "Ashwagandha is Withania somnifera, a member of the nightshade family, Solanaceae. In Hindi it is also called Asgandh, and in English Indian winter cherry. The material listed here is the dried root; the milled root is listed separately in our catalogue as Ashwagandha Powder, for buyers who need ready-milled material.",
      },
      {
        question: "Is Ashwagandha the same as winter cherry?",
        answer:
          "Ashwagandha is sold in English as Indian winter cherry, but the shorter name winter cherry is also applied to other plants, such as Physalis alkekengi. To avoid a mix-up, purchase specifications and enquiries should name the species, Withania somnifera, and the plant part required, which for this listing is the root.",
      },
      {
        question: "What should I specify when requesting an Ashwagandha root quote?",
        answer:
          "State whole or cut root, the quantity and the destination. Most buyers set limits for moisture, foreign matter, total ash and acid-insoluble ash, and many require root-only material with no stem or leaf. Extraction units usually add withanolide content and heavy metal, microbial and pesticide limits. Our typical grade is natural grade, confirmed against your specification on enquiry.",
      },
      {
        question: "How is Ashwagandha root used in manufacturing?",
        answer:
          "Ayurvedic formulation manufacturers and dietary supplement producers mill the dried root for use as an ingredient in their products, while extraction units use it as feedstock for root extracts, which are commonly assayed for withanolides. Tell us which of these applies, because the specification differs; documentation is available on request for a specific enquiry.",
      },
    ],
  },

  amla: {
    overview:
      "Amla, known in English as Indian gooseberry and in Sanskrit as Amalaki, is the fruit of Emblica officinalis, also published as Phyllanthus emblica, of the family Phyllanthaceae. It is traded as the dried fruit, and buyers state whether they need it whole or cut. Ayurvedic formulation manufacturers, dietary supplement producers and hair and personal care manufacturers all buy it. A quote request should give the form, quantity and destination, with your limits for moisture, foreign matter, total ash and acid-insoluble ash. Some buyers also set tannin content and heavy metal, microbial and pesticide limits. Amla Powder, the milled fruit, is listed separately.",
    faqs: [
      {
        question: "What is the botanical name of Amla?",
        answer:
          "Amla is Emblica officinalis, a name now often published as Phyllanthus emblica; both refer to the same species in the family Phyllanthaceae. Its English name is Indian gooseberry and its Sanskrit name Amalaki. Either botanical name can be quoted in a purchase specification, and the part supplied under this listing is the dried fruit.",
      },
      {
        question: "Is Amla one of the Triphala fruits?",
        answer:
          "Yes. Amla is one of the three fruits combined in Triphala, the classical Ayurvedic blend of Amla, Harad (Terminalia chebula) and Baheda (Terminalia bellirica). Manufacturers who blend Triphala in-house buy the three fruits separately, while ready-blended material is listed in our catalogue as Triphala Powder, with the ratio and mesh size confirmed on enquiry.",
      },
      {
        question: "Should I buy dried Amla or Amla Powder?",
        answer:
          "Dried Amla, whole or cut, suits buyers who mill, extract or process the fruit themselves. Amla Powder, listed separately in our catalogue, is the milled fruit for buyers who want ready-to-use material; for powder, state the mesh size alongside your moisture, ash and microbial limits. Both are natural grade, with the specification confirmed against your requirement.",
      },
      {
        question: "Which industries buy dried Amla?",
        answer:
          "Ayurvedic formulation manufacturers use Amla as an ingredient in classical and proprietary formulations, dietary supplement producers use it in capsules, tablets and blends, and hair and personal care manufacturers use it in hair oils, powders and similar products. Documentation is available on request for a specific enquiry, so state the market your finished product is sold in.",
      },
    ],
  },

  harad: {
    overview:
      "Harad is the dried fruit of Terminalia chebula, family Combretaceae, known in Sanskrit as Haritaki and in English as chebulic myrobalan. Together with Baheda and Amla, it is one of the three fruits combined in Triphala. Buyers include Ayurvedic formulation manufacturers, Triphala blenders and extraction units. With a quote request, state whether you need whole or cut fruit, which type of Harad you work to, the quantity, and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers often add tannin content and heavy metal, microbial and pesticide limits. Harad Powder is listed separately.",
    faqs: [
      {
        question: "What are the other names for Harad?",
        answer:
          "Harad is Terminalia chebula, a tree of the family Combretaceae. It is sold as Harad in Hindi trade, as Haritaki in Sanskrit and as chebulic myrobalan in English. The part supplied under this listing is the dried fruit, and the milled fruit is listed separately in our catalogue as Harad Powder.",
      },
      {
        question: "Is there more than one type of Harad?",
        answer:
          "Yes. Indian trade distinguishes the small, dark, immature fruits, usually sold as Choti Harad or Kali Harad, from the larger mature fruits, sold as Badi Harad. They are traded and specified separately, so name the type, the botanical name Terminalia chebula and any size requirement in your enquiry, and we will confirm availability.",
      },
      {
        question: "How does Harad relate to Triphala?",
        answer:
          "Harad is one of the three fruits combined in Triphala, the classical Ayurvedic blend of Harad, Baheda (Terminalia bellirica) and Amla (Emblica officinalis). Blenders working to their own ratio buy the fruits separately, while ready-blended Triphala Powder is listed in our catalogue, with the ratio and mesh size confirmed on enquiry.",
      },
      {
        question: "What do extraction units specify when buying Harad?",
        answer:
          "Harad is a tannin-rich fruit, so extraction units commonly state a tannin or extractive value alongside moisture, foreign matter, total ash and acid-insoluble ash, plus heavy metal, microbial and pesticide limits for their market. Our typical grade is natural grade, with the specification confirmed against your requirement, and documentation is available on request for a specific enquiry.",
      },
    ],
  },

  baheda: {
    overview:
      "Baheda, also spelled Bahera, is the dried fruit of Terminalia bellirica, family Combretaceae, known in Sanskrit as Bibhitaki and in English as belleric myrobalan. It is one of the three fruits combined in Triphala, alongside Harad and Amla. Buyers include Ayurvedic formulation manufacturers, Triphala blenders and extraction units. When requesting a quote, state whether you need the whole fruit or the rind with the stone removed, the quantity, and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers often add tannin or extractive values and heavy metal, microbial and pesticide limits.",
    faqs: [
      {
        question: "What is the botanical name of Baheda?",
        answer:
          "Baheda is Terminalia bellirica, a tree of the family Combretaceae; the species name is also spelled bellerica in some references. It is known as Bibhitaki in Sanskrit and as belleric myrobalan in English. The part supplied under this listing is the dried fruit, and our typical grade is natural grade.",
      },
      {
        question: "How is Baheda different from Harad?",
        answer:
          "Both are dried Terminalia fruits traded as myrobalans, but they are different species: Baheda is Terminalia bellirica and Harad is Terminalia chebula. Because the trade names are similar and the two are often bought together for Triphala, name the species you need on each line of your enquiry or purchase order.",
      },
      {
        question: "Is Baheda available as a powder?",
        answer:
          "Baheda is listed in our catalogue as a whole raw material. It is also one of the three fruits in Triphala Powder, which is listed separately for buyers who want the ready-blended Harad, Baheda and Amla combination. If you need Baheda milled on its own, state the mesh size with your enquiry so we can confirm what can be supplied.",
      },
      {
        question: "Should I order whole Baheda fruit or the rind?",
        answer:
          "That depends on your process. Some formulators specify the fruit rind with the hard stone removed, while others buy the whole fruit and process it in-house. State which you need, along with your moisture, foreign matter and ash limits; the specification is confirmed against your requirement, and documentation is available on request for a specific enquiry.",
      },
    ],
  },

  gokhru: {
    overview:
      "Gokhru is the dried spiny fruit of Tribulus terrestris, family Zygophyllaceae, known in Sanskrit as Gokshura and in English as puncture vine or caltrop. Ayurvedic formulation manufacturers, dietary supplement producers and extraction units all buy it. When requesting a quote, state the botanical name, the quantity and the limits your specification sets for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add saponin content and heavy metal, microbial and pesticide limits. The whole dried fruit is described here; the milled fruit is listed separately as Gokhru Powder.",
    faqs: [
      {
        question: "What is the botanical name of Gokhru?",
        answer:
          "The Gokhru in our catalogue is Tribulus terrestris, a low, trailing plant of the family Zygophyllaceae. It is known as Gokshura in Sanskrit and as puncture vine or caltrop in English, names that refer to its hard, spiny fruits. The part supplied is the dried fruit; the milled fruit is listed separately as Gokhru Powder.",
      },
      {
        question: "What is the difference between small and large Gokhru?",
        answer:
          "In Indian trade, Tribulus terrestris is sometimes called Chhota (small) Gokhru, while Bada (large) Gokhru usually refers to a different plant, Pedalium murex. Because both are sold under the name Gokhru, state the botanical name Tribulus terrestris in your enquiry and specification so the correct material is quoted.",
      },
      {
        question: "What quality parameters do buyers set for Gokhru?",
        answer:
          "The fruits grow on a plant that trails along the ground, so buyers pay close attention to foreign matter and acid-insoluble ash, which reflect sand and soil. Moisture and total ash limits are standard, and extraction units usually add saponin content plus heavy metal, microbial and pesticide limits. Our typical grade is natural grade, confirmed against your requirement on enquiry.",
      },
      {
        question: "How is Gokhru used in manufacturing?",
        answer:
          "Ayurvedic formulation manufacturers and dietary supplement producers use the dried fruit, usually after milling, as an ingredient in their products, and extraction units use it as feedstock for Tribulus extracts, which are commonly assayed for saponins. Documentation is available on request for a specific enquiry, so mention your destination market when you send your requirement.",
      },
    ],
  },

  shatavari: {
    overview:
      "Shatavari is the dried root of Asparagus racemosus, a climbing asparagus of the family Asparagaceae. The plant forms clusters of fleshy tuberous roots, which are dried for the raw-material trade. It is bought by Ayurvedic formulation manufacturers, dietary supplement producers and extraction units. When requesting a quote, state the form you need (whole, cut or powdered), the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add saponin or extractive values and heavy metal, microbial and pesticide limits. Our typical grade is natural grade, and documentation is available on request for a specific enquiry.",
    faqs: [
      {
        question: "What is the botanical name of Shatavari?",
        answer:
          "Shatavari is Asparagus racemosus, a climbing plant of the asparagus family, Asparagaceae, and a relative of the vegetable asparagus. The part traded is the root: the plant produces clusters of fleshy, finger-like tuberous roots, which are dried before sale. Naming the species in your specification distinguishes it from other Asparagus species.",
      },
      {
        question: "Is Shatavari supplied whole, cut or as a powder?",
        answer:
          "Shatavari is listed in our catalogue as a root raw material. Tell us whether you need whole root, cut root or milled material, and for powder the mesh size, together with the quantity and destination, and we will confirm what can be supplied against your specification before quoting.",
      },
      {
        question: "What do extraction units specify for Shatavari?",
        answer:
          "Extraction units buying Shatavari root generally state saponin content or an extractive value, together with moisture, foreign matter, total ash and acid-insoluble ash limits and the heavy metal, microbial and pesticide limits of their market. Because the roots are fleshy when harvested, state your moisture limit for the dried material clearly. Our typical grade is natural grade.",
      },
      {
        question: "How is Shatavari used in manufacturing?",
        answer:
          "Ayurvedic formulation manufacturers and dietary supplement producers use the dried root, usually milled, as an ingredient in powders, granules, tablets and capsules, while extraction units use it as feedstock for root extracts. Each use calls for a different specification, so state your application in the enquiry; documentation is available on request for a specific enquiry.",
      },
    ],
  },

  "jamun-beej": {
    overview:
      "Jamun Beej is the dried seed of Syzygium cumini, a tree of the family Myrtaceae that is also published under the synonym Eugenia jambolana. In English it is sold as Jamun seed, Java plum seed or black plum seed. The seed is separated from the fruit and dried for the raw-material trade. Buyers include Ayurvedic formulation manufacturers, dietary supplement producers and extraction units. When requesting a quote, state the form (whole, crushed or powdered seed), the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash; extraction buyers usually add extractive values and heavy metal, microbial and pesticide limits.",
    faqs: [
      {
        question: "What is the botanical name of Jamun Beej?",
        answer:
          "Jamun Beej is the seed of Syzygium cumini, of the family Myrtaceae; older literature and some specifications use the synonym Eugenia jambolana. The fruit is known as Jamun in Hindi and as Java plum, black plum or jambolan in English. Beej simply means seed, so this listing covers the dried seed rather than the fruit.",
      },
      {
        question: "What forms of Jamun seed do buyers specify?",
        answer:
          "Buyers usually state whole dried seed, crushed or kibbled seed, or seed powder with a mesh size, depending on whether they mill in-house, extract or blend directly. State the form with your moisture, foreign matter and ash limits, and we will confirm what can be supplied. Our typical grade is natural grade, with the specification confirmed on enquiry.",
      },
      {
        question: "How is Jamun seed obtained and used?",
        answer:
          "The Jamun fruit is eaten fresh or processed for its pulp, and the seed is collected, dried and sold as a separate raw material. Ayurvedic formulation manufacturers and dietary supplement producers mill it as an ingredient, while extraction units use it as feedstock for seed extracts. Documentation is available on request for a specific enquiry.",
      },
    ],
  },

  karela: {
    overview:
      "Karela is bitter gourd, the fruit of Momordica charantia, a climbing vine of the gourd family, Cucurbitaceae, also known in English as bitter melon. Although it is sold fresh as a vegetable, the raw-material trade deals in the dried fruit, whole or sliced. Buyers include Ayurvedic formulation manufacturers, dietary supplement producers and extraction units. When requesting a quote, state the form, whether seeds should be included, the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add extractive values and heavy metal, microbial and pesticide limits. Karela Powder is listed separately.",
    faqs: [
      {
        question: "What is the botanical name of Karela?",
        answer:
          "Karela is Momordica charantia, a member of the gourd family, Cucurbitaceae, known in English as bitter gourd or bitter melon. The part traded is the fruit, the same vegetable sold fresh in markets; for raw-material use it is dried, and the milled dried fruit is listed separately in our catalogue as Karela Powder.",
      },
      {
        question: "What should I specify for dried Karela?",
        answer:
          "State whether you need whole dried fruit or slices, whether seeds should be included or removed, the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction units usually add extractive values and heavy metal, microbial and pesticide limits. Our typical grade is natural grade, with the specification confirmed against your requirement on enquiry.",
      },
      {
        question: "Should I buy dried Karela or Karela Powder?",
        answer:
          "Dried Karela suits extraction units and manufacturers who mill to their own mesh size or inspect the fruit before processing. Karela Powder, listed separately, is the milled dried fruit for buyers who blend directly into formulations or supplement products; for powder, give the mesh size with your other limits. Documentation is available on request for a specific enquiry.",
      },
    ],
  },

  nasottar: {
    overview:
      "Nasottar is a traditional Ayurvedic raw material supplied against customer specification. It is bought by Ayurvedic formulation manufacturers and by makers of traditional preparations. Because regional names for herbal raw materials are not always applied to the same plant in every market, buyers should state the botanical name, plant part and form they require, together with the quality parameters their specification sets, such as moisture, foreign matter, total ash and acid-insoluble ash. Our typical grade is natural grade, with the specification confirmed against the buyer's requirement on enquiry. Documentation is available on request for a specific enquiry.",
    faqs: [
      {
        question: "How is Nasottar supplied?",
        answer:
          "Nasottar is supplied against customer specification in natural grade. Send the botanical name you work to, the plant part and form you need, the quantity and the destination, and we will confirm availability and the specification we can meet before issuing a quotation.",
      },
      {
        question: "Why do you ask for the botanical name with a Nasottar enquiry?",
        answer:
          "Trade names for Ayurvedic raw materials can differ between regions and suppliers. Stating the botanical name and plant part you work to lets us confirm that the Nasottar we quote matches the material in your formulation and specification before any quotation or sample is sent.",
      },
      {
        question: "What quality parameters can be specified for Nasottar?",
        answer:
          "Buyers typically state limits for moisture, foreign matter, total ash and acid-insoluble ash, and may add heavy metal, microbial or pesticide limits required in their market. Share your specification sheet with the Nasottar enquiry; the specification is confirmed against it, and documentation is available on request for a specific enquiry.",
      },
    ],
  },

  vavding: {
    overview:
      "Vavding is the dried fruit of Embelia ribes, known in Sanskrit as Vidanga and in English as false black pepper, because the small, round, dark berries resemble black peppercorns. Each fruit carries a single seed. It is bought by Ayurvedic formulation manufacturers, producers of traditional preparations and extraction units. When requesting a quote, state the botanical name, the form you need (whole or powdered), the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers commonly add embelin content and heavy metal, microbial and pesticide limits. Our typical grade is natural grade, and documentation is available on request for a specific enquiry.",
    faqs: [
      {
        question: "Why is Vavding called false black pepper?",
        answer:
          "Vavding, the dried fruit of Embelia ribes, is a small, round, dark berry that looks much like a black peppercorn, which is where the English trade name false black pepper comes from. It is not related to true black pepper, Piper nigrum, and is also sold under the Sanskrit name Vidanga and the Hindi name Vaividang.",
      },
      {
        question: "How do buyers confirm they are getting Embelia ribes?",
        answer:
          "Fruits of related Embelia species, such as Embelia tsjeriam-cottam, are reported to circulate in the trade under similar names, and other small dark berries can look alike. Buyers therefore name Embelia ribes in their specification and often ask for identity confirmation alongside moisture, foreign matter and ash limits. Tell us the tests you rely on when you enquire.",
      },
      {
        question: "How is Vavding used in manufacturing?",
        answer:
          "Vavding is an ingredient in classical Ayurvedic formulations and traditional preparations, where it is usually milled before use. Extraction units use it as feedstock for extracts assayed for embelin, its best-known constituent, so extraction buyers state the embelin content they require rather than relying on appearance alone.",
      },
    ],
  },

  "lindi-pepper": {
    overview:
      "Lindi Pepper is long pepper, Piper longum, a climbing plant of the pepper family, Piperaceae, known in Sanskrit as Pippali. The part traded is the dried fruit spike, a slender, cone-like cluster of tiny fruits. Buyers include Ayurvedic formulation manufacturers, spice traders and blenders, and extraction units. When requesting a quote, state the form (whole spikes or powdered), the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add piperine content and heavy metal, microbial and pesticide limits. Our typical grade is natural grade, with the specification confirmed against your requirement on enquiry.",
    faqs: [
      {
        question: "Is Lindi Pepper the same as black pepper?",
        answer:
          "No. Lindi Pepper is long pepper, Piper longum, while black pepper is Piper nigrum. Both belong to the pepper family, Piperaceae, and both contain piperine, but long pepper is sold as whole dried fruit spikes rather than round berries. Name the species in your specification, particularly if you buy both for spice or Ayurvedic blends.",
      },
      {
        question: "Is Pippali the same as Pipramul?",
        answer:
          "No. Pippali, sold here as Lindi Pepper, is the dried fruit spike of Piper longum, whereas Pipramul (also spelled Pippalimool) is the dried root and is traded as a separate raw material. This listing covers the fruit spikes, so state clearly in your enquiry if your formulation calls for the root instead.",
      },
      {
        question: "How is long pepper used in manufacturing?",
        answer:
          "Ayurvedic formulation manufacturers use the dried spikes as an ingredient, for example in Trikatu, the classical blend of long pepper, black pepper and dry ginger. Spice traders and blenders use long pepper in spice mixes, and extraction units use it as feedstock for extracts assayed for piperine. Dry ginger is listed separately in our catalogue as Sunth (Ginger).",
      },
      {
        question: "How should Lindi Pepper be stored?",
        answer:
          "Long pepper is an aromatic spice, so keep it in closed, lined packing in a cool, dry place away from strong-smelling goods. This limits loss of aroma and pungency and keeps out moisture and storage pests. Documentation is available on request for a specific enquiry.",
      },
    ],
  },

  "sunth-ginger": {
    overview:
      "Sunth, also spelled Sonth, is dried ginger: the rhizome of Zingiber officinale, family Zingiberaceae, known in Sanskrit as Shunthi. Fresh rhizomes are either peeled or left unpeeled before drying, and the trade distinguishes these grades. Buyers include Ayurvedic formulation manufacturers, the spice and food industry and extraction units. When requesting a quote, state whole or cut rhizome, peeled or unpeeled, bleached or unbleached, the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Spice and extraction buyers often add volatile oil content and heavy metal, microbial and pesticide limits. Sunth Powder is listed separately.",
    faqs: [
      {
        question: "What is the difference between Sunth and fresh ginger?",
        answer:
          "Sunth is the same plant, Zingiber officinale, but sold as the dried rhizome rather than the fresh one. Drying removes most of the water, so the product is lighter, keeps longer and is easier to mill. The Hindi names Sunth and Sonth, the Sanskrit name Shunthi and the English name dry ginger all refer to this dried material.",
      },
      {
        question: "What should I specify when buying Sunth?",
        answer:
          "State whether you need whole or cut rhizome, peeled or unpeeled, and bleached or unbleached material, along with the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Spice buyers often add volatile oil content, and extraction units may add oleoresin or gingerol values. Documentation is available on request for a specific enquiry.",
      },
      {
        question: "How is dry ginger used in manufacturing?",
        answer:
          "The food and spice industry uses dry ginger whole or milled; Ayurvedic formulation manufacturers use it as an ingredient, for example in Trikatu, the classical blend of dry ginger, black pepper and long pepper; and extraction units use it as feedstock for oleoresin and extracts. The milled form is listed separately as Sunth Powder, and long pepper as Lindi Pepper.",
      },
      {
        question: "How should Sunth be stored?",
        answer:
          "Dry ginger is susceptible to storage insects and picks up moisture in humid conditions, so keep it in closed packing in a cool, dry, well-ventilated store, off the floor and away from strong-smelling goods. Use stock in rotation and check lots held for long periods before processing. Our typical grade is natural grade.",
      },
    ],
  },

  "nimboda-beej": {
    overview:
      "Nimboda Beej is neem seed, from Azadirachta indica, a tree of the mahogany family, Meliaceae. The seed is collected from the ripe fruit, freed of pulp and dried for the raw-material trade. Buyers include Ayurvedic formulation manufacturers, makers of traditional preparations and extraction units, for which neem seed is the feedstock for neem oil and for limonoids such as azadirachtin. When requesting a quote, state whether you need whole seed or kernel, the quantity, and your limits for moisture and foreign matter, with oil or azadirachtin content where relevant. Our typical grade is natural grade, and documentation is available on request for a specific enquiry.",
    faqs: [
      {
        question: "Is Nimboda Beej the same as Neem Powder?",
        answer:
          "No. Nimboda Beej is neem seed, while the Neem Powder in our catalogue is milled neem leaf. Both come from Azadirachta indica, but they are different plant parts with different uses and specifications. Name the part you need, seed or leaf, in your enquiry so the correct material is quoted.",
      },
      {
        question: "How is neem seed used industrially?",
        answer:
          "Neem seed is pressed or solvent-extracted to obtain neem oil, leaving neem cake as a by-product, and it is the main feedstock for extracts of limonoids such as azadirachtin. Ayurvedic formulation manufacturers and makers of traditional preparations also buy the seed as an ingredient. Extraction buyers usually state oil or azadirachtin content in their specification.",
      },
      {
        question: "What should I specify when buying neem seed?",
        answer:
          "State whether you need whole seed with its shell or decorticated kernel, the quantity and the destination, together with limits for moisture and foreign matter and, for extraction, oil or azadirachtin content. The specification is confirmed against your requirement on enquiry, and documentation is available on request for a specific enquiry.",
      },
      {
        question: "How should neem seed be stored?",
        answer:
          "Neem seed is oil-bearing, so keep it dry, cool and well ventilated in closed packing; damp seed is prone to mould, and the oil can deteriorate during long storage. Buyers who need oil or azadirachtin values to hold should process lots promptly and check stored material before use.",
      },
    ],
  },

  "garcinia-cambogia": {
    overview:
      "Garcinia Cambogia is the dried fruit rind of Garcinia gummi-gutta, a tree of the family Clusiaceae that was formerly named Garcinia cambogia and is known in English as Malabar tamarind. The rind of the ribbed, pumpkin-shaped fruit is separated and dried for the raw-material trade. Buyers include dietary supplement producers, extraction units and makers of traditional preparations. When requesting a quote, state the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Extraction buyers usually add hydroxycitric acid (HCA) content and heavy metal, microbial and pesticide limits. The milled rind is listed separately as Garcinia Cambogia Powder.",
    faqs: [
      {
        question: "What is the botanical name of Garcinia Cambogia?",
        answer:
          "The accepted botanical name is Garcinia gummi-gutta, of the family Clusiaceae; Garcinia cambogia is the older name that remains in wide trade use. In English it is called Malabar tamarind. It is related to, but distinct from, kokum (Garcinia indica), so specifications should name the species required.",
      },
      {
        question: "Which part of the Garcinia fruit is supplied?",
        answer:
          "This listing covers the dried fruit rind, the thick outer layer of the fruit, which is separated from the seeds and dried. The milled rind is listed separately in our catalogue as Garcinia Cambogia Powder for buyers who need ready-milled material; for powder, state the mesh size with your other limits.",
      },
      {
        question: "What do extraction units specify for Garcinia rind?",
        answer:
          "Extraction units processing Garcinia rind usually state hydroxycitric acid (HCA) content, the organic acid that serves as the marker for Garcinia extracts, together with moisture, foreign matter, ash, heavy metal, microbial and pesticide limits. Our typical grade is natural grade, with the specification confirmed against your requirement, and documentation is available on request for a specific enquiry.",
      },
    ],
  },

  nagarmotha: {
    overview:
      "Nagarmotha is the dried rhizome and tubers of Cyperus rotundus, a sedge of the family Cyperaceae, known in Sanskrit as Musta and in English as nut grass. The dark, aromatic tubers that form along its underground stems are the traded part. Buyers include Ayurvedic formulation manufacturers, perfumery raw material buyers and extraction units. When requesting a quote, state the botanical name, the form (whole, cut or powdered), the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Perfumery and extraction buyers often add volatile oil content, with heavy metal, microbial and pesticide limits where required.",
    faqs: [
      {
        question: "What is the botanical name of Nagarmotha?",
        answer:
          "The Nagarmotha in our catalogue is Cyperus rotundus, a sedge of the family Cyperaceae known in Sanskrit as Musta and in English as nut grass or nutsedge. In trade, the name Nagarmotha is also applied to the related Cyperus scariosus, so state the species you need in your enquiry and specification.",
      },
      {
        question: "Which part of the Nagarmotha plant is supplied?",
        answer:
          "The traded part is underground: small, hard, dark-skinned tubers that form along the rhizomes. They are aromatic when broken, which is why they are bought for perfumery as well as Ayurvedic formulation. Buyers state whether they need whole or cut tubers and set limits on adhering soil and fine roots under foreign matter and ash.",
      },
      {
        question: "How is Nagarmotha used as a perfumery raw material?",
        answer:
          "Perfumery buyers use the aromatic tubers as a raw material, for example as distillation feedstock, and usually specify volatile oil content alongside moisture and foreign matter. Ayurvedic formulation manufacturers buy the same material as an ingredient, and extraction units as feedstock, each to its own specification. Our typical grade is natural grade.",
      },
      {
        question: "How should Nagarmotha be stored?",
        answer:
          "Because its value for perfumery depends on the aromatic oil in the tubers, keep Nagarmotha in closed packing in a cool, dry place away from strong-smelling goods. This limits aroma loss and keeps out moisture and storage pests. Documentation is available on request for a specific enquiry.",
      },
    ],
  },

  "danti-beej": {
    overview:
      "Danti Beej is the seed of Baliospermum montanum, a shrub of the spurge family, Euphorbiaceae, also traded as Danti seed. It is offered as a raw material for Ayurvedic formulation manufacturers. It is not a food material: buyers should handle it according to its safety data sheet (SDS) and the regulations that apply to them. When requesting a quote, state the botanical name, the quantity and your limits for moisture, foreign matter, total ash and acid-insoluble ash. Our typical grade is natural grade, with the specification confirmed against your requirement on enquiry, and documentation is available on request for a specific enquiry.",
    faqs: [
      {
        question: "What is the botanical name of Danti Beej?",
        answer:
          "The Danti Beej in our catalogue is the seed of Baliospermum montanum, a shrub of the family Euphorbiaceae. Danti is its Sanskrit and Hindi trade name, and beej means seed. Because trade names for seeds can be applied loosely, state the botanical name in your enquiry so the identity can be confirmed before quoting.",
      },
      {
        question: "Who buys Danti Beej?",
        answer:
          "Danti Beej is offered as a raw material for Ayurvedic formulation manufacturers, who buy it to their own specification. Tell us the quantity, the destination and the limits you set for moisture, foreign matter, total ash and acid-insoluble ash; our typical grade is natural grade, and documentation is available on request for a specific enquiry.",
      },
      {
        question: "How should Danti Beej be handled and stored?",
        answer:
          "Handle Danti Beej according to its safety data sheet (SDS) and the regulations that apply in your market, and keep it apart from food materials. Store it in closed, clearly labelled packing in a cool, dry place, protected from moisture and pests, with access limited to trained staff.",
      },
    ],
  },
}
