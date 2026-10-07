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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Kamatis',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-06/Gabay%20sa%20Produksyon%20ng%20Kamatis.pdf'
    },

   minTemp: 18,
   maxTemp: 32,
   noRain: false,
   windMax: 20,

   harvestNote:
    'Harvesting generally begins about 55–65 days after planting, depending on the variety and crop condition.',

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Talong',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_talong1.pdf'
    },

    minTemp: 22,
    maxTemp: 35,
    noRain: false,
    windMax: 25,

    harvestNote:
     'Harvesting generally begins about 46–50 days after transplanting, depending on the variety used.',

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'MAIS Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/MAIS%20Production%20Guide.pdf'
    },

    minTemp: 18,
    maxTemp: 33,
    noRain: false,
    windMax: 15,

    harvestNote:
      'Corn is generally ready for harvest about 90–120 days after planting, depending on the maturity of the variety.',

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

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera',

        title:
          'Okra Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/okra_production_flyer_.pdf'
      },

    minTemp: 25,
    maxTemp: 38,
    noRain: false,
    windMax: 20,

    harvestNote:
      'Okra generally begins flowering about 40–75 days after planting. Young and tender fruits may be harvested about 4–6 days after flowering.',

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

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera',

        title:
          'Pole Sitaw Production for Urban and Backyard Gardening',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pole_sitaw_flyer.pdf'
      },

    minTemp: 20,
    maxTemp: 35,
    noRain: false,
    windMax: 22,

    harvestNote:
      'Pole sitaw may be harvested about 60–70 days after planting, depending on pod diameter and toughness.',

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI MIMAROPA',

      title:
        'Gabay sa Produksyon ng Ampalaya',

      url:
        'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/gabay_sa_produksyon_ng_ampalaya_final_2.pdf'
    },

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

    plantingMethodSource: {
      agency:
       'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera',

      title:
        'Pechay Production for Urban and Home Gardening',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/pechay_production_for_urban_gardening_leaflet.pdf'
    },

    minTemp: 15,
    maxTemp: 25,
    noRain: false,
    windMax: 20,

    harvestNote:
      'Direct-seeded pechay may be harvested about 30–40 days after sowing, while transplanted pechay may be harvested about 3–4 weeks after transplanting.',

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture',

      office:
        'High Value Crops Development Program',

      title:
        'Pag-aalaga ng Kamote',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Production-Guide.pdf'
    },

    minTemp: 20,
    maxTemp: 35,
    noRain: true,
    windMax: 25,

    harvestNote:
      'Kamote is commonly harvested about 110–130 days after planting, depending on the variety.',

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Philippine Council for Agriculture and Fisheries',

      title:
        'Philippine Banana Industry Roadmap 2021-2025',

      url:
        'https://pcaf.da.gov.ph/wp-content/uploads/2022/06/Philippine-Banana-Industry-Roadmap-2021-2025.pdf'
    },

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Philippine Fiber Industry Development Authority',

      office:
        'PhilFIDA',

      title:
        'Pineapple Technoguide 2024',

      url:
        'https://philfida.da.gov.ph/images/Publications/Technoguides/pineapple-technoguide-2024.pdf'
    },

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - High Value Crops Development Program',

      title:
        'Cacao Production Guide',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Cacao-Production-Guide.pdf'
    },

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office VII',

      title:
        'Pagtanum og Nangka',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/PAGTANUM-OG-NANGKA.pdf'
    },

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
        'Rambutan Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641946110RAMBUTAN.pdf'
    },

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

    plantingMethods: [
      {
        value: 'grafted-seedlings',
        label: 'Grafted Seedlings'
      },
      {
        value: 'marcotted-plants',
        label: 'Marcotted Plants'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera Administrative Region',

      title:
        '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
  },

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Durian Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1640919293Durian%20Production%20Guide.pdf'
    },

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

    plantingMethodSource: {
      agency:
        'University of the Philippines Los Baños',

      title:
        "Characteristics and Propagation of 'UPLB Sweet' Mangosteen",

      url:
        'https://www.ukdr.uplb.edu.ph/journal-articles/4419/'
    },

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

    plantingMethods: [
      {
        value: 'grafted-seedlings',
        label: 'Grafted Seedlings'
      },
      {
        value: 'budded-seedlings',
        label: 'Budded Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Avocado Production',

      url:
        'https://library.buplant.da.gov.ph/images/1581571589AVOCADO.pdf'
  },

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

    plantingMethods: [
      {
        value: 'marcotted-plants',
        label: 'Marcotted Plants'
      },
      {
        value: 'budded-grafted-plants',
        label: 'Budded / Grafted Plants'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office Caraga',

      title:
        'Tips on Guava Production',

      url:
        'https://caraga.da.gov.ph/wp-content/uploads/Publication/tips_guapple.pdf'
  },

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

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      },
      {
        value: 'marcotted-plants',
        label: 'Marcotted Plants'
      },
      {   
        value: 'grafted-budded-plants',
        label: 'Grafted / Budded Plants'
      },
      {
        value: 'inarched-plants',
        label: 'Inarched Plants'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Guyabano Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641946446Guayabano%20production%20guide.pdf'
    },

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

    plantingMethods: [
      {
        value: 'rooted-cuttings',
        label: 'Nursery-rooted Cuttings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Dragon Fruit Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/DRAGON%20FRUIT.PDF'
    },

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

    plantingMethods: [
      {
        value: 'budded-seedlings',
        label: 'Budded Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office II',

      title:
        'Pummelo Production Guide',

      url:
        'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/pummelofinal.pdf'
  },

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

    plantingMethods: [
      {
        value: 'nursery-raised-seedlings',
        label: 'Nursery-raised Seedlings'
      },
      {
        value: 'grafted-seedlings',
        label: 'Grafted Seedlings'
      },
      {
        value: 'marcotted-air-layered-plants',
        label: 'Marcotted / Air-layered Plants'
      },
      {
        value: 'inarched-plants',
        label: 'Inarched Plants'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Cashew Production',

      url:
        'https://library.buplant.da.gov.ph/images/1581572310CASHEW.pdf'
    },

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

    plantingMethods: [
      {
        value: 'direct-seeded',
        label: 'Direct Seeded'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Watermelon Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Watermelon%20Production%20Guide.pdf'
    },

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

    plantingMethods: [
      {
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - MIMAROPA Regional Field Office',

      office:
        'Regional Agricultural and Fisheries Information Section',

      title:
        'Honeydew Melon Production',

      url:
        'https://mimaropa.da.gov.ph/media-resources/publication/high-value-crop'
    },

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
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office II',

      title:
        'Onion Production Guide',

      url:
        'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/onion_production_guide.pdf'
  },

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

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Bureau of Plant Industry',

      title:
        'Garlic Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1640921673Garlic%20Production%20Guide.pdf'
    },

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
        'DA-CAR Technoguide in Production and Management of Organic Highland Vegetables',

      url:
        'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-PRODUCTION-_-MANAGEMENT-OF-ORGANIC-HIGHLAND-VEGETABLES.pdf'
  },

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
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Central Visayas',

      title:
        'Cabbage Production Guide',

      url:
        'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Cabbage%20Production%20Guide.pdf'
    },

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
        'Broccoli Production Guide',

      url:
        'https://library.buplant.da.gov.ph/images/1641969015BROCCOLI%20.pdf'
    },

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

    plantingMethods: [
      {
        value: 'direct-seeded',
        label: 'Direct Seeded'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Regional Field Office No. 02',

      office:
        'High Value Crops Development Program',

      title:
        'Carrot Production Guide',

      url:
        'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/Carrot-Prod-Guide.pdf'
    },

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

    plantingMethods: [
      {
        value: 'direct-seeded',
        label: 'Direct Seeded'
      },
      {
        value: 'transplanted-seedlings',
        label: 'Transplanted Seedlings'
      }
    ],

    plantingMethodSource: {
      agency:
        'Department of Agriculture - Agricultural Training Institute',

      office:
        'ATI Cordillera Administrative Region',

      title:
        'Squash Production (For Urban and Home Gardening)',

      url:
        'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/squash_production_guide_leaflet.pdf'
    },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - High Value Crops Development Program',

        title:
          'DA-CAR Technoguide in Production and Management of Organic Highland Vegetables',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-PRODUCTION-_-MANAGEMENT-OF-ORGANIC-HIGHLAND-VEGETABLES.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Gabay sa Produksyon ng Pipino',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-12/GABAY%20SA%20PRODUKSYON%20NG%20PIPINO.pdf'
      },

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
          'Bell Pepper Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641950133BELL%20PEPPER%20.pdf'
      },

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

      plantingMethods: [
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          'Hot Pepper (Sili) Production for Urban and Backyard Gardening',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/hot_pepper_flyer_for_urban_and_backyard_gardening.pdf'
      },

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
          'Cauliflower Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1638348280Cauliflower%20Production%20Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Patola Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/Patola%20Production%20Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Gabay sa Produksyon ng Upo',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2024-06/Upo%20IEC.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        },
        {
          value: 'vine-cuttings',
          label: 'Vine Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          'Upland Kangkong Production for Urban and Home Gardening',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/urban_agriculture_for_upland.pdf'
      },

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

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Alugbati Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/alugbati_prod.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Regional Training Center 02',

        title:
          'Gabay sa Pagtatanim ng Mustasa',

        url:
          'https://ati2.da.gov.ph/ati-2/content/sites/default/files/2024-03/Gabay%20sa%20Pagtatanim%20ng%20Mustasa.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida - IFAS Extension',

        title:
          'Winged Bean',

        url:
          'https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/winged-bean/'
      },

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

      plantingMethods: [
        {
          value: 'mature-sprouted-fruit',
          label: 'Mature / Sprouted Fruit'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Chayote Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641945410CHAYOTE.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'All About Mungbean (Balatong)',

        url:
          'https://library.buplant.da.gov.ph/images/1659331948Mungbean%20%28Balatong%29.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Regional Training Center 02',

        title:
          'Peanut Production and Processing Technologies',

        url:
          'https://ati2.da.gov.ph/ati-2/content/sites/default/files/2025-10/IEC%20Peanut.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded (Hill / Drill)'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas',

        title:
          'Soybean Production - How to Grow Soybean',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/2026-02/SOYBEAN%20PRODUCTION-1_compressed.pdf'
      },

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

      plantingMethods: [
        {
          value: 'branch-cuttings',
          label: 'Branch Cuttings'
        },
        {
          value: 'seed-grown',
          label: 'Seed-Grown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Malunggay Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1640928442Malunggay%20Production%20Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Central Visayas - Regional Training Center 7',

        title:
          'Produksiyon sa Kamoteng Kahoy (Cassava)',

        url:
          'https://ati2.da.gov.ph/ati-7/content/sites/default/files/users/user16/kamoteng%20kahoy%20production.pdf'
      },

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

      plantingMethods: [
        {
          value: 'setts',
          label: 'Setts (Sucker / Rhizome)'
        },
        {
          value: 'cormels',
          label: 'Cormels'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Gabi Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1640920555Gabi%20Production%20Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'tuber-setts',
          label: 'Tuber Setts'
        },
        {
          value: 'whole-small-tubers',
          label: 'Whole Small Tubers'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Ube Production Guide',

        url:
          'https://library.buplant.da.gov.ph/images/1641957628UBE.pdf'
      },

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

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'marcotting',
          label: 'Marcotting'
        },
        {
          value: 'seed-propagated',
          label: 'Seed-Propagated'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Black Pepper Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-12/black_pepper.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Cagayan Valley Regional Field Office',

        office:
          'High Value Crops Development Program',

        title:
          'Snap Beans Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/Snap-Beans-Production-Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'cleft-grafted-plants',
          label: 'Cleft-Grafted Plants'
        },
        {
          value: 'veneer-grafted-plants',
          label: 'Veneer-Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida - IFAS Extension',

        title:
          'Tropical and Subtropical Fruit Propagation',

        url:
          'https://ask.ifas.ufl.edu/publication/HS1349'
      },

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

      plantingMethods: [
        {
          value: 'seed-tubers',
          label: 'Seed Tubers'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Regional Field Office No. 02',

        office:
          'High Value Crops Development Program',

        title:
          'White Potato Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/potato.pdf'
      },

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

      plantingMethods: [
        { 
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Cooperative Extension',

        title:
          'Jicama',

        url:
          'https://ucanr.edu/node/130932/printable/print'
      },

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

      plantingMethods: [
        {
          value: 'rhizome-pieces',
          label: 'Rhizome Pieces'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Regional Field Office - Cordillera Administrative Region',

        title:
          'Technoguide in Production & Management of Ginger',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-PRODUCTION-_-MANAGEMENT-OF-GINGER.pdf'
      },

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

      plantingMethods: [
        {
          value: 'rhizome-divisions',
          label: 'Rhizome Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      },

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

      plantingMethods: [
        {
          value: 'suckers',
          label: 'Suckers'
        },
        {
          value: 'rhizome-rootstock',
          label: 'Rhizome / Rootstock'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - MIMAROPA Region',

        office:
          'Regional Agriculture and Fisheries Information Section (RAFIS)',

        title:
          'Arrowroot Production',

        url:
         'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Arrowroot-Production.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }   
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Benincasa hispida - Wax Gourd',

        url:
          'https://edepot.wur.nl/326103'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded (Drill / Broadcast)'
        }
      ],

      plantingMethodSource: {
        agency:
         'Department of Agriculture - Agricultural Training Institute',

        office:
          'Cordillera Administrative Region',

        title:
          'Corn-Vegetable Farming System',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/corn-vegetable_integrated_farm_system.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded (Drill / Broadcast)'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'Cordillera Administrative Region',

        title:
          'Corn-Vegetable Farming System',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/corn-vegetable_integrated_farm_system.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Starting Plants From Seed for the Home Gardener',

        url:
          'https://extension.uga.edu/publications/detail.html?number=B1432'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],
 
      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Production Guide of Saluyot',

        url:
          'https://library.buplant.da.gov.ph/images/1641949446Saluyot%20Production%20Guide.pdf'
      },

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

      harvestNote:
        'For transplanted Saluyot, first harvest may begin about 30 days after transplanting. Subsequent harvests may be done at intervals of about 1–2 weeks.',

      source: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'Production Guide of Saluyot',

        url:
          'https://library.buplant.da.gov.ph/images/1641949446Saluyot%20Production%20Guide.pdf'
      }

    },

    {
      name: 'Amaranth',
      localName: 'Kulitis',
      scientificName:
        'Amaranthus spp. (including A. tricolor L. and A. viridis L.)',
      category: 'vegetable',
      icon: 'assets/crops/amaranth.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Plant Industry',

        title:
          'The Kulitis Plant',

        url:
          'https://iveg.pcaarrd.dost.gov.ph/resource/journal/BPIKulitis'
      },

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

      plantingMethods: [
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Regional Field Office No. 02',

        office:
          'High Value Crops Development Program',

        title:
          'Celery Production Guide',

        url:
          'https://cagayanvalley.da.gov.ph/wp-content/uploads/2018/02/celery.pdf'
      },

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

      plantingMethods: [
        {
          value: 'bare-root-crowns',
          label: 'Bare-Root Crowns'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Maryland Extension',

        title:
          'When to Plant Vegetables',

        url:
          'https://www.extension.umd.edu/resource/when-plant-vegetables'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Kale in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/kale-in-the-garden'
      },

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

      plantingMethods: [
        {
          value: 'clump-divisions',
          label: 'Clump Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Basil in Home Gardens',

        url:
          'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/yard-and-garden-problems/growing-basil'
      },

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

      plantingMethods: [
        {
          value: 'rooted-offshoots',
          label: 'Rooted Offshoots'
        },
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida - IFAS Extension',

        title:
          'Normal Agricultural Practices in Florida for Dove Hunting',

        url:
          'https://edis.ifas.ufl.edu/publication/AG493'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Regional Field Office CALABARZON',

        office:
          'Regional Agriculture and Fisheries Information Section',

        title:
          'Gabay sa Produksyon ng Sorghum',

        url:
          'https://calabarzon.da.gov.ph/wp-content/uploads/2025/01/SORGHUM-Brochure-Template-1.pdf'
      },

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

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded (Per Hill)'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI MIMAROPA',

        title:
          'Gabay sa Produksyon ng Adlay',

        url:
          'https://ati2.da.gov.ph/ati-4b/content/sites/default/files/2022-11/Gabay%20sa%20Produksyon%20ng%20Adlay.pdf'
      },

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

      plantingMethods: [
        {
          value: 'canepoints',
          label: 'Canepoints (Vegetative Planting Material)'
        }
      ],

      plantingMethodSource: {
        agency:
          'Sugar Regulatory Administration',

        office:
          'Research, Development and Extension',

        title:
          'Yield Performance of Phil 2009-0919 at Different Furrow Distance and Planting Density',

        url:
          'https://www.sra.gov.ph/view_file/researches/gy3yaTT7QnXQjhq'
      },

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

      plantingMethods: [
        {
          value: 'seedpieces-corms',
          label: 'Seedpieces / Corms'
        },
        {
          value: 'suckers',
          label: 'Suckers'
        },
        {
          value: 'tissue-cultured-plantlets',
          label: 'Tissue-Cultured Plantlets'
        },
        {
          value: 'seed-propagated',
          label: 'Seed-Propagated'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Philippine Fiber Industry Development Authority',

        office:
          'PhilFIDA',

        title:
          'Abaca Technoguide - 2024 Edition',

        url:
          'https://philfida.da.gov.ph/images/Publications/Technoguides/abaca-technoguide-2024.pdf'
      },

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

      plantingMethods: [
        {
          value: 'budded-polybag-seedlings',
          label: 'Budded Polybag Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'High Value Crops Development Program',

        title:
          'Rubber Production Guide',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/Rubber-Production-Guide.pdf'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'inarched-plants',
          label: 'Inarched Plants'
        },
        {
          value: 'cleft-grafted-plants',
          label: 'Cleft-Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Regional Field Office 5',

        office:
          'Bicol Region',

        title:
          "Exploring the Potential of Bicol's Pili Nut as an Export Product",

        url:
          'https://bicol.da.gov.ph/exploring-the-potential-of-bicols-pili-nut-as-an-export-product/'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        },
        {
          value: 'cleft-grafted-plants',
          label: 'Cleft-Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida - IFAS Extension',

        title:
          'Passion Fruit Propagation: A Comprehensive Guide',

        url:
          'https://ask.ifas.ufl.edu/publication/HS1491'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'marcotted-plants',
          label: 'Marcotted Plants'
        }
        ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'Weedibles and Weedicinals Plus Edible Flowers and More',

        url:
         'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      },

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
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/WEEDIBLES%20AND%20WEEDICINALS%20Plus%20Edible%20Flowers%20and%20More.pdf'
      }
    },

    {
      name: 'Santol',
      scientificName: 'Sandoricum koetjape (Burm.f.) Merr.',
      category: 'fruit',
      icon: 'assets/crops/santol.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'asexually-propagated-plants',
          label: 'Asexually Propagated Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      },

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

      plantingMethods: [
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        },
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Hawaiʻi at Mānoa - CTAHR',

        title:
          'Fruit, Nut, and Beverage Crops',

        url:
          'https://www.ctahr.hawaii.edu/oc/freepubs/pdf/F_N-49.pdf'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'cleft-grafted-plants',
          label: 'Cleft-Grafted Plants'
        },
        {
          value: 'marcotted-plants',
          label: 'Marcotted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Syzygium cumini - Jambolan / Java Plum',

        url:
          'https://plantuse.plantnet.org/en/Syzygium_cumini_%28PROSEA%29'
      },

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

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Science and Technology - Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development',

        office:
          'DOST-PCAARRD',

        title:
          'Tamarind Production and Fruit Quality Improved through S&T-Based Strategies',

        url:
          'https://www.pcaarrd.dost.gov.ph/index.php/quick-information-dispatch-qid-articles/tamarind-production-and-fruit-quality-improved-through-s-t-based-strategies'
       },

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

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'marcotted-plants',
          label: 'Marcotted Plants'
        },
        {
          value: 'tissue-cultured-plantlets',
          label: 'Tissue-Cultured Plantlets'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Bureau of Agricultural Research',

        office:
          'DA-BAR',

        title:
          'Massive Opportunities with RIMAS',

        url:
          'https://www.bar.gov.ph/file?filename=digest%2Fpdf%2Fvol.+25+issue+no.+4+2023.pdf'
      },

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

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Artocarpus odoratissimus - Marang',

        url:
          'https://prosea.prota4u.org/view.aspx?id=1478'
      },

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

      plantingMethods: [
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI CALABARZON',

        title:
          'SaRiLing ATIn',

        url:
          'https://ati2.da.gov.ph/ati-4a/content/sites/default/files/2022-09/SaRiLing%20ATIn.pdf'
      },

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

      plantingMethods: [
        {
          value: 'runner-plants',
          label: 'Runner Plants'
        },
        {
          value: 'suckers',
          label: 'Suckers'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          'Strawberry Production Guide',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2022-12/strawberry_production.pdf'
      },

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

      plantingMethods: [
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Regional Field Office - Cordillera Administrative Region',

        title:
          'Technoguide in Citrus Production',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-CITRUS-PRODUCTION.pdf'
      },

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

      plantingMethods: [
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Regional Field Office - Cordillera Administrative Region',

        title:
          'Technoguide in Citrus Production',

        url:
          'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-CITRUS-PRODUCTION.pdf'
      },

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

      plantingMethods: [
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        },
        {
          value: 'grafted-vines',
          label: 'Grafted Vines'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Wine Grape Production',

        url:
          'https://extension.psu.edu/wine-grape-production'
       },

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
         'https://km4aanr.pcaarrd.dost.gov.ph/search?query=The+Philippines+recommends+for+grapes&search=The+Philippines+recommends+for+grapes'
      }
    },

    {
      name: 'Star Apple',
      localName: 'Caimito',
      scientificName: 'Chrysophyllum cainito',
      category: 'fruit',
      icon: 'assets/crops/star-apple.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'asexually-propagated-plants',
          label: 'Asexually Propagated Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture - Agricultural Training Institute',

        office:
          'ATI Cordillera Administrative Region',

        title:
          '10 Steps to Small Agrofruit Livelihood Technology (SALT-4)',

        url:
          'https://ati2.da.gov.ph/ati-car/content/sites/default/files/2023-01/salt_4_brochure.pdf'
      },

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

    {
      name: 'Wheat',
      localName: 'Trigo',
      scientificName: 'Triticum aestivum L.',
      category: 'grain',
      icon: 'assets/crops/wheat.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'International Maize and Wheat Improvement Center',

        office:
          'CIMMYT',

        title:
          'Direct Seeding with Two-Wheel Tractors Increases Wheat Yield and Saves Time in the Ethiopian Highlands',

        url:
          'https://www.cimmyt.org/news/direct-seeding-with-two-wheel-tractors-increases-wheat-yield-and-saves-time-in-the-ethiopian-highlands/'
      },

      minTemp: 5,
      maxTemp: 27,

      idealTempRange:
        '15–23°C',

      rainfallRange:
        'Optimal annual rainfall is about 750–900 mm; the FAO ECOCROP absolute range is about 300–1600 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.5–8.5.',

      soilNote:
        'Wheat performs best in well-drained soils. FAO ECOCROP lists medium-textured and organic soils within its optimal soil characteristics.',

      plantingNote:
        'Wheat is established from seed. Direct seeding can reduce land-preparation requirements and allow timely crop establishment under suitable production systems.',

      harvestNote:
        'Wheat maturity varies strongly by cultivar and season. FAO ECOCROP reports about 90–130 days for spring wheat and about 180–250 days for autumn-sown or winter wheat, so field maturity and the selected variety should guide harvest timing.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Triticum aestivum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2114'
      }
    },

    {
      name: 'Barley',
      scientificName: 'Hordeum vulgare L.',
      category: 'grain',
      icon: 'assets/crops/barley.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Republic of South Africa',

        title:
          'Barley Production Guideline',

        url:
          'https://www.nda.gov.za/phocadownloadpap/Brochures_and_Production_Guidelines/Brochure%20Barley.pdf'
      },

      minTemp: 2,
      maxTemp: 40,

      idealTempRange:
        '15–20°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–1000 mm; the FAO ECOCROP absolute range is about 200–2000 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 6.0–8.0.',

      soilNote:
        'Barley performs best in well-drained soils. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Barley is propagated through seed. Use healthy seed and establish the crop in a suitable, well-prepared field according to local production recommendations.',

      harvestNote:
        'Barley harvest timing depends on the production type. FAO ECOCROP reports about 90–120 days for spring varieties and about 180–240 days for winter varieties, so the variety and actual crop maturity should determine harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Hordeum vulgare — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1232'
      }
    },

   {
      name: 'Oats',
      scientificName: 'Avena sativa L.',
      category: 'grain',
      icon: 'assets/crops/oats.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Organic Oat Production',

        url:
          'https://extension.umn.edu/agriculture/crop-production/small-grains/organic-oat-production'
      },

      minTemp: 5,
      maxTemp: 30,

      idealTempRange:
        '16–20°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 250–1500 mm.',

      soilPH:
        'Optimal pH 5.0–6.0; absolute range 4.5–7.5.',

      soilNote:
        'FAO ECOCROP lists heavy, medium, and light soil textures within the suitable range for oats, with well-drained soil conditions preferred.',

      plantingNote:
        'Oats are established from seed. Use healthy seed of an appropriate variety and follow locally suitable seeding dates and rates for crop establishment.',

      harvestNote:
        'Oat maturity varies by cultivar. FAO ECOCROP reports about 110–160 days for spring cultivars and about 210–270 days for winter cultivars, so harvest should follow the selected variety and actual grain maturity.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Avena sativa — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=481'
      }
    },

    {
      name: 'Pearl Millet',
      scientificName: 'Pennisetum glaucum (L.) R. Br.',
      category: 'grain',
      icon: 'assets/crops/pearl-millet.svg',

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

      plantingMethodSource: {
        agency:
          'International Crops Research Institute for the Semi-Arid Tropics',

        office:
          'ICRISAT',

        title:
          'Pearl Millet Crop Management and Seed Production Manual',

        url:
          'https://oar.icrisat.org/4060/'
      },

      minTemp: 12,
      maxTemp: 40,

      idealTempRange:
        '25–35°C',

      rainfallRange:
        'Optimal annual rainfall is about 400–900 mm; the FAO ECOCROP absolute range is about 200–1700 mm.',

      soilPH:
        'Optimal pH 5.0–6.5; absolute range 4.5–8.3.',

      soilNote:
        'Pearl millet is suited to well-drained medium- and light-textured soils and can tolerate relatively low soil fertility under suitable growing conditions.',

      plantingNote:
        'Foxtail millet may be established by line sowing or broadcasting. ICAR-IIMR guidance prefers line sowing because it can make intercultural weed management easier.',

      harvestNote:
        'Foxtail millet may mature in about 60–70 days or about 90–120 days depending on variety and growing conditions. Use actual crop maturity rather than this broad range as the final harvest decision.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pennisetum glaucum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8418'
      }
    },

    {
      name: 'Foxtail Millet',
      scientificName: 'Setaria italica (L.) Beauv.',
      category: 'grain',
      icon: 'assets/crops/foxtail-millet.svg',

      plantingMethods: [
        {
          value: 'line-sown',
          label: 'Line Sown'
        },
        {
          value: 'broadcast-seeded',
          label: 'Broadcast Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Indian Council of Agricultural Research',

        office:
          'ICAR - Indian Institute of Millets Research',

        title:
          'Good Agricultural Practices (GAP) Manual for Sustainable Millets Production',

        url:
          'https://www.millets.res.in/pub/2026/GAP-English.pdf'
      },

      minTemp: 5,
      maxTemp: 35,

      idealTempRange:
        '16–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–700 mm; the FAO ECOCROP absolute range is about 300–4000 mm.',

      soilPH:
        'Optimal pH 6.0–6.8; absolute range 5.5–8.3.',

      soilNote:
        'FAO ECOCROP lists medium- and light-textured soils as optimal for foxtail millet and identifies well-drained conditions as suitable.',

      plantingNote:
        'Foxtail millet may be established by line sowing or broadcasting. ICAR-IIMR guidance prefers line sowing because it can make intercultural weed management easier.',

      harvestNote:
        'Foxtail millet is a fast-growing annual that may mature in about 60–70 days or about 90–120 days depending on the variety and growing conditions. Use actual crop maturity as the final harvest guide.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Setaria italica — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=9732'
      }
    },

    {
      name: 'Chickpea',
      localName: 'Garbanzos',
      scientificName: 'Cicer arietinum L.',
      category: 'legume',
      icon: 'assets/crops/chickpea.svg',

      plantingMethods: [
        {
          value: 'line-sown',
          label: 'Line Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'International Crops Research Institute for the Semi-Arid Tropics',

        office:
          'ICRISAT',

        title:
          'Chickpea Seed Production Manual',

        url:
          'https://oar.icrisat.org/10276/'
      },

      minTemp: 7,
      maxTemp: 35,

      idealTempRange:
        '15–29°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 300–1800 mm.',

      soilPH:
        'Optimal pH 6.0–8.5; absolute range 4.7–9.5.',

      soilNote:
        'Chickpea performs best in well-drained soils. FAO ECOCROP lists heavy- and medium-textured soils within its optimal range.',

      plantingNote:
        'Chickpea is established from seed. ICRISAT guidance for seed production recommends line sowing and placing seed deeply enough to maintain good contact with moist soil.',

      harvestNote:
        'Harvest chickpea when about 90% of the stems and pods have lost their green color and turned light golden yellow. Additional maturity signs include senescing or shedding leaves, yellow pods, dry plants, and hard seeds that rattle inside the pods.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cicer arietinum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2479'
      }
    },

    {
      name: 'Lentil',
      scientificName: 'Lens culinaris Medik.',
      category: 'legume',
      icon: 'assets/crops/lentil.svg',

      plantingMethods: [
        {
          value: 'drill-seeded',
          label: 'Drill Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'North Dakota State University Extension',

        office:
          'NDSU Extension',

        title:
          'Pulse Crop Production Field Guide for North Dakota — Lentil Production',

        url:
          'https://www.ndsu.edu/agriculture/sites/default/files/2025-09/a1922.pdf'
      },

      minTemp: 5,
      maxTemp: 32,

      idealTempRange:
        '15–29°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 250–2500 mm.',

      soilPH:
        'Optimal pH 5.5–7.5; absolute range 4.5–8.2.',

      soilNote:
        'Lentil performs best in well-drained soils. FAO ECOCROP lists heavy- and medium-textured soils within its optimal range.',

      plantingNote:
        'Lentil is established from seed. NDSU Extension notes that lentils may be seeded with grain drills in relatively narrow rows, with seed typically placed about 1–1.5 inches deep.',

      harvestNote:
        'Lentil maturity varies by cultivar and planting season. FAO ECOCROP reports about 70–120 days for early cultivars, 120–130 days for late cultivars, and about 180–240 days for some autumn-sown crops. Use actual crop maturity to guide harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Lens culinaris — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=7209'
      }
    },

    {
      name: 'Black Gram',
      scientificName: 'Vigna mungo (L.) Hepper',
      category: 'legume',
      icon: 'assets/crops/black-gram.svg',

      plantingMethods: [
        {
          value: 'dibbled-seed',
          label: 'Dibbled Seed'
        },
        {
          value: 'broadcast-seeded',
          label: 'Broadcast Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'TNAU Agritech Portal',

        title:
          'Crop Production — Pulses — Blackgram',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/agriculture/pulses_blackgram.html'
          ].join('')
      },

      minTemp: 8,
      maxTemp: 40,

      idealTempRange:
        '22–35°C',

      rainfallRange:
        'Optimal annual rainfall is about 650–900 mm; the FAO ECOCROP absolute range is about 530–2430 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–7.5.',

      soilNote:
        'FAO ECOCROP lists heavy- and medium-textured soils as suitable for black gram and identifies well-drained conditions as appropriate.',

      plantingNote:
        'Black gram is established from seed. TNAU guidance uses dibbling for irrigated and rainfed crops, while broadcasting is used in some rice-fallow and relay-cropping systems.',

      harvestNote:
        'Harvest when about 80% of the pods have matured or when the crop reaches physiological maturity, indicated by grain color changing from green to black, yellowing leaves, and leaf shedding.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna mungo — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2149'
          ].join('')
      }
    },

    {
      name: 'Green Pea',
      scientificName: 'Pisum sativum L.',
      category: 'legume',
      icon: 'assets/crops/green-pea.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Peas in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/vegetables/growing-peas'
          ].join('')
      },

      minTemp: 4,
      maxTemp: 30,

      idealTempRange:
        '10–24°C',

      rainfallRange:
        'Optimal annual rainfall is about 800–1200 mm; the FAO ECOCROP absolute range is about 350–2500 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.5–8.3.',

      soilNote:
        'FAO ECOCROP lists heavy-, medium-, and light-textured soils as suitable for peas and identifies well-drained conditions as appropriate.',

      plantingNote:
        'Green peas are established directly from seed. Seeds may be placed evenly in shallow trenches or suitable prepared seedbeds and covered with soil.',

      harvestNote:
        'Fresh green peas commonly reach harvest about 60–70 days after planting, depending on the variety or type grown.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pisum sativum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1721'
          ].join('')
      }
    },

    {
      name: 'Beetroot',
      scientificName: 'Beta vulgaris L. var. crassa',
      category: 'root-crop',
      icon: 'assets/crops/beetroot.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Starting Your Summer Vegetable Garden — Seeds or Transplants?',

        url:
          'https://extension.psu.edu/starting-your-summer-vegetable-garden-seeds-or-transplants'
      },

      minTemp: 5,
      maxTemp: 30,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 800–1500 mm; the FAO ECOCROP absolute range is about 500–2500 mm.',

      soilPH:
        'Optimal pH 6.0–6.8; absolute range 5.0–8.3.',

      soilNote:
        'Beetroot performs best in well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal, while heavy soils are also within its broader tolerance range.',

      plantingNote:
        'Beetroot is best established by direct seeding because transplanting root vegetables can cause misshapen roots. Sow seed into loose, prepared soil to support proper root development.',

      harvestNote:
        'Beet roots may be harvested once the roots begin to size. Utah State University Extension notes that roots are generally mature about 60–80 days after seeding, depending on variety.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Beta vulgaris var. crassa — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=3712'
      }
    },

    {
      name: 'Turnip',
      scientificName: 'Brassica rapa L. var. rapifera',
      category: 'root-crop',
      icon: 'assets/crops/turnip.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Rutabagas and Turnips in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/rutabagas-and-turnips-in-the-garden'
      },

      minTemp: 7,
      maxTemp: 30,

      idealTempRange:
        '10–17°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1400 mm; the FAO ECOCROP absolute range is about 300–2000 mm.',

      soilPH:
        'Optimal pH 6.0–6.8; absolute range 4.3–7.5.',

      soilNote:
        'Turnip performs best in fertile, deep, well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal and heavy soils within its broader tolerance range.',

      plantingNote:
        'Turnips are established directly from seed. Utah State University Extension recommends planting seed shallowly and thinning seedlings after establishment to provide adequate root spacing.',

      harvestNote:
        'Turnip roots generally mature about 60–80 days after seeding. Begin harvesting when roots reach the desired size; Utah State University Extension suggests starting when turnip roots are greater than about 2 inches in diameter.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Brassica rapa var. rapifera — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=3881'
      }
    },

    {
      name: 'Leek',
      scientificName: 'Allium ampeloprasum L. var. porrum',
      category: 'vegetable',
      icon: 'assets/crops/leek.svg',

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

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        office:
          'UF/IFAS',

        title:
          'Leek Cultivation Guide for Florida',

        url:
          'https://ask.ifas.ufl.edu/publication/HS1388'
      },

      minTemp: 6,
      maxTemp: 27,

      idealTempRange:
        '18–24°C',

      rainfallRange:
        'Optimal annual rainfall is about 750–1000 mm; the FAO ECOCROP absolute range is about 350–2800 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 4.5–7.5.',

      soilNote:
        'Leek performs best in fertile, moist, well-drained soil. FAO ECOCROP lists medium-textured and organic soils as optimal, with heavy, medium, and light soils within its broader tolerance range.',

      plantingNote:
        'Leek may be established by direct seeding or transplanting. UF/IFAS notes that transplanting is commonly used because leek is a relatively long-season crop.',

      harvestNote:
        'Leeks may be harvested young, but full-sized crops commonly require around 100–130 days depending on planting system, cultivar, and growing conditions. A stalk about 1 inch in diameter is a useful field maturity indicator.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Allium ampeloprasum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=363'
      }
    },

    {
      name: 'Swiss Chard',
      scientificName: 'Beta vulgaris L. var. cicla',
      category: 'vegetable',
      icon: 'assets/crops/swiss-chard.svg',

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

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Swiss Chard in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/swiss-chard-in-the-garden'
      },

      minTemp: 5,
      maxTemp: 35,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 800 mm; the FAO ECOCROP absolute range is about 500–1000 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 5.5–8.3.',

      soilNote:
        'Swiss chard performs best in well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Swiss chard may be established by direct seeding or transplanting. Utah State University Extension notes that transplants can provide an earlier harvest, while seeded crops may be planted earlier in suitable cool conditions.',

      harvestNote:
        'Swiss chard is harvested for its leaves. FAO ECOCROP notes that first harvest commonly begins around 50–60 days, while actual timing varies with cultivar and growing conditions. Harvest usable outer leaves while allowing younger inner leaves to continue growing.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Beta vulgaris var. cicla — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2474'
      }
    },

    {
      name: 'Watercress',
      scientificName: 'Nasturtium officinale R. Br.',
      category: 'vegetable',
      icon: 'assets/crops/watercress.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Watercress in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/watercress-in-the-garden'
      },

      idealTempRange:
        'Watercress favors cool, continuously moist growing conditions; seeds may germinate well around 10–15°C.',

      soilPH:
        'Preferred pH is about 6.5–7.5.',

      soilNote:
        'Watercress requires continuously wet or saturated growing conditions. It performs well in organically rich media and can be grown along clean shallow water, saturated beds, or suitable containers kept consistently wet.',

      plantingNote:
        'Watercress may be established from seed, rooted stem cuttings, or transplants. Seeds should be kept continuously moist during germination, while stem cuttings readily root under wet conditions.',

      harvestNote:
        'Harvest young leaves and tender stems before flowering for best quality. University of Florida IFAS notes that plants may be ready for an initial harvest about three weeks after seedlings appear. Cut the tops while leaving enough plant growth for regrowth and later harvests.',

      source: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Watercress in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/watercress-in-the-garden'
      }
    },

    {
      name: 'Artichoke',
      scientificName: 'Cynara scolymus L.',
      category: 'vegetable',
      icon: 'assets/crops/artichoke.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        },
        {
          value: 'rooted-shoots',
          label: 'Rooted Shoots'
        },
        {
          value: 'crown-divisions',
          label: 'Crown Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Statewide Integrated Pest Management Program',

        office:
          'UC IPM',

        title:
          'Cultural Tips for Growing Artichoke',

        url:
          [
            'https://',
            'ipm.ucanr.edu/home-and-landscape/cultural-tips-for-growing-artichoke/'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 30,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1200 mm; the FAO ECOCROP absolute range is about 300–1500 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 5.5–8.3.',

      soilNote:
        'Artichoke performs best in fertile, well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Artichoke may be established from transplants, rooted shoots, crown divisions, or seed. UC IPM notes that direct seeding and transplanting are both used when artichoke is grown as an annual crop.',

      harvestNote:
        'Harvest artichoke flower buds when they have reached full size but before the bracts begin to spread open. Buds left too long become woody and less desirable. Annual transplanted artichokes may require about 4–6 months to reach maturity, while perennial plantings follow a longer production cycle, so visible bud maturity should take priority over a fixed calendar date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cynara scolymus — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=847'
          ].join('')
      }
    },

    {
      name: 'Coriander',
      localName: 'Wansoy',
      scientificName: 'Coriandrum sativum L.',
      category: 'herb',
      icon: 'assets/crops/coriander.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Maryland Extension',

        title:
          'Care of Herbs and Starting Herbs from Seed',

        url:
          'https://extension.umd.edu/resource/care-herbs-and-starting-herbs-seed'
      },

      minTemp: 4,
      maxTemp: 32,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–1400 mm; the FAO ECOCROP absolute range is about 300–2600 mm.',

      soilPH:
        'Optimal pH 5.5–7.5; absolute range 4.0–8.0.',

      soilNote:
        'Coriander performs best in well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Coriander is best established by direct seeding. University of Maryland Extension recommends sowing coriander or cilantro directly in the garden because the crop does not transplant especially well.',

      harvestNote:
        'For fresh cilantro leaves, harvest when plants are about 4–6 inches tall. For coriander seed, allow plants to flower and form seed, then harvest when the plants and seed heads begin turning brown. FAO ECOCROP notes that leaves may be harvested around 35 days from sowing, while mature seed commonly requires about 80–140 days.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Coriandrum sativum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=784'
      }
    },

    {
      name: 'Parsley',
      scientificName:
        'Petroselinum crispum (Mill.) Nym. ex A.W. Hill',
      category: 'herb',
      icon: 'assets/crops/parsley.svg',

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

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Parsley',

        url:
          'https://extension.illinois.edu/herbs/parsley'
      },

      minTemp: 7,
      maxTemp: 28,

      idealTempRange:
        '11–20°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1500 mm; the FAO ECOCROP absolute range is about 300–2800 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 5.3–8.3.',

      soilNote:
        'Parsley prefers moderately rich, moist, well-drained soil. FAO ECOCROP lists medium-textured and organic soils as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Parsley may be established by direct seeding or transplanting. Direct-seeded parsley can germinate slowly, while transplanted seedlings should be handled carefully to avoid damaging the taproot.',

      harvestNote:
        'Harvest parsley once the plant is large enough to provide usable foliage. Cut mature outer stems near the base while leaving younger inner growth to continue developing. FAO ECOCROP notes that transplanted parsley may begin leaf harvest about 70–100 days after transplanting.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Petroselinum crispum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1661'
      }
    },

    {
      name: 'Mint',
      localName: 'Peppermint',
      scientificName: 'Mentha piperita L.',
      category: 'herb',
      icon: 'assets/crops/mint.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'rootstock-divisions',
          label: 'Rootstock Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Mint in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/Mint-in-the-garden'
      },

      minTemp: 4,
      maxTemp: 35,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 1000–2200 mm; the FAO ECOCROP absolute range is about 700–4000 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–8.3.',

      soilNote:
        'Peppermint prefers moist, fertile soil. FAO ECOCROP lists medium-textured and organic soils as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Mint may be established from seed, transplants, stem cuttings, or divisions. Utah State University Extension notes that seed-grown mint may not remain true to type because mints readily hybridize, so established plants, cuttings, or divisions are preferred when preserving a specific cultivar.',

      harvestNote:
        'Fresh mint leaves and tender stems may be harvested throughout the growing season once plants are about 3–4 inches tall. For best flavor, harvest young growth and cut plants before flowering when possible. Established plants can provide repeated harvests during the season.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Mentha piperita — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2099'
      }
    },

    {
      name: 'Oregano',
      scientificName: 'Origanum vulgare L.',
      category: 'herb',
      icon: 'assets/crops/oregano.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Herb Garden Plants: Oregano',

        url:
          'https://extension.psu.edu/herb-garden-plants-oregano'
      },

      minTemp: 4,
      maxTemp: 32,

      idealTempRange:
        '17–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1300 mm; the FAO ECOCROP absolute range is about 400–2700 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.5–8.7.',

      soilNote:
        'Oregano prefers well-drained soil and bright growing conditions. FAO ECOCROP lists light-textured soil as optimal and medium- to light-textured soils within its broader tolerance range.',

      plantingNote:
        'Oregano may be established from seed, transplants, stem cuttings, or root divisions. Penn State Extension notes that seed may be sown directly outdoors or started under lights for transplanting, while cuttings and root division are also suitable propagation methods.',

      harvestNote:
        'Harvest oregano stems before the plant reaches full flower for good culinary quality. Illinois Extension recommends removing stem tips while leaving about 4–6 pairs of leaves so the plant can produce side shoots and support repeated harvests.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Origanum vulgare — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2369'
      }
    },

    {
      name: 'Rosemary',
      scientificName: 'Rosmarinus officinalis L.',
      category: 'herb',
      icon: 'assets/crops/rosemary.svg',

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'layering',
          label: 'Layering'
        },
        {
          value: 'divisions',
          label: 'Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Herb Garden Plants: Rosemary',

        url:
          [
            'https://',
            'extension.psu.edu/herb-garden-plants-rosemary'
          ].join('')
      },

      soilPH:
        'Recommended soil pH is about 6.5–7.0.',

      soilNote:
        'Rosemary performs best in well-drained soil and should not remain in persistently wet or poorly drained conditions. Once established, it is relatively drought tolerant.',

      plantingNote:
        'Rosemary may be propagated using stem cuttings, layering, or division. Penn State Extension lists these vegetative methods for establishing rosemary plants.',

      harvestNote:
        'Fresh rosemary leaves and tender shoots may be harvested as needed during the growing season. For drying, harvest foliage before flowering. Avoid removing too much growth at once so the perennial plant can continue producing healthy new shoots.',

      source: {
        agency:
          'Penn State Extension',

        title:
          'Herb Garden Plants: Rosemary',

        url:
          [
            'https://',
            'extension.psu.edu/herb-garden-plants-rosemary'
          ].join('')
      }
    },

    {
      name: 'Thyme',
      scientificName: 'Thymus vulgaris L.',
      category: 'herb',
      icon: 'assets/crops/thyme.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Herb Garden Plants: Thyme',

        url:
          'https://extension.psu.edu/herb-garden-plants-thyme'
      },

      soilNote:
        'Thyme performs best in a sunny location with well-drained soil. Poor drainage can shorten the useful life of this perennial herb.',

      plantingNote:
        'Thyme may be propagated from seed, stem cuttings, or root divisions. Penn State Extension recommends division of established plants in spring and cuttings from new growth in late spring.',

      harvestNote:
        'Harvest leafy thyme branches just before the plant flowers for good culinary quality. Stems may also be cut throughout the growing season as needed, while leaving enough healthy growth for the perennial plant to continue developing.',

      source: {
        agency:
          'Penn State Extension',

        title:
          'Herb Garden Plants: Thyme',

        url:
          'https://extension.psu.edu/herb-garden-plants-thyme'
      }
    },

    {
      name: 'Fennel',
      scientificName: 'Foeniculum vulgare Mill.',
      category: 'vegetable',
      icon: 'assets/crops/fennel.svg',

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

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Fennel in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/fennel-in-the-garden'
      },

      minTemp: 6,
      maxTemp: 32,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1500 mm; the FAO ECOCROP absolute range is about 300–2600 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 4.8–8.2.',

      soilNote:
        'Fennel performs best in fertile, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils are within its broader tolerance range.',

      plantingNote:
        'Fennel may be established by direct seeding or by starting seedlings indoors and transplanting them. Utah State University Extension notes that direct seeding is generally preferred for Florence fennel because root disturbance and transplant shock may encourage bolting.',

      harvestNote:
        'Fennel harvest depends on the intended product. Leaves may be harvested while plants are growing; common fennel seed is harvested after seed heads turn brown and dry; Florence fennel is harvested when its swollen base is firm and still less than about 4 inches across. FAO ECOCROP also reports first leaf harvest around 30–40 days after transplanting, first seed harvest around 55–70 days, and first swollen stem-base harvest around 90–110 days.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Foeniculum vulgare — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1107'
      }
    },

    {
      name: 'Katuray',
      scientificName: 'Sesbania grandiflora (L.) Poir.',
      category: 'tree-crop',
      icon: 'assets/crops/katuray.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'DOST-PCAARRD',

        office:
          'Documentation of Indigenous Vegetables',

        title:
          'Katuray — Sesbania grandiflora',

        url:
          'https://iveg.pcaarrd.dost.gov.ph/crop/sesbania-grandiflora'
      },

      minTemp: 16,
      maxTemp: 40,

      idealTempRange:
        '24–34°C',

      rainfallRange:
        'Optimal annual rainfall is about 1000–3000 mm; the FAO ECOCROP absolute range is about 800–4500 mm.',

      soilPH:
        'Optimal pH 5.5–7.5; absolute range 4.5–8.5.',

      soilNote:
        'Katuray can grow in heavy, medium, or light-textured soils. FAO ECOCROP lists moderate soil fertility as optimal and shows tolerance of a broad range of soil-drainage conditions.',

      plantingNote:
        'Katuray may be established by direct seeding, nursery-raised seedlings that are later transplanted, or stem cuttings. DOST-PCAARRD documents all of these establishment methods for Sesbania grandiflora.',

      harvestNote:
        'Katuray is grown for several edible parts, especially its fresh flowers, young leaves, and tender pods. Harvest timing therefore depends on the intended product. FAO ECOCROP reports that the tree can produce ripe pods about 270 days after planting, but this ripe-pod timing should not be treated as a universal harvest date for edible flowers, leaves, or tender pods.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Sesbania grandiflora — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1938'
      }
    },

   {
      name: 'Kamias',
      scientificName: 'Averrhoa bilimbi L.',
      category: 'fruit',
      icon: 'assets/crops/kamias.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'TNAU Agritech Portal',

        title:
          'Crop Production Guide — Bilimbi',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/pdf/HORTICULTURE.pdf'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 36,

      idealTempRange:
        '23–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 1200–2300 mm; the FAO ECOCROP absolute range is about 700–4000 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–8.3.',

      soilNote:
        'Kamias performs best in deep, fertile soil with good drainage. FAO ECOCROP lists heavy, medium, light, and organic soils within its optimal soil-texture range and identifies well-drained conditions as suitable.',

      plantingNote:
        'Kamias may be established using seed-grown seedlings or air-layered planting material. Tamil Nadu Agricultural University lists seedlings and air layers as Bilimbi propagation methods.',

      harvestNote:
        'Kamias is a perennial fruit tree. FAO ECOCROP reports that fruit development takes about 90–110 days. Clonally propagated trees may begin bearing in about 2–3 years, while seed-grown trees may require about 5–6 years. Flowering and fruit production can continue through much of the year, so actual fruit maturity and intended use should guide harvest rather than a single planting-date estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Averrhoa bilimbi — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=482'
          ].join('')
      }
    },

    {
      name: 'Buckwheat',
      scientificName: 'Fagopyrum esculentum Moench',
      category: 'grain',
      icon: 'assets/crops/buckwheat.svg',

      plantingMethods: [
        {
          value: 'drill-seeded',
          label: 'Drill Seeded'
        },
        {
          value: 'broadcast-seeded',
          label: 'Broadcast Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Missouri Extension',

        title:
          'Growing Buckwheat for Grain or Cover Crop Use',

        url:
          'https://extension.missouri.edu/publications/g4163'
      },

      minTemp: 7,
      maxTemp: 40,

      idealTempRange:
        '17–27°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1000 mm; the FAO ECOCROP absolute range is about 400–1300 mm.',

      soilPH:
        'Optimal pH 5.0–6.5; absolute range 4.4–7.5.',

      soilNote:
        'Buckwheat performs best in well-drained medium- to light-textured soils. FAO ECOCROP lists moderate soil fertility as optimal, and buckwheat generally performs poorly in heavy, wet soils.',

      plantingNote:
        'Buckwheat may be planted in narrow rows with a grain drill or established by broadcasting seed and incorporating it into the soil. University of Missouri Extension notes that drilling generally uses less seed and produces a more uniform stand than broadcasting.',

      harvestNote:
        'Common buckwheat is a short-season crop. FAO ECOCROP reports a crop cycle of about 55–85 days, while University of Maine Extension notes that buckwheat commonly takes about 12 weeks to mature. For grain harvest, begin when roughly three-quarters of the seeds are brown and hard, before substantial seed shattering occurs.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Fagopyrum esculentum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2285'
      }
    },

    {
      name: 'Dill',
      scientificName: 'Anethum graveolens L.',
      category: 'herb',
      icon: 'assets/crops/dill.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Dill in Home Gardens',

        url:
          'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/growing-dill'
      },

      minTemp: 6,
      maxTemp: 26,

      idealTempRange:
        '15–18°C',

      rainfallRange:
        'Optimal annual rainfall is about 800–1200 mm; the FAO ECOCROP absolute range is about 500–1700 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.0–8.0.',

      soilNote:
        'Dill performs best in well-drained soil. FAO ECOCROP lists medium-textured soil and high fertility as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Dill is best established by direct seeding because its taproot makes transplanting difficult. Sow seed where the plants will grow and thin seedlings after emergence to provide adequate spacing.',

      harvestNote:
        'For fresh dill foliage, harvest leaves and tender stems during vegetative growth and before or as flowering begins. Utah State University Extension reports that foliage harvest generally begins about 6–8 weeks after sowing. For seed harvest, wait until flower heads turn brown and mature seeds separate readily.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Anethum graveolens — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2192'
      }
    },

    {
      name: 'Chives',
      scientificName: 'Allium schoenoprasum L.',
      category: 'herb',
      icon: 'assets/crops/chives.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted'
        },
        {
          value: 'divisions',
          label: 'Plant Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow Chives in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/chives-in-the-garden'
      },

      minTemp: 2,
      maxTemp: 35,

      idealTempRange:
        '10–20°C',

      rainfallRange:
        'Optimal annual rainfall is about 450–1600 mm; the FAO ECOCROP absolute range is about 300–2800 mm.',

      soilPH:
        'Optimal pH 6.0–6.6; absolute range 5.0–8.2.',

      soilNote:
        'Chives prefer fertile, moist, well-drained soil. FAO ECOCROP lists medium-textured and organic soils as optimal, while heavy, medium, and light soils fall within the broader tolerance range.',

      plantingNote:
        'Chives may be established from seed, transplants, or divisions of established clumps. Utah State University Extension notes that divisions are an easy way to propagate existing plants and that established beds benefit from periodic division.',

      harvestNote:
        'Harvest chive leaves by cutting them back to about 1–2 inches above the soil. Utah State University Extension reports that the first harvest may begin as early as about 60 days after seeding or 30 days after transplanting. During the first year, plants may be harvested several times; established plants can be cut repeatedly as they regrow.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Allium schoenoprasum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=810'
      }
    },

    {
      name: 'Sage',
      scientificName: 'Salvia officinalis L.',
      category: 'herb',
      icon: 'assets/crops/sage.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Sage',

        url:
          'https://extension.illinois.edu/herbs/sage'
      },

      minTemp: 5,
      maxTemp: 30,

      idealTempRange:
        '15–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–1000 mm; the FAO ECOCROP absolute range is about 300–1500 mm.',

      soilPH:
        'Optimal pH 5.0–6.5; absolute range 4.2–8.3.',

      soilNote:
        'Sage performs best in well-drained soil and bright growing conditions. FAO ECOCROP lists medium-textured soil as optimal and well-drained to relatively dry soil conditions as suitable.',

      plantingNote:
        'Common sage may be propagated from seed or stem cuttings. University of Illinois Extension notes that cuttings are often preferred because seed-grown plants may take longer to develop into strongly harvestable plants.',

      harvestNote:
        'Sage leaves may be harvested as needed once the plant has enough healthy foliage. Harvest lightly during the first year so the perennial plant can establish well. FAO ECOCROP notes that sage may receive its first harvest during the fall of the first year and may provide about two to three harvests from an established plant.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Salvia officinalis — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2412'
      }
    },

    {
      name: 'Lavender',
      scientificName: 'Lavandula angustifolia Mill.',
      category: 'herb',
      icon: 'assets/crops/lavender.svg',

      plantingMethods: [
        {
          value: 'seed-started-transplants',
          label: 'Seed-Started Transplants'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        office:
          'USU Extension',

        title:
          'How to Grow English Lavender in Your Garden',

        url:
          'https://extension.usu.edu/yardandgarden/research/english-lavender-in-the-garden'
      },

      minTemp: 7,
      maxTemp: 28,

      idealTempRange:
        '15–24°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–1000 mm; the FAO ECOCROP absolute range is about 300–1300 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 5.8–8.3.',

      soilNote:
        'English lavender performs best in dry, well-drained medium- to light-textured soil. Saturated or waterlogged conditions should be avoided.',

      plantingNote:
        'Lavender may be raised from seed and later transplanted, or propagated from stem cuttings. Utah State University Extension notes that most commercial lavender is started from cuttings because seed propagation is slow and direct seeding is not recommended.',

      harvestNote:
        'Harvest English lavender flower stalks as flowering begins. For dried flowers, Utah State University Extension recommends cutting when the first two flowers on the spike have opened. First-year plants are commonly allowed to establish rather than being heavily harvested, while FAO ECOCROP notes that commercial first harvest may occur after several years of establishment.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Lavandula angustifolia — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=7172'
      }
    },

    {
      name: 'Lychee',
      scientificName: 'Litchi chinensis Sonn.',
      category: 'fruit',
      icon: 'assets/crops/lychee.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'marcotted-plants',
          label: 'Marcotted / Air-Layered Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        title:
          'Lychee Production in the Philippines',

        url:
          'https://www.fao.org/4/ac684e/ac684e0b.htm'
      },

      minTemp: 15,
      maxTemp: 40,

      idealTempRange:
        '20–35°C',

      rainfallRange:
        'Optimal annual rainfall is about 1000–1700 mm; the FAO ECOCROP absolute range is about 700–2800 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–8.5.',

      soilNote:
        'Lychee performs best in deep soil. FAO ECOCROP lists medium-textured and organic soils as optimal and identifies well-drained conditions with periodic dry spells as suitable for production.',

      plantingNote:
        'Lychee may be raised from seed, but seedlings take much longer to bear and do not reliably reproduce the parent variety. For named fruiting varieties, Philippine production commonly uses marcotting or air-layering and grafting.',

      harvestNote:
        'Lychee is a perennial fruit tree. FAO ECOCROP reports about 98–106 days from bloom to harvest. Fruit should be harvested at full maturity; red skin color together with appropriate fruit size is a useful maturity indicator, and lychee does not continue ripening after harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Litchi chinensis — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1357'
      }
    },

    {
      name: 'Longan',
      scientificName: 'Dimocarpus longan Lour.',
      category: 'fruit',
      icon: 'assets/crops/longan.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered / Marcotted Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Longan Growing in the Florida Home Landscape',

        url:
          'https://edis.ifas.ufl.edu/publication/MG049'
      },

      minTemp: 7,
      maxTemp: 36,

      idealTempRange:
        '18–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 1300–2000 mm; the FAO ECOCROP absolute range is about 800–3000 mm.',

      soilPH:
        'Optimal pH 5.5–6.0; absolute range 5.0–8.0.',

      soilNote:
        'Longan performs well in deep, well-drained soils. FAO ECOCROP lists medium- and light-textured soils as optimal, while UF/IFAS notes that longan does not tolerate prolonged flooding or excessively wet soil.',

      plantingNote:
        'Longan may be propagated from seed, air-layering or marcotting, grafting, and rooted cuttings. Air-layering is a common vegetative propagation method. Seed-grown trees may take substantially longer to bear and do not reliably reproduce the parent cultivar.',

      harvestNote:
        'Longan is a perennial fruit tree. UF/IFAS reports about 140–190 days from flowering to harvest. Fruit should be harvested ripe because longan is non-climacteric; mature fruit typically develops tan, light-brown, or yellowish-brown skin and sweet flesh.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Dimocarpus longan var. longan — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=5349'
      }
    },

    {
      name: 'Mulberry',
      scientificName: 'Morus alba L.',
      category: 'fruit',
      icon: 'assets/crops/mulberry.svg',

      plantingMethods: [
        {
          value: 'hardwood-cuttings',
          label: 'Hardwood Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Minor Fruits and Nuts in Georgia',

        url:
          'https://extension.uga.edu/publications/detail.html?number=b992'
      },

      minTemp: 13,
      maxTemp: 45,

      idealTempRange:
        '20–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–2500 mm; the FAO ECOCROP absolute range is about 300–5100 mm.',

      soilPH:
        'Optimal pH 5.5–7.5; absolute range 4.3–8.3.',

      soilNote:
        'White mulberry performs best in deep, fertile, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Mulberry may be propagated using hardwood cuttings. University of Georgia Cooperative Extension describes mulberries as easily propagated from hardwood cuttings taken during the dormant season.',

      harvestNote:
        'Mulberry is a perennial fruit tree that may begin bearing within the first or second year under suitable conditions. Fruit color varies strongly by cultivar and may mature white, pinkish, red, purple, or nearly black, so harvest should be based on full cultivar-specific ripeness rather than a universal fruit color or fixed planting-date estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Morus alba — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1491'
      }
    },

    {
      name: 'Fig',
      scientificName: 'Ficus carica L.',
      category: 'fruit',
      icon: 'assets/crops/fig.svg',

      plantingMethods: [
        {
          value: 'hardwood-cuttings',
          label: 'Hardwood Cuttings'
        },
        {
          value: 'rooted-side-shoots',
          label: 'Rooted Side Shoots'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Home Garden Figs',

        url:
          'https://extension.uga.edu/publications/detail.html?number=C945'
      },

      minTemp: 4,
      maxTemp: 38,

      idealTempRange:
        '16–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1500 mm; the FAO ECOCROP absolute range is about 300–2700 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 4.3–8.6.',

      soilNote:
        'Common fig performs best in deep, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Common fig may be propagated using hardwood stem cuttings, rooted side shoots, or air layering. University of Georgia Cooperative Extension describes stem cuttings as the simplest and easiest propagation method.',

      harvestNote:
        'Common fig is a perennial fruit crop. FAO ECOCROP reports a fruiting cycle of about 120–150 days, but this should not be treated as a universal days-after-planting estimate. Harvest fruit when it has reached cultivar-appropriate color, becomes soft, begins to droop on its stem, and separates easily from the branch. Milky latex from the fruit stem can indicate that the fig is not yet fully ripe.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Ficus carica — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1071'
      }
    },

    {
      name: 'Pomegranate',
      scientificName: 'Punica granatum L.',
      category: 'fruit',
      icon: 'assets/crops/pomegranate.svg',

      plantingMethods: [
        {
          value: 'hardwood-cuttings',
          label: 'Hardwood Cuttings'
        },
        {
          value: 'softwood-cuttings',
          label: 'Softwood Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Pomegranate Production',

        url:
          'https://extension.uga.edu/publications/detail.html?number=C997'
      },

      minTemp: 8,
      maxTemp: 40,

      idealTempRange:
        '23–32°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1200 mm; the FAO ECOCROP absolute range is about 400–4200 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 5.8–8.5.',

      soilNote:
        'Pomegranate performs best in deep soil with good drainage. FAO ECOCROP lists heavy- and medium-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Pomegranate may be propagated using hardwood or softwood cuttings. University of Georgia Cooperative Extension identifies hardwood cuttings as the preferred propagation method, while softwood cuttings may also be used.',

      harvestNote:
        'Pomegranate is a perennial fruit crop. Fruit generally ripens about five to seven months after flowering, depending on cultivar and growing conditions. Because flowering may occur in several flushes, harvest should also use actual maturity indicators such as cultivar-appropriate rind color, sugar and acid development, and the characteristic metallic sound of mature fruit when tapped. Pomegranates should be harvested ripe because they do not continue ripening after harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Punica granatum — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1829'
      }
    },

    {
      name: 'Persimmon',
      scientificName: 'Diospyros kaki L.f.',
      category: 'fruit',
      icon: 'assets/crops/persimmon.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'chip-budded-plants',
          label: 'Chip-Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Japanese Persimmon Cultural Practices in Florida',

        url:
          'https://edis.ifas.ufl.edu/publication/HS1389'
      },

      minTemp: 8,
      maxTemp: 35,

      idealTempRange:
        '20–31°C',

      rainfallRange:
        'Optimal annual rainfall is about 1000–1700 mm; the FAO ECOCROP absolute range is about 300–3000 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–8.3.',

      soilNote:
        'Persimmon performs best in deep, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Japanese persimmon cultivars are commonly propagated on rootstocks by grafting or budding. University of Florida IFAS Extension identifies whip grafting and chip budding as the two common methods and notes that propagation from cuttings generally has a low success rate.',

      harvestNote:
        'Persimmon is a perennial fruit tree. FAO ECOCROP reports that fruit matures about seven months after bloom and that trees may begin fruiting about four years after planting. Harvest maturity is cultivar-dependent: most cultivars develop their characteristic yellow-orange to orange-red peel color as they mature, while astringent types generally require further softening before eating.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Diospyros kaki — ECOCROP Data Sheet',

        url:
          'https://ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=945'
      }
    },

    {
      name: 'Peach',
      scientificName: 'Prunus persica (L.) Batsch',
      category: 'fruit',
      icon: 'assets/crops/peach.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Propagating Deciduous Fruit Plants Common to Georgia',

        url:
          [
            'https://',
            'extension.uga.edu/publications/detail.html?number=B818'
          ].join('')
      },

      minTemp: 7,
      maxTemp: 35,

      idealTempRange:
        '20–33°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1100 mm; the FAO ECOCROP absolute range is about 750–1600 mm.',

      soilPH:
        'Optimal pH 5.5–6.3; absolute range 4.5–7.5.',

      soilNote:
        'Peach performs best in deep, well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal and heavy, medium, and light soils within its broader tolerance range.',

      plantingNote:
        'Named peach cultivars are normally propagated vegetatively on suitable rootstocks. Grafting and budding preserve the desired cultivar while allowing the grower to use rootstocks selected for local soil and pest conditions.',

      harvestNote:
        'Peach is a perennial deciduous fruit tree and harvest timing varies substantially among cultivars. Penn State Extension recommends judging harvest primarily from fruit firmness and cultivar-appropriate color. A tree normally requires several pickings because all peaches do not mature at the same time.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Prunus persica — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1796'
          ].join('')
      }
    },

    {
      name: 'Plum',
      scientificName: 'Prunus domestica',
      category: 'fruit',
      icon: 'assets/crops/plum.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Propagating Deciduous Fruit Plants Common to Georgia',

        url:
          [
            'https://',
            'extension.uga.edu/publications/detail.html?number=B818'
          ].join('')
      },

      minTemp: 6,
      maxTemp: 36,

      idealTempRange:
        '18–33°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1500 mm; the FAO ECOCROP absolute range is about 600–1800 mm.',

      soilPH:
        'Optimal pH 5.5–6.1; absolute range 4.5–7.4.',

      soilNote:
        'Plum performs best in deep, well-drained soil. FAO ECOCROP lists heavy- and medium-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Named plum cultivars are commonly propagated vegetatively on suitable rootstocks. University of Georgia Cooperative Extension identifies T-budding and whip grafting as common propagation methods for plums.',

      harvestNote:
        'Plum is a perennial deciduous fruit tree and harvest timing depends on the cultivar. Fruit should be judged by actual maturity rather than a fixed number of days: ripe plums soften and develop their cultivar-appropriate blue, purple, red, or yellow coloration. Trees may require more than one picking because individual fruits do not necessarily ripen at the same time.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Prunus domestica — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=16203'
          ].join('')
      }
    },

    {
      name: 'Apricot',
      scientificName: 'Prunus armeniaca L.',
      category: 'fruit',
      icon: 'assets/crops/apricot.svg',

      plantingMethods: [
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Growing Fruit Plants from Seed',

        url:
          [
            'https://',
            'extension.psu.edu/growing-fruit-plants-from-seed'
          ].join('')
      },

      minTemp: 7,
      maxTemp: 40,

      idealTempRange:
        '14–35°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1300 mm; the FAO ECOCROP absolute range is about 800–1470 mm.',

      soilPH:
        'Optimal pH 6.5–7.0; absolute range 5.0–8.0.',

      soilNote:
        'Apricot performs best in deep, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Named apricot cultivars are normally propagated vegetatively rather than relied upon to come true from seed. Penn State Extension notes that apricot seedlings may be used as rootstocks and budded during their first summer.',

      harvestNote:
        'Apricot is a perennial deciduous fruit tree and harvest timing varies by cultivar and growing conditions. Fruit should be harvested using actual maturity indicators: ripe apricots begin to soften and their skin changes from green toward yellow, orange, red, or combinations of these colors depending on the cultivar.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Prunus armeniaca — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2398'
          ].join('')
      }
    },

    {
      name: 'Sweet Cherry',
      scientificName: 'Prunus avium L.',
      category: 'fruit',
      icon: 'assets/crops/sweet-cherry.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Oregon State University Extension Service',

        title:
          'Sweet Cherry Rootstocks for the Pacific Northwest',

        url:
          [
            'https://',
            'extension.oregonstate.edu/sites/extd8/files/catalog/auto/PNW619.pdf'
          ].join('')
      },

      minTemp: 6,
      maxTemp: 40,

      idealTempRange:
        '18–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–900 mm; the FAO ECOCROP absolute range is about 300–1500 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–7.0.',

      soilNote:
        'Sweet cherry performs best in deep, well-drained soil. FAO ECOCROP lists heavy- and medium-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Commercial sweet cherry cultivars are propagated vegetatively on suitable rootstocks. Oregon State University Extension states that commercial sweet cherry trees are either budded or grafted, with the cultivar forming the scion above the graft or bud union.',

      harvestNote:
        'Sweet cherry is a perennial deciduous fruit tree and harvest timing varies among cultivars, locations, and seasons. Fruit maturity should therefore be judged using cultivar-appropriate characteristics rather than a fixed number of days. Oregon State University Extension identifies skin color as an important ripeness indicator and recommends also considering fruit firmness and soluble solids when determining harvest maturity.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Prunus avium — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8965'
          ].join('')
      }
    },

    {
      name: 'Sour Cherry',
      scientificName: 'Prunus cerasus L.',
      category: 'fruit',
      icon: 'assets/crops/sour-cherry.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Cherries in the Garden and the Kitchen',

        url:
          [
            'https://',
            'extension.psu.edu/cherries-in-the-garden-and-the-kitchen'
          ].join('')
      },

      minTemp: 4,
      maxTemp: 30,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'Optimal annual rainfall is about 800–1600 mm; the FAO ECOCROP absolute range is about 500–2700 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 4.5–7.5.',

      soilNote:
        'Sour cherry performs best in deep, well-drained soil. FAO ECOCROP lists medium-textured soil as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Named sour cherry cultivars are commonly supplied as grafted trees on selected rootstocks. Penn State Extension notes that cherry cultivars are grafted onto rootstocks that influence characteristics such as mature tree size.',

      harvestNote:
        'Sour cherry is a perennial deciduous fruit tree and harvest timing varies with cultivar, location, and season. Fruit should be harvested according to actual maturity rather than a fixed number of days. Mature cherries should show good, uniform cultivar-appropriate color while remaining firm and sound.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Prunus cerasus — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8970'
          ].join('')
      }
    },

    {
      name: 'Quince',
      scientificName: 'Cydonia oblonga Mill.',
      category: 'fruit',
      icon: 'assets/crops/quince.svg',

      plantingMethods: [
        {
          value: 'hardwood-cuttings',
          label: 'Hardwood Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        title:
          'Quince Propagation',

        url:
          [
            'https://',
            'ucanr.edu/sites/btfnp/fruitnutproduction/Quince/Quince_Propagation/'
          ].join('')
      },

      minTemp: 7,
      maxTemp: 35,

      idealTempRange:
        '10–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–900 mm; the FAO ECOCROP absolute range is about 500–1100 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 5.5–7.0.',

      soilNote:
        'Quince performs best in deep, well-drained soil. FAO ECOCROP lists heavy- and medium-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Quince can be propagated readily from hardwood cuttings. University of California Agriculture and Natural Resources describes hardwood cuttings from one-year-old wood as a common propagation method and notes that quince roots readily by this method.',

      harvestNote:
        'Quince is a perennial fruit tree and harvest timing should be based on actual fruit maturity rather than a fixed number of days after planting. UC Davis identifies the change in skin color from green to yellow as the primary maturity indicator and recommends harvesting fruit when it is full-yellow and still firm.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cydonia oblonga — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=5117'
          ].join('')
      }
    },

    {
      name: 'Indian Jujube',
      scientificName: 'Ziziphus mauritiana Lam.',
      category: 'fruit',
      icon: 'assets/crops/indian-jujube.svg',

      plantingMethods: [
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Fruits — Ber',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/horticulture/horti_fruits_ber.html'
          ].join('')
      },

      minTemp: 7,
      maxTemp: 50,

      idealTempRange:
        '25–42°C',

      rainfallRange:
        'Optimal annual rainfall is about 300–1500 mm; the FAO ECOCROP absolute range is about 130–4000 mm.',

      soilPH:
        'Optimal pH 5.5–7.5; absolute range 5.0–8.5.',

      soilNote:
        'Indian jujube performs optimally in medium- to light-textured soils with good drainage. FAO ECOCROP records a much broader soil-texture tolerance under less favorable conditions.',

      plantingNote:
        'Indian jujube cultivars may be established using budded planting material. Tamil Nadu Agricultural University specifically recommends budded plants for Ber cultivation.',

      harvestNote:
        'Indian jujube is a perennial fruit crop and maturity varies among cultivars. Fruit should therefore be judged using cultivar-appropriate maturity characteristics rather than a fixed number of days after planting. ICAR research reports substantial variation in mature fruit skin color, including yellow, light yellow, greenish-yellow, and brown shades among different Indian jujube genotypes.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Ziziphus mauritiana — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=17633'
          ].join('')
      }
    },

    {
      name: 'Loquat',
      scientificName: 'Eriobotrya japonica (Thunb.) Lindl.',
      category: 'fruit',
      icon: 'assets/crops/loquat.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Loquat Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/MG050'
          ].join('')
      },

      minTemp: 9,
      maxTemp: 36,

      idealTempRange:
        '21–27°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1600 mm; the FAO ECOCROP absolute range is about 400–4000 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–8.0.',

      soilNote:
        'Loquat performs best in deep, well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Named loquat cultivars are commonly propagated vegetatively to preserve desirable fruit characteristics. University of Florida IFAS Extension states that loquat may be grafted using cleft, veneer, or whip grafting and notes that trees are commonly grafted onto loquat seedlings.',

      harvestNote:
        'Loquat is a perennial fruit tree and harvest timing varies with cultivar and local conditions. Ripe fruit develops its cultivar-appropriate yellow to orange color and should be harvested when ripe because loquat fruit does not continue ripening after it is picked.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Eriobotrya japonica — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1002'
          ].join('')
      }
    },

    {
      name: 'Feijoa',
      scientificName: 'Acca sellowiana (O. Berg) Burret',
      category: 'fruit',
      icon: 'assets/crops/feijoa.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Pineapple Guava',

        url:
          [
            'https://',
            'gardeningsolutions.ifas.ufl.edu/plants/edibles/fruits/pineapple-guava/'
          ].join('')
      },

      minTemp: 12,
      maxTemp: 28,

      idealTempRange:
        '18–21°C',

      rainfallRange:
        'Optimal annual rainfall is about 750–1500 mm; the FAO ECOCROP absolute range is about 600–2000 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.5–8.0.',

      soilNote:
        'Feijoa performs best in well-drained, medium or organic soil. FAO ECOCROP records a broader tolerance that includes heavy, medium, light, and organic soil textures.',

      plantingNote:
        'Named feijoa cultivars are best established using vegetatively propagated planting material so desirable fruit characteristics are retained. University of Florida IFAS Extension recommends known grafted cultivars for fruit production rather than relying on seedlings.',

      harvestNote:
        'Feijoa is a perennial fruit crop and harvest timing varies with cultivar and growing conditions. Mature fruit changes from dark green toward lighter green, softens slightly, and separates more easily from the tree. Fruit should be harvested close to natural abscission rather than using a fixed number of days after planting.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Acca sellowiana — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2741'
          ].join('')
      }
    },

    {
      name: 'Ambarella',
      scientificName: 'Spondias dulcis Parkinson',
      category: 'fruit',
      icon: 'assets/crops/ambarella.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        title:
          'Compendium of Forgotten Foods in Africa',

        url:
          [
            'https://',
            'openknowledge.fao.org/3/cc5044en/cc5044en.pdf'
          ].join('')
      },

      minTemp: 12,
      maxTemp: 35,

      idealTempRange:
        '22–27°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1800 mm; the FAO ECOCROP absolute range is about 600–2200 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–8.0.',

      soilNote:
        'Ambarella performs best in deep, well-drained soil. FAO ECOCROP lists medium- and light-textured soils as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Ambarella may be propagated by seed or grafting. For FarmCast, grafted planting material is retained as the selectable vegetative method because FAO identifies grafting as a supported propagation method for the crop.',

      harvestNote:
        'Ambarella is a fast-growing perennial fruit tree. FAO ECOCROP reports that trees generally begin bearing about four to five years after planting and that fruit matures about six to eight months after flowering. Mature fruit should also be judged by actual size and cultivar-appropriate yellow to orange color rather than by a fixed number of days after planting.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Spondias cytherea (syn. Spondias dulcis) — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2000'
          ].join('')
      }
    },

    {
      name: 'Indian Gooseberry',
      scientificName: 'Phyllanthus emblica L.',
      category: 'fruit',
      icon: 'assets/crops/indian-gooseberry.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Fruits — Amla',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/horticulture/horti_fruits_amla.html'
          ].join('')
      },

      minTemp: 14,
      maxTemp: 35,

      idealTempRange:
        '20–29°C',

      rainfallRange:
        'Optimal annual rainfall is about 1500–2500 mm; the FAO ECOCROP absolute range is about 700–4200 mm.',

      soilPH:
        'Optimal pH 6.0–8.0; absolute range 5.0–8.5.',

      soilNote:
        'Indian gooseberry performs best in deep, well-drained medium-textured soil. FAO ECOCROP records heavy, medium, and light soils within its broader tolerance range.',

      plantingNote:
        'Indian gooseberry may be established using grafted or budded planting material. Tamil Nadu Agricultural University lists seedlings, grafts, and buddings as planting materials used for Amla cultivation.',

      harvestNote:
        'Indian gooseberry is a perennial fruit tree and should not use a fixed days-after-planting harvest estimate. ICAR research identifies physiological maturity through changes including increased fruit specific gravity, development of fiber on the seed cover, and seed-color change from creamy-white to brown. FAO ECOCROP also notes that the tree is slow-growing and normally begins bearing only after several years.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Emblica officinalis (syn. Phyllanthus emblica) — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8537'
          ].join('')
      }
    },

    {
      name: 'Canistel',
      scientificName: 'Pouteria campechiana (Kunth) Baehni',
      category: 'fruit',
      icon: 'assets/crops/canistel.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Canistel Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/HS299'
          ].join('')
      },

      minTemp: 16,
      maxTemp: 30,

      idealTempRange:
        '20–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 1200–2000 mm; the FAO ECOCROP absolute range is about 650–2700 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 5.5–8.0.',

      soilNote:
        'Canistel performs well in well-drained soils and FAO ECOCROP lists heavy, medium, and light soil textures within both its optimal and broader tolerance ranges.',

      plantingNote:
        'Superior canistel cultivars should be propagated vegetatively. University of Florida IFAS Extension identifies side-veneer or cleft grafting and patch budding onto seedling rootstocks as suitable propagation methods.',

      harvestNote:
        'Canistel is a perennial fruit tree. FAO ECOCROP reports first harvest about three to four years after planting and fruit ripening about five to six months after bloom. University of Florida IFAS Extension recommends harvesting when the fruit turns yellow-orange; ripe fruit becomes soft but should not be mushy.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pouteria campechiana — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2394'
          ].join('')
      }
    },

    {
      name: 'Black Sapote',
      scientificName: 'Diospyros nigra (J.F.Gmel.) Perr.',
      category: 'fruit',
      icon: 'assets/crops/black-sapote.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Black Sapote Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/HS305'
          ].join('')
      },

      minTemp: 12,
      maxTemp: 34,

      idealTempRange:
        '20–27°C',

      rainfallRange:
        'Optimal annual rainfall is about 1200–1600 mm; the FAO ECOCROP absolute range is about 1000–2400 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.5–7.5.',

      soilNote:
        'Black sapote performs best in deep, well-drained medium-textured soil. FAO ECOCROP records heavy, medium, and light soil textures within its broader tolerance range.',

      plantingNote:
        'Superior black sapote cultivars should be propagated vegetatively because seedlings do not reliably come true to type. University of Florida IFAS Extension identifies budding and grafting as suitable propagation methods for selected varieties.',

      harvestNote:
        'Black sapote is a perennial fruit tree and should not use a fixed days-after-planting harvest estimate. University of Florida IFAS Extension identifies maturity when the fruit changes from shiny green to dull green and the calyx lobes begin to reflex upward. Harvested mature fruit generally softens to eating quality after picking.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Diospyros digyna (syn. Diospyros nigra) — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2263'
          ].join('')
      }
    },

    {
      name: 'Mamey Sapote',
      scientificName: 'Pouteria sapota (Jacq.) H.E.Moore & Stearn',
      category: 'fruit',
      icon: 'assets/crops/mamey-sapote.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Mamey Sapote Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/MG331'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 36,

      idealTempRange:
        '24–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 2000–3300 mm; the FAO ECOCROP absolute range is about 800–4000 mm.',

      soilPH:
        'Optimal pH 6.0–6.5; absolute range 5.0–7.0.',

      soilNote:
        'Mamey sapote performs best in deep, well-drained heavy- to medium-textured soil. FAO ECOCROP lists heavy and medium soil textures as optimal, with heavy, medium, and light soils within its broader tolerance range.',

      plantingNote:
        'Mamey sapote cultivars are commonly propagated by grafting. University of Florida IFAS Extension identifies modified veneer grafting as a common propagation method and also describes cleft and other grafting techniques.',

      harvestNote:
        'Mamey sapote is a perennial fruit tree and should not use a fixed days-after-planting harvest estimate. University of Florida IFAS Extension reports that fruit may require about 13 to 24 months from flowering to maturity depending on cultivar. A common maturity test is to lightly scratch the outer skin; mature fruit shows pinkish-brown, orange, or red tissue beneath rather than green.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pouteria sapota — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8917'
          ].join('')
      }
    },

    {
      name: 'White Sapote',
      scientificName: 'Casimiroa edulis La Llave',
      category: 'fruit',
      icon: 'assets/crops/white-sapote.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'White Sapote Growing in the Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/HS304'
          ].join('')
      },

      minTemp: 14,
      maxTemp: 31,

      idealTempRange:
        '18–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 1500–3000 mm; the FAO ECOCROP absolute range is about 500–4000 mm.',

      soilPH:
        'Optimal pH 7.0–7.5; absolute range 6.5–8.0.',

      soilNote:
        'White sapote performs best in well-drained medium- to light-textured soil. FAO ECOCROP records heavy, medium, and light soil textures within its broader tolerance range.',

      plantingNote:
        'Named white sapote varieties should be propagated vegetatively because seedlings do not reliably come true to type. University of Florida IFAS Extension identifies grafting and budding onto seedling rootstocks as suitable propagation methods.',

      harvestNote:
        'White sapote is a perennial fruit tree and should not use a fixed days-after-planting harvest estimate. FAO ECOCROP reports that fruit ripens gradually about four to five months after pollination. University of Florida IFAS Extension recommends harvesting mature fruit several days before natural fruit drop and clipping it with a small piece of stem attached.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Casimiroa edulis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=633'
          ].join('')
      }
    },

    {
      name: 'Bambara Groundnut',
      scientificName: 'Vigna subterranea (L.) Verdc.',
      category: 'legume',
      icon: 'assets/crops/bambara-groundnut.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROTA / PlantUse',

        title:
          'Vigna subterranea — Propagation and Planting',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Vigna_subterranea_%28PROTA%29'
          ].join('')
      },

      minTemp: 16,
      maxTemp: 38,

      idealTempRange:
        '19–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 750–1400 mm; the FAO ECOCROP absolute range is about 300–3000 mm.',

      soilPH:
        'Optimal pH 5.0–6.5; absolute range 4.3–7.0.',

      soilNote:
        'Bambara groundnut performs best in light, well-drained soil. FAO ECOCROP lists light-textured soil as optimal while heavy, medium, light, and organic soils occur within its broader tolerance range.',

      plantingNote:
        'Bambara groundnut is propagated by seed and is established by sowing directly into the field. The crop needs a soil condition that allows its fertilized flower stalks to enter the ground, where the pods develop.',

      harvestNote:
        'Bambara groundnut is an annual crop. FAO ECOCROP reports that bunch types generally mature about 90–120 days after sowing, while spreading types generally mature about 120–180 days after sowing. Harvest timing should therefore account for growth type and actual pod maturity.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna subterranea — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=10830'
          ].join('')
      }
    },

    {
      name: 'Horse Gram',
      scientificName: 'Macrotyloma uniflorum (Lam.) Verdc.',
      category: 'legume',
      icon: 'assets/crops/horse-gram.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Crop Production — Pulses — Horsegram',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/agriculture/CropProduction/Pulses/pulses_horsegram.html'
          ].join('')
      },

      minTemp: 17,
      maxTemp: 35,

      idealTempRange:
        '20–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–1200 mm; the FAO ECOCROP absolute range is about 300–4300 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 5.0–8.0.',

      soilNote:
        'Horse gram performs best in well-drained medium- to light-textured soil. FAO ECOCROP lists medium and light soil textures as optimal, with heavy, medium, and light soils within its broader tolerance range.',

      plantingNote:
        'Horse gram is established directly from seed. Tamil Nadu Agricultural University recommends preparing the field to a fine tilth and dibbling the seed at the recommended field spacing.',

      harvestNote:
        'Horse gram grown for seed is harvested when the plants and pods are mature. FAO ECOCROP reports a seed-maturity period of about 120–180 days, while forage may be ready considerably earlier. FarmCast therefore uses the seed-maturity range for its crop harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Macrotyloma uniflorum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1399'
          ].join('')
      }
    },

    {
      name: 'Moth Bean',
      scientificName: 'Vigna aconitifolia (Jacq.) Maréchal',
      category: 'legume',
      icon: 'assets/crops/moth-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROTA / PlantUse',

        title:
          'Vigna aconitifolia — Propagation and Planting',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Vigna_aconitifolia_%28PROTA%29'
          ].join('')
      },

      minTemp: 13,
      maxTemp: 45,

      idealTempRange:
        '24–32°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–900 mm; the FAO ECOCROP absolute range is about 400–2500 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 5.0–8.0.',

      soilNote:
        'Moth bean performs best in light, well-drained soil and is particularly suited to dry sandy conditions. FAO ECOCROP lists light-textured soil as optimal, while heavy, medium, and light soils occur within its broader tolerance range.',

      plantingNote:
        'Moth bean is propagated directly from seed. PROTA recommends sowing seed into a well-prepared seedbed and describes both broadcast sowing and row planting as established field methods.',

      harvestNote:
        'Moth bean is an annual grain legume. FAO ECOCROP reports that mature seeds are generally reached about 60–90 days after planting. Actual pod maturity should still be checked before harvesting and threshing.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna aconitifolia — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2524'
          ].join('')
      }
    },

    {
      name: 'Adzuki Bean',
      scientificName: 'Vigna angularis (Willd.) Ohwi & H.Ohashi',
      category: 'legume',
      icon: 'assets/crops/adzuki-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Wisconsin-Madison Cooperative Extension',

        title:
          'Adzuki Bean',

        url:
          [
            'https://',
            'corn.agronomy.wisc.edu/Crops/AdzukiBean.aspx'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 36,

      idealTempRange:
        '15–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1300 mm; the FAO ECOCROP absolute range is about 530–1800 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–7.5.',

      soilNote:
        'Adzuki bean performs best in well-drained heavy- to medium-textured soil. FAO ECOCROP lists heavy and medium soil textures as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Adzuki bean is established directly from seed. University of Wisconsin-Madison Cooperative Extension provides field seeding recommendations including row planting, seeding rate, planting depth, and the need for good seed-to-soil contact.',

      harvestNote:
        'Adzuki bean is an annual grain legume. FAO ECOCROP reports that seed ripening may occur about 60–190 days after planting depending on type and growing conditions. University of Wisconsin-Madison reports that plants in its production region commonly mature about 110–120 days after planting, so actual pod maturity should still guide harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna angularis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2147'
          ].join('')
      }
    },

    {
      name: 'Rice Bean',
      scientificName: 'Vigna umbellata (Thunb.) Ohwi & H.Ohashi',
      category: 'legume',
      icon: 'assets/crops/rice-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROSEA / PROTA',

        title:
          'Vigna umbellata — Rice Bean',

        url:
          [
            'https://',
            'prosea.prota4u.org/view.aspx?id=3'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 40,

      idealTempRange:
        '18–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1500 mm; the FAO ECOCROP absolute range is about 300–2000 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 5.5–8.0.',

      soilNote:
        'Rice bean performs best in well-drained medium-textured soil. FAO ECOCROP lists medium soil as optimal, while heavy, medium, and light soils occur within its broader tolerance range.',

      plantingNote:
        'Rice bean is propagated directly by seed. PROSEA reports that seed may be broadcast after field preparation or planted in rows.',

      harvestNote:
        'Rice bean is generally grown as an annual grain legume. PROSEA reports crop maturity about 60–150 days after sowing depending on type and environment. In the Philippines, average maturity is reported at about 92 days.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vigna umbellata — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2152'
          ].join('')
      }
    },

    {
      name: 'Cluster Bean',
      scientificName: 'Cyamopsis tetragonoloba (L.) Taub.',
      category: 'legume',
      icon: 'assets/crops/cluster-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Vegetables — Clusterbeans',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/horticulture/horti_vegetables_clusterbeans.html'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 45,

      idealTempRange:
        '25–35°C',

      rainfallRange:
        'Optimal annual rainfall is about 500–800 mm; the FAO ECOCROP absolute range is about 400–2700 mm.',

      soilPH:
        'Optimal pH 7.5–8.0; absolute range 5.5–8.5.',

      soilNote:
        'Cluster bean performs best in well-drained medium- to light-textured soils. FAO ECOCROP lists medium and light soil textures as optimal and records tolerance of heavy, medium, and light soils under its broader range.',

      plantingNote:
        'Cluster bean is established directly from seed. Tamil Nadu Agricultural University recommends dibbling the seeds on the sides of prepared ridges at the specified field spacing.',

      harvestNote:
        'Cluster bean is an annual legume used for tender green pods as well as mature seed. FAO ECOCROP reports that green pods generally become harvestable about 50–90 days after sowing, while mature seeds generally ripen about 90–160 days after sowing. FarmCast uses the mature-seed range for the general legume harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cyamopsis tetragonoloba — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=830'
          ].join('')
      }
    },

    {
      name: 'Sword Bean',
      scientificName: 'Canavalia gladiata (Jacq.) DC.',
      category: 'legume',
      icon: 'assets/crops/sword-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROSEA / PROTA',

        title:
          'Canavalia gladiata — Sword Bean',

        url:
          [
            'https://',
            'prosea.prota4u.org/view.aspx?id=2156'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 38,

      idealTempRange:
        '15–30°C',

      rainfallRange:
        'Tamil Nadu Agricultural University reports an annual rainfall range of about 700–4200 mm for Sword Bean. PROSEA notes that the crop performs especially well with evenly distributed rainfall of about 900–1500 mm.',

      soilPH:
        'Reported suitable pH range is about 4.5–7.0.',

      soilNote:
        'Sword bean is tolerant of relatively poor tropical soils and acidic conditions. PROSEA notes that it can tolerate drought, temporary waterlogging, salinity, and some shade once established.',

      plantingNote:
        'Sword bean is propagated directly by seed. PROSEA recommends sowing seeds about 5–7.5 cm deep, commonly with plants spaced about 45–60 cm apart and rows about 75–90 cm apart.',

      harvestNote:
        'Sword bean may be harvested for tender green pods or mature seed. Tamil Nadu Agricultural University reports tender pods from about 75 days after sowing for the SBS 1 variety and overall maturity around 110–120 days for that variety. Research on seed development found physiological seed maturity about 80 days after anthesis, accompanied by pod color changing toward brown and mature seed color becoming dark red. Because these timings are variety- or stage-specific, FarmCast keeps Sword Bean as guidance-only rather than applying one generic automatic harvest date.',

      source: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Crop Production — Pulses — Sword Bean',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/agriculture/CropProduction/Pulses/pulses_swordbean.html'
          ].join('')
      }
    },

    {
      name: 'Jack Bean',
      scientificName: 'Canavalia ensiformis (L.) DC.',
      category: 'legume',
      icon: 'assets/crops/jack-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROSEA / PlantUse',

        title:
          'Canavalia ensiformis — Jack Bean',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Canavalia_ensiformis_%28PROSEA%29'
          ].join('')
      },

      minTemp: 14,
      maxTemp: 36,

      idealTempRange:
        '20–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 800–2000 mm; the FAO ECOCROP absolute range is about 600–4300 mm.',

      soilPH:
        'Optimal pH 5.0–6.0; absolute range 4.3–8.0.',

      soilNote:
        'Jack bean tolerates a broad range of tropical soils. FAO ECOCROP lists heavy, medium, light, and organic soil textures within its optimal range and records tolerance of both poorly drained and excessively drained conditions within the broader ecological range.',

      plantingNote:
        'Jack bean is propagated directly by seed. PROSEA describes shallow sowing at a range of field spacings and notes that sowing time may be adjusted according to rainfall conditions.',

      harvestNote:
        'Jack bean flowering may begin about 50–110 days after sowing depending on accession and growing conditions. PROSEA reports that the time from sowing to seed harvest is normally about 170 days, while FAO ECOCROP records a much broader overall crop-cycle range of about 80–300 days. Because maturity varies substantially with accession, environment, and intended use, FarmCast keeps Jack Bean as guidance-only instead of assigning one generic automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Canavalia ensiformis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=609'
          ].join('')
      }
    },

    {
      name: 'Tepary Bean',
      scientificName: 'Phaseolus acutifolius A.Gray',
      category: 'legume',
      icon: 'assets/crops/tepary-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'PROSEA / PROTA',

        title:
          'Phaseolus acutifolius — Tepary Bean',

        url:
          [
            'https://',
            'prosea.prota4u.org/view.aspx?id=3311'
          ].join('')
      },

      minTemp: 8,
      maxTemp: 38,

      idealTempRange:
        '20–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 300–1700 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.0–8.0.',

      soilNote:
        'Tepary bean performs best in well-drained medium- to light-textured soil. FAO ECOCROP lists medium and light soil textures as optimal and records heavy, medium, light, and organic soils within its broader tolerance range.',

      plantingNote:
        'Tepary bean is propagated directly by seed. PROSEA reports that seed may be broadcast, drilled in rows, or planted on mounds. The crop is drought tolerant but is sensitive to excessive moisture and waterlogging.',

      harvestNote:
        'Tepary bean is an annual grain legume. FAO ECOCROP reports that the first harvest may be taken about 60–120 days after sowing and lists a crop cycle of about 60–120 days. Mature dry pods should still be checked before final seed harvest.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Phaseolus acutifolius — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2516'
          ].join('')
      }
    },

    {
      name: 'Faba Bean',
      scientificName: 'Vicia faba L.',
      category: 'legume',
      icon: 'assets/crops/faba-bean.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'Legume Planting and Spacing',

        url:
          [
            'https://',
            'extension.usu.edu/vegetableguide/legumes/planting'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 32,

      idealTempRange:
        '18–28°C',

      rainfallRange:
        'Optimal annual rainfall is about 650–1000 mm; the FAO ECOCROP absolute range is about 250–2600 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 4.5–8.6.',

      soilNote:
        'Faba bean performs best in well-drained medium-textured or organic soils. FAO ECOCROP lists medium and organic soil textures as optimal while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Faba bean is established directly from seed. Utah State University Extension classifies broad bean among cool-season legumes and states that legume crops are direct-seeded.',

      harvestNote:
        'Faba bean is an annual grain legume. FAO ECOCROP reports overall maturity about 100–150 days after sowing, with immature pods around 100 days and mature beans generally around 120–150 days after sowing. FarmCast uses the mature-bean range for its automatic harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vicia faba — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2146'
          ].join('')
      }
    },

    {
      name: 'Safflower',
      scientificName: 'Carthamus tinctorius L.',
      category: 'oilseed',
      icon: 'assets/crops/safflower.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Crop Production — Oil Seeds — Safflower',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/agriculture/oilseeds_safflower.html'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 45,

      idealTempRange:
        '20–32°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 300–1400 mm.',

      soilPH:
        'Optimal pH 6.5–7.5; absolute range 5.0–8.0.',

      soilNote:
        'Safflower performs best in well-drained medium- to light-textured soils. FAO ECOCROP lists medium and light soil textures as optimal, while heavy, medium, and light soils fall within its broader tolerance range.',

      plantingNote:
        'Safflower is established directly from seed. Tamil Nadu Agricultural University recommends sowing seed in rows about 2–3 cm deep and covering it with soil.',

      harvestNote:
        'Safflower is an annual oilseed crop. FAO ECOCROP reports a broad crop cycle of about 120–245 days. Tamil Nadu Agricultural University reports durations of about 120 days for the K 1 variety and 125 days for CO 1, while recommending harvest when the leaves and entire plant lose their green color and turn brown. Because the narrower durations are variety-specific and the broader FAO value is a general crop-cycle range, FarmCast keeps Safflower as guidance-only instead of assigning one generic automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Carthamus tinctorius — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2514'
          ].join('')
      }
    },

    {
      name: 'Sunflower',
      scientificName: 'Helianthus annuus L.',
      category: 'oilseed',
      icon: 'assets/crops/sunflower.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Crop Production — Oil Seeds — Sunflower',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/agriculture/2/oilseeds_sunflower.html'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 45,

      idealTempRange:
        '17–34°C',

      rainfallRange:
        'Optimal annual rainfall is about 600–1000 mm; the FAO ECOCROP absolute range is about 300–1600 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 5.5–8.0.',

      soilNote:
        'Sunflower performs best in well-drained medium- to light-textured soils. FAO ECOCROP lists medium and light soils as optimal and records heavy, medium, and light textures within its broader tolerance range.',

      plantingNote:
        'Sunflower is established directly from seed. Tamil Nadu Agricultural University recommends placing seeds about 3 cm deep along prepared furrows, covering them with soil, and initially sowing two seeds per planting hole before thinning.',

      harvestNote:
        'Sunflower is an annual oilseed crop. FAO ECOCROP reports a broad crop cycle of about 70–200 days and notes that sunflower may commonly be harvested around 90–160 days depending on cultivar and environment. Tamil Nadu Agricultural University lists specific varieties and hybrids with durations around 80–95 days and recommends harvesting when the back bracts of the flower head turn lemon yellow and the head becomes firm. Because maturity varies considerably among cultivars, FarmCast keeps Sunflower as guidance-only rather than assigning one generic automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Helianthus annuus — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1191'
          ].join('')
      }
    },

    {
      name: 'Fenugreek',
      scientificName: 'Trigonella foenum-graecum L.',
      category: 'spice',
      icon: 'assets/crops/fenugreek.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Spice Crops — Fenugreek',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/horticulture/horti_spice%20crops_fenugreek.html'
          ].join('')
      },

      minTemp: 7.8,
      maxTemp: 34.5,

      idealTempRange:
        'Fenugreek seed germination has a reported base temperature of about 7.8°C, optimum near 18°C, and ceiling near 34.5°C. For field cultivation, TNAU recommends a cool, comparatively dry, frost-free climate.',

      rainfallRange:
        'No fixed annual rainfall range is stored because the cited TNAU production guide does not specify one. Fenugreek is recommended for a cool, comparatively dry climate, with dry conditions preferred as the crop approaches maturity.',

      soilPH:
        'Preferred pH about 6.0–7.0; ICAR reports that fenugreek can tolerate approximately pH 5.3–8.2.',

      soilNote:
        'Fenugreek performs best in rich, well-drained loamy soil. ICAR also identifies well-drained loam or sandy-loam soils as suitable for good crop growth.',

      plantingNote:
        'Fenugreek is established directly from seed. Tamil Nadu Agricultural University recommends preparing a fine seedbed and sowing seed at about 20 × 15 cm spacing.',

      harvestNote:
        'Fenugreek is an annual edible spice and leafy crop. Tamil Nadu Agricultural University reports that greens may be harvested about 20–25 days after sowing, while crops grown for grain are generally ready about 90–100 days after sowing. FarmCast uses the grain-harvest range for the automatic general crop estimate.',

      source: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Spice Crops — Fenugreek',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/horticulture/horti_spice%20crops_fenugreek.html'
          ].join('')
      }
    },

    {
      name: 'Cumin',
      scientificName: 'Cuminum cyminum L.',
      category: 'spice',
      icon: 'assets/crops/cumin.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Vermont Extension',

        title:
          'Spice Up Your Garden With Asian Flavors',

        url:
          [
            'https://',
            'www.uvm.edu/extension/news/spice-your-garden-asian-flavors'
          ].join('')
      },

      minTemp: 9,
      maxTemp: 30,

      idealTempRange:
        '17–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 1200–1800 mm; the FAO ECOCROP absolute range is about 800–2700 mm.',

      soilPH:
        'Optimal pH 5.0–6.5; absolute range 4.5–8.3.',

      soilNote:
        'Cumin performs best in well-drained medium-textured or organic soil. FAO ECOCROP lists medium and organic soil textures as optimal and medium to light soils within its broader tolerance range.',

      plantingNote:
        'Cumin is grown from seed and generally prefers direct seeding. University of Vermont Extension notes that cumin prefers direct seeding, while FAO describes it as an annual herb adapted to cool, comparatively dry growing conditions rather than tropical lowlands.',

      harvestNote:
        'Cumin is an annual edible spice crop grown primarily for its aromatic seeds. FAO ECOCROP reports harvest about 60–110 days after sowing, while ICAR-IISR reports maturity around 100–120 days after sowing under Indian cultivation. Plants are ready when they yellow and the seeds become brown and dry. Because published maturity ranges differ by environment and production system, FarmCast keeps Cumin as guidance-only instead of assigning one generic automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cuminum cyminum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=5043'
          ].join('')
      }
    },

    {
      name: 'Anise',
      scientificName: 'Pimpinella anisum L.',
      category: 'spice',
      icon: 'assets/crops/anise.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Iowa State University Extension and Outreach',

        title:
          'Growing, Harvesting, and Drying Herbs',

        url:
          [
            'https://',
            'yardandgarden.extension.iastate.edu/how-to/growing-harvesting-and-drying-herbs'
          ].join('')
      },

      minTemp: 5,
      maxTemp: 30,

      idealTempRange:
        '18–26°C',

      rainfallRange:
        'Optimal annual rainfall is about 900–1300 mm; the FAO ECOCROP absolute range is about 600–1700 mm.',

      soilPH:
        'Optimal pH 6.5–7.0; absolute range 6.0–7.3.',

      soilNote:
        'Anise performs best in well-drained, medium-textured soil with relatively high fertility. FAO ECOCROP lists medium soil texture and good drainage as its preferred conditions.',

      plantingNote:
        'Anise is established directly from seed. Iowa State University Extension recommends sowing seed directly because Anise does not transplant well.',

      harvestNote:
        'Anise is an annual edible spice crop grown for aromatic seeds as well as usable leaves. FAO ECOCROP reports a crop cycle of about 120–150 days and describes seed ripening as the final stage of that annual cycle. Iowa State University Extension recommends harvesting the seeds after they turn brown. FarmCast therefore uses the source-backed 120–150 day crop cycle for its automatic general harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Pimpinella anisum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=8595'
          ].join('')
      }
    },

    {
      name: 'Caraway',
      scientificName: 'Carum carvi L.',
      category: 'spice',
      icon: 'assets/crops/caraway.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Caraway',

        url:
          [
            'https://',
            'extension.illinois.edu/herbs/caraway'
          ].join('')
      },

      minTemp: 7,
      maxTemp: 26,

      idealTempRange:
        '16–20°C',

      rainfallRange:
        'Optimal annual rainfall is about 700–1000 mm; the FAO ECOCROP absolute range is about 600–1300 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 4.8–7.8.',

      soilNote:
        'Caraway performs best in fertile, well-drained medium-textured soil. FAO ECOCROP lists medium soil texture as optimal while heavy, medium, and light soils occur within its broader tolerance range.',

      plantingNote:
        'Caraway is grown directly from seed. University of Illinois Extension recommends direct sowing because established Caraway develops a deep root system and does not transplant successfully.',

      harvestNote:
        'Caraway is an edible aromatic spice crop whose seeds, leaves, and roots may be used as food. FAO ECOCROP records annual, biennial, and perennial forms. Annual forms may reach seed harvest about 140–160 days after sowing, whereas biennial forms may require roughly 440–460 days from sowing to fruit ripening. Seeds are ready when they turn brown. Because crop duration differs drastically among life forms, FarmCast keeps Caraway as guidance-only rather than assigning one generic automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Carum carvi — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=4256'
          ].join('')
      }
    },

    {
      name: 'Cardamom',
      scientificName: 'Elettaria cardamomum (L.) Maton',
      category: 'spice',
      icon: 'assets/crops/cardamom.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling / Sucker'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        title:
          'Horticulture — Spice Crops — Cardamom',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/horticulture/horti_spice%20crops_cardamom.html'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 35,

      idealTempRange:
        '22–30°C',

      rainfallRange:
        'Optimal annual rainfall is about 3000–6000 mm; the FAO ECOCROP absolute range is about 1500–7000 mm.',

      soilPH:
        'Optimal pH 5.5–6.0; absolute range 4.8–7.0.',

      soilNote:
        'Cardamom prefers humid tropical conditions, light shade, and well-drained medium-textured or organic soils. Tamil Nadu Agricultural University recommends thick shady areas with loamy, acidic soil and adequate drainage.',

      plantingNote:
        'Cardamom may be propagated from seedlings or suckers. Tamil Nadu Agricultural University recommends transplanting established planting material into prepared pits and notes that field planting may use about 18–22-month-old seedlings.',

      harvestNote:
        'Cardamom is a perennial edible spice crop grown for its aromatic capsules and seeds. Tamil Nadu Agricultural University reports that plants normally start bearing about two years after planting, with harvest commonly concentrated during October–November in its production region. FAO ECOCROP lists a crop cycle of about 240–365 days, but because Cardamom is perennial and first bearing depends on the age and type of planting material, FarmCast keeps Cardamom as guidance-only instead of converting years or crop-cycle values into one automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Elettaria cardamomum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=984'
          ].join('')
      }
    },

    {
      name: 'Clove',
      scientificName: 'Syzygium aromaticum (L.) Merr. & L.M.Perry',
      category: 'spice',
      icon: 'assets/crops/clove.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Kerala Agricultural University',

        title:
          'Package of Practices Recommendations — Clove',

        url:
          [
            'https://',
            'pop.kau.in/spices%26condiments.htm'
          ].join('')
      },

      minTemp: 22,
      maxTemp: 30,

      idealTempRange:
        '22–30°C',

      rainfallRange:
        'A World Agroforestry field manual lists about 1500–4500 mm annual rainfall as suitable for Clove.',

      soilPH:
        'Suitable pH about 5.5–6.5.',

      soilNote:
        'Clove prefers deep loamy soil. World Agroforestry lists loamy soil with a minimum depth of about 2 m and pH around 5.5–6.5 among suitable site conditions.',

      plantingNote:
        'Clove is commonly raised from fresh seed in a nursery and later established in the field as a seedling. Kerala Agricultural University recommends selecting about 18-month-old seedlings for field planting during the rainy season.',

      harvestNote:
        'Clove is a perennial edible spice tree grown for its unopened aromatic flower buds. Kerala Agricultural University reports that trees generally begin yielding about 7–8 years after field planting. Buds should be harvested when the base of the calyx changes from green toward pink, before the flowers open. Because first bearing occurs years after establishment and varies with tree development, FarmCast keeps Clove as guidance-only rather than converting the bearing age into one automatic harvest date.',

      source: {
        agency:
          'World Agroforestry Centre (ICRAF) / University of Copenhagen',

        title:
          'Field Manual: Decentralised Procurement of Tree Seed — Clove Site Suitability',

        url:
          [
            'https://',
            'publikasi.agroforestri.id/sites/all/modules/publication/data/softcopy/MN00096-17.pdf'
          ].join('')
      }
    },

    {
      name: 'Nutmeg',
      scientificName: 'Myristica fragrans Houtt.',
      category: 'spice',
      icon: 'assets/crops/nutmeg.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'Agritech Portal',

        title:
          'Horticulture — Spice Crops — Nutmeg',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/horticulture/horti_spice%20crops_nutmeg.html'
          ].join('')
      },

      minTemp: 22,
      maxTemp: 34,

      idealTempRange:
        '22–34°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 1500–3500 mm, with an absolute range of about 1200–4000 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.5–7.5.',

      soilNote:
        'Nutmeg prefers deep, well-drained medium-textured or organic soils under humid tropical conditions. FAO ECOCROP lists deep soil, high fertility, and good drainage among its optimal ecological requirements.',

      plantingNote:
        'Nutmeg may be propagated from seed, grafted plants, or budded plants. Tamil Nadu Agricultural University reports that nursery-raised seedlings are commonly transplanted to the main field at about 18–24 months after sowing.',

      harvestNote:
        'Nutmeg is a perennial edible spice tree grown for both the seed called nutmeg and the surrounding aril called mace. Tamil Nadu Agricultural University reports that bearing generally begins about 6–7 years after planting and mature fruits are harvested when they start splitting. Because this is a long-lived perennial tree and first-bearing age is not an exact harvest interval for every planting, FarmCast keeps Nutmeg as guidance-only rather than creating an automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Myristica fragrans — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1514'
          ].join('')
      }
    },

    {
      name: 'Cinnamon',
      scientificName: 'Cinnamomum verum J.Presl',
      category: 'spice',
      icon: 'assets/crops/cinnamon.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Kerala Agricultural University',

        title:
          'Package of Practices Recommendations — Cinnamon',

        url:
          [
            'https://',
            'pop.kau.in/spices%26condiments.htm'
          ].join('')
      },

      minTemp: 24,
      maxTemp: 30,

      idealTempRange:
        '24–30°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 2000–2600 mm, with an absolute range of about 1200–3000 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–7.0.',

      soilNote:
        'Cinnamon prefers warm, humid tropical conditions and well-drained soils. FAO ECOCROP lists deep, light-textured, well-drained soil among its optimal ecological conditions, while Kerala Agricultural University recommends deep sandy soil rich in humus and advises avoiding marshy areas.',

      plantingNote:
        'Cinnamon may be propagated from seed, semi-hardwood cuttings, or air layers. Kerala Agricultural University recommends transplanting selected seedlings to the main field when they are about 1–2 years old, generally with the onset of the monsoon.',

      harvestNote:
        'Cinnamon is a perennial edible spice tree grown mainly for its aromatic bark. Kerala Agricultural University reports that plants may be ready for harvest at about three years after planting, while Tamil Nadu Agricultural University reports that harvesting commonly starts in the fourth or fifth year. FAO ECOCROP similarly describes about 3–5 years from planting to first harvest. Because first-harvest timing varies among sources and subsequent bark harvests depend on coppice and shoot development, FarmCast keeps Cinnamon as guidance-only instead of generating one automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cinnamomum verum — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=702'
          ].join('')
      }
    },

    {
      name: 'Star Anise',
      scientificName: 'Illicium verum Hook.f.',
      category: 'spice',
      icon: 'assets/crops/star-anise.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        },
        {
          value: 'cuttings',
          label: 'Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Botanic Gardens, Kew',

        title:
          'Illicium verum Hook.f. — Kew Species Profile',

        url:
          [
            'https://',
            'powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A554553-1/general-information'
          ].join('')
      },

      minTemp: 12,
      maxTemp: 18,

      idealTempRange:
        'Mean annual temperature about 12–18°C.',

      rainfallRange:
        'World Agroforestry lists mean annual rainfall of about 1500–2400 mm.',

      soilPH:
        'Suitable soil pH about 4.0–6.0.',

      soilNote:
        'World Agroforestry reports that Star Anise grows on deep feralite soils derived from mica schists or clayish sandstone, with soil depth around 120 cm or more, pH about 4–6, and at least 2% humus. Young trees can tolerate shade, although established trees require adequate light.',

      plantingNote:
        'Star Anise can be propagated from seed or cuttings. Kew reports that seeds should be sown fresh and that nursery-raised seedlings may be planted into a well-manured field when about three years old. World Agroforestry also describes plantations established using seedlings.',

      harvestNote:
        'Star Anise is a perennial edible spice tree grown for its aromatic star-shaped fruits. World Agroforestry reports two flowering and fruiting seasons within its natural range, flowering beginning at about 5–6 years of age and seed production generally beginning around 9–10 years. Fruits are harvested directly from the tree while still green or collected when turning brown but before they open. Because establishment-to-bearing takes several years and harvest timing follows recurring fruit development rather than one fixed interval from planting, FarmCast keeps Star Anise as guidance-only.',

      source: {
        agency:
          'World Agroforestry Centre',

        office:
          'Agroforestree Database 4.0',

        title:
          'Illicium verum — Agroforestree Species Profile',

        url:
          [
            'https://',
            'apps.worldagroforestry.org/treedb/AFTPDFS/Illicium_verum.pdf'
          ].join('')
      }
    },

    {
      name: 'Allspice',
      scientificName: 'Pimenta dioica (L.) Merr.',
      category: 'spice',
      icon: 'assets/crops/allspice.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'Agritech Portal',

        title:
          'Horticulture — Propagation — Allspice',

        url:
          [
            'https://',
            'www.agritech.tnau.ac.in/horticulture/horti_Propogation_Allspice.html'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 32,

      idealTempRange:
        'Mean annual temperature is commonly about 18–24°C, with reported minimum and maximum conditions around 15–32°C.',

      rainfallRange:
        'Optimum average annual rainfall is about 1500–1600 mm; about 1000–2500 mm annually is reported as acceptable.',

      soilPH:
        'Best growth is reported on well-drained loamy limestone soils around pH 6.3–8.0.',

      soilNote:
        'Allspice prefers warm tropical conditions and well-drained loamy limestone soils. PROSEA reports that the crop performs best on well-drained soils and commonly grows from sea level to about 1000 m, although production is generally better at lower elevations.',

      plantingNote:
        'Allspice can be propagated from fresh seed and vegetatively. Tamil Nadu Agricultural University describes nursery propagation from seed and also reports air layering. PROSEA reports that nursery seedlings may be transplanted to the field when they are about 9–10 months old and roughly 25–40 cm tall.',

      harvestNote:
        'Allspice is a perennial edible spice tree grown mainly for its aromatic green-mature berries, which are dried to produce the spice. PROSEA reports that seed-grown trees generally begin flowering at about 7–8 years, while grafted material may flower earlier. Fully mature but still green berries are commonly harvested about 3–4 months after flowering. Because berry maturity is tied to flowering and first bearing varies with propagation method and tree development, FarmCast keeps Allspice as guidance-only rather than generating an automatic harvest date.',

      source: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Pimenta dioica — PROSEA Species Profile',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Pimenta_dioica_(PROSEA)'
          ].join('')
      }
    },

    {
      name: 'Vanilla',
      scientificName: 'Vanilla planifolia Andrews',
      category: 'spice',
      icon: 'assets/crops/vanilla.svg',

      plantingMethods: [
        {
          value: 'cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Agricultural Training Institute — CALABARZON',

        title:
          'Produksyon ng Vanilla',

        url:
          [
            'https://',
            'ati2.da.gov.ph/ati-4a/content/publications/maridelle-g-jaurigue/produksyon-ng-vanilla'
          ].join('')
      },

      minTemp: 21,
      maxTemp: 30,

      idealTempRange:
        '21–30°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 2000–2500 mm, with an absolute range of about 1500–3000 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.3–8.0.',

      soilNote:
        'Vanilla is a perennial tropical climbing orchid that prefers humid conditions, light shade, high soil fertility, and well-drained medium-textured or organic soils. DA-ATI CALABARZON likewise recommends loamy soil with good drainage and suitable shade management.',

      plantingNote:
        'Vanilla is commonly established vegetatively using stem cuttings. Tamil Nadu Agricultural University recommends stem cuttings about 60–120 cm long and planting two nodes below the soil surface near a support. DA-ATI CALABARZON also provides Philippine production guidance for establishing and managing Vanilla planifolia vines.',

      harvestNote:
        'Vanilla is a perennial edible spice vine grown for its aromatic pods. DA-ATI CALABARZON reports that flowering may begin about 2–3 years after planting, although some vines may take about four years depending on planting material and management. Tamil Nadu Agricultural University reports that pods become ready for harvest about 6–9 months after flowering, when mature green pods begin turning pale yellow and the distal end starts yellowing. Because pod maturity is tied to flowering rather than a fixed interval from planting, FarmCast keeps Vanilla as guidance-only instead of generating an automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Vanilla planifolia — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2131'
          ].join('')
      }
    },

    {
      name: 'Black Cardamom',
      scientificName: 'Amomum subulatum Roxb.',
      category: 'spice',
      icon: 'assets/crops/black-cardamom.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Sucker / Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Government of Sikkim',

        office:
          'Agriculture Department',

        title:
          'Large Cardamom — Soil Requirement and Planting',

        url:
          [
            'https://',
            'agri.sikkim.gov.in/Department/AgriSubMenuDetails?ContID=28&SubContID=119'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 25,

      idealTempRange:
        'About 15–25°C is reported as a suitable production range; Spices Board India notes that the crop is grown across a broader 6–30°C range in its traditional growing regions.',

      rainfallRange:
        'Spices Board India and the Government of Sikkim report about 3000–3500 mm of well-distributed annual rainfall in traditional large-cardamom growing areas.',

      soilPH:
        'Large-cardamom soils in Sikkim are generally acidic, with the majority reported around pH 5.0–5.5.',

      soilNote:
        'Black Cardamom prefers cool, humid, partially shaded conditions and forest-loam soils with good drainage. Government of Sikkim notes that waterlogged conditions are unsuitable and that the crop performs well under partial shade near reliable moisture sources.',

      plantingNote:
        'Black Cardamom may be established using healthy suckers or nursery-raised seedlings. Government of Sikkim recommends field planting during June–July when adequate soil moisture is available, using healthy planting material and avoiding deep planting.',

      harvestNote:
        'Black Cardamom is a perennial edible spice crop grown for its aromatic capsules. Nepal government sector guidance reports that plants may begin fruiting from about the third year, while Government of Sikkim documents cultivar- and altitude-dependent harvest seasons commonly ranging from September through November. Because first bearing takes several years and harvest timing varies with cultivar, elevation, flowering, and plant development, FarmCast keeps Black Cardamom as guidance-only rather than generating one automatic harvest date.',

      source: {
        agency:
          'Spices Board India',

        office:
          'Ministry of Commerce & Industry, Government of India',

        title:
          'Cardamom (Large)',

        url:
          [
            'https://',
            'www.indianspices.com/spice-catalog/cardamom-large.html'
          ].join('')
      }
    },

    {
      name: 'Long Pepper',
      scientificName: 'Piper longum L.',
      category: 'spice',
      icon: 'assets/crops/long-pepper.svg',

      plantingMethods: [
        {
          value: 'cuttings',
          label: 'Rooted Vine Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'Agritech Portal',

        title:
          'Horticulture — Medicinal Crops — Tippili',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/horticulture/horti_medicinal%20crops_tippili.html'
          ].join('')
      },

      minTemp: 30,
      maxTemp: 32,

      idealTempRange:
        'Tamil Nadu Agricultural University reports that Long Pepper thrives well around 30–32°C under humid growing conditions.',

      rainfallRange:
        'Tamil Nadu Agricultural University reports suitable annual rainfall of about 150 cm, equivalent to about 1500 mm, together with high humidity.',

      soilPH:
        'Research published through the Indian Council of Agricultural Research reports suitable well-drained, organic-rich soils around pH 5.5–8.5.',

      soilNote:
        'Long Pepper prefers well-drained red or loamy soil rich in organic matter and humid, partially shaded conditions. Tamil Nadu Agricultural University recommends lower elevations with high humidity and describes cultivation beneath crops such as coconut or arecanut where additional shade can protect vines from excessive afternoon heat.',

      plantingNote:
        'Long Pepper is commonly propagated vegetatively using rooted vine cuttings. Tamil Nadu Agricultural University specifically recommends rooted cuttings, while Kerala Agricultural University also describes suckers or rooted vine cuttings as suitable planting material.',

      harvestNote:
        'Long Pepper is a perennial edible spice vine grown for its pungent fruit spikes. Tamil Nadu Agricultural University and the ICAR Directorate of Medicinal and Aromatic Plants Research report harvest beginning around eight months after planting, followed by repeated pickings. Kerala Agricultural University similarly describes spike development beginning several months after establishment. Because Long Pepper continues producing repeated harvests as a perennial crop and the published timing is expressed in calendar months rather than one exact day-based terminal harvest interval, FarmCast keeps Long Pepper as guidance-only instead of generating one automatic harvest date.',

      source: {
        agency:
          'Tamil Nadu Agricultural University',

        office:
          'Agritech Portal',

        title:
          'Horticulture — Medicinal Crops — Tippili',

        url:
          [
            'https://',
            'agritech.tnau.ac.in/horticulture/horti_medicinal%20crops_tippili.html'
          ].join('')
      }
    },

    {
      name: 'Grains of Paradise',
      scientificName: 'Aframomum melegueta K.Schum.',
      category: 'spice',
      icon: 'assets/crops/grains-of-paradise.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Economic Botany',

        title:
          'The Cultivation of Melegueta Pepper (Aframomum melegueta) in Ghana',

        url:
          [
            'https://',
            'www.jstor.org/stable/4253855'
          ].join('')
      },

      minTemp: 21,
      maxTemp: 28,

      idealTempRange:
        '21–28°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 1500–1900 mm, with an absolute range of about 1000–2400 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 4.5–7.5.',

      soilNote:
        'Grains of Paradise is a perennial rhizomatous tropical herb that performs best in warm, humid conditions. FAO ECOCROP lists medium to heavy soils, moderate fertility, and generally well-drained conditions among its optimal ecological requirements. Kew and West African botanical sources also describe the crop as commonly occurring or cultivated under shade.',

      plantingNote:
        'Grains of Paradise may be raised from seed. Traditional Ghana cultivation described by Lock, Hall and Abbiw sows seeds during the main rainy period and transplants the young plants during the following wet season to obtain more even field spacing.',

      harvestNote:
        'Grains of Paradise is a perennial edible spice crop grown for the aromatic seeds contained inside its fleshy fruits. Ghana cultivation research reports that a few flowers may appear during the second wet season after sowing, but the main cropping period generally begins about three years after sowing. FAO ECOCROP also lists the crop as perennial and gives a general crop-cycle range, but this does not provide one unambiguous transplant-to-harvest interval. Because first bearing occurs over multiple seasons and subsequent harvests recur from established rhizomes, FarmCast keeps Grains of Paradise as guidance-only instead of generating an automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Aframomum melegueta — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2872'
          ].join('')
      }
    },

    {
      name: 'Ajwain',
      scientificName: 'Trachyspermum ammi (L.) Sprague',
      category: 'spice',
      icon: 'assets/crops/ajwain.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Sardarkrushinagar Dantiwada Agricultural University',

        office:
          'Seed Spices Research Station, Jagudan',

        title:
          'Effect of date of sowing and crop geometry on growth, yield and quality of ajwain',

        url:
          [
            'https://',
            'epubs.icar.org.in/index.php/IJSS/article/view/151828'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 27,

      idealTempRange:
        'About 15–27°C during the growth period; Ajwain prefers a moderately cool and dry climate.',

      rainfallRange:
        'No single numeric annual rainfall range is used because the higher-priority cultivation sources reviewed do not provide one. Ajwain prefers comparatively dry conditions, is moderately drought-tolerant, and prolonged wet or humid conditions around flowering should be avoided.',

      soilPH:
        'Published cultivation literature reports suitable loamy soils around pH 6.5–8.2.',

      soilNote:
        'Ajwain performs well in light, well-drained soils. PSSCIVE/NCERT recommends loamy to sandy-loam soils with good drainage, while ICAR-IISR similarly describes light, well-drained soil as suitable for the crop.',

      plantingNote:
        'Ajwain is an annual seed spice established by sowing seed directly in the field. Research from Sardarkrushinagar Dantiwada Agricultural University evaluates direct sowing dates and crop spacing, while ICAR research consistently reports crop development and management in days after sowing.',

      harvestNote:
        'Ajwain is an annual edible seed spice. ICAR-Indian Institute of Spices Research reports that the crop matures about 100–130 days after sowing and that seeds should be harvested when the umbels turn grey-brown. Because this maturity range is explicitly tied to sowing, FarmCast can safely use an automatic harvest estimate for direct-seeded Ajwain.',

      source: {
        agency:
          'Indian Council of Agricultural Research',

        office:
          'Indian Institute of Spices Research',

        title:
          'Ajwain (Carom) — Trachyspermum ammi',

        url:
          [
            'https://',
            'spices.res.in/products/spices/ajwain.html'
          ].join('')
      }
    },

    {
      name: 'Asafoetida',
      scientificName: 'Ferula assa-foetida L.',
      category: 'spice',
      icon: 'assets/crops/asafoetida.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Seedling'
        }
      ],

      plantingMethodSource: {
        agency:
          'Government of India',

        office:
          'Press Information Bureau / CSIR-Institute of Himalayan Bioresource Technology',

        title:
          'CSIR-IHBT makes history by introducing Asafoetida cultivation in Indian Himalayan region',

        url:
          [
            'https://',
            'www.pib.gov.in/PressReleasePage.aspx?PRID=1665796'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 20,

      idealTempRange:
        'Optimal vegetative growth is reported at about 10–20°C. Germination performs best around 15°C, while established plants can tolerate substantially warmer conditions.',

      rainfallRange:
        'Dry-temperate cultivation literature reports average annual rainfall of about 250–350 mm. Heavy and continuous rainfall can adversely affect the crop.',

      soilPH:
        'No single numeric pH range is used because reviewed cultivation sources describe Asafoetida as tolerant of acidic, neutral, and alkaline soils rather than defining one dependable crop-wide numeric range.',

      soilNote:
        'Asafoetida prefers deep, fertile, well-drained sandy or sandy-loam soils under dry temperate conditions and abundant sunlight. Excessive or prolonged soil moisture can promote root problems, so good drainage is important.',

      plantingNote:
        'Asafoetida is propagated from seed. CSIR-IHBT raised imported Ferula assa-foetida seed in nurseries and established the crop in farmers fields using seedlings, making transplanted seedlings the FarmCast establishment method for this entry.',

      harvestNote:
        'Asafoetida is a perennial edible spice crop grown for the oleo-gum resin produced by its fleshy taproot. Government of India and CSIR-IHBT report that plants require approximately five years before resin production. Mature roots are cut near the crown and the exuded resin is collected repeatedly. Because the five-year figure is an approximate perennial maturity stage rather than one exact transplant-to-harvest interval, FarmCast keeps Asafoetida as guidance-only.',

      source: {
        agency:
          'Journal of Applied and Natural Science',

        title:
          'Asafoetida (Ferula asafoetida): A high-value crop suitable for the cold desert of Himachal Pradesh, India',

        url:
          [
            'https://',
            'journals.ansfoundation.org/index.php/jans/article/view/2418'
          ].join('')
      }
    },

    {
      name: 'Galangal',
      localName: 'Langkawas',
      scientificName: 'Alpinia galanga (L.) Willd.',
      category: 'spice',
      icon: 'assets/crops/galangal.svg',

      plantingMethods: [
        {
          value: 'rhizome-pieces',
          label: 'Rhizome Pieces'
        }
      ],

      plantingMethodSource: {
        agency:
          'Japan International Research Center for Agricultural Sciences',

        office:
          'JIRCAS',

        title:
          'Alpinia galanga (L.) Willd. — Thai Vegetable Database',

        url:
          [
            'https://',
            'www.jircas.go.jp/en/database/thaivege/005'
          ].join('')
      },

      minTemp: 27,
      maxTemp: 32,

      idealTempRange:
        '27–32°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 2500–3000 mm, with an absolute range of about 2000–3700 mm.',

      soilPH:
        'Optimal pH 5.5–6.5; absolute range 5.0–6.8.',

      soilNote:
        'Galangal prefers fertile, moist but well-drained tropical soils and can grow in sunny to moderately shaded conditions. FAO ECOCROP lists high fertility and well-drained soils among its optimal ecological requirements, while PROSEA specifically notes that waterlogged conditions interfere with rhizome development.',

      plantingNote:
        'Galangal is propagated vegetatively using sections of mature rhizomes. JIRCAS recommends dividing older rhizomes into pieces about 5–10 cm long, each with at least two healthy terminal buds, and planting the rhizome pieces directly in the field.',

      harvestNote:
        'Galangal is a perennial edible spice crop grown mainly for its aromatic rhizomes. FAO ECOCROP and PROSEA report that rhizomes develop rapidly and reach their best market-spice harvest quality about three months after planting. PROSEA also notes that rhizomes left substantially longer may become woody and fibrous. Because the timing is directly tied to planting and FarmCast supports calendar-month harvest rules without converting months into invented day counts, Galangal can safely use an automatic three-month harvest estimate.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Alpinia galanga — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=3052'
          ].join('')
      }
    },

    {
      name: 'Nigella',
      localName: 'Black Cumin',
      scientificName: 'Nigella sativa L.',
      category: 'spice',
      icon: 'assets/crops/nigella.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Sher-e-Bangla Agricultural University',

        title:
          'Effect of Date of Sowing and Spacing on Growth and Seed Yield of Black Cumin (Nigella sativa L.)',

        url:
          [
            'https://',
            'archive.saulibrary.edu.bd/handle/123456789/4266'
          ].join('')
      },

      minTemp: 14,
      maxTemp: 26,

      idealTempRange:
        '14–26°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 600–800 mm, with an absolute range of about 400–1000 mm.',

      soilPH:
        'Optimal pH 6.5–7.3; absolute range 6.0–8.0.',

      soilNote:
        'Nigella prefers well-drained soils and is adapted to comparatively dry growing conditions. FAO ECOCROP lists light, medium, and heavy soil textures as suitable, with moderate fertility and good drainage under its optimal ecological conditions.',

      plantingNote:
        'Nigella is an annual seed spice established by direct sowing. University field research on Black Cumin evaluates sowing dates and field spacing using seed sown directly into prepared plots, while FAO ECOCROP classifies the crop as an annual herb.',

      harvestNote:
        'Nigella is an annual edible spice crop grown for its aromatic black seeds. FAO ECOCROP reports a general crop cycle of about 100–150 days. Because the crop is direct-seeded and the published crop cycle covers the annual growth period through seed maturity, FarmCast can use a 100–150 day automatic harvest window after sowing. Individual cultivars may mature within a narrower portion of this range.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Nigella sativa — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=7987'
          ].join('')
      }
    },

    {
      name: 'Horseradish',
      scientificName:
        'Armoracia rusticana G.Gaertn., B.Mey. & Scherb.',
      category: 'root-crop',
      icon: 'assets/crops/horseradish.svg',

      plantingMethods: [
        {
          value: 'root-cuttings',
          label: 'Root Cuttings'
        },
        {
          value: 'crown-cuttings',
          label: 'Crown Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Horseradish in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/horseradish-in-the-garden'
          ].join('')
      },

      minTemp: 15.6,
      maxTemp: 18.3,

      idealTempRange:
        'About 15.6–18.3°C (60–65°F). Utah State University reports that Horseradish grows best under cool temperatures.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Horseradish is relatively drought tolerant but produces poorer-quality roots when moisture stress is excessive. Utah State University recommends maintaining adequate soil moisture while avoiding overwatering.',

      soilPH:
        'Recommended pH 6.0–7.5.',

      soilNote:
        'Horseradish grows in many soil types but produces larger, straighter, higher-quality roots in fertile, well-drained soil rich in organic matter. Light, deep soils also make root harvesting easier.',

      plantingNote:
        'Horseradish is propagated vegetatively using crown sections or root cuttings. Utah State University recommends planting root pieces with the upper end positioned higher than the lower end, while crown divisions should include both leaf and root tissue.',

      harvestNote:
        'Horseradish is a perennial edible root crop that is commonly managed as an annual for high-quality roots. Utah State University reports that plants in areas with a sufficiently long growing season may be harvested at the end of the first year, preferably after several frosts, while University of Wisconsin guidance notes that spring-planted roots are not always ready by the first autumn and that year-old roots generally have the best flavor. Because readiness depends on growing-season length, frost timing, planting date, and root development rather than one universal planting-to-harvest interval, FarmCast keeps Horseradish as guidance-only.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Horseradish in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/horseradish-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Lovage',
      scientificName: 'Levisticum officinale W.D.J.Koch',
      category: 'herb',
      icon: 'assets/crops/lovage.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Lovage — Herb Gardening',

        url:
          [
            'https://',
            'extension.illinois.edu/herbs/lovage'
          ].join('')
      },

      minTemp: 20,
      maxTemp: 30,

      idealTempRange:
        '20–30°C',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Lovage prefers consistently moist soil, and irrigation is beneficial where natural rainfall does not provide adequate moisture.',

      soilPH:
        'Recommended pH 6.0–7.5.',

      soilNote:
        'Lovage prefers rich, moist, well-drained soil. Ontario agriculture guidance lists sandy or loam soils as suitable, while University of Illinois Extension notes that light shade can improve crop quality.',

      plantingNote:
        'Lovage is a hardy perennial herb that can be propagated from seed or by division. University of Illinois Extension recommends sowing seed in spring or fall and also lists division as a propagation method.',

      harvestNote:
        'Lovage is a perennial culinary herb with edible leaves, stems, seeds, and roots. Ontario agriculture guidance reports no commercial harvest during the first year, with roots generally harvested in early autumn after the second or third year. Leaves can be harvested during vegetative growth, while seed heads are collected when they begin turning brown. Because harvest timing depends on the plant part being harvested, season, and establishment age rather than one universal planting-to-harvest interval, FarmCast keeps Lovage as guidance-only.',

      source: {
        agency:
          'Ontario Ministry of Agriculture, Food and Rural Affairs',

        title:
          'Lovage — Specialty Cropportunities',

        url:
          [
            'https://',
            'www.omafra.gov.on.ca/CropOp/en/herbs/culinary/lovag.html'
          ].join('')
      }
    },

    {
      name: 'Summer Savory',
      scientificName: 'Satureja hortensis L.',
      category: 'herb',
      icon: 'assets/crops/summer-savory.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Savory: Summer — Herb Gardening',

        url:
          [
            'https://',
            'extension.illinois.edu/herbs/savory-summer'
          ].join('')
      },

      minTemp: 20,
      maxTemp: 26,

      idealTempRange:
        '20–26°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 500–800 mm, with an absolute range of about 300–1300 mm.',

      soilPH:
        'Optimal pH 6.0–7.0; absolute range 5.5–8.2.',

      soilNote:
        'Summer Savory prefers fertile, well-drained medium-textured soil and bright conditions. FAO ECOCROP lists high soil fertility, medium texture, and good drainage among its optimal ecological requirements, while University of Illinois Extension recommends full sun and moist but well-drained garden soil.',

      plantingNote:
        'Summer Savory is an annual culinary herb that can be direct-seeded outdoors or started indoors and later transplanted. University of Illinois Extension recommends shallow sowing because light improves germination and notes that transplants generally require about 4–6 weeks of indoor growth before field establishment.',

      harvestNote:
        'Summer Savory is grown mainly for its aromatic leaves and tender stems. FAO ECOCROP reports that leaves are commonly harvested about 75–120 days around the period just before first flowering, while University of Illinois Extension recommends cutting leafy tops when flower buds begin to appear. Because the published 75–120 day guidance does not explicitly state whether the count begins at sowing, sprouting, or transplanting, FarmCast keeps Summer Savory as guidance-only instead of creating an automatic harvest date.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Satureja hortensis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=9582'
          ].join('')
      }
    },

    {
      name: 'French Tarragon',
      scientificName: 'Artemisia dracunculus L.',
      category: 'herb',
      icon: 'assets/crops/french-tarragon.svg',

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Rooted Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow French Tarragon in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/french-tarragon-in-the-garden'
          ].join('')
      },

      minTemp: 12,
      maxTemp: 22,

      idealTempRange:
        '12–22°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 500–1000 mm, with an absolute range of about 250–1400 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.9–7.5.',

      soilNote:
        'French Tarragon prefers light to medium-textured, well-drained soil. FAO ECOCROP lists good drainage among its optimal ecological requirements, while Utah State University Extension emphasizes that French Tarragon does not tolerate wet or saturated soil.',

      plantingNote:
        'French Tarragon is propagated vegetatively rather than reliably from seed. Utah State University Extension recommends stem cuttings or root divisions, while the Midwest Vegetable Production Guide likewise states that French Tarragon must be propagated by stem cuttings or division.',

      harvestNote:
        'French Tarragon is a perennial culinary herb grown for its aromatic leaves and young stem tips. The Midwest Vegetable Production Guide reports that two harvests can generally be made each year and that the first harvest occurs about 6–8 weeks after plants are set out. Because this timing is explicitly tied to field establishment, FarmCast can use a derived automatic first-harvest estimate of 42–56 days after setting out.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Artemisia dracunculus — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=3402'
          ].join('')
      }
    },

    {
      name: 'Lemon Balm',
      scientificName: 'Melissa officinalis L.',
      category: 'herb',
      icon: 'assets/crops/lemon-balm.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Lemon Balm in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/lemon-balm-in-the-garden'
          ].join('')
      },

      minTemp: 14,
      maxTemp: 25,

      idealTempRange:
        'About 14–25°C according to FAO ECOCROP-derived ecological data.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Lemon Balm prefers consistently moist but well-drained soil and should not be allowed to remain waterlogged or severely water-stressed.',

      soilPH:
        'Recommended pH about 5.0–7.5.',

      soilNote:
        'Lemon Balm grows in a range of soil types but performs well in rich, humus-filled, moist, well-drained soil. It tolerates full sun to partial shade, and excessive soil moisture should be avoided because waterlogged conditions can encourage root rot.',

      plantingNote:
        'Lemon Balm is a perennial culinary herb that can be established from seed, stem cuttings, or root divisions. Utah State University Extension also describes layering as a reliable propagation method, while PROSEA confirms propagation by seed and cuttings.',

      harvestNote:
        'Lemon Balm is grown mainly for its aromatic leaves and tender stems. Illinois Extension reports that stems may be harvested as needed throughout the growing season, preferably before flowering. Utah State University recommends frequent foliage harvests and cutting about one-third of the foliage at intervals to encourage healthy branching and regrowth. Because harvest readiness is based on vegetative growth and repeated management rather than one fixed interval from sowing, cutting, or division, FarmCast keeps Lemon Balm as guidance-only.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Melissa officinalis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2340'
          ].join('')
      }
    },

    {
      name: 'Sweet Marjoram',
      scientificName: 'Origanum majorana L.',
      category: 'herb',
      icon: 'assets/crops/sweet-marjoram.svg',

      plantingMethods: [
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Cornell Cooperative Extension',

        title:
          'Herbs — Sweet Marjoram',

        url:
          [
            'https://',
            's3.amazonaws.com/assets.cce.cornell.edu/attachments/22766/Herbs.pdf?1493928858='
          ].join('')
      },

      minTemp: 20,
      maxTemp: 26,

      idealTempRange:
        '20–26°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 800–1000 mm, with an absolute range of about 600–2300 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.9–8.7.',

      soilNote:
        'Sweet Marjoram prefers fertile, well-drained medium-textured soil and bright growing conditions. FAO ECOCROP lists high soil fertility, medium texture, and good drainage among its optimal ecological requirements.',

      plantingNote:
        'Sweet Marjoram may be propagated from seed, stem cuttings, or root division. Cornell Cooperative Extension recommends sowing the small seed indoors in early spring and transplanting established seedlings to the field, while cuttings and root divisions are also suitable vegetative propagation methods.',

      harvestNote:
        'Sweet Marjoram is an edible aromatic herb grown primarily for its leaves and tender flowering tops. Cornell Cooperative Extension reports that leaves may be used about 7–8 weeks from planting and recommends harvesting leaves and flower heads at the pre-bloom to early-bloom stage. FarmCast therefore uses a derived 49–56 day automatic first-harvest estimate for transplanted seedlings only. Stem cuttings and root divisions remain guidance-only because the reviewed source does not provide separate method-specific establishment-to-harvest timing for those propagation methods.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Origanum majorana — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=2368'
          ].join('')
      }
    },

    {
      name: 'Borage',
      scientificName: 'Borago officinalis L.',
      category: 'herb',
      icon: 'assets/crops/borage.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Maryland Extension',

        title:
          'Borage',

        url:
          [
            'https://',
            'extension.umd.edu/resource/borage'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Borage is adapted to a broad range of cool to mild growing conditions. Published seed-production research notes that seed development below about 25°C is favorable for high-quality seed oil, but FarmCast does not convert that quality threshold into a universal optimal temperature range.',

      rainfallRange:
        'No single crop-wide annual rainfall requirement is used. Borage has been grown successfully under contrasting climates, and University of Maryland Extension describes it as performing well in dry, sunny locations. FarmCast avoids treating rainfall observed at individual research sites as a universal crop requirement.',

      soilPH:
        'Published crop research reports broad soil tolerance around pH 4.3–8.5.',

      soilNote:
        'Borage is adaptable but performs well in sunny, well-drained growing sites. University of Maryland Extension describes it as easy to grow from seed and particularly suited to dry, sunny locations.',

      plantingNote:
        'Borage is an annual herb that is best established by direct seeding. University of Maryland Extension notes that it is easy to grow from seed, readily reseeds itself, and is relatively difficult to transplant, so FarmCast uses direct seeding as the supported establishment method.',

      harvestNote:
        'Borage has several harvest stages depending on the intended product. University of Maryland Extension notes that fresh leaves may be used earlier and flowers can be picked as they open. For seed-crop production, peer-reviewed Chilean agricultural research reports that Borage is ready for harvest at about 75 days after sowing. FarmCast therefore uses a 75-day automatic harvest estimate specifically as a seed-crop maturity reference rather than as the earliest possible leaf or flower harvest.',

      source: {
        agency:
          'Chilean Journal of Agricultural Research',

        title:
          'Borage (Borago officinalis L.) Response to N, P, K, and S Fertilization in South Central Chile',

        url:
          [
            'https://',
            'www.scielo.cl/scielo.php?lng=en&nrm=iso&pid=S0718-58392010000200006&script=sci_arttext&tlng=en'
          ].join('')
      }
    },

    {
      name: 'Winter Savory',
      scientificName: 'Satureja montana L.',
      category: 'herb',
      icon: 'assets/crops/winter-savory.svg',

      plantingMethods: [
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Georgia Cooperative Extension',

        title:
          'Herbs in Southern Gardens',

        url:
          [
            'https://',
            'extension.uga.edu/publications/detail.html?number=B1170'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'No single numeric optimum is used. Winter Savory is a temperate perennial culinary herb, and FarmCast avoids converting USDA hardiness-zone information into a temperature requirement.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of California and North Carolina State Extension describe Winter Savory as drought tolerant or low-water once established, with good soil drainage being especially important.',

      soilPH:
        'No narrow numeric pH range is used. North Carolina State Extension reports that Winter Savory tolerates acidic, neutral, and alkaline soils.',

      soilNote:
        'Winter Savory prefers full sun and well-drained soil and is well adapted to comparatively dry conditions. North Carolina State Extension lists sandy and shallow rocky soils as suitable and notes tolerance of dry and poor soils.',

      plantingNote:
        'Winter Savory is a perennial culinary herb. University of Georgia Cooperative Extension recommends establishing it from cuttings or divisions rather than treating it like annual Summer Savory, while University of California guidance also documents propagation by division or softwood cuttings.',

      harvestNote:
        'Winter Savory is grown for its aromatic edible leaves and flowering shoots. University of California guidance reports that leaves may be harvested throughout the growing season as needed and that their flavor is more pronounced before flowering. Because harvest is continuous and stage-based rather than tied to one universal interval after cutting or division, FarmCast keeps Winter Savory as guidance-only.',

      source: {
        agency:
          'North Carolina State University Extension',

        office:
          'Extension Gardener Plant Toolbox',

        title:
          'Satureja montana — Winter Savory',

        url:
          [
            'https://',
            'plants.ces.ncsu.edu/plants/satureja-montana/'
          ].join('')
      }
    },

    {
      name: 'Hyssop',
      scientificName:
        'Dracocephalum officinale (L.) Y.P.Chen & B.T.Drew',
      category: 'herb',
      icon: 'assets/crops/hyssop.svg',

      plantingMethods: [
        {
          value: 'seed-grown',
          label: 'Seed-Grown Plants'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'North Carolina State University Extension',

        office:
          'Extension Gardener Plant Toolbox',

        title:
          'Hyssopus officinalis — Hyssop',

        url:
          [
            'https://',
            'plants.ces.ncsu.edu/plants/hyssopus-officinalis/'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 24,

      idealTempRange:
        '10–24°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 600–1000 mm, with an absolute range of about 400–1500 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 5.5–8.5.',

      soilNote:
        'Hyssop prefers well-drained soil and performs well in comparatively dry conditions. FAO ECOCROP lists light to medium soil textures with good to excessive drainage among its optimal conditions, while North Carolina State University Extension lists loam, sand, and shallow rocky soils as suitable.',

      plantingNote:
        'Hyssop is a perennial culinary and aromatic herb that may be propagated from seed, stem cuttings, or division. North Carolina State University Extension lists all three propagation strategies. Current Kew taxonomy accepts Dracocephalum officinale, while the familiar name Hyssopus officinalis used by FAO ECOCROP and many horticultural references is treated as a synonym.',

      harvestNote:
        'Hyssop has edible leaves, young shoot tips, and flowers that are used as culinary flavoring. Washington State University Extension recommends harvesting Hyssop around the full-flowering stage when collecting the herb for its aromatic qualities. Because this harvest cue is based on plant development rather than one fixed interval from seed, cutting, or division, FarmCast keeps Hyssop as guidance-only.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Hyssopus officinalis — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=6852'
          ].join('')
      }
    },

    {
      name: 'Chervil',
      scientificName: 'Anthriscus cerefolium (L.) Hoffm.',
      category: 'herb',
      icon: 'assets/crops/chervil.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Anthriscus cerefolium — Chervil',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Anthriscus_cerefolium_(PROSEA)'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Chervil is a cool-growing herb that is sensitive to heat. PROSEA reports poor growth under hot, dry conditions and recommends protection from direct sunlight; in tropical regions it is normally grown in cooler high-altitude locations.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Chervil requires consistently moist growing conditions, but FarmCast avoids converting irrigation or site-specific rainfall observations into a universal annual rainfall range.',

      soilPH:
        'About pH 6.5.',

      soilNote:
        'Chervil prefers moist soil rich in organic matter. It performs best under cool conditions and benefits from protection against intense direct sunlight, particularly in warm tropical environments.',

      plantingNote:
        'Chervil is propagated by seed and is best direct-seeded. PROSEA recommends sowing seed in shallow drills and notes that the young seedlings are too fragile for reliable transplanting. University extension guidance likewise recommends direct sowing because Chervil does not transplant well.',

      harvestNote:
        'Chervil is an edible culinary herb grown mainly for its tender leaves and stems. PROSEA reports that leaves and stems are harvested as needed before flower buds open. Sowing-to-harvest can be as short as about six weeks under greenhouse conditions, while field production may take substantially longer. Because the six-week figure is production-system specific and field harvest is governed by leaf tenderness and pre-flowering stage rather than one universal interval, FarmCast keeps Chervil as guidance-only.',

      source: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Anthriscus cerefolium — Chervil',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Anthriscus_cerefolium_(PROSEA)'
          ].join('')
      }
    },

    {
      name: 'Arugula',
      scientificName: 'Eruca sativa Mill.',
      category: 'vegetable',
      icon: 'assets/crops/arugula.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Illinois Extension',

        title:
          'Arugula: A New Trendy Green from the Old World',

        url:
          [
            'https://',
            'extension.illinois.edu/blogs/good-growing/2018-11-07-arugula-new-trendy-green-old-world'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 25,

      idealTempRange:
        '15–25°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 500–900 mm, with an absolute range of about 300–1100 mm.',

      soilPH:
        'Optimal pH 7.0–8.0; absolute range 6.0–8.5.',

      soilNote:
        'Arugula performs best in well-drained light- to medium-textured soil under bright growing conditions. FAO ECOCROP lists moderate soil fertility, good drainage, and light to medium soil texture among its preferred ecological conditions.',

      plantingNote:
        'Arugula is a fast-growing annual leafy vegetable that is readily established by direct seeding. University of Illinois Extension recommends sowing seed directly in the ground, and University of Minnesota Extension likewise lists Arugula among crops typically direct-seeded for leafy harvest.',

      harvestNote:
        'Arugula is harvested primarily for its tender peppery leaves. University of Illinois Extension reports that summer-grown Arugula may be harvested within about 20 days after seeding, while spring and fall crops are generally harvested about 30–40 days after seeding. FarmCast therefore uses a broad 20–40 day first-harvest estimate for direct-seeded Arugula, with actual timing depending on temperature, season, cultivar, and desired leaf size.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Eruca sativa — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=5794'
          ].join('')
      }
    },

    {
      name: 'Garden Sorrel',
      scientificName: 'Rumex acetosa L.',
      category: 'vegetable',
      icon: 'assets/crops/sorrel.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        },
        {
          value: 'root-divisions',
          label: 'Root Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Sorrel',

        url:
          [
            'https://',
            'www.rhs.org.uk/herbs/sorrel/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'No single universal numeric temperature range is used. Kew describes Rumex acetosa as a perennial of the temperate biome, while PROSEA reports that Rumex can be cultivated in tropical regions at higher altitudes. FarmCast therefore keeps temperature guidance descriptive rather than inventing a tropical numeric range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. PROSEA records Rumex acetosa from humid meadows and states that Rumex grown as a vegetable requires frequent watering, while RHS recommends moisture-retentive soil and consistent moisture during establishment.',

      soilPH:
        'Acid to neutral.',

      soilNote:
        'Garden Sorrel grows well in fertile, moisture-retentive soil and tolerates several soil types. RHS recommends well-prepared soil that retains moisture without remaining waterlogged, while PROSEA notes successful tropical cultivation at higher altitudes in fertile soils.',

      plantingNote:
        'Garden Sorrel is a perennial leafy vegetable that can be established by direct seeding, by raising seedlings indoors and transplanting them, or by dividing established plants. RHS describes all three approaches and notes that established clumps can be divided periodically to maintain productivity.',

      harvestNote:
        'Garden Sorrel is harvested for its tender sour leaves. RHS recommends picking young leaves regularly once new growth is available because repeated harvesting encourages fresh tender foliage, while older leaves become tougher and more bitter. Because harvest is repeated and based on leaf stage and seasonal growth rather than one fixed interval from sowing, transplanting, or division, FarmCast keeps Garden Sorrel as guidance-only.',

      source: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Rumex acetosa — Sorrel',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Rumex_acetosa_(PROSEA)'
          ].join('')
      }
    },

    {
      name: 'Purslane',
      localName: 'Golasiman',
      scientificName: 'Portulaca oleracea L.',
      category: 'vegetable',
      icon: 'assets/crops/purslane.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Portulaca L. — Purslane',

        url:
          [
            'https://',
            'prosea.prota4u.org/view.aspx?id=2191'
          ].join('')
      },

      minTemp: 18,
      maxTemp: 32,

      idealTempRange:
        '18–32°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 1000–2000 mm, with an absolute range of about 500–4000 mm.',

      soilPH:
        'Optimal pH 5.5–7.0; absolute range 4.3–8.3.',

      soilNote:
        'Purslane performs best in well-drained light- to medium-textured soil with good fertility. FAO ECOCROP lists high soil fertility and well-drained light to medium soils among its optimal conditions, while PROSEA notes that purslanes tolerate a wide range of soils but prefer sand or sandy loams.',

      plantingNote:
        'Purslane is an annual leafy vegetable commonly established by seed. PROSEA reports that cultivated Purslane is propagated by seed and that the very small seeds may be mixed with sand before being broadcast or direct-seeded in rows. In the Philippines, PROSEA records Golasiman as a Tagalog vernacular name for Portulaca oleracea.',

      harvestNote:
        'Purslane is harvested for its edible tender leaves and young shoots. PROSEA reports that commercial crops may be harvested by uprooting or by successive cuts, with the first cut about 3–4 weeks after sowing and later cuts at about two-week intervals. FarmCast therefore uses a 21–28 day first-harvest estimate for direct-seeded Purslane; later harvests remain repeated-cut guidance rather than separate automatic maturity dates.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Portulaca oleracea — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=1784'
          ].join('')
      }
    },

    {
      name: 'Garden Cress',
      scientificName: 'Lepidium sativum L.',
      category: 'vegetable',
      icon: 'assets/crops/garden-cress.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia',

        office:
          'PROSEA',

        title:
          'Lepidium sativum — Garden Cress',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/Lepidium_sativum_(PROSEA)'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. PROSEA reports that Garden Cress grows best in the cool season in tropical regions and can be grown in full sun or partial shade; University of Arkansas Extension likewise classifies it as a cool-season annual.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. PROSEA describes Garden Cress as thriving on rich, light, moisture-retentive soils and growing best on moist loams, while University of Arkansas Extension lists its moisture requirement as moist. FarmCast therefore keeps rainfall guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Recommended pH 6.0–7.5.',

      soilNote:
        'Garden Cress prefers loamy, moisture-retentive soil. University of Arkansas Extension lists loam and moist conditions, while PROSEA describes rich, light, moisture-retentive soils and moist loams as especially suitable.',

      plantingNote:
        'Garden Cress is an annual leafy vegetable propagated by seed. PROSEA reports direct sowing for culinary production, with seed sown thickly in rows, while University of Arkansas Extension recommends shallow seed sowing. FarmCast therefore uses direct-seeded as the supported establishment method.',

      harvestNote:
        'Garden Cress is eaten as sprouts, young leaves, and leafy shoots. PROSEA recommends harvesting culinary leaves before flowering and notes that sprouts are harvested only a few days after germination, while University of Arkansas Extension recommends picking leaves when they are about 3–5 inches long or cutting the entire plant before seedstalks form. Because harvest timing changes with the intended stage and no single universal field sowing-to-harvest interval is given by these sources, FarmCast keeps Garden Cress as guidance-only.',

      source: {
        agency:
          'University of Arkansas Division of Agriculture Research & Extension',

        title:
          'Garden Cress — Home Gardening Series FSA6084',

        url:
          [
            'https://',
            'www.uaex.uada.edu/publications/pdf/FSA-6084.pdf'
          ].join('')
      }
    },

    {
      name: 'Upland Cress',
      scientificName: 'Barbarea verna (Mill.) Asch.',
      category: 'vegetable',
      icon: 'assets/crops/upland-cress.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Upland Cress—Barbarea verna (Mill.) Aschers.',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/es/archived-publications'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. University of Florida IFAS Extension recommends growing Upland Cress during the coolest months, while Kentucky State University reports a preferred seed-germination temperature range of about 10–22°C. FarmCast does not treat the germination range as a universal crop-growth temperature requirement.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Florida IFAS Extension recommends sowing into moist soil, while Kentucky State University describes rich, moist, well-drained soil as preferred. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Ideal pH 6.0–7.0.',

      soilNote:
        'Upland Cress can be grown on ordinary garden soils but performs best where moisture is maintained without waterlogging. Kentucky State University recommends rich, moist, well-drained soil, while University of Florida IFAS Extension notes that it does not require the aquatic conditions needed by Watercress.',

      plantingNote:
        'Upland Cress is an edible cool-season leafy green established from seed. University of Florida IFAS Extension recommends shallow sowing directly into moist, prepared soil followed by thinning, so FarmCast uses direct-seeded as the supported establishment method. It is distinct from Garden Cress (Lepidium sativum) and Watercress (Nasturtium officinale).',

      harvestNote:
        'Upland Cress is harvested for its edible peppery leaves, which may be eaten raw or cooked. University of Florida IFAS Extension recommends beginning leaf harvest once plants are well established at about 4 inches tall, leaving the stem and roots intact for repeated picking; the entire plant may also be harvested. Because harvest is based on plant size and establishment rather than one exact sowing-to-harvest interval, FarmCast keeps Upland Cress as guidance-only.',

      source: {
        agency:
          'Kentucky State University Cooperative Extension',

        office:
          'Urban Agriculture',

        title:
          'Upland Cress — Cooperative Fact Sheet',

        url:
          [
            'https://',
            'www.kysu.edu/documents/college-of-agriculture-communities-the-sciences/urban-ag/2025-05-Factsheet-Upland%20Cress.pdf'
          ].join('')
      }
    },

    {
      name: 'New Zealand Spinach',
      scientificName: 'Tetragonia tetragonoides (Pall.) Kuntze',
      category: 'vegetable',
      icon: 'assets/crops/new-zealand-spinach.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow New Zealand Spinach in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/new-zealand-spinach-in-the-garden'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm-season conditions. Utah State University Extension describes New Zealand Spinach as a warm-season vegetable that grows well in hot, dry conditions and recommends outdoor planting only after danger of frost has passed. FarmCast keeps temperature guidance descriptive because the source does not provide one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Utah State University Extension describes New Zealand Spinach as drought tolerant but recommends consistent watering for the best leaf quality and flavor. FarmCast therefore keeps moisture guidance descriptive rather than converting irrigation advice into an annual rainfall value.',

      soilPH:
        'Recommended pH 6.8–7.0.',

      soilNote:
        'New Zealand Spinach prefers well-drained sandy soil that is rich in organic matter. Utah State University Extension recommends incorporating organic matter before planting and notes that the crop can also grow successfully in more alkaline soils.',

      plantingNote:
        'New Zealand Spinach may be established either by direct seeding after danger of frost has passed or by starting seed indoors about 3–4 weeks before the last frost and transplanting outdoors afterward. Utah State University Extension also recommends soaking the slow-germinating seed in water for about 24 hours before planting.',

      harvestNote:
        'New Zealand Spinach is harvested for its tender young leaves and growing tips. Utah State University Extension reports about 50–70 days from seed to harvest and recommends regular trimming to encourage continued tender growth. FarmCast uses that 50–70 day source-backed interval only for direct-seeded plants. For transplanted plants, the published countdown begins from seed rather than from the transplanting date, so no transplant-specific automatic harvest estimate is assigned.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow New Zealand Spinach in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/new-zealand-spinach-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Endive',
      scientificName: 'Cichorium endivia L.',
      category: 'vegetable',
      icon: 'assets/crops/endive.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Mississippi State University Extension',

        title:
          'Endive, Escarole',

        url:
          [
            'https://',
            'extension.msstate.edu/lawn-and-garden/vegetable-gardens/endive-escarole'
          ].join('')
      },

      minTemp: 15,
      maxTemp: 23,

      idealTempRange:
        '15–23°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 1000–1400 mm, with an absolute range of about 300–2500 mm.',

      soilPH:
        'Optimal pH 6.5–7.8; absolute range 5.3–8.5.',

      soilNote:
        'Endive prefers fertile, well-drained soil with good moisture availability. FAO ECOCROP lists medium- to organic-textured soils, high fertility, and good drainage among its optimal ecological conditions.',

      plantingNote:
        'Endive is a cool-season leafy vegetable that may be established by direct seeding or by transplanting seedlings. Mississippi State University Extension recommends transplants for spring crops and direct seeding for fall crops. Escarole is a broad-leaved form of the same cultivated species rather than a separate species.',

      harvestNote:
        'Endive is harvested for its edible leafy rosette. FAO ECOCROP reports that leaves may be harvested after about 40 days and developed heads after about 55–90 days. Florida IFAS gives a standard garden harvest range of about 60–80 days from seeding. FarmCast therefore uses the explicit 60–80 day seeding-to-harvest range for direct-seeded Endive, while transplanted crops remain guidance-only because the cited source does not provide a separate transplant-to-harvest interval.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cichorium endivia — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=693'
          ].join('')
      }
    },

    {
      name: 'Corn Salad',
      scientificName: 'Valeriana locusta L.',
      category: 'vegetable',
      icon: 'assets/crops/corn-salad.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Lamb\'s Lettuce in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/lambs-lettuce-in-the-garden'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. Utah State University Extension recommends direct seeding when soil temperatures are about 5–20°C (41–68°F) and reports that Lamb\'s Lettuce grows best when air temperatures do not exceed about 24°C (75°F). Because the first range refers specifically to seed-germination soil temperature rather than a universal crop-growth range, FarmCast keeps minTemp and maxTemp unset.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Utah State University Extension recommends regular watering of about 1–2 inches per week, adjusted for soil type and temperature, and warns that moisture fluctuations reduce leaf quality. FarmCast does not convert irrigation guidance into an invented annual rainfall requirement.',

      soilPH:
        'Recommended pH 6.0–7.0.',

      soilNote:
        'Corn Salad prefers fertile, well-drained soil rich in organic matter. Utah State University Extension recommends maintaining consistent soil moisture while avoiding conditions that interfere with healthy establishment and leaf development.',

      plantingNote:
        'Corn Salad is a cool-season leafy vegetable that may be direct-seeded or grown from transplants. Utah State University Extension supports both establishment methods. Many horticultural references use the scientific name Valerianella locusta, but current Kew taxonomy accepts Valeriana locusta L. and treats Valerianella locusta as a synonym.',

      harvestNote:
        'Corn Salad is harvested for its tender edible leaf rosettes. Utah State University Extension reports that harvest can begin about 2–3 weeks after emergence or transplanting and that individual leaves or the entire small rosette may be harvested. Washington State University Extension lists direct-seeded Corn Salad at about 45–55 days to harvest. FarmCast therefore uses a 45–55 day direct-seeded estimate and a separate 14–21 day estimate after transplanting.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Lamb\'s Lettuce in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/lambs-lettuce-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Radicchio',
      scientificName: 'Cichorium intybus L.',
      category: 'vegetable',
      icon: 'assets/crops/radicchio.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Oregon State University',

        office:
          'Oregon Vegetables',

        title:
          'Radicchio',

        url:
          [
            'https://',
            'horticulture.oregonstate.edu/oregon-vegetables/radicchio-0'
          ].join('')
      },

      minTemp: 10,
      maxTemp: 30,

      idealTempRange:
        '10–30°C',

      rainfallRange:
        'FAO ECOCROP lists optimal annual rainfall of about 1500–2500 mm, with an absolute range of about 300–4000 mm.',

      soilPH:
        'Optimal pH 6.0–7.5; absolute range 4.5–8.3.',

      soilNote:
        'Radicchio performs best in fertile soils that retain adequate moisture while maintaining good internal drainage. Oregon State University recommends loose fertile loams or muck soils with good water-holding capacity and drainage, while FAO ECOCROP lists medium-textured, well-drained soil among the preferred ecological conditions of Cichorium intybus.',

      plantingNote:
        'Radicchio is a cultivated leafy form of Cichorium intybus that can be established either by direct seeding or by transplanting seedlings. Oregon State University describes both production methods and recommends cool-season production. Current Kew taxonomy accepts Cichorium intybus L.; Radicchio belongs to cultivated salad forms of that species rather than representing a separate botanical species.',

      harvestNote:
        'Radicchio is harvested primarily for its compact edible leafy head. University of California guidance reports a growing period of about 80–85 days in the Salinas Valley, but also distinguishes forcing and nonforcing types and notes substantial variety and seasonal effects on head formation. Because that timing is production-system and cultivar dependent rather than one universal sowing- or transplanting-to-harvest interval, FarmCast keeps Radicchio as guidance-only.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        office:
          'FAO ECOCROP',

        title:
          'Cichorium intybus — ECOCROP Data Sheet',

        url:
          [
            'https://',
            'ecocrop.apps.fao.org/ecocrop/srv/en/dataSheet?id=694'
          ].join('')
      }
    },

    {
      name: 'Salsify',
      scientificName: 'Tragopogon porrifolius L.',
      category: 'root-crop',
      icon: 'assets/crops/salsify.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Black Salsify in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/black-salsify-in-the-garden'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. Utah State University Extension classifies Salsify as a cool-season crop and recommends sowing as soon as the soil can be worked. FarmCast does not assign a universal numeric crop-growth temperature range because the cited source does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Utah State University Extension recommends maintaining consistently moist but not wet soil and supplying about 1–2 inches of water per week. FarmCast does not convert irrigation guidance into an invented annual rainfall range.',

      soilPH:
        'Recommended pH 6.0–8.0.',

      soilNote:
        'Salsify prefers deep, fine-textured, well-drained soil with good water-holding capacity. Utah State University Extension recommends deeply prepared, loose soil with stones and other obstructions removed so the edible taproot can develop straight with minimal deformity.',

      plantingNote:
        'Salsify is a cool-season root vegetable established by direct seeding. Utah State University Extension recommends sowing seed directly into workable soil and notes that transplants are unnecessary. Current Kew taxonomy accepts Tragopogon porrifolius L. as the species name.',

      harvestNote:
        'Salsify is cultivated primarily for its edible pale taproot, while young leaves may also be eaten. Washington State University Extension lists direct-seeded Salsify at about 110–150 days to harvest, while Utah State University Extension describes regular Salsify as requiring roughly a 120-day growing period. FarmCast therefore uses the broader 110–150 day source-backed harvest window after seeding.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Black Salsify in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/black-salsify-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Black Salsify',
      scientificName:
        'Pseudopodospermum hispanicum (L.) Zaika, Sukhor. & N.Kilian',
      category: 'root-crop',
      icon: 'assets/crops/black-salsify.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Black Salsify in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/black-salsify-in-the-garden'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. Utah State University Extension describes Black Salsify as a cool-season root vegetable and recommends sowing as soon as the soil can be worked. FarmCast keeps the temperature guidance descriptive because the source does not provide one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Utah State University Extension recommends maintaining evenly moist soil with about 1–2 inches of water per week. FarmCast does not convert irrigation guidance into an invented annual rainfall value.',

      soilPH:
        'Recommended pH 6.0–8.0.',

      soilNote:
        'Black Salsify prefers deep, fine-textured, well-drained soil with good water-holding capacity. Utah State University Extension recommends deeply prepared loose soil and removal of stones or other obstructions so the long edible taproot can develop straight with fewer deformities.',

      plantingNote:
        'Black Salsify is established by direct seeding; Utah State University Extension specifically states that there is no need to grow transplants. Many horticultural references still use the traditional name Scorzonera hispanica, but current Kew taxonomy accepts Pseudopodospermum hispanicum (L.) Zaika, Sukhor. & N.Kilian and treats Scorzonera hispanica L. as a synonym.',

      harvestNote:
        'Black Salsify is grown primarily for its long dark edible taproot, while young leaves can also be eaten. Utah State University Extension reports that the crop requires about a 120-day cool-season growing period and is harvested in fall or early spring. FarmCast therefore uses a 120-day automatic harvest estimate after direct seeding.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Black Salsify in Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/black-salsify-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Good King Henry',
      scientificName: 'Blitum bonus-henricus (L.) Rchb.',
      category: 'vegetable',
      icon: 'assets/crops/good-king-henry.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Blitum bonus-henricus — Good King Henry',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/525046/blitum-bonus-henricus/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial conditions. Kew identifies Good King Henry as a perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained or well-drained growing conditions. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Good King Henry grows in fertile, well-drained soil and can tolerate chalk, clay, loam, or sandy soil. The Royal Horticultural Society recommends a sunny or semi-shaded position and adequately drained fertile ground.',

      plantingNote:
        'Good King Henry is a perennial edible leafy vegetable that can be propagated from seed. Current Kew taxonomy accepts Blitum bonus-henricus (L.) Rchb.; the older name Chenopodium bonus-henricus L. is treated as a synonym.',

      harvestNote:
        'Good King Henry is grown for edible young leaves, shoots, and flower buds. The Royal Horticultural Society recommends harvesting leaves as required and picking only lightly during the first year so plants can establish. Because harvest is repeated, stage-based, and dependent on plant establishment rather than one exact sowing-to-harvest interval, FarmCast keeps this crop as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Blitum bonus-henricus — Good King Henry',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/525046/blitum-bonus-henricus/details'
          ].join('')
      }
    },

    {
      name: 'Sea Kale',
      scientificName: 'Crambe maritima L.',
      category: 'vegetable',
      icon: 'assets/crops/sea-kale.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'root-cuttings',
          label: 'Root Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Crambe maritima — Sea Kale',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/4710/crambe-maritima/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial conditions. Kew identifies Sea Kale as a perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cultivation sources do not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Vermont guidance describes established Sea Kale as drought-tolerant and notes that supplemental irrigation is mainly needed during establishment or extended dry periods. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Sea Kale prefers well-drained soil and is particularly suited to sandy or sandy-loam conditions. University of Vermont emphasizes that good drainage is important, while the Royal Horticultural Society notes that the plant naturally occurs in coastal shingle and sand and performs well in well-drained soil.',

      plantingNote:
        'Sea Kale is an edible perennial vegetable that can be propagated from seed or root cuttings. Royal Horticultural Society guidance supports sowing seed in spring or autumn and taking root cuttings in winter. University of Vermont also documents root-cutting propagation, including direct planting into beds or potting for later transplanting.',

      harvestNote:
        'Sea Kale is harvested mainly for its tender young spring shoots, flower buds, and young leaves. University of Vermont describes harvesting from established plants, while Royal Horticultural Society guidance notes that young shoots and leaves are edible. Because productive harvest depends on perennial establishment, shoot stage, and repeated seasonal cutting rather than one universal sowing-to-harvest interval, FarmCast keeps Sea Kale as guidance-only.',

      source: {
        agency:
          'University of Vermont Extension',

        office:
          'Center for Sustainable Agriculture',

        title:
          'Sea Kale — Crambe maritima Perennial Vegetable Grow Guide',

        url:
          [
            'https://',
            'www.uvm.edu/sites/default/files/The-Center-for-Sustainable-Agriculture/resources/seakale_grow_guide.pdf'
          ].join('')
      }
    },

    {
      name: 'Miner\'s Lettuce',
      scientificName: 'Claytonia perfoliata Donn ex Willd.',
      category: 'vegetable',
      icon: 'assets/crops/miners-lettuce.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Johnny\'s Selected Seeds',

        title:
          'Claytonia — Key Growing Information',

        url:
          [
            'https://',
            'www.johnnyseeds.com/growers-library/vegetables/greens/claytonia-key-growing-information.html'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season conditions. University of California IPM describes Miner\'s Lettuce as a winter annual that prefers cool, damp conditions and declines as hot spring weather arrives. FarmCast therefore keeps the crop-growth temperature guidance descriptive rather than assigning an unsupported universal numeric range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of California IPM associates Miner\'s Lettuce with cool, damp habitats, while cultivation guidance recommends maintaining consistent moisture. FarmCast does not convert watering guidance into an invented annual rainfall range.',

      soilPH:
        'No exact source-backed numeric pH range used.',

      soilNote:
        'Miner\'s Lettuce performs best in moist, well-drained soil under cool conditions. It naturally occurs in woodland, forest, garden, agricultural, and other damp habitats and tolerates partial shade.',

      plantingNote:
        'Miner\'s Lettuce is a cool-season annual leafy vegetable. Direct seeding is recommended, although carefully raised seedlings may also be transplanted once their roots have filled the container. Current Kew taxonomy accepts Claytonia perfoliata Donn ex Willd.; Limnia perfoliata and Montia perfoliata are treated as synonyms.',

      harvestNote:
        'Miner\'s Lettuce is harvested for its tender edible leaves and young rosettes. Baby leaves may be cut above the basal plate for repeated harvest, while whole rosettes may be harvested below the basal plate. Because harvest timing depends on whether the crop is grown for baby leaves or mature rosettes rather than one universal sowing-to-harvest interval, FarmCast keeps Miner\'s Lettuce as guidance-only.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Statewide Integrated Pest Management Program',

        title:
          'Miner\'s Lettuce — Weeds Identification Gallery',

        url:
          [
            'https://',
            'ipm.ucanr.edu/weeds-identification-gallery/miners-lettuce/'
          ].join('')
      }
    },

    {
      name: 'Skirret',
      scientificName: 'Sium sisarum L.',
      category: 'root-crop',
      icon: 'assets/crops/skirret.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'divisions',
          label: 'Clump Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Sium sisarum — Skirret',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/82232/sium-sisarum/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial conditions. Kew identifies Skirret as a tuberous perennial species of the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cultivation source does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moisture-retentive but well-drained soil and watering during dry spells when the roots are being grown for food. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Skirret prefers deep, fertile, moisture-retentive but well-drained soil in a sunny position. Royal Horticultural Society guidance lists chalk, clay, loam, and sandy soils as suitable when moisture and drainage are managed appropriately.',

      plantingNote:
        'Skirret is a perennial edible root vegetable that may be established from seed. Established clumps can also be lifted and divided while dormant, with selected sections replanted. Current Kew taxonomy accepts Sium sisarum L.; older names such as Apium sisarum, Carum sisarum, Pimpinella sisarum, Selinum sisarum, and Seseli sisarum are treated as synonyms.',

      harvestNote:
        'Skirret is harvested for its clusters of edible white roots. Royal Horticultural Society guidance recommends lifting roots while the plant is dormant, from autumn into early spring. Because harvest depends on perennial establishment, dormancy, and season rather than one universal sowing-to-harvest countdown, FarmCast keeps Skirret as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Sium sisarum — Skirret',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/82232/sium-sisarum/details'
          ].join('')
      }
    },

    {
      name: 'Alexanders',
      scientificName: 'Smyrnium olusatrum L.',
      category: 'vegetable',
      icon: 'assets/crops/alexanders.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Smyrnium olusatrum — Alexanders',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/17434/smyrnium-olusatrum/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate biennial or perennial conditions. Kew identifies Alexanders as a biennial or perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained or well-drained growing conditions. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Alexanders performs best in free-draining soil and full sun. Royal Horticultural Society guidance lists chalk, clay, loam, and sandy soils as suitable and notes that the plant performs well in coastal conditions.',

      plantingNote:
        'Alexanders is an edible biennial or short-lived perennial vegetable propagated from seed. Current Kew taxonomy accepts Smyrnium olusatrum L.; Smyrnium maritimum Salisb. and Smyrnium vulgare Gray are treated as synonyms.',

      harvestNote:
        'Alexanders has historically been cultivated as a pot-herb, and its tender leaves, young shoots, stems, and other young parts have been eaten as vegetables. Harvest is based on the tender vegetative stage and season rather than one universal sowing-to-harvest interval. FarmCast therefore keeps Alexanders as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Smyrnium olusatrum — Alexanders',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/17434/smyrnium-olusatrum/details'
          ].join('')
      }
    },

    {
      name: 'Sculpit',
      scientificName: 'Silene vulgaris (Moench) Garcke',
      category: 'vegetable',
      icon: 'assets/crops/sculpit.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Silene vulgaris — Bladder Campion',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/100957/silene-vulgaris/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial conditions. Kew identifies Silene vulgaris as a perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Missouri Botanical Garden describes Silene vulgaris as growing well under dry-to-medium moisture conditions and emphasizes good drainage. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers neutral to alkaline soil.',

      soilNote:
        'Sculpit grows well in moderately fertile soil under full sun or dappled shade. Royal Horticultural Society guidance recommends neutral to alkaline conditions, while Missouri Botanical Garden notes that sandy, gravelly, or light loam soils with good drainage are suitable.',

      plantingNote:
        'Sculpit is an edible perennial herb that can be propagated from seed. Royal Horticultural Society guidance recommends sowing seed in containers in a cold frame in autumn. Current Kew taxonomy accepts Silene vulgaris (Moench) Garcke; older names including Behen vulgaris, Cucubalus behen, Lychnis behen, Oberna behen, and Silene cucubalus are treated as synonyms.',

      harvestNote:
        'Sculpit is harvested for its tender edible leaves and young shoots, which have a long history of culinary use in parts of the Mediterranean. Because harvesting is based on young vegetative growth and repeated leaf or shoot collection rather than one universal sowing-to-harvest interval, FarmCast keeps Sculpit as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Silene vulgaris — Bladder Campion',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/100957/silene-vulgaris/details'
          ].join('')
      }
    },

    {
      name: 'Rampion',
      scientificName: 'Campanula rapunculus L.',
      category: 'root-crop',
      icon: 'assets/crops/rampion.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Campanula rapunculus — Rampion',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/41753/campanula-rapunculus/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate biennial conditions. Kew identifies Rampion as a biennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation sources do not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends well-drained soil and protection from excessive winter wet. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers neutral to alkaline soil.',

      soilNote:
        'Rampion performs well in well-drained soil under full sun or partial shade. Royal Horticultural Society guidance lists chalk, loam, and sandy soils as suitable and advises avoiding excessive winter wet.',

      plantingNote:
        'Rampion is a biennial edible vegetable propagated from seed. University of Florida IFAS describes it as a biennial that has historically been cultivated as an annual vegetable, with cultivation practices similar to radish. Current Kew taxonomy accepts Campanula rapunculus L.; Campanula esculenta, Campanula patula var. rapunculus, Campanula racemosa var. paniculiformis, and Neocodon rapunculus are treated as synonyms.',

      harvestNote:
        'Rampion is cultivated for its edible fleshy roots and leaves. University of Florida IFAS describes the white roots as edible raw or cooked, while ethnobotanical literature documents both roots and leaves as traditional foods. Because the sources do not provide one universal sowing-to-harvest interval and harvest stage differs between leaves and roots, FarmCast keeps Rampion as guidance-only.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Rampion — Campanula rapunculus L.',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/archived-publications'
          ].join('')
      }
    },

    {
      name: 'Garden Orach',
      scientificName: 'Atriplex hortensis L.',
      category: 'vegetable',
      icon: 'assets/crops/garden-orach.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Atriplex hortensis — Garden Orache',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/84645/atriplex-hortensis/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate annual conditions. Kew identifies Garden Orach as an annual species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering freely during dry weather to reduce stress and premature bolting. FarmCast therefore keeps water guidance descriptive rather than converting irrigation advice into an invented annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Garden Orach performs well in well-drained soil under full sun. Royal Horticultural Society guidance lists loam and sandy soils as suitable and recommends maintaining adequate moisture during dry weather.',

      plantingNote:
        'Garden Orach is an annual leafy vegetable propagated from seed. Current Kew taxonomy accepts Atriplex hortensis L.; older names including Chenopodium hortense, Atriplex atrosanguinea, Atriplex purpurea, Atriplex ruberrima, and Atriplex virgata are treated as synonyms.',

      harvestNote:
        'Garden Orach is grown for its tender young leaves, which may be eaten as a spinach-like leafy vegetable. Leaves can be collected while young and tender, with repeated picking possible as the plant continues producing foliage. Because harvest depends on leaf stage and repeated picking rather than one universal sowing-to-harvest interval, FarmCast keeps Garden Orach as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Atriplex hortensis — Garden Orache',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/84645/atriplex-hortensis/details'
          ].join('')
      }
    },

    {
      name: 'Common Scurvygrass',
      scientificName: 'Cochlearia officinalis L.',
      category: 'vegetable',
      icon: 'assets/crops/common-scurvygrass.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Cochlearia officinalis — Common Scurvygrass',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/4056/cochlearia-officinalis/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate biennial or perennial conditions. Kew identifies Common Scurvygrass as a biennial or perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained growing conditions and notes that Common Scurvygrass thrives in saline environments when adequate moisture is available. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers neutral to alkaline soil.',

      soilNote:
        'Common Scurvygrass grows well in moist but well-drained loam or sandy soil under full sun or partial shade. Royal Horticultural Society guidance also notes its adaptation to saline coastal environments.',

      plantingNote:
        'Common Scurvygrass is an edible temperate herb propagated by sowing seed outdoors. Current Kew taxonomy accepts Cochlearia officinalis L.; Cochlearia officinalis var. typica, Cochlearia rotundifolia, and Crucifera cochlearia var. officinalis are treated as synonyms.',

      harvestNote:
        'Common Scurvygrass is harvested for its edible succulent leaves. Grand Valley State University recommends harvesting young leaves in early spring, when they are less bitter than older summer leaves, and notes that the leaves may be eaten raw or boiled. Because harvest is based on young leaf stage and seasonal quality rather than one universal sowing-to-harvest interval, FarmCast keeps Common Scurvygrass as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Cochlearia officinalis — Common Scurvygrass',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/4056/cochlearia-officinalis/details'
          ].join('')
      }
    },

    {
      name: 'Salad Burnet',
      scientificName: 'Sanguisorba minor Scop.',
      category: 'herb',
      icon: 'assets/crops/salad-burnet.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'divisions',
          label: 'Clump Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Sanguisorba minor — Salad Burnet',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/24957/sanguisorba-minor/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial conditions. Kew identifies Salad Burnet as a perennial species primarily associated with the temperate biome. FarmCast does not assign a universal numeric crop-growth temperature range because the cited cultivation guidance does not provide one.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends well-drained growing conditions, while North Carolina Extension notes that the plant does not tolerate prolonged drought well. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers neutral to alkaline soil.',

      soilNote:
        'Salad Burnet tolerates a range of soil textures including chalk, clay, loam, and sand, but performs best where drainage is good. Royal Horticultural Society guidance recommends full sun and well-drained soil.',

      plantingNote:
        'Salad Burnet is an edible perennial culinary herb that may be propagated from seed or by division. Current Kew taxonomy accepts Sanguisorba minor Scop.; older names including Poterium sanguisorba, Pimpinella sanguisorba, Poterium minus, and Sanguisorba sanguisorba are treated as synonyms.',

      harvestNote:
        'Salad Burnet is harvested mainly for its edible young leaves, which have a mild cucumber-like flavour and are traditionally used in salads and as a culinary herb. North Carolina Extension notes that the youngest leaves are the tastiest and recommends cutting plants back to encourage fresh growth. Because harvest is repeated and based on young leaf stage rather than one universal sowing-to-harvest interval, FarmCast keeps Salad Burnet as guidance-only.',

      source: {
        agency:
          'North Carolina Cooperative Extension',

        office:
          'Extension Gardener Plant Toolbox',

        title:
          'Sanguisorba minor — Salad Burnet',

        url:
          [
            'https://',
            'plants.ces.ncsu.edu/plants/sanguisorba-minor/'
          ].join('')
      }
    },

    {
      name: 'Mitsuba',
      scientificName: 'Cryptotaenia japonica Hassk.',
      category: 'herb',
      icon: 'assets/crops/mitsuba.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'divisions',
          label: 'Clump Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'North Carolina Cooperative Extension',

        office:
          'Extension Gardener Plant Toolbox',

        title:
          'Cryptotaenia japonica — Mitsuba',

        url:
          [
            'https://',
            'plants.ces.ncsu.edu/plants/cryptotaenia-japonica/'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool to temperate growing conditions. Kew identifies Mitsuba as a perennial species primarily associated with the temperate biome. North Carolina Extension notes that it performs especially well in shaded conditions and that strong full sun can cause yellowing and a more bitter leaf flavor. FarmCast therefore keeps temperature guidance descriptive rather than assigning an unsupported universal numeric range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. North Carolina Extension describes Mitsuba as favoring moist growing conditions. FarmCast therefore keeps water guidance descriptive rather than converting soil-moisture requirements into an invented annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Mitsuba grows in moist clay, loam, or sandy soil and is well suited to partial shade, dappled shade, or deeper shade. North Carolina Extension notes that plants grown in strong full sun may develop yellower and more bitter foliage.',

      plantingNote:
        'Mitsuba is an edible East Asian herb and vegetable that can be propagated from seed or by division. Current Kew taxonomy accepts Cryptotaenia japonica Hassk. Older names including Cryptotaenia canadensis var. japonica, Cryptotaenia canadensis subsp. japonica, and Deringa japonica are treated as synonyms.',

      harvestNote:
        'Mitsuba is harvested mainly for its tender edible leaves and stems, which are used as a culinary herb and salad green. The roots may also be cooked as a vegetable. Because harvest is based on tender vegetative growth and may be repeated as new rosettes develop rather than following one universal sowing-to-harvest interval, FarmCast keeps Mitsuba as guidance-only.',

      source: {
        agency:
          'North Carolina Cooperative Extension',

        office:
          'Extension Gardener Plant Toolbox',

        title:
          'Cryptotaenia japonica — Mitsuba',

        url:
          [
            'https://',
            'plants.ces.ncsu.edu/plants/cryptotaenia-japonica/'
          ].join('')
      }
    },

    {
      name: 'Caucasian Spinach',
      scientificName: 'Hablitzia tamnoides M.Bieb.',
      category: 'vegetable',
      icon: 'assets/crops/caucasian-spinach.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Hablitzia tamnoides — Caucasian Spinach',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/114111/hablitzia-tamnoides/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Perennial growing conditions. Kew identifies Caucasian Spinach as a scrambling perennial primarily associated with the subtropical biome in its native range, while Royal Horticultural Society guidance documents successful cultivation as a hardy perennial. FarmCast does not convert biome or hardiness information into an unsupported universal crop-growth temperature range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained conditions and advises avoiding winter waterlogging. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers neutral to alkaline soil.',

      soilNote:
        'Caucasian Spinach performs well in moist but well-drained loam under full sun or partial shade. Royal Horticultural Society guidance recommends a sheltered site and notes that the climbing stems can be supported by a trellis, pergola, wigwam, or nearby tree.',

      plantingNote:
        'Caucasian Spinach is an edible perennial climbing vegetable propagated from seed. Current Kew taxonomy accepts Hablitzia tamnoides M.Bieb., and Hablitzia is currently treated by Kew as a genus containing this single accepted species.',

      harvestNote:
        'Caucasian Spinach is harvested for its tender edible young shoots and heart-shaped leaves. Royal Horticultural Society guidance notes that the young shoots and leaves are best harvested in spring, with tender new foliage available for picking later in the growing season. Because harvest is repeated and based on tender growth stage rather than one universal sowing-to-harvest interval, FarmCast keeps Caucasian Spinach as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Hablitzia tamnoides — Caucasian Spinach',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/114111/hablitzia-tamnoides/details'
          ].join('')
      }
    },

    {
      name: 'Agretti',
      scientificName: 'Soda inermis Fourr.',
      category: 'vegetable',
      icon: 'assets/crops/agretti.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Salsola soda — agretti',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/161061/salsola-soda/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate annual growing conditions. Kew identifies Agretti under the accepted name Soda inermis Fourr. as an annual species primarily associated with the temperate biome. Royal Horticultural Society guidance also describes it as a tender annual crop. FarmCast therefore keeps temperature guidance descriptive rather than converting biome or hardiness information into an unsupported universal ideal temperature range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist to moist but well-drained soil and advises keeping plants well watered during dry periods. FarmCast therefore keeps water guidance descriptive instead of inventing an annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Agretti grows well in loam or sandy soil in a sunny, sheltered position. Royal Horticultural Society guidance recommends moist to moist but well-drained conditions and notes that the crop can tolerate wet soil but should not remain waterlogged.',

      plantingNote:
        'Agretti is an edible annual vegetable propagated from fresh seed. Royal Horticultural Society guidance recommends starting fresh seed under glass and planting seedlings out after establishment. Current Kew taxonomy accepts Soda inermis Fourr.; the widely used name Salsola soda L., along with Kali soda and Salsola longifolia, is treated as a synonym.',

      harvestNote:
        'Agretti is harvested for its tender green shoots and succulent needle-like leaves, which are eaten as a salad crop or cooked as a vegetable. Royal Horticultural Society guidance places harvest from late spring through early autumn and recommends cutting above the growth points to encourage bushier regrowth. Because this is a seasonal and growth-stage-based harvest rather than one universal planting-to-harvest interval, FarmCast keeps Agretti as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Salsola soda — agretti',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/161061/salsola-soda/details'
          ].join('')
      }
    },

    {
      name: 'Sweet Cicely',
      scientificName: 'Myrrhis odorata (L.) Scop.',
      category: 'herb',
      icon: 'assets/crops/sweet-cicely.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'divisions',
          label: 'Clump Divisions'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Myrrhis odorata — sweet cicely',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/11303/myrrhis-odorata/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate perennial growing conditions. Kew identifies Sweet Cicely as a perennial species primarily associated with the temperate biome, while Royal Horticultural Society guidance describes it as a hardy herbaceous perennial. FarmCast therefore keeps temperature guidance descriptive rather than converting biome or hardiness information into an unsupported universal crop-growth temperature range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained growing conditions. FarmCast therefore keeps water guidance descriptive rather than converting soil-moisture guidance into an invented annual rainfall range.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Sweet Cicely grows well in moderately fertile, moist but well-drained loam and is particularly suited to partial or dappled shade. Royal Horticultural Society guidance also recommends a sheltered position.',

      plantingNote:
        'Sweet Cicely is an edible perennial culinary herb that can be propagated from seed or by division in spring or autumn. Current Kew taxonomy accepts Myrrhis odorata (L.) Scop. Older botanical names including Scandix odorata, Chaerophyllum odoratum, Lindera odorata, and Selinum myrrhis are treated as synonyms.',

      harvestNote:
        'Sweet Cicely is grown for its aromatic edible young leaves, aniseed-flavoured seeds, and roots, which may be eaten raw or cooked and used in sweet or savoury dishes. Royal Horticultural Society guidance recommends removing developing flower stalks when the plant is being grown primarily for culinary leaves to help maintain leaf quality. Because usable parts can be harvested at different growth stages and no single universal sowing-to-harvest interval is provided, FarmCast keeps Sweet Cicely as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Myrrhis odorata — sweet cicely',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/11303/myrrhis-odorata/details'
          ].join('')
      }
    },

    {
      name: 'Acerola',
      scientificName: 'Malpighia emarginata DC.',
      category: 'fruit',
      icon: 'assets/crops/acerola.svg',

      plantingMethods: [
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Growing Barbados Cherry in Florida',

        url:
          [
            'https://',
            'blogs.ifas.ufl.edu/stlucieco/2025/08/20/',
            'growing-barbados-cherry-in-florida/'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Tropical to subtropical growing conditions. Kew identifies Acerola as a shrub or small tree primarily associated with the seasonally dry tropical biome. University of Florida IFAS Extension describes Barbados cherry as a tropical and subtropical fruit crop. FarmCast therefore keeps temperature guidance descriptive rather than assigning an unsupported universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Florida IFAS Extension recommends consistent irrigation while young plants establish, with watering reduced as the plant becomes established. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Prefers slightly acidic to neutral, well-drained soil.',

      soilNote:
        'Acerola performs best in a sunny location with well-drained soil. University of Florida IFAS Extension notes that it can grow in sandy soils when drainage is good and that organic matter can improve soil structure and moisture retention.',

      plantingNote:
        'Acerola, also widely known as Barbados cherry, is an edible tropical fruit shrub or small tree. University of Florida IFAS Extension notes that plants can be propagated from seed but that cuttings or air layering are preferred when desirable fruit characteristics need to be preserved. Current Kew taxonomy accepts Malpighia emarginata DC.',

      harvestNote:
        'Acerola produces bright red edible fruits that are harvested as they ripen. University of Florida guidance notes that established plants can produce multiple fruit crops during a growing season, with production influenced by climate and growing conditions. Because fruiting occurs in repeated flushes and no single universal planting-to-harvest interval applies across propagation methods and plant ages, FarmCast keeps Acerola as guidance-only.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Growing Barbados Cherry in Florida',

        url:
          [
            'https://',
            'blogs.ifas.ufl.edu/stlucieco/2025/08/20/',
            'growing-barbados-cherry-in-florida/'
          ].join('')
      }
    },

    {
      name: 'Parsnip',
      scientificName: 'Pastinaca sativa L.',
      category: 'vegetable',
      icon: 'assets/crops/parsnip.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Parsnips',

        url:
          [
            'https://',
            'www.rhs.org.uk/vegetables/parsnips/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool to temperate growing conditions. Kew identifies Parsnip as a biennial species primarily associated with the temperate biome. Royal Horticultural Society guidance recommends waiting until soil has warmed sufficiently for reliable spring germination rather than treating one temperature as a universal crop-growth range. FarmCast therefore keeps the general temperature guidance descriptive.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering young parsnips during dry spells and keeping the soil evenly moist as roots develop to reduce splitting. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'RHS identifies an ideal soil pH of 6.5–7.0.',

      soilNote:
        'Parsnips perform best in an open, sunny position with deep, light, free-draining soil that allows the long taproot to develop without obstruction. Stones and compacted soil should be minimized because they can cause forked or distorted roots.',

      plantingNote:
        'Parsnip is an edible root vegetable grown directly from seed. Royal Horticultural Society guidance recommends sowing outdoors and specifically discourages indoor sowing because the developing taproot does not transplant well. Current Kew taxonomy accepts Pastinaca sativa L.; Anethum pastinaca, Elaphoboscum sativum, Peucedanum sativum, and Selinum pastinaca are treated as synonyms.',

      harvestNote:
        'Parsnips are harvested for their edible cream-coloured taproots. Royal Horticultural Society guidance states that roots are ready when foliage begins to die down in late summer or autumn and can remain in the ground into winter for harvesting as needed. Because readiness is seasonal and variety-dependent rather than based on one universal sowing-to-harvest day interval, FarmCast keeps Parsnip as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Parsnips',

        url:
          [
            'https://',
            'www.rhs.org.uk/vegetables/parsnips/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Cape Gooseberry',
      scientificName: 'Physalis peruviana L.',
      category: 'fruit',
      icon: 'assets/crops/cape-gooseberry.svg',

      plantingMethods: [
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Physalis peruviana — Cape gooseberry',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/87740/physalis-peruviana-f/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm growing conditions with a long growing season. Kew identifies Cape Gooseberry as a perennial species primarily associated with the seasonally dry tropical biome, while Royal Horticultural Society guidance treats it as a tender fruit crop that can be grown outdoors in suitably mild conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning an unsupported universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moist but well-drained or well-drained growing conditions. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Cape Gooseberry grows well in loam or sandy soil with good drainage and performs best in a sunny, sheltered position. The spreading branches may benefit from support as the plant develops.',

      plantingNote:
        'Cape Gooseberry is an edible fruit crop propagated from seed. Royal Horticultural Society guidance recommends sowing seed indoors and growing young plants on before moving them outdoors where conditions are suitable. Current Kew taxonomy accepts Physalis peruviana L. Historical names including Physalis edulis, Alkekengi pubescens, Boberella peruviana, Herschelia edulis, Physalis latifolia, and Physalis tomentosa are treated as synonyms.',

      harvestNote:
        'Cape Gooseberry produces edible orange berries enclosed individually in papery lantern-like husks. University of Minnesota Extension includes Physalis peruviana among cultivated ground cherries and advises harvesting this crop group when the husks have dried and the ripe fruit begins to drop. Because ripening depends on growing season, local conditions, and plant establishment rather than one universal sowing-to-harvest interval, FarmCast keeps Cape Gooseberry as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Physalis peruviana — Cape gooseberry',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/87740/physalis-peruviana-f/details'
          ].join('')
      }
    },

    {
      name: 'Oca',
      scientificName: 'Oxalis tuberosa Molina',
      category: 'vegetable',
      icon: 'assets/crops/oca.svg',

      plantingMethods: [
        {
          value: 'tubers',
          label: 'Replanted Tubers'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Oxalis tuberosa — oca',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/77011/oxalis-tuberosa/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Subtropical growing conditions. Kew identifies Oca as a tuberous geophyte primarily associated with the subtropical biome, while Royal Horticultural Society guidance recommends frost-free cultivation conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning an unsupported universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance emphasizes well-drained growing conditions rather than specifying an annual rainfall requirement. FarmCast therefore keeps water guidance descriptive.',

      soilPH:
        'Tolerates acid, neutral, or alkaline soils.',

      soilNote:
        'Oca grows in loam or sandy soil with good drainage and can be positioned in full sun or partial shade. Royal Horticultural Society guidance also recommends a sheltered growing position.',

      plantingNote:
        'Oca is an edible tuber vegetable propagated vegetatively by separating and replanting tubers. Royal Horticultural Society guidance recommends replanting tubers in autumn or spring. Current Kew taxonomy accepts Oxalis tuberosa Molina; Acetosella tuberosa and Xanthoxalis tuberosa are treated as scientific synonyms.',

      harvestNote:
        'Oca is cultivated for its edible fleshy underground tubers, which may occur in red or yellow forms. Because authoritative guidance used by FarmCast does not provide one universal tuber-planting-to-harvest day interval applicable across growing regions and conditions, Oca remains guidance-only rather than receiving an automatic Estimated Harvest rule.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Oxalis tuberosa — oca',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/77011/oxalis-tuberosa/details'
          ].join('')
      }
    },

    {
      name: 'Jaboticaba',
      scientificName: 'Plinia cauliflora (Mart.) Kausel',
      category: 'fruit',
      icon: 'assets/crops/jaboticaba.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Jaboticaba: A Unique Fruit Tree for Florida Home Gardeners',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/HS1519'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Tropical to subtropical growing conditions. Kew identifies Jaboticaba as a tree primarily associated with the seasonally dry tropical biome. University of Florida IFAS Extension describes it as a fruit tree suited to warm subtropical conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Florida IFAS Extension notes that Jaboticaba has shallow feeder roots and benefits from regular watering, particularly when container-grown or during establishment. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers acidic soil, with University of Florida IFAS Extension identifying about pH 5–6 as favorable.',

      soilNote:
        'Jaboticaba performs well in sandy or loamy soil with adequate organic matter and moisture. University of Florida IFAS Extension recommends maintaining adequate soil moisture and notes that the tree can also be grown successfully in containers because of its compact, fibrous root system.',

      plantingNote:
        'Jaboticaba is an edible tropical to subtropical fruit tree. Propagation is commonly from fresh seed, while grafting and air layering may also be used, particularly when earlier fruiting or preservation of selected plant characteristics is desired. Current Kew taxonomy accepts Plinia cauliflora (Mart.) Kausel. Myrciaria cauliflora, Eugenia cauliflora, Myrtus cauliflora, Myrcia jaboticaba, Myrciaria jaboticaba, and Plinia jaboticaba are among names treated as scientific synonyms.',

      harvestNote:
        'Jaboticaba produces round edible fruits directly on the trunk and older branches. Mature fruits develop a dark purple to nearly black skin around translucent edible pulp. Fruit-bearing age varies greatly with propagation method, cultivar, and growing conditions, with seed-grown trees generally taking substantially longer to bear than grafted or air-layered plants. Because no single universal planting-to-harvest interval applies across these propagation methods, FarmCast keeps Jaboticaba as guidance-only.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Jaboticaba: A Unique Fruit Tree for Florida Home Gardeners',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/HS1519'
          ].join('')
      }
    },

    {
      name: 'Rutabaga',
      scientificName: 'Brassica napus L.',
      category: 'vegetable',
      icon: 'assets/crops/rutabaga.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Swedes',

        url:
          [
            'https://',
            'www.rhs.org.uk/vegetables/swede/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool to temperate growing conditions. Kew identifies Brassica napus as an annual or biennial crop primarily associated with the temperate biome, while University of Minnesota Extension describes rutabagas as cold-hardy vegetables that produce their best quality in cool weather. FarmCast therefore keeps temperature guidance descriptive rather than assigning an unsupported universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Minnesota Extension notes that drought stress can cause rutabaga roots to become bitter or woody. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers slightly acidic to neutral soil, with University of Minnesota Extension recommending about pH 6.0–7.0.',

      soilNote:
        'Rutabaga performs well in fertile soil with good drainage and adequate organic matter. Royal Horticultural Society guidance recommends firm, fertile soil in full sun, while University of Minnesota Extension emphasizes maintaining adequate moisture during root development.',

      plantingNote:
        'Rutabaga, also called swede or Swedish turnip, is an edible root vegetable grown directly from seed. Royal Horticultural Society guidance recommends sowing directly outdoors. Current Kew taxonomy accepts Brassica napus L. Historical names including Brassica rutabaga, Brassica oleracea var. napobrassica, and Brassica oleracea var. suecica are treated as synonyms. Rutabaga remains distinct from FarmCast Turnip, which belongs to Brassica rapa.',

      harvestNote:
        'Rutabaga is harvested for its large edible swollen root, usually with yellow flesh. Royal Horticultural Society guidance notes that swedes may take up to six months to mature and can be harvested from early autumn onward once roots are large enough to use. University of Minnesota Extension similarly recommends leaving rutabagas to mature through summer into autumn. Because maturity varies by cultivar, sowing season, and local conditions and no single exact universal sowing-to-harvest interval is provided, FarmCast keeps Rutabaga as guidance-only.',

      source: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Turnips and Rutabagas in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/vegetables/growing-turnips-and-rutabagas'
          ].join('')
      }
    },

    {
      name: 'Apple',
      scientificName: 'Malus domestica (Suckow) Borkh.',
      category: 'fruit',
      icon: 'assets/crops/apple.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Apple Tree'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Apples',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/apples/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Apple as a tree primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a warm, sunny and sheltered planting position while avoiding sites prone to damaging late frosts. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends adequate moisture, particularly while trees establish and while fruits are developing, while also requiring soil that drains freely. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'Prefers fertile, moisture-retentive but well-drained soil. FarmCast does not store an unsupported universal numeric soil-pH target.',

      soilNote:
        'Apple trees perform best in fertile soil that drains freely and does not become waterlogged. Royal Horticultural Society guidance recommends full sun and a warm, sheltered position. Rootstock choice strongly affects the eventual size and vigour of the tree.',

      plantingNote:
        'Apple is one of the most widely cultivated edible tree fruits. Named apple cultivars are normally grown as grafted trees, with a selected fruiting cultivar joined to a rootstock that influences tree size and vigour. Current Kew taxonomy accepts Malus domestica (Suckow) Borkh.; names including Malus pumila, Malus niedzwetzkyana, Malus chitralensis and Malus sieversii are included among synonyms in the current Kew record.',

      harvestNote:
        'Apples are harvested when fruits have reached the appropriate maturity for their cultivar, generally during the fruiting season from late summer into autumn in temperate growing regions. Harvest timing differs substantially among cultivars, rootstocks, climate and planting age. Because no single universal planting-to-harvest interval applies to Apple trees, FarmCast keeps Apple as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Apples',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/apples/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Spinach',
      scientificName: 'Spinacia oleracea L.',
      category: 'vegetable',
      icon: 'assets/crops/spinach.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Spinach and Swiss Chard in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/yard-and-garden/',
            'gardening-in-minnesota/growing-spinach-and-swiss-chard'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool-season growing conditions. Kew identifies Spinach as an annual or biennial species primarily associated with the temperate biome. University of Minnesota Extension notes that increasing day length, high temperatures, and drought can accelerate bolting. FarmCast therefore keeps the general temperature guidance descriptive rather than converting regional growing guidance into one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Minnesota Extension recommends maintaining adequate and consistent soil moisture for good leaf quality and yield and to help delay bolting. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'University of Minnesota Extension recommends soil pH 6.5–8.0 for Spinach.',

      soilNote:
        'Spinach performs well in fertile soil improved with organic matter and requires adequate moisture for high-quality leafy growth. Good drainage is important, while full sun is suitable during cool conditions and some shade may be beneficial as conditions become warmer.',

      plantingNote:
        'Spinach is a familiar edible leafy vegetable normally established by direct seeding. University of Minnesota Extension recommends sowing seed directly into workable soil for spring production and sowing again for fall production. Current Kew taxonomy accepts Spinacia oleracea L. Chenopodium oleraceum is treated as a species-level synonym, while several older Spinacia names are listed under the cultivated Spinacia oleracea subsp. oleracea.',

      harvestNote:
        'Spinach is harvested for its tender edible leaves, which may be collected individually or as a whole plant. University of Minnesota Extension notes that new leaves can develop after an initial harvest, allowing repeated picking. Its 2026-reviewed commercial vegetable planning guide lists approximately 30–40 days to maturity for direct-seeded Spinach, so FarmCast can use that source-backed interval for the automatic Estimated Harvest.',

      source: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Spinach and Swiss Chard in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/yard-and-garden/',
            'gardening-in-minnesota/growing-spinach-and-swiss-chard'
          ].join('')
      }
    },

    {
      name: 'Pear',
      scientificName: 'Pyrus communis L.',
      category: 'fruit',
      icon: 'assets/crops/pear.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Pear Tree'
        },
        {
          value: 'budded-plants',
          label: 'Budded Pear Tree'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Pyrus communis — common pear',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/14227/pyrus-communis-f/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Pear as a tree primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a warm, sunny and sheltered growing position protected from damaging late frosts. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends moisture-retentive but well-drained soil and adequate watering while young trees establish and fruits develop. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Prefers fairly neutral soil. FarmCast does not assign an unsupported universal numeric soil-pH target.',

      soilNote:
        'Pear trees perform best in deep, fertile, moisture-retentive but well-drained soil in a sunny and sheltered position. Royal Horticultural Society guidance notes that very acidic soil, shallow chalky soil, prolonged shade, and waterlogged conditions are unsuitable.',

      plantingNote:
        'Pear is a familiar edible tree fruit. Named fruiting cultivars are normally propagated by grafting or budding onto a clonal rootstock rather than grown from seed, because seedlings do not reliably reproduce the characteristics of the parent cultivar. Current Kew taxonomy accepts Pyrus communis L.; Malus communis and Sorbus pyrus are treated as scientific synonyms.',

      harvestNote:
        'Pears are generally harvested from late summer into autumn depending on cultivar and local growing conditions. Royal Horticultural Society guidance recommends picking the fruit shortly before it becomes fully ripe on the tree and allowing it to finish ripening after harvest. Because harvest timing differs among cultivars, rootstocks, climate, and tree age, FarmCast keeps Pear as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Pears',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/pears/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Raspberry',
      scientificName: 'Rubus idaeus L.',
      category: 'fruit',
      icon: 'assets/crops/raspberry.svg',

      plantingMethods: [
        {
          value: 'bare-root-canes',
          label: 'Bare-Root Canes'
        },
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Raspberries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/raspberries/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Raspberry as a shrub primarily associated with the temperate biome, while Royal Horticultural Society guidance notes that raspberries grow particularly well in cooler regions. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering newly planted raspberries well during establishment and during prolonged dry spells, particularly while fruits are developing. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Royal Horticultural Society recommends slightly acidic soil, ideally about pH 6.0–6.7.',

      soilNote:
        'Raspberries prefer fertile, well-drained soil and do not tolerate waterlogged conditions. Royal Horticultural Society guidance recommends a sunny, sheltered position for the best crop, although plants can still fruit in light partial shade.',

      plantingNote:
        'Raspberry is a familiar edible soft-fruit crop. Royal Horticultural Society guidance notes that raspberry plants are commonly planted as dormant bare-root canes or as container-grown plants. Established raspberries also naturally produce suckers that may be dug up and replanted while dormant. Current Kew taxonomy accepts Rubus idaeus L.; Batidaea idaea and Rubus fragrans are treated as species-level scientific synonyms.',

      harvestNote:
        'Raspberries are harvested when the berries are richly coloured, plump, fully ripe, and pull away easily. Summer-fruiting cultivars generally crop from early to late summer, while autumn-fruiting cultivars crop from late summer into autumn. Royal Horticultural Society guidance notes that newly planted summer-fruiting raspberries usually begin fruiting from their second summer, whereas some autumn-fruiting plants can fruit in their first year. Because harvest timing depends strongly on fruiting type, cultivar, planting age, and climate, FarmCast keeps Raspberry as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Raspberries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/raspberries/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Blueberry',
      scientificName: 'Vaccinium corymbosum L.',
      category: 'fruit',
      icon: 'assets/crops/blueberry.svg',

      plantingMethods: [
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Blueberry Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Blueberries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/blueberries/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Northern Highbush Blueberry as a shrub primarily associated with the temperate biome. Royal Horticultural Society guidance notes that varieties differ in hardiness and fruiting season. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Blueberries have shallow roots and require consistent moisture, particularly during establishment and fruit development, while waterlogged conditions should be avoided. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Requires acidic soil. University of Minnesota Extension recommends about pH 4.0–5.5, while commercial Highbush Blueberry guidance commonly targets approximately pH 4.5–5.0.',

      soilNote:
        'Blueberries perform best in full sun in loose, well-drained, acidic soil with high organic-matter content. Their shallow root system benefits from organic mulch that helps conserve moisture and maintain suitable soil conditions.',

      plantingNote:
        'Blueberry is a familiar edible berry crop. Royal Horticultural Society guidance notes that blueberry bushes are widely sold as young container-grown plants and may be grown either in suitably acidic garden soil or in containers filled with ericaceous growing medium. Current Kew taxonomy accepts Vaccinium corymbosum L. The Kew record contains numerous historical synonyms, including Cyanococcus corymbosus, Vaccinium australe, Vaccinium formosum, and Vaccinium simulatum.',

      harvestNote:
        'Blueberries are harvested when berries have turned completely blue and are fully ripe. University of Minnesota Extension notes that young bushes produce little fruit during their first two to three years and that harvest increases as plants mature. Royal Horticultural Society guidance shows that cultivar harvest seasons range broadly from mid-summer into early autumn. Because fruit-bearing age and harvest season depend on cultivar, climate, and plant maturity, FarmCast keeps Blueberry as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Blueberries in the Home Garden',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/yard-and-garden/',
            'gardening-in-minnesota/growing-blueberries-in-the-home-garden'
          ].join('')
      }
    },

    {
      name: 'Kiwi',
      scientificName:
        'Actinidia chinensis var. deliciosa (A.Chev.) A.Chev.',
      category: 'fruit',
      icon: 'assets/crops/kiwi.svg',

      plantingMethods: [
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Kiwi Vine'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Kiwi Fruit',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/kiwi/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions with a warm, long growing season for successful fruit development. Kew identifies Actinidia chinensis var. deliciosa as a woody liana primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a warm, sunny, sheltered location and notes that young shoots are vulnerable to late frost. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering newly planted Kiwi vines during establishment and providing additional water during prolonged dry periods while fruits are swelling. Waterlogged soil should be avoided. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Prefers fertile, well-drained, slightly acidic soil.',

      soilNote:
        'Kiwi vines perform best in fertile, well-drained soil rich in organic matter, in a warm, sunny and sheltered position. They are vigorous climbers and require a strong permanent support such as wires, a pergola, arch or sturdy fence.',

      plantingNote:
        'Kiwi is a familiar edible climbing fruit crop. Royal Horticultural Society guidance notes that Kiwi plants are commonly available as young container-grown vines. Most cultivars are either male or female, so female plants normally require a compatible male pollinator nearby unless a self-fertile cultivar is grown. Current Kew taxonomy accepts Actinidia chinensis var. deliciosa (A.Chev.) A.Chev. Actinidia deliciosa, Actinidia latifolia var. deliciosa, Actinidia chinensis f. chlorocarpa, Actinidia chinensis var. hispida, Actinidia chinensis f. longipila, Actinidia deliciosa var. chlorocarpa, Actinidia deliciosa var. coloris and Actinidia deliciosa var. longipila are treated as synonyms.',

      harvestNote:
        'Kiwi vines generally begin fruiting about three to four years after planting. Fruits develop through summer and into autumn and may be harvested before the first hard frost, then allowed to finish ripening indoors when necessary. Because first fruiting age and harvest timing depend strongly on cultivar, pollination, climate and establishment conditions, FarmCast keeps Kiwi as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Kiwi Fruit',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/kiwi/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Lime',
      scientificName:
        'Citrus × aurantiifolia (Christm.) Swingle',
      category: 'fruit',
      icon: 'assets/crops/lime.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'air-layered-plants',
          label: 'Air-Layered Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted or Budded Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Key Lime Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/CH092'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm subtropical to tropical growing conditions. Kew identifies Lime as a tree primarily associated with the subtropical biome. University of Florida IFAS Extension notes that Key lime is highly sensitive to cold and performs best in warm, sunny locations protected from cold winds. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of Florida IFAS Extension recommends regular watering during establishment and supplemental irrigation for young trees during prolonged dry periods while warning against persistently wet conditions. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'RHS lists acid or neutral soil as suitable for Lime.',

      soilNote:
        'Lime grows best in a sunny location with well-drained soil. University of Florida IFAS Extension notes that Key lime can grow in several soil types but should not be planted where the site remains flooded or persistently wet. RHS likewise recommends moist but well-drained or well-drained soil.',

      plantingNote:
        'Lime, including the Key or Mexican lime commonly known as Dayap in the Philippines, is a familiar edible citrus fruit. University of Florida IFAS Extension notes that Key lime is frequently propagated from seed because of its high degree of polyembryony, and may also be propagated by hardwood cuttings, air layering, budding, or grafting. Current Kew taxonomy accepts Citrus × aurantiifolia (Christm.) Swingle and lists numerous historical scientific synonyms, including Limonia × aurantiifolia, Citrus × acida, Citrus × lima, Citrus × javanica, Citrus × nipis, and Citrus × notissima.',

      harvestNote:
        'Lime fruits are commonly harvested while green to greenish-yellow depending on intended use and maturity. University of Florida IFAS Extension notes that some Key lime fruits can mature throughout the year, with stronger seasonal production in suitable climates. Trees propagated from cuttings or air layers may begin producing earlier than grafted, budded, or seed-grown trees. Because first fruiting age varies greatly by propagation method and local growing conditions, FarmCast keeps Lime as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'University of Florida IFAS Extension',

        title:
          'Key Lime Growing in the Florida Home Landscape',

        url:
          [
            'https://',
            'ask.ifas.ufl.edu/publication/CH092'
          ].join('')
      }
    },

    {
      name: 'Orange',
      localName: 'Sweet Orange',
      scientificName:
        'Citrus × aurantium L. var. sinensis L.',
      category: 'fruit',
      icon: 'assets/crops/orange.svg',

      plantingMethods: [
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Department of Agriculture',

        office:
          'Regional Field Office - Cordillera Administrative Region',

        title:
          'Technoguide in Citrus Production',

        url:
          [
            'https://',
            'hvcdp.da.gov.ph/wp-content/uploads/2022/05/',
            'DA-CAR-TECHNOGUIDE-IN-CITRUS-PRODUCTION.pdf'
          ].join('')
      },

      varieties: [
        'Washington Navel',
        'Valencia',
        'Hamlin',
        'Trovita'
      ],

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Tropical to subtropical citrus-growing conditions. Philippine Department of Agriculture guidance documents successful orange production in suitable irrigated subtropical areas such as the Cordillera. FarmCast therefore keeps the general temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'Areas with adequate and well-distributed rainfall are favorable for citrus production. Where rainfall is insufficient or prolonged dry periods occur, regular and timely irrigation is important. FarmCast therefore keeps water guidance descriptive rather than inventing one universal annual rainfall range.',

      soilPH:
        '5.0–7.5',

      soilNote:
        'Orange trees perform best in a sunny location with suitable drainage and good orchard water management. Citrus can be grown in several soil types within an appropriate soil-pH range, provided the root zone is not persistently waterlogged.',

      plantingNote:
        'Orange in this FarmCast entry refers specifically to the familiar Sweet Orange group, including Navel, Valencia, Hamlin and related cultivars. Philippine citrus production guidance uses vegetatively propagated planting materials such as budded and grafted plants for orchard establishment. USDA GRIN currently recognizes the Sweet Orange Group as Citrus × aurantium L. var. sinensis L.; Citrus × sinensis (L.) Osbeck is treated as its homotypic synonym. This crop is distinct from FarmCast Mandarin Orange, which is Citrus reticulata Blanco.',

      harvestNote:
        'Sweet oranges are harvested when fruits have reached cultivar-appropriate maturity, color and juice quality. Philippine citrus production guidance reports that citrus fruit maturity may occur about five to nine months after flowering depending on variety, environment and cultural management. Because that interval begins at flowering rather than at planting, and young trees require an establishment period before flowering, FarmCast keeps Orange as guidance-only rather than generating an automatic planting-date harvest estimate.',

      source: {
        agency:
          'Department of Agriculture',

        office:
          'High Value Crops Development Program',

        title:
          'DA-CAR Technoguide in Citrus Production',

        url:
          [
            'https://',
            'hvcdp.da.gov.ph/production-manuals/'
          ].join('')
      }
    },

    {
      name: 'Blackberry',
      scientificName: 'Rubus fruticosus L.',
      category: 'fruit',
      icon: 'assets/crops/blackberry.svg',

      plantingMethods: [
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Plants'
        },
        {
          value: 'bare-root-plants',
          label: 'Bare-Root Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Blackberries and Hybrid Berries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/blackberries-and-hybrid-berries/',
            'grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Blackberry as a scrambling shrub primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a sunny, sheltered position for the best fruit production, although plants can also fruit in light shade. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering newly planted Blackberries well and providing water during prolonged dry periods in the first growing season. Established plants generally require less supplemental watering. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'No universal numeric soil-pH requirement is stored. FarmCast follows source guidance emphasizing fertile, moisture-retentive but well-drained soil.',

      soilNote:
        'Blackberries perform best in fertile soil with good drainage and should not be planted where the root zone becomes waterlogged. Vigorous varieties benefit from strong horizontal wires or another support system for training their long canes.',

      plantingNote:
        'Blackberry is a familiar edible soft-fruit crop. Royal Horticultural Society guidance notes that Blackberry plants are normally sold as container-grown plants, with bare-root plants also available while dormant. Current Kew taxonomy accepts Rubus fruticosus L. This FarmCast entry refers specifically to the accepted Blackberry species rather than Raspberry hybrids such as Loganberry, Tayberry, or Boysenberry.',

      harvestNote:
        'Blackberries are harvested when the fruits are fully coloured, plump and juicy. Royal Horticultural Society guidance states that fruits generally ripen from mid-summer to early autumn depending on species and cultivar and should be picked when ripe because they do not continue ripening after harvest. Newly planted canes generally do not fruit in their first growing season, with fruit produced on older canes. Because fruiting depends on cane age, cultivar and local season, FarmCast keeps Blackberry as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Blackberries and Hybrid Berries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/blackberries-and-hybrid-berries/',
            'grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Olive',
      scientificName: 'Olea europaea L.',
      category: 'fruit',
      icon: 'assets/crops/olive.svg',

      plantingMethods: [
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Olive Tree'
        },
        {
          value: 'rooted-cuttings',
          label: 'Rooted Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Olives',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/olives/grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm subtropical growing conditions. Kew identifies Olive as a shrub or tree primarily associated with the subtropical biome. Royal Horticultural Society guidance recommends a warm, sunny and sheltered position and notes that severe frost can damage branches. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Established Olive trees are relatively drought tolerant, while young or container-grown plants require adequate watering during active growth. Good drainage remains important because persistently wet soil is unsuitable. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall range.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing freely draining growing conditions.',

      soilNote:
        'Olive trees perform best in a warm, sunny and sheltered position with well-drained soil. Royal Horticultural Society guidance also supports container cultivation using a free-draining loam-based growing medium where in-ground conditions are unsuitable.',

      plantingNote:
        'Olive is a familiar edible fruit and oil crop. Young Olive trees may be established as container-grown plants, while Royal Horticultural Society guidance states that Olea europaea can also be propagated from semi-ripe cuttings. Current Kew taxonomy accepts Olea europaea L.; Olea pallida and Olea sativa are treated as species-level scientific synonyms.',

      harvestNote:
        'Olive fruits are harvested according to intended use and maturity. Royal Horticultural Society guidance places harvest in autumn, with green fruits becoming darker as they mature. Fresh olives require appropriate curing or processing before they are eaten. Because harvest depends on cultivar, tree maturity, climate and desired fruit stage rather than one universal planting-to-harvest interval, FarmCast keeps Olive as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Olives',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/olives/grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Almond',
      scientificName: 'Prunus amygdalus Batsch',
      category: 'tree-nut',
      icon: 'assets/crops/almond.svg',

      plantingMethods: [
        {
          value: 'bare-root-grafted-trees',
          label: 'Bare-Root Grafted Trees'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Statewide Integrated Pest Management Program',

        title:
          'Cultural Tips for Growing Almond',

        url:
          [
            'https://',
            'ipm.ucanr.edu/home-and-landscape/',
            'cultural-tips-for-growing-almond/'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate orchard conditions with sufficient winter chilling and protection from damaging late spring frost. Kew identifies Almond as a tree primarily associated with the temperate biome, while University of California guidance notes that Almond blooms early and requires suitable winter chilling. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. University of California guidance emphasizes consistent soil moisture for young trees and adequate irrigation during active growth and nut development while warning against prolonged soil saturation. FarmCast therefore keeps water guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing deep, fertile and well-drained soil.',

      soilNote:
        'Almond performs best in full sun and deep, well-drained soil. University of California guidance identifies fertile sandy loam as particularly suitable and recommends avoiding shallow, frequently flooded, soggy or poorly drained sites.',

      plantingNote:
        'Almond is a familiar edible tree-nut crop. University of California guidance recommends establishing orchard trees during dormancy using bare-root nursery trees and refers to maintaining the graft union above the soil surface during planting. Current Kew taxonomy accepts Prunus amygdalus Batsch. The widely used name Prunus dulcis is currently treated by Kew as a synonym, together with historical names including Amygdalus communis and Amygdalus dulcis.',

      harvestNote:
        'Almonds are harvested when the outer hulls begin to split and the nuts are sufficiently mature for removal from the tree. University of California guidance recommends harvesting promptly once hull split begins to reduce exposure to pests and autumn rain. Because Almond is a perennial orchard tree and first bearing age varies with cultivar, rootstock, climate and establishment conditions, FarmCast keeps Almond as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Statewide Integrated Pest Management Program',

        title:
          'Cultural Tips for Growing Almond',

        url:
          [
            'https://',
            'ipm.ucanr.edu/home-and-landscape/',
            'cultural-tips-for-growing-almond/'
          ].join('')
      }
    },

    {
      name: 'Walnut',
      scientificName: 'Juglans regia L.',
      category: 'tree-nut',
      icon: 'assets/crops/walnut.svg',

      plantingMethods: [
        {
          value: 'grafted-trees',
          label: 'Grafted Walnut Tree'
        },
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Walnuts',

        url:
          [
            'https://',
            'www.rhs.org.uk/nuts/walnuts'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate orchard conditions. Kew identifies Walnut as a tree primarily associated with the temperate biome. Royal Horticultural Society guidance recommends full sun and avoiding exposed locations and frost pockets because strong winds and spring frost can damage foliage, flowers and subsequent nut set. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering newly planted Walnut trees during dry periods in spring and summer to support establishment, while established trees are less dependent on supplemental watering. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Prefers fertile, moisture-retentive but well-drained soil, with Royal Horticultural Society guidance identifying alkaline loam as particularly suitable.',

      soilNote:
        'Walnut trees tolerate several soil types but perform best in deep, fertile, moisture-retentive and well-drained soil. Full sun is ideal, and exposed sites or frost pockets should be avoided. Because Walnut develops a strong taproot, young trees should be established carefully without damaging or severely restricting the root system.',

      plantingNote:
        'Walnut in this FarmCast entry refers to the familiar Common or English Walnut. Royal Horticultural Society guidance notes that named cultivars are normally propagated by whip grafting or T-budding onto young Walnut rootstocks, while fresh nuts can also be grown from seed. Current Kew taxonomy accepts Juglans regia L. and lists numerous historical synonyms, including Juglans duclouxiana, Juglans fallax, Juglans sinensis and Regia maxima.',

      harvestNote:
        'Walnuts ripen in autumn when the fibrous outer casing begins to split and release the mature nut. Royal Horticultural Society guidance recommends checking that the kernel is fully formed and harvesting ripe nuts regularly before drying them for storage. Grafted trees may begin cropping after about four years, but first bearing and annual harvest timing vary by cultivar, tree establishment, pollination and local climate. FarmCast therefore keeps Walnut as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Walnuts',

        url:
          [
            'https://',
            'www.rhs.org.uk/nuts/walnuts'
          ].join('')
      }
    },

    {
      name: 'Hazelnut',
      scientificName: 'Corylus avellana L.',
      category: 'tree-nut',
      icon: 'assets/crops/hazelnut.svg',

      plantingMethods: [
        {
          value: 'young-whips',
          label: 'One-Year-Old Whips'
        },
        {
          value: 'rooted-suckers',
          label: 'Rooted Suckers'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Cobnuts and Filberts',

        url:
          [
            'https://',
            'www.rhs.org.uk/nuts/cobnuts-filberts'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Hazelnut as a shrub or tree primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a sheltered site in full sun or light shade and notes that severe winter cold can reduce successful pollination and cropping. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Royal Horticultural Society guidance recommends watering young Hazelnut plants during dry spells in spring and summer and using mulch to help conserve soil moisture during establishment. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'Royal Horticultural Society recommends about pH 6.5–7.5.',

      soilNote:
        'Hazelnuts tolerate several soil types but perform particularly well in light, sandy, well-drained soil. A sheltered position in full sun or light shade supports good cropping, while persistently waterlogged conditions should be avoided.',

      plantingNote:
        'Hazelnut is a familiar edible tree-nut crop. Royal Horticultural Society guidance notes that Hazelnuts are commonly bought as one-year-old whips and planted while dormant. Rooted suckers may also be separated and replanted, while layering and stooling are additional propagation methods. Current Kew taxonomy accepts Corylus avellana L.; Corylus avellana var. sylvestris, Corylus avellana subsp. sylvestris and Corylus sylvestris are listed as species-level synonyms. Planting more than one compatible cultivar improves pollination and nut set.',

      harvestNote:
        'Hazelnuts generally begin producing nuts after about three to four years. Royal Horticultural Society guidance recommends harvesting when the husks begin turning yellow, typically around early autumn in temperate growing regions. Because first bearing and annual harvest timing depend on plant age, cultivar, pollination and local climate, FarmCast keeps Hazelnut as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Cobnuts and Filberts',

        url:
          [
            'https://',
            'www.rhs.org.uk/nuts/cobnuts-filberts'
          ].join('')
      }
    },

    {
      name: 'Pecan',
      scientificName:
        'Carya illinoinensis (Wangenh.) K.Koch',
      category: 'tree-nut',
      icon: 'assets/crops/pecan.svg',

      plantingMethods: [
        {
          value: 'grafted-trees',
          label: 'Grafted Pecan Tree'
        },
        {
          value: 'bare-root-trees',
          label: 'Bare-Root Trees'
        },
        {
          value: 'container-grown-trees',
          label: 'Container-Grown Trees'
        }
      ],

      plantingMethodSource: {
        agency:
          'Oklahoma State University Extension',

        title:
          'Managing Pecans in the Home Landscape',

        url:
          [
            'https://',
            'extension.okstate.edu/fact-sheets/',
            'managing-pecans-in-the-home-landscape'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate to warm-temperate orchard conditions. Kew identifies Pecan as a tree primarily associated with the temperate biome. Oklahoma State University Extension emphasizes selecting cultivars adapted to the local climate and providing abundant sunlight. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Oklahoma State University Extension emphasizes adequate water during establishment, spring shoot growth, nut sizing and especially kernel filling. Drought stress can reduce nut size and kernel quality. FarmCast therefore keeps moisture guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'University of Georgia Cooperative Extension recommends about pH 6.0–6.5 for good nutrient availability in Pecan orchards.',

      soilNote:
        'Pecan trees require abundant sunlight, substantial growing space and soil that supports a large root system. Good soil moisture is important, particularly for young trees and during nut development, while orchard fertility should be guided by soil and leaf analysis.',

      plantingNote:
        'Pecan is a familiar edible tree-nut crop. Improved cultivars are normally propagated by grafting desirable cultivar wood onto seedling rootstocks so the resulting tree retains the characteristics of the selected variety. Oklahoma State University Extension also describes establishment using bare-root or container-grown trees. Two compatible cultivars are generally recommended to improve wind pollination and nut production. Current Kew taxonomy accepts Carya illinoinensis (Wangenh.) K.Koch and lists historical synonyms including Juglans illinoinensis, Carya pecan, Carya oliviformis, Hicorius pecan and Juglans pecan.',

      harvestNote:
        'Pecans are ready for harvest when the outer shucks split and mature nuts begin releasing from them. Oklahoma State University Extension notes that early cultivars may begin ripening in early autumn while later cultivars mature later in the season. Seedling trees may take many years before their nut characteristics can be evaluated, while improved grafted cultivars differ substantially in bearing age and maturity season. Because first bearing and annual harvest timing depend on cultivar, propagation, tree age and climate, FarmCast keeps Pecan as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Oklahoma State University Extension',

        title:
          'Managing Pecans in the Home Landscape',

        url:
          [
            'https://',
            'extension.okstate.edu/fact-sheets/',
            'managing-pecans-in-the-home-landscape'
          ].join('')
      }
    },

    {
      name: 'Cranberry',
      scientificName: 'Vaccinium macrocarpon Aiton',
      category: 'fruit',
      icon: 'assets/crops/cranberry.svg',

      plantingMethods: [
        {
          value: 'unrooted-cuttings',
          label: 'Unrooted Vine Cuttings'
        },
        {
          value: 'rooted-plugs',
          label: 'Rooted Plugs'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Maine Cooperative Extension',

        title:
          'How to Grow Cranberries',

        url:
          [
            'https://',
            'extension.umaine.edu/cranberries/',
            'growing-cranberries/'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies American Cranberry as a subshrub primarily associated with the temperate biome. University of Maine Cooperative Extension notes that cranberries require cool winters and perform best under temperate growing conditions. FarmCast therefore keeps general temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Cranberries require consistently moist growing conditions, but University of Maine Cooperative Extension emphasizes that the root zone should remain aerated rather than continuously saturated. New plantings require regular irrigation while avoiding persistent puddling or prolonged waterlogging. FarmCast therefore keeps moisture guidance descriptive rather than inventing an annual rainfall requirement.',

      soilPH:
        'University of Maine Cooperative Extension recommends strongly acidic growing conditions of about pH 4.0–5.5 for home cranberry production.',

      soilNote:
        'Cranberries perform best in acidic, moist but well-aerated growing media such as sand, peat, or suitable combinations of these materials. Good drainage remains important even though the crop is naturally associated with wetland habitats. Full sun supports stronger growth and fruit production.',

      plantingNote:
        'Cranberry in this FarmCast entry refers specifically to the familiar American or Large Cranberry that is commonly cultivated for food. University of Maine Cooperative Extension identifies unrooted vine cuttings as standard planting material and notes that rooted cuttings or plugs may also be used effectively. Current Kew taxonomy accepts Vaccinium macrocarpon Aiton and lists historical synonyms including Oxycoccus macrocarpos, Oxycoca macrocarpa, Schollera macrocarpon, Vaccinium propinquum and Vaccinium oblongifolium.',

      harvestNote:
        'Cranberries develop their familiar red fruit in autumn. Royal Horticultural Society guidance notes that plants generally begin fruiting prolifically from about their third year and that berries are harvested from early autumn before the first frost. University of Maine Cooperative Extension similarly notes that a new bed may produce some crop by the fall of its third year. Because first bearing depends on establishment and annual harvest timing is seasonal rather than based on one exact planting-to-harvest interval, FarmCast keeps Cranberry as guidance-only.',

      source: {
        agency:
          'University of Maine Cooperative Extension',

        title:
          'How to Grow Cranberries',

        url:
          [
            'https://',
            'extension.umaine.edu/cranberries/',
            'growing-cranberries/'
          ].join('')
      }
    },

    {
      name: 'Date Palm',
      scientificName: 'Phoenix dactylifera L.',
      category: 'fruit',
      icon: 'assets/crops/date-palm.svg',

      plantingMethods: [
        {
          value: 'offshoot-transplants',
          label: 'Rooted Offshoots'
        },
        {
          value: 'tissue-culture-plantlets',
          label: 'Tissue-Culture Plantlets'
        }
      ],

      plantingMethodSource: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        title:
          'Date Palm Propagation',

        url:
          [
            'https://',
            'www.fao.org/4/Y4360E/y4360e09.htm'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Hot subtropical growing conditions with a long warm season for fruit development. Kew identifies Date Palm as a tree primarily associated with the subtropical biome. Successful fruit production depends strongly on local heat, season length, cultivar and orchard conditions, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Date Palm is strongly associated with dry subtropical production regions but productive palms still require an adequate water supply, especially during establishment and fruit development. Rain near fruit ripening can reduce fruit quality. FarmCast therefore keeps water guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing a suitable, well-drained root zone and adequate irrigation management.',

      soilNote:
        'Date Palms require substantial rooting space and suitable drainage. They are widely cultivated under dry subtropical conditions where irrigation provides dependable water. Orchard conditions should avoid prolonged waterlogging while maintaining adequate soil moisture for establishment and fruit production.',

      plantingNote:
        'Date Palm is the familiar fruit-producing palm cultivated for edible dates. FAO identifies seed propagation, offshoot propagation and tissue culture as the principal propagation approaches, but explains that seed-grown plants are not true-to-type and therefore are unsuitable for reliably reproducing named cultivars. Rooted offshoots remain a traditional clonal method, while tissue-culture plantlets allow large-scale multiplication of selected cultivars. Current Kew taxonomy accepts Phoenix dactylifera L.; historical synonyms include Palma dactylifera, Phoenix excelsior, Phoenix iberica and several named varieties of Phoenix dactylifera.',

      harvestNote:
        'Date fruits may be harvested at different maturity stages depending on cultivar and intended use. FAO recognizes Khalal as the firm physiologically mature stage, Rutab as the softened partially browned stage and Tamar as the fully ripe lower-moisture stage. Harvest season and preferred maturity stage vary by cultivar, climate and market requirements. Because even the approximately 200-day fruit-development guidance begins at pollination rather than planting, FarmCast keeps Date Palm as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Food and Agriculture Organization of the United Nations',

        title:
          'Date Palm Propagation',

        url:
          [
            'https://',
            'www.fao.org/4/Y4360E/y4360e09.htm'
          ].join('')
      }
    },

    {
      name: 'Pistachio',
      scientificName: 'Pistacia vera L.',
      category: 'tree-nut',
      icon: 'assets/crops/pistachio.svg',

      plantingMethods: [
        {
          value: 'budded-trees',
          label: 'Budded Pistachio Trees'
        },
        {
          value: 'rootstock-transplants',
          label: 'Rootstock Transplants for Field Budding'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        title:
          'Pruning and Training Resources — Pistachio',

        url:
          [
            'https://',
            'ucanr.edu/node/139940/printable/print'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm temperate orchard conditions with sufficient winter chilling and a long, hot growing season for nut development. Kew identifies Pistachio as a tree primarily associated with the temperate biome. University of California guidance also shows that cultivar and rootstock performance varies with cold tolerance, heat and local orchard conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Commercial Pistachio orchards rely on carefully managed soil moisture and irrigation, particularly during nut development. Water stress and excess moisture can both affect tree performance and nut quality, so FarmCast keeps water guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing suitable orchard soil, drainage, irrigation management and locally appropriate rootstock selection.',

      soilNote:
        'Pistachio requires a sunny orchard site with sufficient rooting space and suitable drainage. Commercial production uses rootstocks selected for adaptation to local soil, salinity, disease and climatic conditions. Orchard establishment should therefore match the rootstock and cultivar to the specific site rather than rely on one universal soil prescription.',

      plantingNote:
        'Pistachio is a familiar edible tree-nut crop. University of California guidance describes planting young rootstocks into the orchard and budding Pistacia vera scions onto those rootstocks, with T-budding identified as the usual field-budding method. Commercial orchards also require compatible male pollinizer trees because Pistachio has separate male and female trees. Current Kew taxonomy accepts Pistacia vera L.; historical synonyms include Lentiscus vera, Pistacia narbonnensis, Pistacia nigricans, Pistacia officinarum, Pistacia reticulata, Pistacia trifolia and Terebinthus pistacia.',

      harvestNote:
        'Pistachio harvest maturity is determined from actual nut development rather than a universal number of days after planting. University of California guidance uses changes in hull appearance and hull slip, when the outer hull separates readily from the shell, as important harvest indicators. Cultivars differ in maturity timing, and Pistachio is a perennial orchard tree that requires several years of establishment before meaningful production. FarmCast therefore keeps Pistachio as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        title:
          'California Pistachio Research — Climate and Cultivars',

        url:
          [
            'https://',
            'ucanr.edu/site/california-pistachio-research/',
            'climate-cultivars'
          ].join('')
      }
    },

    {
      name: 'Macadamia',
      scientificName:
        'Macadamia integrifolia Maiden & Betche',
      category: 'tree-nut',
      icon: 'assets/crops/macadamia.svg',

      plantingMethods: [
        {
          value: 'grafted-trees',
          label: 'Grafted Macadamia Trees'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Hawaiʻi at Mānoa',

        office:
          'College of Tropical Agriculture and Human Resources',

        title:
          'Macadamia General Information',

        url:
          [
            'https://',
            'cms.ctahr.hawaii.edu/ckm/Home/Crops/',
            'Fruits-and-Nuts/Macadamia/',
            'Macadamia-General-Information'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm subtropical to tropical growing conditions. Kew identifies Macadamia integrifolia as a tree associated primarily with the wet tropical biome, while University of Hawaiʻi guidance identifies the crop as originating from subtropical eastern Australia. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'University of Hawaiʻi CTAHR reports successful Macadamia production under substantial annual rainfall, while orchard water requirements still vary with soil, elevation, season and local climate. FarmCast therefore keeps the general water guidance descriptive rather than converting one production-region figure into a universal requirement.',

      soilPH:
        'University of Hawaiʻi CTAHR recommends well-drained soil with about pH 5.0–6.5.',

      soilNote:
        'Macadamia performs best in deep, well-drained soil and requires adequate rooting space. University of Hawaiʻi CTAHR also emphasizes protection from damaging strong winds, which can cause substantial tree loss in exposed orchards.',

      plantingNote:
        'Macadamia in this FarmCast entry refers specifically to the familiar smooth-shell Macadamia commonly grown commercially for edible nuts. University of Hawaiʻi CTAHR states that commercial orchards are planted with grafted seedlings because named cultivars should be clonally propagated to maintain desirable nut quality and productivity. Current Kew taxonomy accepts Macadamia integrifolia Maiden & Betche; Macadamia ternifolia var. integrifolia is its species-level scientific synonym.',

      harvestNote:
        'Macadamia trees may begin producing a small crop several years after planting, with production increasing as trees mature. University of Hawaiʻi CTAHR states that ripe nuts naturally fall from the tree and are collected from the ground, with harvest season varying by cultivar, location and weather. Because first bearing age and annual nut drop vary with orchard conditions rather than one universal planting-to-harvest interval, FarmCast keeps Macadamia as guidance-only.',

      source: {
        agency:
          'University of Hawaiʻi at Mānoa',

        office:
          'College of Tropical Agriculture and Human Resources',

        title:
          'Macadamia General Information',

        url:
          [
            'https://',
            'cms.ctahr.hawaii.edu/ckm/Home/Crops/',
            'Fruits-and-Nuts/Macadamia/',
            'Macadamia-General-Information'
          ].join('')
      }
    },

    {
      name: 'Chestnut',
      localName: 'Sweet Chestnut',
      scientificName: 'Castanea sativa Mill.',
      category: 'tree-nut',
      icon: 'assets/crops/chestnut.svg',

      plantingMethods: [
        {
          value: 'grafted-trees',
          label: 'Grafted Chestnut Trees'
        },
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'Castanea sativa — Sweet Chestnut',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/3191/',
            'castanea-sativa/details'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate growing conditions. Kew identifies Sweet Chestnut as a tree primarily associated with the temperate biome. Successful nut production depends on cultivar, growing season, pollination and local climatic conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Young Chestnut trees require adequate moisture while establishing, but the root zone should remain well drained. Water needs vary with soil, tree age, season and local climate, so FarmCast keeps moisture guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'Royal Horticultural Society lists acid or neutral soil as suitable for Sweet Chestnut.',

      soilNote:
        'Sweet Chestnut grows best in full sun and well-drained soil. Royal Horticultural Society guidance lists loam and sandy soils as suitable and notes that the species can tolerate relatively dry sandy conditions once established.',

      plantingNote:
        'Chestnut in this FarmCast entry refers specifically to the familiar edible Sweet or European Chestnut, not Horse Chestnut. Royal Horticultural Society guidance supports propagation from seed or by grafting. Seed-grown trees do not reliably reproduce named cultivars, so grafted planting material is preferable when a specific fruiting cultivar is required. Current Kew taxonomy accepts Castanea sativa Mill.; historical names include Castanea castanea, Castanea vesca, Castanea vulgaris, Fagus castanea and Fagus procera.',

      harvestNote:
        'Sweet Chestnuts mature in autumn inside densely spiny burrs. Mature nuts become ready for collection as the burrs open and the nuts begin to fall naturally. Harvest timing varies with cultivar, tree maturity and local climate. Because Chestnut is a perennial tree and first bearing age cannot be represented by one universal number of days after planting, FarmCast keeps Chestnut as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'Castanea sativa — Sweet Chestnut',

        url:
          [
            'https://',
            'www.rhs.org.uk/plants/3191/',
            'castanea-sativa/details'
          ].join('')
      }
    },

    {
      name: 'Tea',
      scientificName:
        'Camellia sinensis (L.) Kuntze',
      category: 'tree-crop',
      icon: 'assets/crops/tea.svg',

      plantingMethods: [
        {
          value: 'rooted-cuttings',
          label: 'Rooted Tea Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Washington State University Extension',

        title:
          'Tea Plant Propagation',

        url:
          [
            'https://',
            'vegetables.wsu.edu/',
            'tea-plant-propagation/'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Temperate to subtropical growing conditions. Kew identifies Tea as a shrub or tree primarily associated with the subtropical biome. Different Tea types and cultivars vary in their response to heat, cold, shade and local climate, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is used. Tea requires dependable moisture during active shoot growth, particularly while plants are establishing, but the soil should remain well drained. Water requirements vary by climate, soil, season and production system, so FarmCast keeps moisture guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'Washington State University Extension recommends acidic soil of about pH 4.5–5.5.',

      soilNote:
        'Tea performs best in deep, light, well-drained acidic soil. Washington State University Extension also notes that excessive wind can increase water stress and cold injury, so suitable wind protection may benefit production sites.',

      plantingNote:
        'Tea is the familiar crop used to produce true black, green, white and oolong teas; these beverages come from the same plant species and differ primarily through cultivar, harvest and processing. Commercial Tea is commonly propagated vegetatively from cuttings so desirable plant characteristics are retained. Current Kew taxonomy accepts Camellia sinensis (L.) Kuntze; Camellia thea and Thea sinensis are its two species-level scientific synonyms.',

      harvestNote:
        'Tea is harvested repeatedly for tender new shoots and young leaves rather than through one final crop maturity date. University of Arkansas Extension notes that leaves may be harvested every few weeks during periods of active summer growth, while commercial plucking schedules vary with cultivar, climate, pruning cycle and desired tea style. Because Tea is a perennial crop with repeated flush harvests after establishment, FarmCast keeps Tea as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Washington State University Extension',

        title:
          'Tea (Camellia sinensis) Production',

        url:
          [
            'https://',
            'wpcdn.web.wsu.edu/extension/uploads/sites/25/',
            '2025/04/Tea-production-extension-guide.pdf'
          ].join('')
      }
    },

    {
      name: 'Rye',
      scientificName: 'Secale cereale L.',
      category: 'grain',
      icon: 'assets/crops/rye.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Penn State Extension',

        title:
          'Cereal Rye as a Cover Crop',

        url:
          [
            'https://',
            'extension.psu.edu/',
            'cereal-rye-as-a-cover-crop'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies Rye as an annual or biennial cereal primarily associated with the temperate biome. Cereal Rye is notably winter hardy and may be grown as a winter annual where local conditions and varieties are suitable. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Cereal Rye is adaptable to a wide range of production environments, but crop establishment and grain development still depend on adequate soil moisture. FarmCast therefore keeps water guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'Penn State Extension recommends well-drained soil with about pH 6.0–7.0.',

      soilNote:
        'Cereal Rye is adaptable but performs best in well-drained soil with good seed-to-soil contact. Penn State Extension notes that it establishes rapidly and develops an extensive root system. Field fertility and lime requirements should be guided by local soil testing and the intended production system.',

      plantingNote:
        'Rye in this FarmCast entry refers specifically to Cereal Rye, Secale cereale L., an edible grain crop used for foods such as rye flour and bread. It is established directly from seed by drilling or other suitable seeding methods. Cereal Rye should not be confused with annual or perennial ryegrass, which belong to the genus Lolium and are different crops. Current Kew taxonomy accepts Secale cereale L.; important historical names include Triticum cereale and Triticum secale.',

      harvestNote:
        'Cereal Rye is one of the earliest-maturing common small grains, but maturity varies among cultivars and environments. Grain harvest should follow actual crop maturity and grain dry-down rather than one universal number of days after sowing. University of Minnesota guidance for winter annual grain systems also shows that harvest season depends on the production region and cultivar. FarmCast therefore keeps Rye as guidance-only rather than assigning one universal sowing-to-harvest interval.',

      source: {
        agency:
          'Penn State Extension',

        title:
          'Cereal Rye as a Cover Crop',

        url:
          [
            'https://',
            'extension.psu.edu/',
            'cereal-rye-as-a-cover-crop'
          ].join('')
      }
    },

    {
      name: 'Quinoa',
      scientificName: 'Chenopodium quinoa Willd.',
      category: 'grain',
      icon: 'assets/crops/quinoa.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'Oregon State University Extension Service',

        title:
          'Quinoa Production for the Willamette Valley',

        url:
          [
            'https://',
            'extension.oregonstate.edu/catalog/',
            'em-9300-quinoa-production-willamette-valley'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool to moderate growing conditions during flowering and seed development. Kew identifies Quinoa as an annual crop primarily associated with the subtropical biome, while Oregon State University Extension notes that excessive heat during flowering and early seed set can prevent successful seed production in susceptible varieties. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Oregon State University Extension notes that Quinoa does not perform well in standing water or excessively wet soil, while adequate soil moisture remains important during establishment and seed development. FarmCast therefore keeps water guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing a suitable seedbed, good drainage, and locally appropriate soil-fertility management.',

      soilNote:
        'Quinoa should be established in a fine, well-prepared and well-drained seedbed. Oregon State University Extension notes that the small seeds require shallow placement and that fields with standing water can result in poor crop performance. Weed management is especially important during early establishment while root development temporarily slows canopy growth.',

      plantingNote:
        'Quinoa is a familiar edible pseudocereal grown for its grain-like seeds. Oregon State University Extension establishes the crop directly from seed and notes that shallow seeding supports reliable emergence. Current Kew taxonomy accepts Chenopodium quinoa Willd. and lists numerous historical synonyms, including Chenopodium album var. quinoa, Chenopodium album subsp. quinoa, Chenopodium guinoa, Chenopodium punctulatum and Chenopodium purpurascens.',

      harvestNote:
        'Oregon State University Extension reports that Quinoa varieties can require about 100–120 days to reach full maturity. Mature seed becomes hard when pressed between the fingers. Because mature seeds can begin sprouting in the panicle during late-season rain, timely harvest and crop dry-down are important. FarmCast therefore supports an automatic 100–120 day maturity window for direct-seeded Quinoa while still recommending actual seed hardness and field conditions as final harvest indicators.',

      source: {
        agency:
          'Oregon State University Extension Service',

        title:
          'Quinoa Production for the Willamette Valley',

        url:
          [
            'https://',
            'extension.oregonstate.edu/catalog/',
            'em-9300-quinoa-production-willamette-valley'
          ].join('')
      }
    },

    {
      name: 'Chia',
      scientificName: 'Salvia hispanica L.',
      category: 'oilseed',
      icon: 'assets/crops/chia.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted-seedlings',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Master Gardeners of Santa Clara County',

        title:
          'Chia',

        url:
          [
            'https://',
            'ucanr.edu/node/137213/printable/print'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm subtropical growing conditions with a sufficiently suitable day length for flowering and seed development. Kew identifies Chia as an annual species primarily associated with the subtropical biome. Research also shows that flowering and maturity are strongly affected by sowing date and photoperiod, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Chia can perform under relatively low-water conditions once established, but seedling establishment and seed development still require suitable soil moisture. FarmCast therefore keeps water guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing a well-drained growing site rather than assigning an unsupported numeric range.',

      soilNote:
        'Chia performs best in well-drained soil and full sun to partial shade. University of California Agriculture and Natural Resources describes the crop as relatively low-water once established, while prolonged wet soil should be avoided.',

      plantingNote:
        'Chia in this FarmCast entry refers specifically to Salvia hispanica L., the familiar food crop grown for edible chia seeds. University of California Agriculture and Natural Resources recommends direct seeding after frost where applicable or establishing seedlings before transplanting. Current Kew taxonomy accepts Salvia hispanica L.; its historical synonyms include Kiosmina hispanica, Salvia neohispanica, Salvia tetragona, Salvia chia, Salvia prysmatica and Salvia schiedeana. This crop should not be confused with Golden or California Chia, Salvia columbariae, which is a different species.',

      harvestNote:
        'Chia seed heads are harvested when they begin turning brown and are then dried before the seeds are separated from the chaff. Published field research shows that days to maturity can change substantially with sowing date, photoperiod and growing environment, with markedly different maturity periods reported across production systems. FarmCast therefore keeps Chia as guidance-only rather than assigning one universal sowing-to-harvest interval.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Master Gardeners of Santa Clara County',

        title:
          'Chia',

        url:
          [
            'https://',
            'ucanr.edu/node/137213/printable/print'
          ].join('')
      }
    },

    {
      name: 'Flax',
      localName: 'Flaxseed / Linseed',
      scientificName: 'Linum usitatissimum L.',
      category: 'oilseed',
      icon: 'assets/crops/flax.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        }
      ],

      plantingMethodSource: {
        agency:
          'North Dakota State University Extension',

        title:
          'Flax Production in North Dakota',

        url:
          [
            'https://',
            'www.ndsu.edu/agriculture/sites/default/files/',
            '2022-07/a1038.pdf'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies Flax as an annual crop primarily associated with the temperate biome. North Dakota State University Extension notes that varieties differ in maturity and that early establishment generally supports better production. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Flax requires adequate soil moisture for germination, establishment, flowering and seed filling, while poorly drained or persistently saturated conditions can reduce crop performance. FarmCast therefore keeps water guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing a suitable, firm seedbed and locally appropriate soil-fertility management.',

      soilNote:
        'Flax should be established in a firm, moist and well-prepared seedbed. North Dakota State University Extension recommends shallow seeding and warns that overly deep placement delays emergence and weakens seedlings. Flax is less competitive with weeds than many small grains, so a relatively clean field is important during establishment.',

      plantingNote:
        'Flax in this FarmCast entry refers to the familiar seed crop also called Flaxseed or Linseed, grown for edible seed and oil. North Dakota State University Extension recommends direct seeding into a firm, moist seedbed. Current Kew taxonomy accepts Linum usitatissimum L.; Linum angustifolium subsp. usitatissimum is its species-level scientific synonym. Seed Flax should not be confused with ornamental perennial flax species.',

      harvestNote:
        'Flax reaches physiological maturity when most seed bolls have changed from green toward brown. Manitoba Agriculture and North Dakota State University guidance use about 75% brown bolls as an important harvest-readiness indicator. Published regional guidance reports roughly 85–100 days to maturity, while modern variety trials show meaningful cultivar-to-cultivar differences. Because that broad maturity figure is not presented as one universal sowing-based interval across all environments and varieties, FarmCast keeps Flax as guidance-only rather than assigning one automatic harvest window.',

      source: {
        agency:
          'North Dakota State University Extension',

        title:
          'Flax Production in North Dakota',

        url:
          [
            'https://',
            'www.ndsu.edu/agriculture/sites/default/files/',
            '2022-07/a1038.pdf'
          ].join('')
      }
    },

    {
      name: 'Blackcurrant',
      scientificName: 'Ribes nigrum L.',
      category: 'fruit',
      icon: 'assets/crops/blackcurrant.svg',

      plantingMethods: [
        {
          value: 'bare-root-plants',
          label: 'Bare-Root Plants'
        },
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Blackcurrants',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/blackcurrants/',
            'grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies Blackcurrant as a shrub primarily associated with the temperate biome. Royal Horticultural Society guidance recommends a sunny site while noting that light shade is tolerated. Flowers can be damaged by late frost and cold winds, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Blackcurrants prefer moisture-retentive soil, and newly planted bushes should be watered during dry periods while they establish. Established plants still benefit from adequate soil moisture during active growth and fruit development. FarmCast therefore keeps water guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows Royal Horticultural Society guidance emphasizing moisture-retentive but well-drained soil rather than assigning an unsupported numeric range.',

      soilNote:
        'Blackcurrants grow best in moisture-retentive but well-drained soil. Full sun generally produces the best crops, although light shade is tolerated. Exposed locations prone to cold winds or late spring frost should be avoided because flowering and fruit set can be reduced.',

      plantingNote:
        'Blackcurrant is a familiar edible berry crop grown as a multi-stemmed deciduous shrub. Royal Horticultural Society guidance supports establishment using bare-root or container-grown plants, while new plants can also be propagated from hardwood cuttings taken from healthy young material. Current Kew taxonomy accepts Ribes nigrum L.; its species-level synonyms are Botrycarpum nigrum, Grossularia nigra, Ribes nigrum subsp. vulgare and Ribesium nigrum.',

      harvestNote:
        'Blackcurrants ripen from midsummer onward, with exact timing depending on cultivar and local climate. Modern varieties often ripen most berries in a cluster together, allowing the entire bunch to be harvested once the berries turn fully black, while older varieties may ripen less uniformly and require individual picking. Because Blackcurrant is a perennial shrub with seasonal repeated harvests rather than one universal planting-to-harvest interval, FarmCast keeps Blackcurrant as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Blackcurrants',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/blackcurrants/',
            'grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Saffron',
      scientificName: 'Crocus sativus L.',
      category: 'spice',
      icon: 'assets/crops/saffron.svg',

      plantingMethods: [
        {
          value: 'corm-planted',
          label: 'Planted Corms'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Saffron',

        url:
          [
            'https://',
            'www.rhs.org.uk/herbs/saffron'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Subtropical to temperate seasonal growing conditions with a dry dormant period and suitable autumn flowering conditions. Kew identifies Saffron as a tuberous geophyte primarily associated with the subtropical biome. Flowering performance varies with local climate, corm condition and seasonal timing, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Saffron requires adequate moisture after planting and during active growth but performs poorly in persistently wet or waterlogged soil. FarmCast therefore keeps moisture guidance descriptive rather than inventing one universal annual rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows Royal Horticultural Society guidance emphasizing rich but well-drained soil rather than assigning an unsupported numeric range.',

      soilNote:
        'Saffron performs best in a bright, sunny site with rich but well-drained soil. Good drainage is especially important around the underground corms because persistent wetness can reduce plant health and flowering performance.',

      plantingNote:
        'Saffron is the familiar culinary spice obtained from the bright red stigmas of Crocus sativus flowers. Royal Horticultural Society guidance recommends planting dormant corms in late summer, with the corms placed into well-drained soil before autumn flowering. Crocus sativus is sterile and does not produce seed, so the crop is maintained vegetatively through corms and daughter cormlets. Current Kew taxonomy accepts Crocus sativus L.; historical synonyms include Crocus officinalis, Crocus orsinii, Crocus pendulus, Crocus setifolius, Geanthus autumnalis and Safran officinarum.',

      harvestNote:
        'Saffron is harvested from newly opened autumn flowers by removing the three bright red stigmas and drying them carefully for culinary use. Royal Horticultural Society guidance notes that corms planted in late summer generally flower in October, although flowering may occur later in the first year. Because harvest timing is tied to seasonal flowering rather than one universal number of days after planting, FarmCast keeps Saffron as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Saffron',

        url:
          [
            'https://',
            'www.rhs.org.uk/herbs/saffron'
          ].join('')
      }
    },

    {
      name: 'Brazil Nut',
      scientificName:
        'Bertholletia excelsa Bonpl.',
      category: 'tree-nut',
      icon: 'assets/crops/brazil-nut.svg',

      plantingMethods: [
        {
          value: 'nursery-raised-seedlings',
          label: 'Nursery-Raised Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Embrapa Eastern Amazon',

        title:
          'Propagation of Brazil Nut Seedlings Using Seeds in Mini-Greenhouses',

        url:
          [
            'https://',
            'www.embrapa.br/en/',
            'busca-de-publicacoes/-/publicacao/1105944/',
            'propagation-of-brazil-nut-humb-y-bonpl-',
            'seedlings-using-seeds-in-mini-greenhouses'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Wet tropical growing conditions. Kew identifies Brazil Nut as a large tree native to tropical South America and primarily associated with the wet tropical biome. Growth, flowering and fruit production depend strongly on local rainforest climate, tree age and pollination conditions, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Brazil Nut is naturally associated with humid Amazonian forest environments where seasonal rainfall and soil moisture support tree growth. Water requirements vary substantially with soil, tree age and local tropical climate, so FarmCast keeps moisture guidance descriptive rather than inventing one universal rainfall range.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows Embrapa guidance emphasizing suitable site and soil preparation for established Brazil Nut seedlings rather than assigning an unsupported universal pH range.',

      soilNote:
        'Brazil Nut is a very large tropical tree that requires substantial rooting and canopy space. Embrapa research shows that soil physical properties can influence tree occurrence and fruit production, so suitable field establishment should consider local soil conditions, drainage, rooting depth and long-term tree spacing rather than rely on one universal soil prescription.',

      plantingNote:
        'Brazil Nut is the familiar edible seed produced by the Amazonian tree Bertholletia excelsa. Embrapa identifies seed propagation as one of the principal methods for producing Brazil Nut seedlings, although seed dormancy can make germination slow and uneven. Nursery-raised seedlings are therefore used for establishment before field planting. Current Kew taxonomy accepts Bertholletia excelsa Bonpl.; its two scientific synonyms are Barthollesia excelsa and Bertholletia nobilis.',

      harvestNote:
        'Brazil Nut fruits are large, hard woody capsules that mature high in the tree and fall naturally to the forest floor. Research on natural Brazil Nut stands shows that fruit fall occurs seasonally over an extended period and that collection is performed after fruits have fallen rather than by harvesting immature fruits from the canopy. Because Brazil Nut is a long-lived perennial tree and first bearing as well as annual fruit-fall timing vary greatly with tree age, site and climate, FarmCast keeps Brazil Nut as guidance-only rather than assigning one universal planting-to-harvest interval.',

      source: {
        agency:
          'Embrapa Western Amazon',

        title:
          'Brazil Nut — Bertholletia excelsa',

        url:
          [
            'https://',
            'www.infoteca.cnptia.embrapa.br/',
            'handle/doc/684044'
          ].join('')
      }
    },

    {
      name: 'Red Currant',
      scientificName: 'Ribes rubrum L.',
      category: 'fruit',
      icon: 'assets/crops/red-currant.svg',

      plantingMethods: [
        {
          value: 'bare-root-plants',
          label: 'Bare-Root Plants'
        },
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Redcurrants',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/redcurrants/',
            'grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies Red Currant as a shrub primarily associated with the temperate biome. Royal Horticultural Society guidance notes that Red Currants perform well in sun or partial shade, while flowering and fruit production still depend on cultivar and local seasonal conditions. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Red Currants require dependable soil moisture during establishment and fruit development, particularly during dry periods, but the root zone should remain suitably drained. FarmCast therefore keeps moisture guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows Royal Horticultural Society guidance emphasizing fertile, moisture-retentive but suitably drained soil rather than assigning an unsupported numeric range.',

      soilNote:
        'Red Currants grow well in fertile, moisture-retentive soil and can crop in either full sun or partial shade. Newly planted bushes should receive adequate water during establishment, while suitable drainage helps maintain healthy roots. Plants can also be trained into space-saving forms such as cordons or fans.',

      plantingNote:
        'Red Currant is the familiar edible berry crop that produces translucent red fruits in hanging clusters. Royal Horticultural Society guidance supports establishment using bare-root or container-grown plants, while healthy hardwood cuttings may also be used for propagation. Current Kew taxonomy accepts Ribes rubrum L. and lists historical synonyms including Grossularia rubra, Ribes vulgare, Ribes sativum, Ribes sylvestre and Ribesium rubrum. Red Currant is botanically distinct from FarmCast Blackcurrant, which is Ribes nigrum L.',

      harvestNote:
        'Red Currants ripen in summer, with early, mid-season and late cultivars maturing at different times. Royal Horticultural Society guidance recommends harvesting when the berries are richly coloured, firm and juicy, cutting the entire fruit truss rather than picking individual berries. Because Red Currant is a perennial shrub with cultivar- and season-dependent fruiting rather than one universal planting-to-harvest interval, FarmCast keeps Red Currant as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Redcurrants',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/redcurrants/',
            'grow-your-own'
          ].join('')
      }
    },

    {
      name: 'European Gooseberry',
      localName: 'Gooseberry',
      scientificName: 'Ribes uva-crispa L.',
      category: 'fruit',
      icon: 'assets/crops/european-gooseberry.svg',

      plantingMethods: [
        {
          value: 'bare-root-plants',
          label: 'Bare-Root Plants'
        },
        {
          value: 'container-grown-plants',
          label: 'Container-Grown Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Gooseberries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/gooseberries/',
            'grow-your-own'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Cool temperate growing conditions. Kew identifies European Gooseberry as a shrub primarily associated with the temperate biome. Royal Horticultural Society guidance notes that gooseberries are hardy and can crop in sun or light shade, while flowers may be damaged by late frost. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Newly planted gooseberries should receive regular water during dry periods while establishing, and container-grown plants require a steady moisture supply during the growing season. The root zone should remain suitably drained rather than persistently waterlogged. FarmCast therefore keeps moisture guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows Royal Horticultural Society guidance emphasizing moist, well-drained soil rather than assigning an unsupported numeric range.',

      soilNote:
        'European Gooseberry is adaptable to many soil conditions but performs best in moist, well-drained ground. A sunny position generally produces sweeter fruit, although light shade is tolerated. Sheltered sites are useful because fruit-laden stems can be damaged by strong winds.',

      plantingNote:
        'European Gooseberry in this FarmCast entry refers specifically to Ribes uva-crispa L., the familiar edible gooseberry grown as a fruiting shrub. Royal Horticultural Society guidance supports planting either dormant bare-root bushes or container-grown plants; healthy hardwood cuttings can also be rooted for propagation. Current Kew taxonomy accepts Ribes uva-crispa L.; its species-level synonyms include Grossularia uva, Grossularia uva-crispa, Oxyacanthus uva-crispa, Ribes crispum, Ribes grossularia var. uva-crispa and Ribes uva-crispa var. sylvestre. This crop is botanically distinct from FarmCast Indian Gooseberry and Cape Gooseberry.',

      harvestNote:
        'European Gooseberries may be picked at two different stages depending on intended use. Royal Horticultural Society guidance recommends an early picking of firm under-ripe fruit for cooking, followed later by harvesting fully ripe fruit for maximum sweetness and flavour. Varieties ripen at different times through summer. Because European Gooseberry is a perennial shrub with seasonal and cultivar-dependent harvests rather than one universal planting-to-harvest interval, FarmCast keeps European Gooseberry as guidance-only.',

      source: {
        agency:
          'Royal Horticultural Society',

        title:
          'How to Grow Gooseberries',

        url:
          [
            'https://',
            'www.rhs.org.uk/fruit/gooseberries/',
            'grow-your-own'
          ].join('')
      }
    },

    {
      name: 'Acai Berry',
      localName: 'Açaí',
      scientificName: 'Euterpe oleracea Mart.',
      category: 'fruit',
      icon: 'assets/crops/acai-berry.svg',

      plantingMethods: [
        {
          value: 'nursery-raised-seedlings',
          label: 'Nursery-Raised Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Embrapa Amapá',

        title:
          'Produção de mudas de açaí',

        url:
          [
            'https://',
            'www.embrapa.br/en/busca-de-publicacoes/-/',
            'publicacao/347321/',
            'producao-de-mudas-de-acai'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm, humid tropical growing conditions. Kew identifies Acai as a palm primarily associated with the wet tropical biome. Growth, flowering and fruit production vary with rainfall pattern, site moisture, cultivar or population, and local Amazonian conditions, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No single numeric annual rainfall requirement is stored. Acai naturally occurs in humid tropical environments, including Amazonian floodplain forests and moist upland areas. Embrapa guidance shows that water availability and local site conditions strongly influence production, so FarmCast keeps moisture guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows source guidance emphasizing locally suitable tropical soils, adequate moisture, and appropriate field establishment rather than assigning an unsupported universal pH range.',

      soilNote:
        'Acai is naturally associated with moist tropical environments and can occur in seasonally flooded Amazonian floodplains as well as humid upland sites. Field establishment should therefore match soil moisture, rooting conditions and water management to the local production environment rather than assume that one drainage regime is suitable everywhere.',

      plantingNote:
        'Acai Berry in this FarmCast entry refers specifically to Euterpe oleracea Mart., the familiar Amazonian palm whose dark purple fruits are processed into acai pulp and beverages. Embrapa guidance describes production of nursery seedlings from selected fruits and seeds, including seed preparation, nursery substrate management, irrigation and acclimatization before field planting. Current Kew taxonomy accepts Euterpe oleracea Mart.; its five scientific synonyms are Catis martiana, Euterpe badiocarpa, Euterpe beardii, Euterpe brasiliana and Euterpe cuatrecasasiana.',

      harvestNote:
        'Acai fruits are harvested as mature fruit bunches, but production season varies substantially with region and growing environment. Embrapa reports that fruit production in Amazonian floodplain stands can occur throughout the year with strong monthly peaks, while cultivated Euterpe oleracea near Manaus showed mature bunch production concentrated more strongly during particular months. Because Acai is a perennial palm with region-dependent seasonal fruiting rather than one universal planting-to-harvest interval, FarmCast keeps Acai Berry as guidance-only.',

      source: {
        agency:
          'Embrapa Amapá',

        title:
          'Guia prático de manejo de açaizais para produção de frutos',

        url:
          [
            'https://',
            'www.embrapa.br/en/web/agroindustria-de-alimentos/',
            'busca-de-publicacoes/-/publicacao/964364/',
            'guia-pratico-de-manejo-de-acaizais-',
            'para-producao-de-frutos'
          ].join('')
      }
    },

    {
      name: 'Lotus Root',
      localName: 'Sacred Lotus',
      scientificName: 'Nelumbo nucifera Gaertn.',
      category: 'root-crop',
      icon: 'assets/crops/lotus-root.svg',

      plantingMethods: [
        {
          value: 'rhizome-planted',
          label: 'Planted Rhizomes'
        },
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'Purdue University Extension',

        title:
          'Chinese Vegetables',

        url:
          [
            'https://',
            'ag.purdue.edu/department/hla/',
            'extension/extension-publications-library/',
            'ext-pubs/ho-187-w.html'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm subtropical to tropical aquatic growing conditions. Kew identifies Sacred Lotus as a rhizomatous aquatic plant primarily associated with the subtropical biome and records the species as native across tropical and temperate parts of Asia, including the Philippines. Cultivars and production systems vary substantially, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'A conventional annual rainfall range is not appropriate for this aquatic crop. Lotus Root is cultivated with its rhizomes established in saturated soil beneath shallow standing water. Water level, water quality, soil condition and production system are more meaningful than annual rainfall totals, so FarmCast keeps water guidance descriptive rather than inventing one universal rainfall requirement.',

      soilPH:
        'No universal numeric soil-pH target is stored. FarmCast follows university guidance emphasizing submerged, soil-based aquatic culture rather than assigning an unsupported universal pH range.',

      soilNote:
        'Lotus Root develops its edible enlarged rhizomes in saturated soil beneath shallow water. Purdue University Extension lists Chinese Lotus among water-garden vegetables, while University of Florida IFAS recommends planting lotus rhizomes horizontally in a broad container filled with soil before submerging it in shallow water. Full sun supports vigorous growth. Because lotus can spread strongly through rhizomes, controlled growing beds or containers may be useful where unrestricted spread is undesirable.',

      plantingNote:
        'Lotus Root in this FarmCast entry refers specifically to Nelumbo nucifera Gaertn., also called Sacred Lotus or Chinese Lotus. The familiar lotus root sold as a vegetable is botanically an enlarged underground rhizome rather than a true root. Purdue University Extension lists both rhizomes and seeds as planting materials, while vegetative rhizomes provide a direct method for establishing edible-rhizome plants. Current Kew taxonomy accepts Nelumbo nucifera Gaertn. and lists historical names including Nelumbium asiaticum, Nelumbium indicum, Nelumbium speciosum, Nelumbo indica, Nelumbo speciosa and Nymphaea nelumbo.',

      harvestNote:
        'Edible Lotus cultivars are harvested for their enlarged underground rhizomes. Published lotus research describes rhizome enlargement beginning toward the latter part of the growing season, with enlarged rhizomes harvested from late summer through the following spring depending on cultivar, climate and production system. Seeds and other edible plant parts follow different harvest stages. Because Lotus is a perennial aquatic crop with cultivar- and season-dependent rhizome development rather than one universal planting-to-harvest interval, FarmCast keeps Lotus Root as guidance-only.',

      source: {
        agency:
          'Purdue University Extension',

        title:
          'Chinese Vegetables',

        url:
          [
            'https://',
            'ag.purdue.edu/department/hla/',
            'extension/extension-publications-library/',
            'ext-pubs/ho-187-w.html'
          ].join('')
      }
    },

    {
      name: 'Bay Leaf',
      localName: 'Laurel',
      scientificName: 'Laurus nobilis L.',
      category: 'herb',
      icon: 'assets/crops/bay-leaf.svg',

      plantingMethods: [
        {
          value: 'transplanted-young-plants',
          label: 'Transplanted Young Plants'
        },
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'stem-cuttings',
          label: 'Stem Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Master Gardeners of Santa Clara County',

        title:
          'Bay Laurel',

        url:
          [
            'https://',
            'ucanr.edu/site/uc-master-gardeners-santa-clara-county/',
            'bay-laurel'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Bay Laurel is an evergreen woody herb of primarily subtropical origin. Kew identifies Laurus nobilis as a tree associated mainly with the subtropical biome, while UC Agriculture and Natural Resources recommends a sunny growing site with protection from damaging frost. Because site, container culture and local climate strongly affect growth, FarmCast keeps temperature guidance descriptive rather than assigning an unsupported universal numeric range.',

      rainfallRange:
        'No universal annual rainfall range is stored for Bay Leaf. UC Agriculture and Natural Resources describes established Bay Laurel as a relatively low-water-use plant and emphasizes appropriate irrigation rather than a fixed annual rainfall total. FarmCast therefore keeps water guidance descriptive.',

      soilPH:
        'UC Agriculture and Natural Resources recommends well-drained, slightly acidic soil but does not provide one universal numeric pH target on its Bay Laurel growing guide, so FarmCast does not invent a numeric range.',

      soilNote:
        'Bay Laurel grows best in well-drained soil and a sunny position, with some light afternoon shade also suitable. The plant is naturally woody and evergreen and may be maintained as a smaller container specimen or allowed to develop into a larger shrub or tree. Persistently poorly drained growing conditions should be avoided.',

      plantingNote:
        'Bay Leaf in this FarmCast entry refers specifically to Laurus nobilis L., commonly called Bay Laurel, Sweet Bay or Laurel. UC Agriculture and Natural Resources lists transplants, seed and cuttings as establishment options. Seed germination can be poor and stem cuttings may take months to root, making an established young transplant a practical option. Current Kew taxonomy accepts Laurus nobilis L. and treats historical names including Laurus angusta, Laurus salicifolia, Laurus tenuifolia and Laurus undulata as synonyms.',

      harvestNote:
        'The aromatic leaves are the culinary portion harvested from Bay Laurel. UC Agriculture and Natural Resources states that leaves may be harvested year-round and notes that larger, older leaves generally provide stronger flavor. Because the plant is a perennial woody herb and the guidance does not provide one reliable planting-to-first-harvest interval, FarmCast keeps Bay Leaf as guidance-only rather than creating an automatic harvest date.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Master Gardeners of Santa Clara County',

        title:
          'Bay Laurel',

        url:
          [
            'https://',
            'ucanr.edu/site/uc-master-gardeners-santa-clara-county/',
            'bay-laurel'
          ].join('')
      }
    },

    {
      name: 'Rhubarb',
      localName: 'Pie Plant',
      scientificName: 'Rheum rhabarbarum L.',
      category: 'vegetable',
      icon: 'assets/crops/rhubarb.svg',

      plantingMethods: [
        {
          value: 'crown-divisions',
          label: 'Crown Divisions'
        },
        {
          value: 'bare-root-crowns',
          label: 'Bare-Root Crowns'
        },
        {
          value: 'seed-started-transplants',
          label: 'Seed-Started Transplants'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Rhubarb in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/',
            'yard-and-garden/gardening-in-minnesota/',
            'growing-rhubarb'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Rhubarb is a cool-season perennial vegetable primarily adapted to temperate growing conditions. Kew identifies Rheum rhabarbarum as a perennial of the temperate biome, while University of Minnesota Extension describes it as a hardy perennial crop. Because successful growth and dormancy depend strongly on local seasonal conditions, FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric range.',

      rainfallRange:
        'No universal annual rainfall range is stored for Rhubarb. University of Minnesota Extension emphasizes consistent soil moisture during active growth and supplemental watering when needed rather than a fixed annual rainfall requirement. FarmCast therefore keeps rainfall guidance descriptive.',

      soilPH:
        'University of Minnesota Extension notes that Rhubarb can grow successfully across a broad range of ordinary garden-soil reactions and does not require one narrowly defined pH target, so FarmCast does not assign an unnecessary universal numeric range.',

      soilNote:
        'Rhubarb performs best in fertile, well-drained soil. University of Minnesota Extension notes that loamy soil is particularly suitable because it retains moisture and nutrients while still providing drainage. A sunny growing site is recommended, and poorly drained locations should be avoided because persistent wetness can encourage crown and root problems.',

      plantingNote:
        'Rhubarb is a long-lived perennial vegetable grown for its edible leaf stalks. University of Minnesota Extension describes establishment from seedlings, crown divisions, nursery-grown plants and bare-root crowns. Dividing established crowns is a common vegetative propagation method, while seed-grown plants require a longer establishment period before normal harvesting. Current Kew taxonomy accepts Rheum rhabarbarum L. and lists historical synonyms including Rheum franzenbachii, Rheum macropterum, Rheum muricatum, Rheum sanguineum and Rheum undulatum.',

      harvestNote:
        'The edible portion of Rhubarb is the thick leaf stalk. University of Minnesota Extension recommends allowing newly established plants to develop before regular harvest: plants established vegetatively should not be harvested during their first growing season, while seed-grown plants require an even longer establishment period. Mature stalks are harvested by pulling and twisting them from the crown. Rhubarb leaves are not edible and should be discarded. Because the guidance is expressed in growing seasons and differs between seed-grown and vegetatively established plants, FarmCast keeps Rhubarb as guidance-only rather than converting it into one universal automatic harvest date.',

      source: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Rhubarb in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/',
            'yard-and-garden/gardening-in-minnesota/',
            'growing-rhubarb'
          ].join('')
      }
    },

    {
      name: 'Water Chestnut',
      localName: 'Chinese Water Chestnut',
      scientificName:
        'Eleocharis dulcis (Burm.f.) Trin. ex Hensch.',
      category: 'vegetable',
      icon: 'assets/crops/water-chestnut.svg',

      plantingMethods: [
        {
          value: 'transplanted',
          label: 'Transplanted Corm-Raised Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Eleocharis dulcis (PROSEA)',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/',
            'Eleocharis_dulcis_(PROSEA)'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm tropical to subtropical wetland growing conditions. Kew identifies Eleocharis dulcis as a perennial or tuberous geophyte occurring primarily in tropical and subtropical biomes and records the species as native to the Philippines. Water Chestnut requires a long warm growing period, but FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'A conventional annual rainfall range is not appropriate for Water Chestnut because production depends primarily on controlled shallow-water or flooded-field conditions rather than rainfall totals alone. Water availability and water-level management are therefore more useful than a universal annual rainfall requirement.',

      soilPH:
        'PROSEA reports that Chinese Water Chestnut prefers rich clay or muck soils and cites a preferred soil pH of about 6.9–7.3. Local soil and water conditions should still be considered because the crop is grown under saturated or flooded conditions.',

      soilNote:
        'Water Chestnut is an aquatic vegetable grown for edible corms that develop underground at the ends of stolons. PROSEA describes rich clay or muck soils as suitable, while University of Florida IFAS Extension describes production in controlled flooded plots. The crop requires water-level management throughout active growth rather than ordinary dry-land vegetable culture.',

      plantingNote:
        'Water Chestnut in this FarmCast entry refers specifically to Eleocharis dulcis, commonly called Chinese Water Chestnut. It is not botanically related to the Chestnut tree already listed in FarmCast. PROSEA describes propagation using corms: corms are first established in nursery beds, the resulting young plants are developed further, and established plants are then transplanted into the permanent field. Kew currently accepts Eleocharis dulcis (Burm.f.) Trin. ex Hensch. and lists historical synonyms including Andropogon dulcis, Eleocharis esculenta, Eleocharis plantaginea, Eleocharis tuberosa and Scirpus tuberosus.',

      harvestNote:
        'The edible portion is the crisp underground corm. PROSEA reports that harvesting normally occurs about 7–9 months after transplanting to the field, or when the above-ground stems have turned brown and begun to die back. FarmCast therefore provides an automatic harvest estimate only for the transplanted planting method. Actual crop maturity and stem condition should still take priority over the calendar estimate.',

      source: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Eleocharis dulcis (PROSEA)',

        url:
          [
            'https://',
            'plantuse.plantnet.org/en/',
            'Eleocharis_dulcis_(PROSEA)'
          ].join('')
      }
    },

    {
      name: 'Green Onion',
      localName: 'Scallion / Bunching Onion',
      scientificName: 'Allium fistulosum L.',
      category: 'vegetable',
      icon: 'assets/crops/green-onion.svg',

      plantingMethods: [
        {
          value: 'direct-seeded',
          label: 'Direct Seeded'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Seedlings'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Scallions in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/',
            'yard-and-garden/gardening-in-minnesota/',
            'growing-scallions-in-home-gardens'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Green Onion is a cool-season Allium crop. Kew identifies Allium fistulosum as a bulbous geophyte primarily associated with the temperate biome, while extension guidance shows that planting and harvest timing vary substantially with local season and climate. FarmCast therefore keeps temperature guidance descriptive rather than assigning one universal numeric growing range.',

      rainfallRange:
        'Green Onion requires consistent soil moisture during active growth. University of Minnesota Extension recommends supplemental watering when natural rainfall is insufficient rather than relying on a fixed annual rainfall total, so FarmCast keeps rainfall guidance descriptive.',

      soilPH:
        null,

      soilNote:
        'Green Onion performs best in fertile, well-drained soil. Oregon State University Extension recommends full sun or partial shade and consistently moist soil for bunching onions. Good drainage remains important because prolonged saturated conditions can encourage root and basal problems.',

      plantingNote:
        'Green Onion in this FarmCast entry refers specifically to Allium fistulosum L., commonly called Scallion, Bunching Onion or Welsh Onion. It is botanically distinct from the ordinary bulbing Onion entry in FarmCast, which is Allium cepa. University of Minnesota Extension recommends either direct seeding or starting seedlings and transplanting them outdoors. Current Kew taxonomy accepts Allium fistulosum L. and lists historical synonyms including Cepa fistulosa, Kepa fistulosa, Porrum fistulosum, Allium bouddae and Allium kashgaricum.',

      harvestNote:
        'The edible green and white stalks may be harvested once the plants have reached a usable size. University of Minnesota Extension recommends pulling scallions when they are large enough for use, while Utah State University Extension notes that green onions may be harvested as early as about 50 days after seeding. Because usable harvest size varies by cultivar, planting density and desired market stage, and the available guidance does not give one universal sowing-to-harvest interval, FarmCast keeps Green Onion as guidance-only rather than creating an automatic harvest date.',

      source: {
        agency:
          'University of Minnesota Extension',

        title:
          'Growing Scallions in Home Gardens',

        url:
          [
            'https://',
            'extension.umn.edu/garden-and-home/',
            'yard-and-garden/gardening-in-minnesota/',
            'growing-scallions-in-home-gardens'
          ].join('')
      }
    },

    {
      name: 'Bamboo Shoot',
      localName: 'Labong / Bukawe',
      scientificName:
        'Dendrocalamus asper (Schult. & Schult.f.) Backer',
      category: 'vegetable',
      icon: 'assets/crops/bamboo-shoot.svg',

      plantingMethods: [
        {
          value: 'rhizome-propagules',
          label: 'Rhizome Propagules'
        },
        {
          value: 'culm-cuttings',
          label: 'Culm Cuttings'
        },
        {
          value: 'branch-cuttings',
          label: 'Branch Cuttings'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Dendrocalamus asper',

        url:
          [
            'https://',
            'prosea.prota4u.org/',
            'view.aspx?id=2073'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm, humid tropical growing conditions. Kew identifies Dendrocalamus asper as a bamboo primarily associated with the wet tropical biome and records the species as native to the Philippines. Because local altitude, rainfall pattern, soil moisture and management strongly affect bamboo growth and shoot production, FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'PROSEA reports that Dendrocalamus asper thrives particularly well in locations receiving about 2400 mm of average annual rainfall. This is treated as source-based ecological guidance rather than a universal requirement because the species is cultivated across a wider range of tropical environments.',

      soilPH:
        null,

      soilNote:
        'PROSEA reports that Dendrocalamus asper can grow in many soil types but performs better on heavier soils with good drainage. Sandy and somewhat acidic soils are also used successfully in parts of its cultivated range. FarmCast does not assign a numeric pH because the cited production guidance does not provide one defensible universal soil-pH interval.',

      plantingNote:
        'Bamboo Shoot in this FarmCast entry refers specifically to the edible young shoots of Dendrocalamus asper, a large tropical bamboo also known as Giant Bamboo and locally recorded in the Philippines as Bukawe, Botong or Butong. PROSEA documents propagation by rhizomes, culm cuttings and branch cuttings. Propagules are normally rooted in a nursery before being planted in the field before or during the first half of the rainy season. Current Kew taxonomy accepts Dendrocalamus asper (Schult. & Schult.f.) Backer and lists historical synonyms including Bambusa aspera, Gigantochloa aspera, Dendrocalamus flagellifer, Bambusa bitung and Schizostachyum bitung.',

      harvestNote:
        'The edible crop is the young tender bamboo shoot that emerges from the established clump. PROSEA reports that shoots normally emerge and are harvested during the rainy season and that healthy established clumps may produce several shoots each year. The source does not provide one reliable planting-to-first-edible-shoot interval because production depends strongly on establishment age, clump development, rainfall and management. FarmCast therefore keeps Bamboo Shoot as guidance-only rather than creating an automatic harvest date.',

      source: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Dendrocalamus asper',

        url:
          [
            'https://',
            'prosea.prota4u.org/',
            'view.aspx?id=2073'
          ].join('')
      }
    },

    {
      name: 'Goji Berry',
      localName: 'Wolfberry',
      scientificName: 'Lycium barbarum L.',
      category: 'fruit',
      icon: 'assets/crops/goji-berry.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'transplanted',
          label: 'Transplanted Young Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Goji Berries In Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/',
            'goji-in-the-garden'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Goji Berry is a perennial fruiting shrub primarily associated with temperate growing conditions. Kew identifies Lycium barbarum as a shrub of the temperate biome, while Utah State University Extension notes that fruit quality is best under sunny conditions and may decline during cool, humid weather. Because cultivar, winter conditions and local climate strongly influence growth, FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric growing range.',

      rainfallRange:
        'No universal annual rainfall range is stored for Goji Berry. Utah State University Extension describes established plants as relatively drought tolerant but recommends more frequent irrigation while new transplants establish their root systems. Irrigation demand varies with soil type and local weather, so FarmCast keeps rainfall guidance descriptive.',

      soilPH:
        '7.0–8.0',

      soilNote:
        'Utah State University Extension reports that Goji Berry tolerates a range of soil types but prefers a light loam and naturally performs well in slightly alkaline soil around pH 7–8. Consistently wet or waterlogged soil should be avoided, particularly where drainage is poor.',

      plantingNote:
        'Goji Berry in this FarmCast entry refers specifically to Lycium barbarum L., commonly called Goji, Wolfberry, Matrimony Vine or Boxthorn. Utah State University Extension states that plants can readily be propagated from seed and also provides establishment guidance for nursery transplants. Named cultivars are preferred when consistent fruit quality and production are important. Current Kew taxonomy accepts Lycium barbarum L. and lists historical names including Lycium vulgare, Lycium halimifolium, Lycium cochinchinense, Lycium turbinatum and Jasminoides flaccidum as synonyms.',

      harvestNote:
        'Goji plants are perennial shrubs rather than annual fruit crops. Utah State University Extension reports that plants generally begin producing fruit at about two years of age, while selected cultivars may begin bearing roughly one to two years after planting and reach full production later. Individual berries should be harvested when fully colored; ripe fruit develops approximately 35 days after full bloom. Because first bearing is establishment- and cultivar-dependent rather than one universal planting-to-harvest interval, FarmCast keeps Goji Berry as guidance-only.',

      source: {
        agency:
          'Utah State University Extension',

        title:
          'How to Grow Goji Berries In Your Garden',

        url:
          [
            'https://',
            'extension.usu.edu/yardandgarden/research/',
            'goji-in-the-garden'
          ].join('')
      }
    },

    {
      name: 'Asian Pear',
      localName: 'Nashi Pear / Apple Pear',
      scientificName:
        'Pyrus pyrifolia (Burm.f.) Nakai',
      category: 'fruit',
      icon: 'assets/crops/asian-pear.svg',

      plantingMethods: [
        {
          value: 'grafted-plants',
          label: 'Grafted Pear Tree'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Small Farms Network',

        title:
          'Asian Pears',

        url:
          [
            'https://',
            'ucanr.edu/program/',
            'uc-small-farms-network/',
            'asian-pears'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Asian Pear is a temperate fruit tree. Kew identifies Pyrus pyrifolia as a tree growing primarily in the temperate biome. Local winter chilling, cultivar and spring-frost conditions strongly influence flowering and fruit production, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric crop-growth range.',

      rainfallRange:
        'No universal annual rainfall requirement is stored. Asian Pear requires consistent moisture during active growth and fruit development, but irrigation needs vary with climate, soil and rootstock. FarmCast therefore keeps water guidance descriptive rather than inventing a fixed annual rainfall range.',

      soilPH:
        '5.9–6.5',

      soilNote:
        'Asian Pear performs best in fertile, well-drained soil and full sun. Oregon State University Extension describes consistent and uniform soil moisture as desirable and gives a preferred soil-pH range of about 5.9–6.5. Sites with persistent waterlogging or poor air drainage should be avoided.',

      plantingNote:
        'Asian Pear in this FarmCast entry refers specifically to Pyrus pyrifolia (Burm.f.) Nakai, commonly called Nashi Pear, Japanese Pear, Sand Pear or Apple Pear. It is botanically distinct from the European Pear entry already in FarmCast, which is Pyrus communis L. Asian pear cultivars are commonly propagated by grafting onto suitable pear rootstocks; University of California guidance discusses Pyrus betulifolia, Pyrus calleryana and other pear rootstocks used for Asian pear production. Current Kew taxonomy accepts Pyrus pyrifolia and lists historical names including Pyrus serotina, Pyrus sinensis, Pyrus autumnalis and Pyrus pyrifolia var. culta among its synonyms.',

      harvestNote:
        'Asian Pear differs from European Pear because the fruit is normally allowed to ripen on the tree. Penn State Extension recommends harvesting when mature fruit separates readily from the spur or branch with a slight lift and twist, with taste and crisp texture used as additional maturity indicators. Cultivars mature at different points in the season. Because tree establishment age, cultivar and local climate determine first bearing and there is no single reliable planting-to-first-harvest interval, FarmCast keeps Asian Pear as guidance-only.',

      source: {
        agency:
          'Penn State Extension',

        title:
          'Asian Pears in the Home Orchard - Variety Selection',

        url:
          [
            'https://',
            'extension.psu.edu/',
            'asian-pears-in-the-home-orchard-variety-selection'
          ].join('')
      }
    },

    {
      name: 'Mabolo',
      localName: 'Mabolo / Kamagong',
      scientificName: 'Diospyros blancoi A.DC.',
      category: 'fruit',
      icon: 'assets/crops/mabolo.svg',

      plantingMethods: [
        {
          value: 'seed-grown-seedlings',
          label: 'Seed-Grown Seedlings'
        },
        {
          value: 'grafted-plants',
          label: 'Grafted Plants'
        },
        {
          value: 'budded-plants',
          label: 'Budded Plants'
        },
        {
          value: 'marcotted-plants',
          label: 'Marcotted / Air-Layered Plants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Diospyros blancoi A.DC.',

        url:
          [
            'https://',
            'prosea.prota4u.org/',
            'view.aspx?id=1499'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm, humid tropical growing conditions. Kew identifies Diospyros blancoi as a tree primarily associated with the wet tropical biome and records it as native to the Philippines. PROSEA reports that Mabolo grows well under monsoon conditions from low to medium elevations. Because local rainfall pattern, elevation and site conditions influence tree growth and fruiting, FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric range.',

      rainfallRange:
        'No universal annual rainfall range is stored for Mabolo. PROSEA describes the species as well adapted to monsoon climates in the Philippines but does not provide one universal annual rainfall requirement for fruit production. FarmCast therefore keeps rainfall guidance descriptive rather than inventing a numeric range.',

      soilPH:
        null,

      soilNote:
        'PROSEA reports that Mabolo can grow on almost any soil under suitable tropical conditions. FarmCast therefore avoids assigning a narrow universal soil type or numeric pH requirement that is not supported by the cited production guidance. Good drainage and appropriate orchard establishment remain important for healthy tree development.',

      plantingNote:
        'Mabolo is a Philippine native fruit tree botanically identified as Diospyros blancoi A.DC. It is also widely known as Velvet Apple, while Kamagong commonly refers to the same tree and especially its dark hardwood. PROSEA documents propagation from seed as well as vegetative propagation through marcotting, budding and grafting, with grafting commercially practiced in the Philippines. Current Kew taxonomy accepts Diospyros blancoi A.DC. and treats historical names including Diospyros discolor, Diospyros mabolo, Diospyros philippensis and Cavanillea mabolo as synonyms.',

      harvestNote:
        'Mabolo fruit is considered mature when its skin changes from greenish-brown toward dull red. PROSEA reports that seedling trees may begin bearing about 6–7 years after planting, while grafted trees may begin bearing about 3–4 years after planting. In the Philippines, flowering commonly occurs during the dry season and fruiting generally occurs around June to September. Because first bearing differs substantially between propagation methods and tree development, FarmCast keeps Mabolo as guidance-only rather than assigning one automatic harvest date.',

      source: {
        agency:
          'Plant Resources of South-East Asia (PROSEA)',

        title:
          'Diospyros blancoi A.DC.',

        url:
          [
            'https://',
            'prosea.prota4u.org/',
            'view.aspx?id=1499'
          ].join('')
      }
    },

    {
      name: 'Prickly Pear',
      localName: 'Cactus Pear / Indian Fig',
      scientificName:
        'Opuntia ficus-indica (L.) Mill.',
      category: 'fruit',
      icon: 'assets/crops/prickly-pear.svg',

      plantingMethods: [
        {
          value: 'pad-cuttings',
          label: 'Pad Cuttings'
        },
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        }
      ],

      plantingMethodSource: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Small Farms Network',

        title:
          'Prickly Pear Cactus',

        url:
          [
            'https://',
            'ucanr.edu/program/',
            'uc-small-farms-network/',
            'prickly-pear-cactus'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Warm-season, dry tropical to subtropical growing conditions. Kew identifies Opuntia ficus-indica as a succulent shrub or tree primarily associated with the seasonally dry tropical biome. University of California guidance also describes Prickly Pear as a warm-season crop that performs best in sunny conditions. Because cultivar, rainfall, humidity and local winter conditions influence growth, FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric range.',

      rainfallRange:
        'Prickly Pear is adapted to relatively dry growing conditions and established plants generally require much less water than conventional fruit crops. University of California guidance warns that excessive moisture can encourage root rot. Because irrigation needs depend strongly on climate, soil drainage and plant establishment, FarmCast keeps rainfall guidance descriptive rather than assigning one universal annual rainfall range.',

      soilPH:
        null,

      soilNote:
        'Prickly Pear performs best in a sunny site with very well-drained soil. University of California guidance recommends a freely draining soil mixture for establishing pad cuttings and warns against excessive moisture because newly planted pads can rot before roots develop. FarmCast therefore emphasizes drainage rather than inventing an unsupported universal numeric soil-pH target.',

      plantingNote:
        'Prickly Pear in this FarmCast entry refers specifically to Opuntia ficus-indica (L.) Mill., also known as Cactus Pear and Indian Fig. The crop may be propagated from seed, but University of California guidance notes that seed-grown plants develop slowly. Pad cuttings provide a simpler and faster vegetative method: mature pads are allowed to form a dry callus before establishment in well-drained soil. Current Kew taxonomy accepts Opuntia ficus-indica and lists historical names including Cactus ficus-indica, Cactus opuntia, Opuntia chinensis, Opuntia vulgaris and Platyopuntia ficus-indica among its synonyms.',

      harvestNote:
        'Both the fruit and young pads of Prickly Pear are edible. University of California guidance reports that seed-grown plants may require about three to four years before flowering and fruiting, while plants propagated from established pads can flower sooner depending on maturity. Fruits are harvested when fully ripe; University of Arizona Extension notes that ripe fruit develops full color and does not continue ripening after harvest. Because seed-grown and pad-grown plants have very different establishment and first-bearing times, FarmCast keeps Prickly Pear as guidance-only rather than assigning one automatic planting-to-harvest date.',

      source: {
        agency:
          'University of California Agriculture and Natural Resources',

        office:
          'UC Small Farms Network',

        title:
          'Prickly Pear Cactus',

        url:
          [
            'https://',
            'ucanr.edu/program/',
            'uc-small-farms-network/',
            'prickly-pear-cactus'
          ].join('')
      }
    },

    {
      name: 'Elderberry',
      localName: 'Black Elder / European Elderberry',
      scientificName: 'Sambucus nigra L.',
      category: 'fruit',
      icon: 'assets/crops/elderberry.svg',

      plantingMethods: [
        {
          value: 'seed-sown',
          label: 'Seed Sown'
        },
        {
          value: 'hardwood-cuttings',
          label: 'Hardwood Cuttings'
        },
        {
          value: 'softwood-cuttings',
          label: 'Softwood Cuttings'
        },
        {
          value: 'transplanted',
          label: 'Nursery-Grown Transplants'
        }
      ],

      plantingMethodSource: {
        agency:
          'Royal Botanic Gardens, Kew',

        title:
          'Sambucus nigra L. — General Information',

        url:
          [
            'https://',
            'powo.science.kew.org/taxon/',
            'urn:lsid:ipni.org:names:30122169-2/',
            'general-information'
          ].join('')
      },

      minTemp: null,
      maxTemp: null,

      idealTempRange:
        'Elderberry is primarily a temperate fruiting shrub or small tree. Kew identifies Sambucus nigra as a species associated mainly with the temperate biome. Flowering, dormancy and fruit-ripening periods vary substantially with cultivar and local climate, so FarmCast keeps temperature guidance descriptive rather than assigning one universal numeric growing range.',

      rainfallRange:
        'No universal annual rainfall range is stored for Elderberry. Established elderberry plants tolerate varying moisture conditions, while regular irrigation can support fruit production during dry periods. Local soil, rainfall and seasonal heat strongly affect water demand, so FarmCast keeps rainfall guidance descriptive.',

      soilPH:
        null,

      soilNote:
        'Elderberry can grow in a range of soil types. Kew reports that Sambucus nigra grows successfully in most soils, while extension guidance recommends soil with good organic matter and adequate drainage. Heavy or persistently waterlogged soil should be managed carefully, and FarmCast avoids assigning an unsupported universal numeric soil-pH target.',

      plantingNote:
        'Elderberry in this FarmCast entry refers specifically to Sambucus nigra L., commonly called European Elderberry, Black Elder or Elder. Kew documents propagation from seed and from cuttings. Nursery-grown plants may also be transplanted for establishment. Current Kew taxonomy accepts Sambucus nigra L. and lists historical names including Sambucus florida, Sambucus alba, Sambucus laciniata, Sambucus vulgaris and numerous cultivated botanical forms as synonyms.',

      harvestNote:
        'Elderberry produces clusters of dark berries that should be harvested only after the fruit is fully ripe. Harvest timing varies with location and cultivar, and not every berry cluster ripens at the same time. The ripe berries are normally cooked or processed before eating; leaves, stems and unripe fruit should not be eaten. Because FarmCast does not have one reliable planting-method-specific planting-to-first-harvest interval for Sambucus nigra, Elderberry remains guidance-only rather than receiving an automatic harvest date.',

      source: {
        agency:
          'Royal Botanic Gardens, Kew',

        title:
          'Sambucus nigra L.',

        url:
          [
            'https://',
            'powo.science.kew.org/taxon/',
            'urn:lsid:ipni.org:names:30122169-2'
          ].join('')
      }
    },

  
];

