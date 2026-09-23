// ═══════════════════════════════════════════
// FARMCAST — Crop Reference Dataset
// ═══════════════════════════════════════════

window.FARMCAST_CROPS = [

 {
   name: 'Tomato',
   category: 'vegetable',
   emoji: '🍅',
   icon: 'assets/crops/tomato.svg',

    plantingMethods: [
      {
        value: 'transplanted',
        label: 'Transplanted'
      }
    ],

   minTemp: 18,
   maxTemp: 32,
   noRain: false,
   windMax: 20,

   source: {
     agency:
       'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Kamatis',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-06/Gabay%20sa%20Produksyon%20ng%20Kamatis.pdf'
    }
  },

 {
   name: 'Eggplant',
   category: 'vegetable',
   emoji: '🍆',
   icon: 'assets/crops/eggplant.svg',

    plantingMethods: [
     {
        value: 'transplanted',
        label: 'Transplanted'
      }
    ],

   minTemp: 22,
   maxTemp: 35,
   noRain: false,
   windMax: 25,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Talong',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_talong1.pdf'
    }
  },

 {
   name: 'Corn',
   category: 'grain',
   emoji: '🌽',
   icon: 'assets/crops/corn.svg',

    plantingMethods: [
      {
        value: 'direct-seeded',
        label: 'Direct Seeded'
      }
    ],

   minTemp: 18,
   maxTemp: 33,
   noRain: false,
   windMax: 15,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'MAIS Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/MAIS%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Okra',
    category: 'vegetable',
    emoji: '🥦',
    icon: 'assets/crops/okra.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

    minTemp: 25,
    maxTemp: 38,
    noRain: false,
    windMax: 20,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera',

      title:
        'Okra Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/okra_production_flyer_.pdf'
    }
  },

  {
    name: 'Sitaw',
    category: 'vegetable',
    emoji: '🫛',
    icon: 'assets/crops/sitaw.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

    minTemp: 20,
    maxTemp: 35,
    noRain: false,
    windMax: 22,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera',

      title:
        'Pole Sitaw Production for Urban and Backyard Gardening',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pole_sitaw_flyer.pdf'
    }
  },

  {
    name: 'Ampalaya',
    category: 'vegetable',
    emoji: '🥒',
    icon: 'assets/crops/ampalaya.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },

        {
          value: 'transplanted',
          label: 'Transplanted'
        }
      ],

    minTemp: 24,
    maxTemp: 36,
    noRain: false,
    windMax: 20,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Ampalaya',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_ampalaya_final_2.pdf'
    }
  },

  {
    name: 'Pechay',
    category: 'vegetable',
    emoji: '🥬',
    icon: 'assets/crops/pechay.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        }
      ],

    minTemp: 15,
    maxTemp: 25,
    noRain: false,
    windMax: 20,

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera',

      title:
        'Pechay Production for Urban and Home Gardening',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pechay_production_for_urban_gardening_leaflet.pdf'
    }
  },

  {
    name: 'Kamote',
    category: 'root-crop',
    emoji: '🍠',
    icon: 'assets/crops/kamote.svg',

      plantingMethods: [
        {
          value: 'cuttings',
          label: 'Vine Cuttings / Slips'
        }
      ],

    minTemp: 20,
    maxTemp: 35,
    noRain: true,
    windMax: 25,

    source: {
      agency:
        'Department of Agriculture',

      office:
        'High Value Crops Development Program',

      title:
        'Pag-aalaga ng Kamote',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Production-Guide.pdf'
    }
  },

  {
    name: 'Banana',
    category: 'fruit',
    icon: 'assets/crops/banana.svg',

    plantingMethods: [
      {
        value: 'suckers',
        label: 'Suckers'
      },
      {
        value: 'tissue-cultured-plantlets',
        label: 'Tissue-cultured Plantlets'
      }
    ],

    minTemp: 15,
    maxTemp: 35,
    noRain: false,
    windMax: null,

    source: {
      agency:
        'Department of Agriculture - Philippine Council for Agriculture and Fisheries',

      title:
       'Philippine Banana Industry Roadmap 2021-2025',

      url:
        'https://pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Banana-Industry-Roadmap-2021-2025.pdf'
    }  
  },

  {
    name: 'Papaya',
    category: 'fruit',
    icon: 'assets/crops/papaya.svg',

    plantingMethods: [
      {
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Papaya Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641884692Papaya%20%20Production%20Guide.pdf'
    },

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Production Guide - Mango, Apple and Pear, Papaya, Sababanana',

      url:
        'https://library.buplant.da.gov.ph/books/512'
    }
  },

  {
    name: 'Mango',
    category: 'fruit',
    icon: 'assets/crops/mango.svg',

    plantingMethods: [
      {
        value: 'grafted-seedlings',
        label: 'Grafted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Mango Production Manual',
  
      url:
        'https://library.buplant.da.gov.ph/images/1641949136Mango.pdf'
    },
  
    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,
  
    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',
  
      title:
        'Production Guide - Mango, Apple and Pear, Papaya, Sababanana',
  
      url:
        'https://library.buplant.da.gov.ph/books/512'
    }
  },

  {
    name: 'Calamansi',
    category: 'fruit',
    icon: 'assets/crops/calamansi.svg',

    plantingMethods: [
      {
        value: 'budded-grafted-seedlings',
        label: 'Budded / Grafted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office MIMAROPA',

      title:
        'Budded Calamansi Seedlings Distribution for Calamansi Production',

      url:
        'https://www.mimaropa.da.gov.ph/media-resources/news-and-events/php-3-9m-halaga-ng-budded-calamansi-seedlings-ipinamahagi-sa-12-asosasyon-sa-oriental-mindoro'
  },

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingSeason: 'Start of rainy season',

    plantingNote:
      'Grows well in cool and elevated areas and in sandy soil rich in organic matter. Avoid waterlogged areas.',

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Calamansi Production and Processing',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/calamansi_final.pdf'
    }
  },

  {
    name: 'Pineapple',
    category: 'fruit',
    icon: 'assets/crops/pineapple.svg',

    plantingMethods: [
      {
        value: 'crowns',
        label: 'Crowns'
      },
      {
        value: 'slips',
        label: 'Slips'
      },
      {
        value: 'suckers',
        label: 'Suckers'
      }
    ],

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingSeason: 'Onset of rainy season',

    plantingNote:
      'Grows well in porous, well-drained soil with pH 4.5–5.5. Avoid wet or waterlogged soil.',

    source: {
      agency:
        'Department of Agriculture - Philippine Fiber Industry Development Authority (PhilFIDA)',

      title:
        'Pineapple Technoguide 2024',

      url:
        'https://philfida.da.gov.ph/images/Publications/Technoguides/pineapple-technoguide-2024.pdf'
    }
  },

  {
    name: 'Coconut',
    category: 'tree-crop',
    icon: 'assets/crops/coconut.svg',

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Philippine Coconut Authority',

      title:
        'Guidelines in Coconut Seed Farm and Nursery Accreditation',

      url:
        'https://www.pca.gov.ph/images/newsfeed/Guidelines_in_Coconut_Seed_Farm_and_Nursery_Accreditation.pdf'
    },

    minTemp: 24,
    maxTemp: 29,
    noRain: false,
    windMax: null,

    plantingNote:
      'Thrives under warm tropical conditions and well-drained soil. Prolonged waterlogging can limit growth and reduce yield.',

    source: {
      agency:
        'Department of Agriculture - Philippine Coconut Authority',

      title:
        'Coconut-Beverage Crop (Cacao) Cropping Model',

      url:
        'https://www.pca.gov.ph/pdf/techno/cococacao.pdf'
    }
  },

  {
    name: 'Cacao',
    category: 'tree-crop',
    icon: 'assets/crops/cacao.svg',

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      },
      {
        value: 'budded-grafted-seedlings',
        label: 'Budded / Grafted Seedlings'
      }
    ],

    minTemp: 18,
    maxTemp: 32,
    noRain: false,
    windMax: null,

    plantingNote:
      'Prefers deep, well-drained soil with a pH of about 5.0–6.5 and warm conditions with well-distributed rainfall.',

    source: {
      agency:
        'Department of Agriculture - High Value Crops Development Program',

      title:
        'Cacao Production Guide',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Cacao-Production-Guide.pdf'
    }
  },

  {
    name: 'Coffee Robusta',
    category: 'tree-crop',
    variety: 'Robusta',
    icon: 'assets/crops/coffee-robusta.svg',

    plantingMethods: [
      {
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      },
      {
        value: 'rooted-nodal-cuttings',
        label: 'Rooted Nodal Cuttings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - High Value Crops Development Program',

      title:
        'Coffee Production Guide',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Coffee-Production-guide.pdf'
    },

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Robusta can grow across a wider range of altitudes and temperatures than other major coffee types.',

    source: {
      agency:
        'Department of Agriculture - Philippine Council for Agriculture and Fisheries (PCAF)',

      title:
        'Philippine Coffee Industry Roadmap 2021-2025',

      url:
        'https://www.pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Coffee-Industry-Roadmap-2021-2025.pdf'
    }
  },

  {
    name: 'Coffee Arabica',
    category: 'tree-crop',
    variety: 'Arabica',
    icon: 'assets/crops/coffee-arabica.svg',

    plantingMethods: [
      {
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - High Value Crops Development Program',

      title:
        'Coffee Production Guide',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Production-Guide.pdf'
  },

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    elevationNote:
      'Mostly cultivated in high-elevation areas around 1,000 meters above sea level.',

    plantingNote:
      'Arabica is generally suited to high-elevation coffee-growing areas in the Philippines.',

    source: {
      agency:
        'Department of Agriculture - Philippine Council for Agriculture and Fisheries (PCAF)',

      title:
        'Philippine Coffee Industry Roadmap 2021-2025',

      url:
        'https://www.pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Coffee-Industry-Roadmap-2021-2025.pdf'
    }
  },

  {
    name: 'Coffee Liberica',
    category: 'tree-crop',
    variety: 'Liberica',
    localName: 'Kapeng Barako',
    icon: 'assets/crops/coffee-liberica.svg',

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture',

      title:
        'Guidelines on Sourcing of Quality Planting Materials for Coffee',

      url:
        'https://www.da.gov.ph/wp-content/uploads/2025/08/ac10_s2022.pdf'
  },

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Liberica is one of the major coffee types grown in the Philippines and is locally associated with Kapeng Barako.',

    source: {
      agency:
        'Department of Agriculture - Philippine Council for Agriculture and Fisheries (PCAF)',

      title:
        'Philippine Coffee Industry Roadmap 2021-2025',

      url:
        'https://www.pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Coffee-Industry-Roadmap-2021-2025.pdf'
    }
  },

  {
    name: 'Coffee Excelsa',
    category: 'tree-crop',
    variety: 'Excelsa',
    icon: 'assets/crops/coffee-excelsa.svg',

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture',

      title:
        'Guidelines on Sourcing of Quality Planting Materials for Coffee',

      url:
        'https://www.da.gov.ph/wp-content/uploads/2025/08/ac10_s2022.pdf'
  },
    
    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Excelsa is one of the coffee types included in Philippine coffee production and industry planning.',

    source: {
    agency:
      'Department of Agriculture - Philippine Council for Agriculture and Fisheries (PCAF)',

    title:
      'Philippine Coffee Industry Roadmap 2021-2025',

    url:
      'https://www.pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Coffee-Industry-Roadmap-2021-2025.pdf'
    }
  },

  {
    name: 'Jackfruit',
    localName: 'Nangka',
    category: 'fruit',
    icon: 'assets/crops/jackfruit.svg',

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      },
      {
        value: 'grafted-seedlings',
        label: 'Grafted Seedlings'
      }
  ],

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingDistance: '8 m x 8 m',

    plantingNote:
      'Use healthy planting materials and follow proper plantation establishment and crop management practices.',

    source: {
      agency:
        'Department of Agriculture - Regional Field Office VII',

      title:
        'Pagtanum og Nangka',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/PAGTANUM-OG-NANGKA.pdf'
    }
  },

  {
    name: 'Rambutan',
    category: 'fruit',
    icon: 'assets/crops/rambutan.svg',

    minTemp: 22,
    maxTemp: 30,
    noRain: false,
    windMax: null,

    elevationNote:
      'Grows well around 500–600 meters above sea level.',

    plantingNote:
      'Prefers deep, well-drained soil rich in organic matter with a soil pH of about 4.5–6.5.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
       'Rambutan Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641946110RAMBUTAN.pdf'
    }
  },

  {
    name: 'Lanzones',
    category: 'fruit',
    icon: 'assets/crops/lanzones.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Refer to the official BPI production guide for site selection, establishment, and crop management practices.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Production Guide for Lanzones',

      url:
        'https://library.buplant.da.gov.ph/images/1641948327LANZONES.pdf'
    }
  },

  {
    name: 'Durian',
    category: 'fruit',
    icon: 'assets/crops/durian.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Refer to the official BPI Durian Production Guide for site selection, plantation establishment, and crop management practices.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Durian Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1640919293Durian%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Mangosteen',
    category: 'fruit',
    icon: 'assets/crops/mangosteen.svg',

    minTemp: 20,
    maxTemp: 30,
    noRain: false,
    windMax: null,

    elevationNote:
      'Suitable from sea level up to about 500 meters elevation.',

    plantingSeason:
      'Transplant after the rainy season has started.',

    plantingDistance:
      'At least 8 m x 8 m',

    plantingNote:
      'Prefers a warm, humid environment and rich, porous, deep, moist but well-drained soil.',
 
    source: {
      agency:
        'Department of Agriculture - High Value Crops Development Program',

      title:
        'Mangosteen Production Guide',

      url:
       'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Mangosteen-Production-Guide.pdf'
    }
  },

  {
    name: 'Avocado',
    category: 'fruit',
    icon: 'assets/crops/avocado.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    annualRainfall:
      '750–1,000 mm minimum recommended annual rainfall',

    plantingNote:
      'Grows best in deep, fertile, well-drained sandy or alluvial loam soil. Neutral to slightly acidic soil and alternating wet and dry seasons are suitable.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Production Guide - Guava, Guyabano, Avocado, Cashew, Atis',

      url:
        'https://library.buplant.da.gov.ph/books/509'
    }
  },

  {
    name: 'Guava',
    localName: 'Bayabas',
    category: 'fruit',
    icon: 'assets/crops/guava.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Follow the Bureau of Plant Industry production guide for proper site selection, propagation, planting, and orchard management practices.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Production Guide - Guava, Guyabano, Avocado, Cashew, Atis',

      url:
        'https://library.buplant.da.gov.ph/books/509'
    }
  },

  {
    name: 'Guyabano',
    localName: 'Soursop',
    category: 'fruit',
    icon: 'assets/crops/guyabano.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    coldDamageBelow: 5,

    elevationNote:
      'Thrives from sea level up to about 500 meters above sea level.',

    plantingSeason:
      'Start of rainy season',

    plantingDistance:
      '3–4 meters apart for asexually propagated plants',

    plantingNote:
      'Adapted to relatively warm and humid conditions. Prefers fairly deep, friable soil with a pH of about 6.1–6.5.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Guyabano Production Guide',

      url:
       'https://library.buplant.da.gov.ph/images/1641946446Guayabano%20production%20guide.pdf'
    }
  },

  {
    name: 'Dragon Fruit',
    localName: 'Pitaya',
    category: 'fruit',
    icon: 'assets/crops/dragon-fruit.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    supportNote:
      'Requires a strong post or trellis support. An ATI guide describes an 8-foot post with about 2 feet buried in the ground.',

    plantingNote:
      'Suitable for tropical areas. Provide good sunlight, open growing space, and a strong support structure for the climbing plant.',

    lifespanNote:
      'With proper care, plants may remain productive for around 20 years.',

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Dragon Fruit Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/DRAGON%20FRUIT.PDF'
    }
  },

  {
    name: 'Pummelo',
    localName: 'Suha',
    category: 'fruit',
    icon: 'assets/crops/pummelo.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Use healthy planting materials and follow recommended tropical fruit orchard establishment and management practices.',

    harvestNote:
      'BPI maturity guidance indicates that harvest timing varies by variety and fruit development.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Maturity Indicators of Pummelo',

      url:
        'https://library.buplant.da.gov.ph/images/1641955962Pummelo%20Maturity%20Indicators.pdf'
    }
  },

  {
    name: 'Cashew',
    localName: 'Kasoy',
    category: 'fruit',
    icon: 'assets/crops/cashew.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Use healthy planting materials and follow recommended BPI practices for propagation, orchard establishment, and crop management.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Cashew Production',

      url:
        'https://library.buplant.da.gov.ph/images/1581572310CASHEW.pdf'
    }
  },

  {
    name: 'Watermelon',
    localName: 'Pakwan',
    category: 'fruit',
    icon: 'assets/crops/watermelon.svg',

    minTemp: null,
    maxTemp: null,
    idealTemp: 25,

    noRain: false,
    windMax: null,

    soilPH:
      '5.0–6.8',

    plantingSeason:
      'October to January',

    plantingDistance:
      '1.5 m x 1.5 m to 2.5 m x 2.5 m, depending on variety',

    plantingNote:
      'Prefers well-drained sandy loam soil rich in organic matter. Warm, preferably dry weather supports good growth.',

    harvestNote:
      'Fruit generally matures about 35–40 days after pollination, depending on the variety.',

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Watermelon Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Watermelon%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Melon',
    localName: 'Cantaloupe',
    category: 'fruit',
    icon: 'assets/crops/melon.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Melon is grown as a high-value crop in the Philippines. Follow locally recommended production practices and suitable site conditions for the selected variety.',

    source: {
      agency:
        'Department of Agriculture - MIMAROPA Regional Field Office',

      title:
        'Honeydew Melon Production',

      url:
        'https://mimaropa.da.gov.ph/media-resources/publication/high-value-crop'
    }
  },

  {
    name: 'Onion',
    localName: 'Sibuyas',
    category: 'vegetable',
    icon: 'assets/crops/onion.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    soilPH:
      '5.8–6.0',

    plantingSeason:
      'Generally September to March in the Philippines',
    plantingNote:
      'Grows well in friable, well-drained loam soil with good water-holding capacity. Cooler weather favors early growth, while drier conditions and moderately higher temperatures support bulb development and maturation.',

    harvestNote:
      'Onion commonly reaches maturity about 70–120 days after transplanting, depending on the variety.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Onion and Garlic Production Guide',

      url:
        'https://library.buplant.da.gov.ph/books/435'
    }
  },

  {
    name: 'Garlic',
    localName: 'Bawang',
    category: 'vegetable',
    icon: 'assets/crops/garlic.svg',

      plantingMethods: [
        {
          value: 'cloves',
          label: 'Planted from Cloves'
        }
      ],

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

   varieties:
     'Ilocos White, Batangas White, Batanes White',

   plantingSeason:
     'Dry season; cooler months favor early growth and bulb formation',

   plantingNote:
     'Grows well in clay alluvial and sandy loam soils. Cooler weather is preferred during early growth, while relatively dry soil and atmosphere with moderately higher temperature are important during ripening.',

   harvestNote:
     'Ilocos White commonly matures about 90–110 days after planting.',

    source: {
     agency:
       'Department of Agriculture - Bureau of Plant Industry',

     title:
      'Garlic Production Guide',

      url:
      'https://library.buplant.da.gov.ph/images/1640921673Garlic%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Lettuce',
    localName: 'Letsugas',
    category: 'vegetable',
    icon: 'assets/crops/lettuce.svg',

    minTemp: 18,
    maxTemp: 22,
    noRain: false,
    windMax: null,

    varieties:
      'Loose Leaf, Romaine, Crisp Head',

    plantingDistance:
      '30–40 cm x 30–40 cm',

    plantingNote:
      'Grows best in regularly watered loamy soil with high organic matter content. Protect seedlings from excessive heat and direct heavy rain during establishment.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Lettuce Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1640931738Lettuce%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Cabbage',
    localName: 'Repolyo',
    category: 'vegetable',
    icon: 'assets/crops/cabbage.svg',

    plantingMethods: [
      {
        value: 'transplanted',
        label: 'Transplanted'
      }
    ],
 
    minTemp: 15,
    maxTemp: 20,
    noRain: false,
    windMax: null,

    soilPH:
      '6.0–6.8',

    plantingDistance:
      '50 cm between rows x 40 cm between hills',

    plantingNote:
      'Grows best in a cool and moist climate and in well-drained sandy loam soil. Water seedlings sufficiently during establishment, while avoiding excessive watering once heads begin to develop.',

    harvestNote:
     'Heads are generally ready for harvest about 55–60 days after transplanting when they become firm and compact.',

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Cabbage Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Cabbage%20Production%20Guide.pdf'
    }
  },

  {
    name: 'Broccoli',
    category: 'vegetable',
    icon: 'assets/crops/broccoli.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    plantingNote:
      'Follow the official Agricultural Training Institute recommendations for nursery establishment, transplanting, crop care, and harvesting of broccoli.',

    source: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Broccoli Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641969015BROCCOLI%20.pdf'
    }
  },

  {
    name: 'Carrot',
    localName: 'Karot',
    category: 'vegetable',
    icon: 'assets/crops/carrot.svg',

    minTemp: 10,
    maxTemp: 30,
    noRain: false,
    windMax: null,

    idealTempRange:
      '15–21°C',

    soilPH:
      '5.5–6.8',

    elevationNote:
      'Preferably around 1,000 meters above sea level; low and mid-elevation production is better during the coolest months.',

    plantingSeason:
      'Low elevations: late October to February; highlands: can be planted throughout the year',

    plantingDistance:
      'Thin seedlings to about 10 cm between plants',

    plantingNote:
      'Grows best in deep sandy loam soil rich in organic matter. Temperatures below 10°C or above 30°C may reduce crop quality and yield.',

    harvestNote:
      'Generally harvested 90–120 days after emergence, depending on variety and location.',

    source: {
      agency:
        'Department of Agriculture - Regional Field Office No. 02',

      office:
        'High Value Crops Development Program',

      title:
        'Carrot Production Guide',

      url:
        'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/Carrot-Prod-Guide.pdf'
    }
  },

  {
    name: 'Squash',
    localName: 'Kalabasa',
    category: 'vegetable',
    icon: 'assets/crops/squash.svg',

    minTemp: null,
    maxTemp: null,
    noRain: false,
    windMax: null,

    supportNote:
      'Can be allowed to creep on the ground or grown with a trellis to maximize space and support fruit development.',

    plantingNote:
      'Can be directly seeded or started in seedling trays and transplanted. For transplanted squash, seedlings may be moved about two weeks after emergence.',

    harvestNote:
      'Immature green fruits can be harvested about 30–40 days from pollination. Mature fruits are ready when the rind hardens, a powder-like coating develops, or the peduncle begins to dry.',

    source: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera Administrative Region',

      title:
        'Squash Production (For Urban and Home Gardening)',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/squash_production_guide_leaflet.pdf'
    }
  },

    {
      name: 'Radish',
      localName: 'Labanos',
      category: 'root-crop',
      icon: 'assets/crops/radish.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '6.0–6.8',

      varieties:
        '60-days variety',

      plantingNote:
        'Prefers deep, friable, fertile sandy loam or silty loam soil rich in organic matter and with slightly acidic conditions.',

      harvestNote:
        'The locally popular 60-days variety can reach maximum marketable root size at about 60 days from emergence.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Radish Seed Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641882970Radish%20Seed%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Cucumber',
      localName: 'Pipino',
      category: 'vegetable',
      icon: 'assets/crops/cucumber.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'About 0.5 meter between plants',

      supportNote:
        'Use a trellis to support the vines, especially during the rainy season, to help keep fruits off the ground and reduce rotting or poor fruit shape.',

      plantingNote:
        'Can be direct-seeded or transplanted from seedlings. Transplanted seedlings may be moved about 15 days after emergence or once they have two true leaves.',

      harvestNote:
        'Slicing types may be harvested about 38–45 days after planting, while pickling types may be harvested about 33–40 days after planting.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Gabay sa Produksyon ng Pipino',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-12/GABAY%20SA%20PRODUKSYON%20NG%20PIPINO.pdf'
      }
    },

    {
      name: 'Bell Pepper',
      localName: 'Sweet Pepper',
      category: 'vegetable',
      icon: 'assets/crops/bell-pepper.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingNote:
        'Follow the Bureau of Plant Industry production guide for proper crop establishment, field management, and pest management practices.',

      harvestNote:
        'Harvest fruits when they develop a deep green color that begins to turn dull or red. This maturity stage normally occurs about 80–90 days after planting.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Bell Pepper Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641950133BELL%20PEPPER%20.pdf'
      }
    },

    {
      name: 'Hot Pepper',
      localName: 'Sili',
      category: 'vegetable',
      icon: 'assets/crops/hot-pepper.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Performs best in sandy loam to clay loam soil rich in organic matter, with sufficient moisture and good drainage.',

      plantingNote:
        'Start seeds in trays or potlets and transplant seedlings about 30–40 days after sowing. Transplant during cloudy weather or late in the afternoon.',

      harvestNote:
        'Harvesting may begin about 60–75 days after transplanting. Fruits may be harvested at the mature green stage when they have reached full size and have a waxy, shiny appearance.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          'Hot Pepper (Sili) Production for Urban and Backyard Gardening',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/hot_pepper_flyer_for_urban_and_backyard_gardening.pdf'
      }
    },

    {
      name: 'Cauliflower',
      localName: 'Cauliflower',
      category: 'vegetable',
      icon: 'assets/crops/cauliflower.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Grows well in clay loam to sandy loam soil and is commonly suited to cooler mid- and high-elevation areas.',

      plantingNote:
        'Prepare the soil thoroughly before planting. Seedlings are commonly established first before field transplanting, with proper spacing and good drainage.',

      harvestNote:
        'Harvest when the curd is well formed and compact. Include a portion of the stem and leaves, and harvest preferably during the cooler part of the day to help maintain quality.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Cauliflower Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1638348280Cauliflower%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Sponge Gourd',
      localName: 'Patola',
      category: 'vegetable',
      icon: 'assets/crops/patola.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Grows well in humid tropical conditions and performs best in well-drained soil with high organic matter.',

      plantingDistance:
        'About 2.5 meters between hills',

      supportNote:
        'Provide a strong trellis to support vine growth and improve fruit quality. Trellising is especially useful during the wet season to reduce fruit rotting and malformation.',

      plantingNote:
        'Soak seeds in water overnight before planting to help germination. Plant directly in the field and retain one healthy plant per hill after thinning.',

      harvestNote:
        'Young fruits may be harvested about five days after fruit setting. Harvest early in the morning or late in the afternoon and cut the fruit peduncle with a sharp knife.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Patola Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Patola%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Bottle Gourd',
      localName: 'Upo',
      category: 'vegetable',
      icon: 'assets/crops/upo.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      supportNote:
        'Provide a trellis to support vine growth, improve fruit development, and help prevent deformed or rotting fruits.',

      plantingNote:
        'Follow proper field preparation and vine management practices. Train the vines onto a sturdy trellis as they develop.',

      harvestNote:
        'Fruits normally reach marketable size about 15 days after fruit set, or approximately 60–80 days from sowing. Harvest using a sharp knife while leaving a short portion of the peduncle attached.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Upo (Bottle Gourd) Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Upo%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Water Spinach',
      localName: 'Kangkong',
      category: 'vegetable',
      icon: 'assets/crops/kangkong.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'About 30 cm between rows and 30 cm between plants',

      propagationNote:
        'Can be propagated using seeds or vine cuttings.',

      soilNote:
        'Grows well where water is readily available, including moist or swampy areas. Upland plantings require sufficient irrigation for good growth.',

      plantingNote:
        'For upland culture, plants may be established in two rows on a one-meter-wide bed, with about 30 cm spacing between rows and plants.',

      harvestNote:
        'Young tops or shoots may be ready for harvest about 3–4 weeks after planting.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'All About Kangkong',

        url:
          'https://library.buplant.da.gov.ph/images/1659333070Kangkong.pdf'
      }
    },

    {
      name: 'Malabar Spinach',
      localName: 'Alugbati',
      category: 'vegetable',
      icon: 'assets/crops/alugbati.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '5.5–8.0',

      propagationNote:
        'Can be propagated using mature stem cuttings or seeds.',

      supportNote:
        'For home gardens, a vertical, semi-vertical, or V-shaped trellis may be used to maximize growing space.',

      plantingNote:
        'Mature stem cuttings about 20–25 cm long may be planted directly. Seed-grown plants may be transplanted about three weeks after sowing at approximately 20 cm × 20 cm spacing.',

      harvestNote:
        'Plants may be ready for harvest about 30–45 days after transplanting. Shoots can also be harvested repeatedly at weekly intervals.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Alugbati Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/alugbati_prod.pdf'
      }
    },

    {
      name: 'Mustard Greens',
      localName: 'Mustasa',
      category: 'vegetable',
      icon: 'assets/crops/mustasa.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'About 15–20 cm between transplanted seedlings',

      soilNote:
        'Grows well in loose soil that is rich in organic matter and has adequate moisture.',

      plantingNote:
        'Can be direct-seeded or transplanted. For transplanting, seedlings may be moved about four weeks after sowing, preferably in the morning or late afternoon.',

      harvestNote:
        'Leaves may be harvested about two months after planting or around 2–4 weeks after transplanting, while the stems are still tender.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Regional Training Center 02',

        title:
          'Gabay sa Pagtatanim ng Mustasa',

        url:
          'https://ati2.da.gov.ph/ati-2/content/sites/default/files/2024-03/Gabay%20sa%20Pagtatanim%20ng%20Mustasa.pdf'
      }
    },

    {
      name: 'Winged Bean',
      localName: 'Sigarilyas',
      category: 'vegetable',
      icon: 'assets/crops/sigarilyas.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      supportNote:
        'Provide a sturdy trellis or climbing support as the vines develop.',

      plantingNote:
        'Establish plants in well-prepared soil with adequate drainage and provide support for the climbing vines.',

      harvestNote:
        'Young, tender pods are commonly harvested for vegetable use. Follow the official production guide and local crop maturity conditions when determining harvest readiness.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Regional Training Center III',

        title:
          'Mga Gabay sa Wastong Produksyon ng Sigarilyas',

        url:
          'https://ati2.da.gov.ph/elms/search.php?page=38'
      }
    },

    {
      name: 'Chayote',
      localName: 'Sayote',
      category: 'vegetable',
      icon: 'assets/crops/sayote.svg',

      minTemp: 10,
      maxTemp: 25,
      noRain: false,
      windMax: null,

      soilPH:
        '5.5–6.5',

      soilNote:
        'Performs well in clay loam, silty clay loam, or loam soil with good drainage and adequate organic matter.',

      plantingDistance:
        'About 3 meters between hills and rows',

      supportNote:
        'Provide a sturdy trellis or wire support about 6 feet high to support the climbing vines.',

      plantingNote:
        'Use mature fruits from healthy vines as planting material. Sprouted fruits may be planted in shallow holes, leaving part of the fruit exposed above the soil.',

      harvestNote:
        'Harvest fruits when they have reached suitable marketable size and quality. In major Cordillera production areas, the guide reports greater harvest from November to June.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Chayote Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641945410CHAYOTE.pdf'
      }
    },

    {
      name: 'Mung Bean',
      localName: 'Monggo',
      category: 'legume',
      icon: 'assets/crops/monggo.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '5.5–6.2',

      soilNote:
        'Grows well in well-drained loam or sandy loam soil.',

      plantingDistance:
        'About 50–60 cm between rows',

      plantingNote:
        'Prepare the field thoroughly and sow seeds in furrows about 4–6 cm deep. The crop may be planted during wet, dry, or late-dry season depending on local conditions.',

      harvestNote:
        'Harvesting may begin about 60–65 days after planting. Mature pods may be collected by priming or hand picking, usually in several harvest rounds.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'All About Mungbean (Balatong)',

        url:
          'https://library.buplant.da.gov.ph/images/1659331948Mungbean%20%28Balatong%29.pdf'
      }
    },

    {
      name: 'Peanut',
      localName: 'Mani',
      category: 'legume',
      icon: 'assets/crops/peanut.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '6.0–6.5',

      soilNote:
        'Performs well in level, well-drained sandy loam soil and fields that are free from major soil-borne diseases and insect pests.',

      plantingDistance:
        'About 10 cm between hills and 40 cm between rows',

      plantingNote:
        'Sow two seeds per hill. Good-quality seed should be used, and the official guide recommends rhizobium inoculation to support nitrogen fixation.',

      harvestNote:
        'Harvest when about 70–80% of the pods show prominent veins, the inner shell has darkened, and the seed coat has developed the normal color of the variety.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cagayan Valley',

        title:
          'Peanut Production and Processing Technologies',

        url:
          'https://ati2.da.gov.ph/ati-2/content/sites/default/files/2025-10/IEC%20Peanut.pdf'
      }
    },

    {
      name: 'Soybean',
      localName: 'Soya',
      category: 'legume',
      icon: 'assets/crops/soybean.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'About 40–50 cm between furrows and about 10 cm between hills',

      plantingDepth:
        'About 4–6 cm deep',

      plantingNote:
        'For the hill method, sow two seeds per hill about 10 cm apart along furrows spaced 40–50 cm apart. Drill planting may also be used at about 15–20 seeds per linear meter.',

      harvestNote:
        'Maturity depends on the soybean variety. The official guide lists recommended Philippine varieties with maturity periods ranging from less than 90 days to about 90–100 days.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas',

        title:
          'Soybean Production - How to Grow Soybean',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/2026-02/SOYBEAN%20PRODUCTION-1_compressed.pdf'
      }
    },

    {
      name: 'Moringa',
      localName: 'Malunggay',
      category: 'vegetable',
      icon: 'assets/crops/malunggay.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      propagationNote:
        'Can be established using branch cuttings.',

      plantingNote:
        'For branch cuttings, plant the cutting upright in a prepared pit with well-drained soil. Keep the soil moist while the cutting establishes, but avoid waterlogged conditions.',

      harvestNote:
        'Young leaves and flowers may be harvested for food. Green pods are best harvested while they are plump and firm but still tender.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Malunggay Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1640928442Malunggay%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Cassava',
      localName: 'Kamoteng Kahoy',
      category: 'root-crop',
      icon: 'assets/crops/cassava.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      propagationNote:
        'Propagated using healthy stem cuttings about 20–25 cm long taken from mature, pest-free and disease-free plants.',

      plantingDistance:
        'About 1 meter between rows and 0.75 meter between planting holes',

      plantingNote:
        'Plant stem cuttings according to soil moisture conditions. Horizontal planting may be used in relatively dry soil, while more upright planting is recommended under wetter conditions.',

      harvestNote:
        'About eight months after planting, sample plants may be checked to determine root maturity. Some recommended varieties listed in the guide mature at around 10 months after planting.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Produksiyon sa Kamoteng Kahoy (Cassava)',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/kamoteng%20kahoy%20production.pdf'
      }
    },

    {
      name: 'Taro',
      localName: 'Gabi',
      category: 'root-crop',
      icon: 'assets/crops/taro.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '5.6–6.5',

      soilNote:
        'For upland culture, gabi performs best in deep, well-drained loam soil. Lowland production performs well in alluvial soil with a continuous supply of fresh, cool water.',

      climateNote:
        'Gabi is well adapted to warm and moist conditions. The official guide identifies a daily average temperature of about 27–29°C as ideal.',

      plantingNote:
        'Upland gabi should be planted so that the first four to five months of growth receive adequate rainfall. Lowland production requires a continuous supply of fresh, cool water.',

      harvestNote:
        'Harvest readiness depends on the variety and production system. Follow visible crop maturity and the official production guide rather than using a single fixed harvest-day estimate.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Gabi Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1640920555Gabi%20Production%20Guide.pdf'
      }
    },

    {
      name: 'Purple Yam',
      localName: 'Ube',
      category: 'root-crop',
      icon: 'assets/crops/ube.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Requires deep, loose soil to allow proper tuber development. Flat or ridged seedbeds may be used depending on field conditions.',

      propagationNote:
        'Can be propagated using healthy tuber setts or small whole tubers. Setts should come from healthy, disease-free planting material.',

      supportNote:
        'Provide a sturdy stake or trellis to support the climbing vines as they grow.',

      plantingNote:
        'Large tubers may be cut into healthy setts and allowed to dry before planting. Pre-sprouting may also be used before field establishment.',

      harvestNote:
        'Ube is generally ready for harvest when the foliage begins to yellow or dry. Harvest timing varies by variety, with some production guides indicating underground tubers may be harvested from about six months after planting.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Ube Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641957628UBE.pdf'
      }
    },

    {
      name: 'Black Pepper',
      localName: 'Paminta',
      category: 'spice',
      icon: 'assets/crops/black-pepper.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Grows well in loose, well-drained soil under humid conditions.',

      propagationNote:
        'Commonly propagated using stem cuttings with about 3–5 internodes taken from healthy, high-yielding mother plants.',

      supportNote:
        'Provide a sturdy post or climbing support for the vines as they develop.',

      plantingNote:
        'Root stem cuttings in a shaded sandy seedbed. Cuttings may be transplanted once they have developed about 4–7 new leaves.',

      harvestNote:
        'Peppercorns mature in about 5–6 months. Spikes may be harvested when berries begin turning cherry-red or from dark green to shiny yellowish-green.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
         'ATI MIMAROPA',

        title:
          'Black Pepper Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/black_pepper.pdf'
      }
    },

    {
      name: 'Snap Bean',
      localName: 'Baguio Bean',
      category: 'legume',
      icon: 'assets/crops/snap-bean.svg',

      minTemp: 18,
      maxTemp: 29,
      noRain: false,
      windMax: null,

      soilPH:
        '5.5–7.5',

      soilNote:
        'Grows best in well-drained clay loam soil that is rich in organic matter.',

      plantingDistance:
        'About 30 cm between hills and 30 cm between plants',

      supportNote:
        'Pole-type snap beans require an A-type or fence-type trellis before the vines begin active development.',

      plantingNote:
        'Directly sow about 2–3 seeds per hill and cover lightly with soil. Maintain adequate moisture throughout the growing period without allowing the soil to become waterlogged.',

      harvestNote:
        'Pole-type snap beans may be harvested about 60–70 days after planting. Bush types may begin harvest around 55–60 days after planting. Harvest pods while they are tender, firm, crisp, and bright in color.',

      source: {
        agency:
          'Department of Agriculture - Cagayan Valley Regional Field Office',

        office:
          'High Value Crops Development Program',

        title:
          'Snap Beans Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/Snap-Beans-Production-Guide.pdf'
      }
    },

    {
      name: 'Sugar Apple',
      localName: 'Atis',
      category: 'fruit',
      icon: 'assets/crops/atis.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingNote:
        'Follow the Bureau of Plant Industry production guide for recommended propagation, site preparation, planting, and orchard management practices.',

      harvestNote:
        'Determine harvest readiness using the fruit maturity guidance provided in the official Bureau of Plant Industry production guide.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Production Guide - Guava, Guyabano, Avocado, Cashew, Atis',

        url:
          'https://library.buplant.da.gov.ph/books/509'
      }
    },

    {
      name: 'Potato',
      localName: 'Patatas',
      category: 'root-crop',
      icon: 'assets/crops/potato.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      idealTempRange:
        '20–24°C for vegetative growth; tuber development is favored at around 20°C',

      soilPH:
        '5.2–6.4',

      varieties: [
        'Conchita',
        'Frenze',
        'Asterix',
        'Atlantic',
        'Diamant',
        'Fina',
        'Igorota (BSU P04)',
        'Kennebec',
        'Montanosa',
        'Raja'
      ],

      plantingSeason:
        'March–April and October–November in Benguet and Bukidnon; November to mid-December in lowland areas',

      plantingDistance:
        'Single-row: about 75 cm between furrows and 30 cm between planting holes',

      soilNote:
        'Loose loam or sandy loam soil that is high in organic matter, well drained, and well aerated is preferred for tuber development.',

      plantingNote:
        'Use healthy, disease-free, well-sprouted seed tubers. Potato is commonly established using tubers, although true potato seed may also be used for seed production systems.',

      harvestNote:
        'Most potatoes mature about 75–90 days after planting, or when around 80% of the leaves have turned yellow. Harvest at full maturity for better storability.',

      source: {
        agency:
          'Department of Agriculture - Regional Field Office No. 02',

        office:
          'High Value Crops Development Program',

        title:
          'White Potato Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/potato.pdf'
      }
    },

    {
      name: 'Jicama',
      localName: 'Singkamas',
      category: 'root-crop',
      icon: 'assets/crops/jicama.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      scientificName:
        'Pachyrhizus erosus',

      plantingNote:
        'Singkamas is recognized by the Department of Agriculture - Bureau of Plant Industry as Yam Bean (Pachyrhizus erosus), a vegetable legume. Use locally appropriate production practices until a more detailed official Philippine production guide is available.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        office:
          'National Seed Industry Council',

        title:
          'Department Circular No. 05 Series of 2018 - Guidelines for the Accreditation of Open Pollinated Variety (OPV) Vegetable Legume Seed Growers/Producers',

        url:
          'https://nsic.buplant.da.gov.ph/dc.php'
      }
    },

    {
      name: 'Ginger',
      localName: 'Luya',
      scientificName: 'Zingiber officinale Roscoe',
      category: 'spice',
      icon: 'assets/crops/ginger.svg',

      minTemp: 25,
      maxTemp: 35,
      noRain: false,
      windMax: null,

      soilPH:
        '6.8–7.0',

      elevationNote:
        'Can be grown up to about 1,500 meters above sea level.',

      annualRainfall:
        'About 200–300 cm, evenly distributed throughout the year',

      shadeNote:
        'Grows well with about 25–40% shading.',

      varieties: [
        'White Native',
        'Yellow Native',
        'Red Native',
        'Imugan',
        'Hawaiian',
        'Jamaica Oya',
        'Canton / Chinese'
      ],

      plantingSeason:
        'Usually April to May at the onset of the rainy season; areas with year-round water supply may plant at other times.',

      plantingDistance:
        'Furrows about 1 m apart; planting hills about 25 cm apart',

      soilNote:
        'Prefers well-drained, light to medium-textured soil that is high in organic matter.',

      propagationNote:
        'Use mature, healthy, disease-free rhizomes with about 3–4 sprouts. Freshly cut seed pieces should be allowed to suberize before planting to reduce rotting.',

      plantingNote:
        'Plant healthy, pre-germinated or sprouting ginger rhizomes about 5 cm deep. Good drainage is important, especially during rainy periods.',

      harvestNote:
        'Harvest timing depends on intended use. Fresh consumption may be harvested at around 5 months, pickling at 5–7 months, dehydrated ginger at 6–8 months, export fresh ginger at 7–10 months, and ginger for the domestic market at about 8–11 months after planting.',

      source: {
        agency:
          'Department of Agriculture',

        office:
          'Regional Field Office - Cordillera Administrative Region',

        title:
          'Technoguide in Production & Management of Ginger',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-PRODUCTION-_-MANAGEMENT-OF-GINGER.pdf'
      }
    },

    {
      name: 'Turmeric',
      localName: 'Luyang Dilaw',
      scientificName: 'Curcuma longa',
      category: 'spice',
      icon: 'assets/crops/turmeric.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilNote:
        'Grows well in loose and sandy soil with good drainage.',

      shadeNote:
        'Can grow under partial shade to full sun, although plants may be sensitive to intense summer sunlight.',

      propagationNote:
        'Propagate using divisions or sections of healthy rhizomes.',

      plantingNote:
        'Use healthy rhizome planting material and establish in loose, well-drained soil. Partial shade may help protect plants from intense summer heat.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      }
    },

    {
      name: 'Arrowroot',
      localName: 'Uraro',
      scientificName: 'Maranta arundinacea',
      category: 'root-crop',
      icon: 'assets/crops/arrowroot.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'About 1.0 m x 0.75 m; closer spacing of about 0.75 m x 0.30 m may be used under poor soil conditions',

      soilNote:
        'Requires friable, well-drained loamy soil. Clayey soil should be avoided because it can restrict rhizome development and cause malformed rhizomes.',

      climateNote:
        'Requires sufficient soil moisture for normal growth and performs best where rainfall is distributed throughout the year.',

      propagationNote:
        'Can be propagated using suckers or rootstock/rhizomes with two or more nodes.',

      plantingNote:
        'Plant in an open field where sufficient soil moisture can be maintained. Partial shade is possible, although the official guide notes that it may reduce yield.',

      harvestNote:
        'Arrowroot is generally ready for harvest about 8–10 months after planting. The official guide notes that harvesting at about 11–12 months may produce higher yield and starch content.',

      source: {
        agency:
          'Department of Agriculture - MIMAROPA Region',

        office:
          'Regional Agriculture and Fisheries Information Section (RAFIS)',

        title:
          'Arrowroot Production',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Arrowroot-Production.pdf'
      }
    },

    {
      name: 'Wax Gourd',
      localName: 'Kundol',
      scientificName: 'Benincasa hispida',
      category: 'vegetable',
      icon: 'assets/crops/wax-gourd.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingNote:
        'Kundol is a climbing or trailing cucurbit grown for its edible fruit. Use locally appropriate vegetable production practices until a detailed official Philippine production guide is available.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Soils and Water Management',

        title:
          'Soil Survey of Isabela Province',

        url:
          'https://www.bswm.da.gov.ph/wp-content/uploads/Isabela.pdf'
      }
    },

    {
      name: 'Hyacinth Bean',
      localName: 'Bataw',
      scientificName: 'Lablab purpureus',
      category: 'legume',
      icon: 'assets/crops/hyacinth-bean.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      propagationNote:
       'Established from seed. The official ATI guide describes sowing lablab in a well-prepared seedbed either by drilling or broadcasting.',
 
      supportNote:
        'As a climbing bean, Bataw may use nearby sturdy plants or another suitable support. ATI describes lablab beans using corn stalks as a natural trellis in an intercropping system.',

      plantingNote:
        'Prepare the seedbed well before sowing. ATI guidance indicates that lablab seed may be drilled about 3–10 cm deep or broadcast depending on the cropping system.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'Cordillera Administrative Region',

        title:
          'Corn-Vegetable Farming System',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/corn-vegetable_integrated_farm_system.pdf'
      }
    },

    {
      name: 'Pigeon Pea',
      localName: 'Kadyos',
      scientificName: 'Cajanus cajan',
      category: 'legume',
      icon: 'assets/crops/pigeon-pea.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      plantingDistance:
        'Rows about 35 cm apart',

      plantingDepth:
        'About 2.5–10 cm deep',

      climateNote:
        'A warm-season perennial crop that can tolerate limited water and is useful in dryland agricultural systems.',

      soilNote:
        'Can grow across a wide range of soil types, from lighter loams to clay soils.',

      growthHabitNote:
        'An erect perennial shrub with a deep, fast-growing taproot. Plants commonly reach about 3–6 feet tall, although taller growth is possible.',

      plantingNote:
        'Sow in a well-prepared seedbed by broadcasting and covering the seed or by drilling in rows. Pigeon pea may also be planted along contours as a hedgerow in intercropping systems.',

      productiveLife:
        'Perennial crop; ATI guidance notes that plants may last about 5 years.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'Cordillera Administrative Region',

        title:
          'Corn-Vegetable Farming System',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/corn-vegetable_integrated_farm_system.pdf'
      }
    },

    {
      name: 'Lima Bean',
      localName: 'Patani',
      scientificName: 'Phaseolus lunatus L.',
      category: 'legume',
      icon: 'assets/crops/lima-bean.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      climateNote:
        'Patani is among the traditional Philippine crops identified by the Department of Agriculture as capable of tolerating prolonged dry conditions.',

      plantingNote:
        'Patani is cultivated in the Philippines as a vegetable legume. Use locally appropriate legume production practices until a current detailed Philippine government production guide is available.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'Indigenous Vegetables Project (iVeg)',

        title:
          'Patani / Lima Bean - Phaseolus lunatus L.',

        url:
          'https://iveg.pcaarrd.dost.gov.ph/crop/phaseolus-lunatus'
      }
    },

    {
      name: 'Jute Mallow',
      localName: 'Saluyot',
      scientificName: 'Corchorus olitorius L.',
      category: 'vegetable',
      icon: 'assets/crops/jute-mallow.svg',

      minTemp: null,
      maxTemp: null,
      noRain: false,
      windMax: null,

      soilPH:
        '4.5–8.0',

      varieties: [
        'Pula',
        'Puti',
        'Sagisag'
      ],

      plantingDistance:
        'Rows about 20–30 cm apart',

      climateNote:
        'Responds well to warm and humid conditions and can grow from humid to semi-arid tropical environments. Extended drought and cold conditions can damage the crop.',

      soilNote:
        'Loam or silty-loam soil is preferred, although Saluyot can grow in several soil types.',

      propagationNote:
        'Can be established through direct seeding or by transplanting seedlings.',

      plantingNote:
        'For direct seeding, sow seeds uniformly in rows about 20–30 cm apart. Seeds may also be broadcast lightly and covered with fine soil. For transplanting, seedlings may first be raised in a seedbed.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Production Guide of Saluyot',

        source: {
          agency:
            'Department of Science and Technology - Philippine Council for Agriculture, Forestry and Natural Resources Research and Development',

          office:
            'DOST Regional Office VI',

          title:
            'Saluyot Production Guide',

          url:
            'https://region6.dost.gov.ph/pcarrd-production-guide/'
        }
      }

    },

    {
      name: 'Amaranth',
      localName: 'Kulitis',
      scientificName:
        'Amaranthus spp. (including A. tricolor L. and A. viridis L.)',
      category: 'vegetable',
      icon: 'assets/crops/amaranth.svg',

      minTemp: 15,
      noRain: false,

      idealTempRange:
        'Above 25°C during daytime; nighttime temperature should not fall below about 15°C',

      rainfallNote:
        'Performs well where adequate water is available; the official guide notes good growth in areas receiving about 6 mm of rainfall per day.',

      soilNote:
        'Grows best in fertile, loose, well-drained soil. Good drainage is important because standing water should be avoided.',

      plantingDistance:
        'Rows about 10–20 cm apart, with seeds about 5 cm apart within the row',

      plantingDepth:
        'About 0.5–1.0 cm deep',
 
      propagationNote:
        'Propagated by seed. Kulitis may be established by direct seeding or by transplanting seedlings.',

      plantingNote:
        'Direct seeding is suitable when seed is plentiful and during drier conditions. Transplanting may be preferred during the rainy season when heavy rainfall could wash away newly sown seed.',

      harvestNote:
        'Kulitis may be harvested about 20–45 days after planting or sowing, depending on the type. Young leaves and shoots may also be harvested repeatedly at intervals of about 2–3 weeks.',

      source: {
        agency:
          'Department of Agriculture',

        office:
          'Office of the Secretary - High Value Crops Development Program',

        title:
          'Mga Katutubong Gulay (Indigenous Vegetables)',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Indigenous-Vegetables-Guide.pdf'
      }
    },

    {
      name: 'Celery',
      localName: 'Baguio Celery',
      scientificName: 'Apium graveolens',
      category: 'vegetable',
      icon: 'assets/crops/celery.svg',

      soilPH:
        '6.0–6.8',

      varieties: [
        'Elne',
        'Tall Utah'
      ],

      plantingSeason:
        'Can be planted year-round; the official guide notes that quality crops are commonly planted from January through April.',

      plantingDistance:
        'Rows about 40 cm apart, with plants about 20 cm apart within the row',

      elevationNote:
        'Stalk celery production is suited to higher elevations, while soup celery may be grown closer to sea level.',

      soilNote:
        'Prefers muck or peat soil, or sandy loam soil supplied with organic matter. Acidic soils are generally avoided.',

      propagationNote:
        'Established from seed in a seedbed. Seedlings may require about 2–3 months to reach suitable transplanting size.',

      plantingNote:
        'Seeds may be soaked overnight before sowing. Maintain adequate seedbed moisture during germination. Transplant healthy seedlings when they reach about 15 cm in height.',

      harvestNote:
        'The Elne variety may be harvested about 2–3 months after transplanting. For celery in general, the guide does not prescribe one exact maturity stage; harvest before petioles become over-mature and pithy.',

      source: {
        agency:
          'Department of Agriculture - Regional Field Office No. 02',

        office:
          'High Value Crops Development Program',

        title:
          'Celery Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/celery.pdf'
      }
    },

    {
      name: 'Asparagus',
      scientificName: 'Asparagus officinalis L.',
      category: 'vegetable',
      icon: 'assets/crops/asparagus.svg',

      noRain: false,

      growthHabitNote:
        'Asparagus is a perennial vegetable grown for its young edible spears.',

      plantingNote:
        'Establish asparagus using healthy planting material and follow the official Philippine production guide for site preparation, crop establishment, field management, and harvesting practices.',

      harvestNote:
        'Harvest young spears according to crop maturity and the production practices recommended in the official Philippine asparagus guide.',

      source: {
        agency:
          'Department of Agriculture - MIMAROPA Regional Field Office',

        office:
          'Regional Agricultural and Fisheries Information Section (RAFIS)',

        title:
          'Asparagus Production Guide',

        url:
         'https://mimaropa.da.gov.ph/media-resources/publication/high-value-crop'
      }
    },

    {
      name: 'Kale',
      category: 'vegetable',
      icon: 'assets/crops/kale.svg',

      noRain: false,

      productionSystemNote:
        'Kale is included in Philippine Department of Agriculture-supported indoor hydroponic vegetable production initiatives together with lettuce, basil, and tomato.',

      plantingNote:
        'Kale may be grown under controlled or soilless production systems. Follow locally validated crop-management practices appropriate to the selected kale cultivar and production setup.',

      source: {
        agency:
          'Department of Agriculture',

        office:
          'Bureau of Agricultural Research / National Urban and Peri-Urban Agriculture Program',

        title:
          'New Urban Agriculture Project Starts in Makati City',

        url:
          'https://www.da.gov.ph/new-urban-agri-project-starts-in-makati-city/'
      }
    },

    {
      name: 'Lemongrass',
      localName: 'Tanglad',
      category: 'herb',
      icon: 'assets/crops/lemongrass.svg',

      noRain: false,

      sunlightNote:
        'Prefers direct sunlight.',

      soilNote:
        'Can grow in different soil conditions but prefers loose soil.',

      propagationNote:
        'Propagated by division of established clumps.',

      plantingNote:
        'Use healthy divisions from established lemongrass clumps and plant them in loose soil where the plants can receive direct sunlight.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
         'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      }
    },

    {
      name: 'Basil',
      variety: 'Sweet Basil',
      scientificName: 'Ocimum basilicum',
      category: 'herb',
      icon: 'assets/crops/basil.svg',

      productionNote:
        'Sweet basil is cultivated in the Philippines as a culinary herb and is included among crop commodities produced under Philippine Good Agricultural Practices (PhilGAP)-certified herb production.',

      plantingNote:
        'Use healthy planting material and locally appropriate herb-production practices. Quantitative temperature, soil, spacing, and harvest thresholds are not stored here because the selected official reference does not provide crop-specific production limits for Sweet Basil.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        office:
          'Plant Product Safety Services Division',

        title:
          'BPI-0294-26 PhilGAP Certificate - Solaire Herb and Greenhouse, Inc.',

        url:
          'https://buplant.da.gov.ph/2026/03/16/bpi-0294-26-philgap-certificate-solaire-herb-and-greenhouse-inc/'
      }
    },

    {
      name: 'Pandan',
      localName: 'Pandan Mabango',
      scientificName: 'Pandanus amaryllifolius Roxb.',
      category: 'herb',
      icon: 'assets/crops/pandan.svg',

      soilNote:
        'Plant in moist soil or in a container with good drainage.',

      propagationNote:
       'Propagate by separating a rooted offshoot from the parent plant. Cuttings may also be kept in water until roots develop before planting.',

      wateringNote:
        'Maintain adequate moisture. The official ATI guide recommends daily watering during summer.',

      plantingNote:
        'Use a healthy rooted offshoot and establish it in moist, well-drained soil. Pandan may also be grown in containers with adequate drainage.',

      useNote:
        'The aromatic leaves are widely used as a natural flavoring for rice, desserts, drinks, and other foods.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      }
    },

    {
      name: 'Sesame',
      localName: 'Linga',
      scientificName: 'Sesamum indicum',
      category: 'oilseed',
      icon: 'assets/crops/sesame.svg',

      cropUseNote:
        'Sesame is cultivated for its oil-rich edible seeds and is recognized in Philippine food and agricultural references as Linga.',

      plantingNote:
        'Use healthy sesame seed and follow the official Bureau of Plant Industry production guide for crop establishment, field management, harvesting, and post-harvest practices.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        office:
          'BPI Library Inventory System',

        title:
          'Plant Industry Production Guide (39) - Sesame',

        url:
          'https://library.buplant.da.gov.ph/books/59'
      }
    },

    {
      name: 'Sorghum',
      localName: 'Batad',
      scientificName: 'Sorghum bicolor (L.) Moench',
      category: 'grain',
      icon: 'assets/crops/sorghum.svg',

      soilPH:
        '5.5–6.5',

      soilNote:
        'Prefers well-drained clay loam soil. The official DA guide also notes that sandy loam and clay loam soils can be suitable for sorghum production under hot-season conditions.',

      plantingDistance:
        'About 75 cm between rows and 10 cm between plants',

      plantingDepth:
        'About 2.5 cm deep when the soil is moist and about 5 cm deep when the soil is dry',

      seedRate:
        'About 8–10 kg of seed per hectare',

      climateNote:
        'Sorghum can be grown under different Philippine climatic and soil conditions and performs well under sunny conditions.',

      irrigationNote:
        'Irrigation is especially important during dry periods. The official guide describes weekly irrigation during the first 30–75 days after emergence when needed.',

      plantingNote:
        'Prepare a clean and well-plowed field. During the rainy season, furrows may be about 10 cm deep; during summer, about 15–20 cm deep. Sow the small seeds shallowly and thin the stand about 14 days after planting when necessary.',

      useNote:
        'Sorghum may be used for food, animal feed, forage, silage, ethanol, bioenergy, and other agricultural products.',

      source: {
        agency:
          'Department of Agriculture - Regional Field Office CALABARZON',

        office:
          'Regional Agriculture and Fisheries Information Section',

        title:
          'Gabay sa Produksyon ng Sorghum',

        url:
          'https://calabarzon.da.gov.ph/wp-content/uploads/2025/01/SORGHUM-Brochure-Template-1.pdf'
      }
    },

    {
      name: 'Adlai',
      localName: "Job's Tears",
      scientificName: 'Coix lacryma-jobi',
      category: 'grain',
      icon: 'assets/crops/adlai.svg',

      varieties: [
        'Gulian',
        'Tapol',
        'Ginampay',
        'Pulot'
      ],

      plantingDistance:
        'Furrows about 90 cm apart, with planting hills about 60 cm apart',

      seedRate:
        'About 10 kg of seed per hectare',

      plantingNote:
        'Plant about 2–3 seeds per hill and cover them with soil. The official guide recommends applying organic fertilizer along the furrows before planting.',

      irrigationNote:
       'The soil should be moist during planting. Irrigate when necessary, especially during dry periods.',

      droughtNote:
        'Adlai is described in the official guide as tolerant of both dry and rainy conditions and capable of growing even in relatively poor soil.',

      harvestNote:
        'Harvest about 5–6 months after planting, or when approximately 80% of the grains on the plants are mature.',

      postHarvestNote:
        'Dry harvested grain to about 13% moisture for storage. Milling is recommended when grain moisture is around 12–13%.',

      ratoonNote:
        'Adlai can produce another crop through ratooning after harvest when the remaining plants are properly managed.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Gabay sa Produksyon ng Adlay',

        url:
         'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-11/Gabay%20sa%20Produksyon%20ng%20Adlay.pdf'
      }
    },

    {
      name: 'Sugarcane',
      localName: 'Tubo',
      scientificName: 'Saccharum officinarum L.',
      category: 'industrial-crop',
      icon: 'assets/crops/sugarcane.svg',

      plantingDistance:
        'SRA recommends about 1.0 m furrow spacing for conventional early-season planting.',

      plantingDensity:
        'About 40,000 canepoints per hectare for early-season planting and about 50,000 canepoints per hectare for late-season planting under the cited SRA recommendation.',

      propagationNote:
        'Sugarcane is established using vegetative planting material or canepoints rather than seed for commercial field production.',

      plantingNote:
        'Use healthy planting material and select an SRA-recommended variety suited to the production area. Planting density and furrow spacing should be adjusted according to variety, planting season, and production system.',

      varietyNote:
        'The Sugar Regulatory Administration maintains and evaluates Philippine sugarcane varieties under the Phil series.',

      useNote:
        'Sugarcane is cultivated primarily for sugar and is also used as a raw material for several agricultural and industrial products.',

      source: {
        agency:
          'Sugar Regulatory Administration',

        office:
          'Research, Development and Extension',

        title:
          'Yield Performance of Phil 2009-0919 at Different Furrow Distance and Planting Density',

        url:
          'https://www.sra.gov.ph/view_file/researches/gy3yaTT7QnXQjhq'
      }
    },

    {
      name: 'Abaca',
      scientificName: 'Musa textilis Nee',
      category: 'fiber-crop',
      icon: 'assets/crops/abaca.svg',

      soilPH:
        '6.0–7.0',

      elevation:
        'Below 1,000 meters above sea level',

      idealTempRange:
        'Commonly grows in areas with about 20°C during cool months and around 25°C during warm months',

      humidity:
        'About 78–85% relative humidity is conducive to good growth',

      rainfallNote:
        'Performs well where rainfall is evenly distributed throughout the year.',

      soilNote:
        'Prefers loose, friable, well-drained clay loam or sandy clay loam soil rich in organic matter.',

      varieties: [
        'Musa Tex 51',
        'Abuab',
        'Tinawagan Puti',
        'Linawaan',
        'Inosa',
        'Laylay',
        'Maguindanao',
        'Bongolanon',
        'Tangongon'
      ],

      plantingSeason:
        'Planting at the start of the rainy season is preferred.',

      plantingDistance:
        'About 2 m × 2 m for ordinary-size varieties and about 3 m × 3 m for large-size varieties',

      propagationNote:
        'May be propagated using seedpieces or corms, suckers, tissue-cultured planting materials, or seeds.',

      plantingNote:
        'Use healthy, disease-free planting materials. Select spacing appropriate to the size of the chosen variety and establish the crop preferably at the beginning of the rainy season.',

      harvestNote:
        'Abaca normally reaches maturity about 18–24 months after planting or when the flag leaf appears. Subsequent harvesting may be done at approximately 3–4 month intervals.',

      useNote:
        'Abaca fiber is used for pulp and paper, cordage and twine, fiber crafts, textiles, furniture, composites, and construction materials.',

      source: {
        agency:
          'Department of Agriculture - Philippine Fiber Industry Development Authority',

        office:
          'PhilFIDA',

        title:
          'Abaca Technoguide - 2024 Edition',

        url:
          'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      }
    },

    {
      name: 'Rubber',
      scientificName: 'Hevea brasiliensis',
      category: 'industrial-crop',
      icon: 'assets/crops/rubber.svg',

      plantingDistance:
        'Planting distance depends on terrain, clone, planting material, and desired tree density. Recommended layouts include 10 m × 2 m for hilly contour planting and several layouts for flat or undulating land such as 5 m × 4 m and 6 m × 3 m.',

      plantingHole:
        'A general planting-hole size of about 24 cm × 30 cm is recommended, although larger holes may be required for compact soil or larger planting materials.',

      plantingSeason:
        'Plant preferably when rainy weather is expected.',

      plantingNote:
        'Use healthy budded planting materials. For polybag seedlings, transplant when the leaves of the second top storey are fully expanded, dark green, and mature.',

      establishmentNote:
        'Rubber requires careful cultural management during its immature stage, which generally covers the first 1–6 years after planting.',

      pruningNote:
        'Young rubber trees may be pruned to develop a smooth trunk up to about 2.0–2.5 m. Maintain about 4–5 well-spaced branches to help develop a balanced canopy and reduce wind damage.',

      intercroppingNote:
        'During the immature stage, rubber may be intercropped with suitable crops. The official guide lists crops such as peanut, upland rice, corn, sorghum, mungbean, soybean, sweet potato, pineapple, and squash.',

      useNote:
        'Natural rubber latex is used in products such as tires, flexible pipes, footwear, gloves, mattresses, upholstery, and other industrial materials.',

      source: {
        agency:
          'Department of Agriculture',

        office:
          'High Value Crops Development Program',

        title:
          'Rubber Production Guide',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Rubber-Production-Guide.pdf'
      }
    },

    {
      name: 'Pili',
      scientificName: 'Canarium ovatum',
      category: 'tree-nut',
      icon: 'assets/crops/pili.svg',
  
      propagationNote:
        'Pili may be propagated sexually from nuts or asexually through methods such as inarching and cleft grafting. The Department of Agriculture promotes asexual propagation using selected high-quality mother trees for commercial production.',

      pollinationNote:
        'For fruit production, the official DA reference notes that approximately one male pili tree for every 20–25 female trees can serve as an adequate pollen source.',

      bearingNote:
        'Asexually propagated pili trees may begin bearing fruit within about 3 years, while trees grown through sexual propagation from nuts may require about 8–10 years before bearing.',

      plantingNote:
        'For commercial production, use healthy, high-quality grafted planting materials derived from selected mother trees whenever suitable planting materials are available.',

      useNote:
        'Pili is cultivated mainly for its edible kernel and pulp. The tree also produces resin known as Manila elemi, which has several industrial uses.',

      source: {
        agency:
          'Department of Agriculture - Regional Field Office 5',

        office:
          'Bicol Region',

        title:
          "Exploring the Potential of Bicol's Pili Nut as an Export Product",

        url:
          'https://bicol.da.gov.ph/exploring-the-potential-of-bicols-pili-nut-as-an-export-product/'
      }
    },

    {
      name: 'Passion Fruit',
      scientificName: 'Passiflora edulis',
      category: 'fruit',
      icon: 'assets/crops/passion-fruit.svg',

      growthHabitNote:
        'Passion fruit is a perennial vining fruit crop.',

      bearingNote:
        'In the Philippine production experience documented by the Agricultural Training Institute, passion fruit began producing at about six months after establishment.',

      productiveLifeNote:
        'The ATI-featured Philippine farm reported continuous harvesting for at least three years after production began.',

      waterManagementNote:
        'Adequate water should be available during dry periods. The ATI-featured farm stores rainwater for use when rainfall is insufficient.',

      plantingNote:
        'Use healthy planting materials and provide appropriate support for the developing vines. Adapt crop management, irrigation, nutrient management, and pest management to local growing conditions.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Office',

        title:
          'Retired Broadcast Journalist Shares Experience on Passion Fruit Production',

        url:
          'https://ati2.da.gov.ph/ati-main/content/article/jenny-rose-gabao/retired-broadcast-journalist-shares-experience-passion-fruit-production'
      }
    },

    {
      name: 'Star Fruit',
      localName: 'Balimbing',
      scientificName: 'Averrhoa carambola',
      category: 'fruit',
      icon: 'assets/crops/star-fruit.svg',

      sunlightNote:
        'Performs well under direct sunlight.',

      soilNote:
        'Balimbing can adapt to different soil conditions.',

      propagationNote:
        'May be propagated from seeds or through asexual methods such as grafting and marcotting.',

      plantingNote:
        'Use healthy planting material and establish the tree in a location receiving direct sunlight. Organic materials such as dried livestock manure or vermicast may be used to support plant growth and fruit production.',

      useNote:
        'The ripe fruit may be eaten fresh and is also used in beverages, cooking, and processed food products.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf?utm_source'
      }
    },

    {
      name: 'Santol',
      scientificName: 'Sandoricum koetjape (Burm.f.) Merr.',
      category: 'fruit',
      icon: 'assets/crops/santol.svg',

      bearingNote:
        'The official ATI SALT-4 reference lists seed-propagated Santol at about 5–7 years before harvesting. The same reference does not provide a corresponding value for asexually propagated Santol.',

      establishmentNote:
        'For fruit-tree establishment under the SALT-4 system, healthy seedlings are planted at the start of the rainy season and provided with adequate spacing to reduce competition as the trees mature.',

      plantingNote:
        'Use healthy, disease-free planting material and select a suitable site with enough space for development of the mature fruit tree.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
         'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      }
    },

    {
      name: 'Sapodilla',
      localName: 'Chico',
      scientificName: 'Manilkara zapota (L.) P. van Royen',
      category: 'fruit',
      icon: 'assets/crops/sapodilla.svg',

      bearingNote:
        'The official ATI SALT-4 reference lists Chico at about 6–10 years before harvesting when propagated from seed and about 3–5 years when established through asexual propagation.',

      plantingNote:
        'Use healthy planting material and provide enough space for development of the mature fruit tree. Asexually propagated planting materials may be used when earlier fruit production is desired.',

      harvestNote:
        'Harvest fruits only after they have reached an appropriate degree of maturity and while they remain fresh, firm, and suitable for handling and transport.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      }
    },

    {
      name: 'Wax Apple',
      localName: 'Makopa',
      scientificName: 'Syzygium samarangense',
      category: 'fruit',
      icon: 'assets/crops/wax-apple.svg',

      growthHabitNote:
        'Makopa is a tropical fruit tree cultivated in the Philippines.',

      fruitNote:
        'The fruit is broadly pear-shaped and may range from light red to white, with white, juicy, aromatic flesh.',

      useNote:
        'The fruit is edible and is known in Philippine references as Makopa, Wax Apple, Wax Jambu, or Java Apple.',

      source: {
        agency:
          'Department of Science and Technology - Food and Nutrition Research Institute',

        office:
          'Philippine Food Composition Table',

        title:
          'Java Apple - Syzygium samarangense',

        url:
          'https://i.fnri.dost.gov.ph/fct/library/report/3608'
      }
    },

    {
      name: 'Java Plum',
      localName: 'Duhat',
      scientificName: 'Syzygium cumini (L.) Skeels',
      category: 'fruit',
      icon: 'assets/crops/java-plum.svg',

      growthHabitNote:
        'Duhat is a fruit-bearing tree found in the Philippines.',

      fruitNote:
        'Fully ripe Duhat fruits develop a dark purple color.',

      useNote:
        'The fruit may be eaten and processed into products such as juice and other value-added food products.',

      plantingNote:
        'Use healthy planting material and locally appropriate fruit-tree management practices. Quantitative growing thresholds are not stored because the selected official reference does not provide crop-specific production limits.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Health-promoting Properties Found in Extracts of Duhat and Bignay',

        url:
          'https://www.pcaarrd.dost.gov.ph/index.php/quick-information-dispatch-qid-articles/health-promoting-properties-found-in-extracts-of-duhat-and-bignay'
      }
    },

    {
      name: 'Tamarind',
      localName: 'Sampalok',
      scientificName: 'Tamarindus indica L.',
      category: 'fruit',
      icon: 'assets/crops/tamarind.svg',

      propagationNote:
        'Tamarind may be propagated through grafting. Philippine DOST-supported research has evaluated grafting as part of improved production management for the crop.',

      bearingNote:
        'In DOST-PCAARRD-supported Philippine trials, grafted tamarind trees produced fruit within about 2 years, earlier than the ungrafted trees evaluated in the project.',

      managementNote:
        'Philippine research has evaluated practices such as grafting, pruning, girdling, biological control agents, and plant-growth management to improve tamarind production and fruit quality.',

      pruningNote:
        'Post-harvest pruning has been evaluated by the Tamarind R&D Center as a production-management practice for Sampalok.',

      varietyNote:
        'Philippine tamarind research includes both sour and sweet types. PSAU Sour 2 has been registered through the National Seed Industry Council as a sour tamarind variety.',

      useNote:
        'Tamarind fruits may be consumed or processed into products such as candy, juice, concentrate, jam, powder, wine, and vinegar.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Mas Mataas na Produksyon at Kalidad ng Sampalok, Hatid ng Agham at Teknolohiya',

        url:
          'https://www.pcaarrd.dost.gov.ph/index.php/quick-information-dispatch-qid-articles/mas-mataas-na-produkyson-at-kalidad-ng-sampalok-hatid-ng-agham-at-teknolohiya'
      }
    },

    {
      name: 'Breadfruit',
      localName: 'Rimas',
      scientificName: 'Artocarpus altilis',
      category: 'fruit',
      icon: 'assets/crops/breadfruit.svg',

      growthHabitNote:
        'Rimas is a tropical fruit tree cultivated in the Philippines and commonly grown as a backyard or agroforestry crop.',

      propagationNote:
        'Philippine research has evaluated propagation methods including tissue culture, grafting, and marcotting to increase the availability of Rimas planting materials.',

      plantingNote:
        'Use healthy planting material produced through an appropriate vegetative propagation method and provide adequate space for development of the mature tree.',

      fruitNote:
        'Breadfruit or Rimas produces starchy fruits that may be consumed as food or processed into value-added products such as flour, chips, pastries, and other products.',

      useNote:
        'Rimas has been promoted in Philippine agricultural research as a food and livelihood crop with potential for processing and enterprise development.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Agricultural Research',

        office:
          'DA-BAR',

        title:
          'Massive Opportunities with RIMAS',

        url:
          'https://www.bar.gov.ph/file?filename=digest%2Fpdf%2Fvol.+25+issue+no.+4+2023.pdf'
      }
    },

    {
      name: 'Marang',
      scientificName: 'Artocarpus odoratissimus',
      category: 'fruit',
      icon: 'assets/crops/marang.svg',

      growthHabitNote:
        'Marang is an evergreen tropical fruit tree that may grow up to about 25 meters tall when not pruned or otherwise managed.',

      distributionNote:
        'The official Philippine reference notes that Marang is commonly cultivated in areas including Mindoro, Negros, and Mindanao.',

      fruitNote:
        'The fruit is generally roundish to oblong and about 16–20 cm long, with soft greenish-to-yellow spines and sweet, juicy white flesh surrounding numerous seeds.',

      plantingNote:
        'Use healthy planting material and provide adequate space for development of the mature tree. Exact spacing, temperature, soil-pH, and irrigation thresholds are not stored because the selected official reference does not provide production-specific values.',

      postHarvestNote:
        'Freshly opened Marang has a short shelf life and should be consumed or processed promptly because the exposed fruit deteriorates quickly.',

      useNote:
        'Marang is commonly eaten fresh and may also be processed into products such as ice cream, syrup, puree, preserves, jam, dehydrated products, and powder.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'SaRiLing ATIn',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/SaRiLing%20ATIn.pdf'
      }
    },

    {
      name: 'Bignay',
      localName: 'Bugnay',
      scientificName: 'Antidesma bunius (L.) Spreng.',
      category: 'fruit',
      icon: 'assets/crops/bignay.svg',

      growthHabitNote:
        'Bignay is a native fruit-bearing tree found in the Philippines.',

      fruitNote:
        'Bignay produces small fruits in hanging clusters. The fruits are used in Philippine food research and processing applications.',

      propagationNote:
        'Philippine DOST-supported research on native fruit-bearing trees has included Bignay in studies on vegetative propagation and the development of quality planting stocks.',

      useNote:
        'Bignay fruits may be utilized in processed food products. DOST-supported studies have also investigated anthocyanin-rich extracts from the fruit for food and nutraceutical applications.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Health-promoting Properties Found in Extracts of Duhat and Bignay',

        url:
         'https://www.pcaarrd.dost.gov.ph/index.php/quick-information-dispatch-qid-articles/health-promoting-properties-found-in-extracts-of-duhat-and-bignay'
      }
    },

    {
      name: 'Strawberry',
      scientificName: 'Fragaria × ananassa',
      category: 'fruit',
      icon: 'assets/crops/strawberry.svg',

      idealTempRange:
        '14–23°C',

      soilPH:
        '5.5–6.5',

      soilNote:
        'Grows best in well-drained clay-loam and loamy soils with good air and water drainage. Waterlogged and sandy soils are less favorable for strawberry production.',

      varieties: [
        'Sweet Charlie',
        'Strawberry Festival',
        'Missionary',
        'Whitney',
        'Winter Dawn',
        'Toyonoka'
      ],

      plantingSeason:
        'June–July on rainfed hillsides; late August–September may be used in valley-floor areas prone to flooding.',

      plantingDistance:
        'For matted and spaced-matted row systems, mother plants may be spaced about 18–36 inches apart, with rows about 36–48 inches apart.',

      propagationNote:
        'Strawberries may be established using suckers or runners. The official guide notes that runners are preferred because they can provide higher yield.',

      plantingNote:
        'Set the crown at the correct soil level. Planting too high may expose roots, while planting too deeply can cause crown rot. A soil test should be used to guide nutrient management.',

      irrigationNote:
        'Maintain adequate soil moisture throughout the growing season. The guide recommends at least about 1 inch of water per week from rainfall or irrigation.',

      harvestNote:
        'Fruit may be harvested at full-ripe stage when the surface is red throughout for fresh consumption or processing. Three-fourths ripe fruits may be harvested for nearby or longer-distance markets.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          'Strawberry Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/strawberry_production.pdf'
      }
    },

    {
      name: 'Mandarin Orange',
      localName: 'Dalanghita',
      scientificName: 'Citrus reticulata Blanco',
      category: 'fruit',
      icon: 'assets/crops/mandarin-orange.svg',

      soilPH:
        '5.0–7.5',

      varieties: [
        'Satsuma',
        'Ponkan'
      ],

      climateNote:
        'Mandarin belongs to the citrus group that grows well under tropical and subtropical conditions in the Philippines.',

      rainfallNote:
        'Areas with adequate and well-distributed rainfall are favorable for citrus production. Where rainfall is insufficient or dry periods occur, regular and timely irrigation is important.',

      soilNote:
        'Citrus can grow in different soil types within an appropriate soil-pH range, provided the site supports good crop establishment and water management.',

      irrigationNote:
        'Provide regular and timely irrigation when rainfall is insufficient, especially in production areas that experience prolonged dry periods.',

      plantingNote:
        'Use healthy, properly identified planting material and select a site suited to citrus production. Match orchard management and irrigation practices to local rainfall and soil conditions.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Citrus - Industry Strategic Science and Technology Program',

        url:
          'https://ispweb.pcaarrd.dost.gov.ph/citrus/'
      }
    },

    {
      name: 'Lemon',
      scientificName: 'Citrus limon L.',
      category: 'fruit',
      icon: 'assets/crops/lemon.svg',

      soilPH:
        '5.0–7.5',

      climateNote:
        'Lemon belongs to the citrus group that grows well under tropical and subtropical conditions in the Philippines.',

      rainfallNote:
        'Well-distributed rainfall is favorable for citrus production. In locations with extended dry periods or insufficient rainfall, supplemental irrigation is important.',

      irrigationNote:
        'Provide regular and timely irrigation when natural rainfall is insufficient.',

      soilNote:
        'Citrus can be cultivated in different soil types within an appropriate soil-pH range, provided the site has suitable water management and growing conditions.',

      propagationNote:
        'Citrus may be propagated through seed or vegetatively. Philippine citrus production guidance recognizes budding, grafting, and cuttings as vegetative propagation methods.',

      plantingNote:
        'Use healthy and properly identified planting material and establish the tree in a site suitable for citrus production. Adjust irrigation and orchard management according to local rainfall and soil conditions.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Citrus - Industry Strategic Science and Technology Program',

        url:
          'https://ispweb.pcaarrd.dost.gov.ph/citrus/'
      }
    },

    {
      name: 'Grapes',
      localName: 'Ubas',
      scientificName: 'Vitis vinifera',
      category: 'fruit',
      icon: 'assets/crops/grapes.svg',

      growthHabitNote:
        'Grapes are perennial woody vines that require appropriate support and training for productive cultivation.',

      supportNote:
        'Provide a suitable grapevine support and training system. The official Philippine grape-production reference includes vine supports, training techniques, and pruning as important parts of vineyard management.',

      propagationNote:
        'Use healthy and properly identified planting material and follow locally appropriate propagation and establishment practices for table-grape production.',

      pruningNote:
        'Regular pruning and vine training are important components of Philippine grape production and should be managed according to cultivar and local production conditions.',

      plantingNote:
        'Select a suitable site, healthy planting materials, and an appropriate cultivar. Vineyard establishment should consider local soil and climatic conditions as well as the required vine-support system.',

      harvestNote:
        'Harvest grapes according to appropriate fruit maturity and quality standards and handle harvested clusters carefully to preserve postharvest quality.',

      useNote:
        'Grapes may be consumed fresh as table grapes or processed into products such as juice, raisins, preserves, and other value-added products.',

      source: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD / STAARRDEC Knowledge Resources',

        title:
          'The Philippines Recommends for Grapes',

        url:
         'https://km4aanr.pcaarrd.dost.gov.ph/search?page=5&query=The+Philippines+recommends+for+coconut&search=The+Philippines+recommends+for+coconut'
      }
    },

    {
      name: 'Star Apple',
      localName: 'Caimito',
      scientificName: 'Chrysophyllum cainito',
      category: 'fruit',
      icon: 'assets/crops/star-apple.svg',

      bearingNote:
        'The official ATI SALT-4 reference lists Caimito at about 5–6 years before harvesting when propagated from seed and about 3–4 years when established through asexual propagation.',

      propagationNote:
        'Both seed propagation and asexual propagation are recognized in the official Philippine fruit-tree reference, with asexually propagated Caimito generally reaching harvest earlier.',

      plantingNote:
        'Use healthy planting material and provide adequate space for development of the mature fruit tree. Asexually propagated planting materials may be selected when earlier fruit production is desired.',

      fruitNote:
        'Caimito is cultivated in the Philippines as an edible tropical fruit tree.',

      source: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      }
    },
   

];

