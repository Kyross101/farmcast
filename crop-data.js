// ═══════════════════════════════════════════
// FARMCAST — Crop Reference Dataset
// ═══════════════════════════════════════════

window.FARMCAST_CROPS = [

 {
    name: 'Tomato',
    category: 'vegetable',
    emoji: '🍅',
    icon: 'assets/crops/tomato.svg',
    minTemp: 18,
    maxTemp: 32,
    noRain: false,
    windMax: 20
 },

 {
    name: 'Eggplant',
    category: 'vegetable',
    emoji: '🍆',
    icon: 'assets/crops/eggplant.svg',
    minTemp: 22,
    maxTemp: 35,
    noRain: false,
    windMax: 25
 },

 {
    name: 'Corn',
    category: 'grain',
    emoji: '🌽',
    icon: 'assets/crops/corn.svg',
    minTemp: 18,
    maxTemp: 33,
    noRain: false,
    windMax: 15
  },

  {
    name: 'Okra',
    category: 'vegetable',
    emoji: '🥦',
    icon: 'assets/crops/okra.svg',
    minTemp: 25,
    maxTemp: 38,
    noRain: false,
    windMax: 20
  },

  {
    name: 'Sitaw',
    category: 'vegetable',
    emoji: '🫛',
    icon: 'assets/crops/sitaw.svg',
    minTemp: 20,
    maxTemp: 35,
    noRain: false,
    windMax: 22
  },

  {
    name: 'Ampalaya',
    category: 'vegetable',
    emoji: '🥒',
    icon: 'assets/crops/ampalaya.svg',
    minTemp: 24,
    maxTemp: 36,
    noRain: false,
    windMax: 20
  },

  {
    name: 'Pechay',
    category: 'vegetable',
    emoji: '🥬',
    icon: 'assets/crops/pechay.svg',
    minTemp: 15,
    maxTemp: 25,
    noRain: false,
    windMax: 20
  },

  {
    name: 'Kamote',
    category: 'root-crop',
    emoji: '🍠',
    icon: 'assets/crops/kamote.svg',
    minTemp: 20,
    maxTemp: 35,
    noRain: true,
    windMax: 25
  },

  {
    name: 'Banana',
    category: 'fruit',
    icon: 'assets/crops/banana.svg',
    minTemp: 15,
    maxTemp: 35,
    noRain: false,
    windMax: null
  },

  {
    name: 'Papaya',
    category: 'fruit',
    icon: 'assets/crops/papaya.svg',
    minTemp: 21,
    maxTemp: 33,
    noRain: false,
    windMax: null
  },

  {
    name: 'Mango',
    category: 'fruit',
    icon: 'assets/crops/mango.svg',
    minTemp: 22,
    maxTemp: 34,
    noRain: false,
    windMax: null
  },

  {
    name: 'Calamansi',
    category: 'fruit',
    icon: 'assets/crops/calamansi.svg',

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

];