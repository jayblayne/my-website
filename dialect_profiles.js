const dialectProfiles = {
  akchin: {
    name: "Ak-Chin O'odham",

    metadata: {
    },

    phonology: {
      phonemicInventoryCSV: "dialectprofiles/akchin/akchin_inventory.csv",
      
      notes: [
        "information about dialect"// e.g. "Contrastive vowel length",
        // e.g. "Restricted consonant clusters"
      ],
      allophony: [
  {
    label: "/v/ becomes [w] before the following sequences:",
    items: [
      "_ua: as in <b>wua</b> <em>(doing)</em>",
      "_ui: as in <b>wui</b> <em>(to/toward)</em>",
      "_uha: as in <b>wuha</b> <em>(woke up)</em>",
      "_uhi: as in <b>wuhi</b> <em>(eye)</em>"
    ]
  },
   {
    label: "/h/ becomes breathy voice between two vowels, for example:",
    items: [
      "kahio sounds like <b>ka̤io</b> <em>(leg)</em>",
      "daha sounds like <b>da̤a</b> <em>(sitting)</em>",
      "wuhi sounds like <b>wṳi</b> <em>(eye)</em>"    
    ]
  },
  {
    label: "/ʔ/ (the glottal stop ') may become creaky voice between two vowels, for example:",
    items: [
      "do'ag sounds like <b>do̰ag</b> <em>(mountain)</em>",
      "sa'i sounds like <b>sa̰i</b> <em>(bush)</em>",   
    ]
  },
  {
    label: "/ʔ/ (the glottal stop ') may also be deleted between two vowels, for example:",
    items: [
      "si'alim may sound like <b>sialim</b> <em>(morning)</em>",
  
    ]
  } 
 
]

    },

    grammar: {
      morphology: [
        // optional
      ],
      syntax: [
        // optional
      ]
    },

    lexicon: {
      tableCSV: ""
    },

    maps: {
      trajectory: ""
    }
  }
};
