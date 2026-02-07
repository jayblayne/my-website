const dialectProfiles = {
  akchin: {
    name: "Ak-Chin O'odham",

    metadata: {},

    phonology: {
      phonemicInventoryCSV: "dialectprofiles/akchin/akchin_inventory.csv",

      // General phonology notes (optional)
      notes: [],

      // Consonant allophony
      dialect_allophony: [
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
            "wuhi sounds like <b>wṳi</b> <em>(eye)</em>"
          ]
        }
        // ...other rules
      ],

      // === Nested Vowel & Diphthong Charts ===
      vowelCharts: [
        {
          title: "Vowel Chart (IPA)",
          csv: "dialectprofiles/akchin/akchin_vowels.csv",
          generalNotes: [
            "General notes on vowels go here.",
            "Vowel allophony details can go here."
          ],
          allophony: [
            {
              label: "Vowel allophony examples:",
              items: [
                "i → [ɪ] in closed syllables",
                "a → [ɑ] before uvulars"
              ]
            }
          ]
        },
        {
          title: "Diphthong Chart (IPA)",
          csv: "dialectprofiles/akchin/akchin_diphthongs.csv",
          generalNotes: [
            "General notes on diphthongs go here.",
            "Diphthong allophony details can go here."
          ],
          allophony: [
            {
              label: "/iu/, /iɔ/ and /iɑ/ tend to become [ju], [jɔ], and [jɑ] in the surface form.",
              items: [
                "/iu/ → [ju], as in <em>/dɑpiun/</em> pronounced as <b>[ˈd̪ɑpjun̥]</b>, meaning 'smooth out, iron out'",
                "/iɔ/ → [jɔ], as in <em>/kiɔhɔɖ̥/</em> pronounced as <b>[ˈkjɔhɔɖ̥]</b>, meaning 'rainbow'",
              ]
            }, 
            {
              label: "/ui/ and /uɑ/ tend to become [wi] and[wɑ] in the surface form.",
              items: [
                "/ui/ → [wu], as in <em>/kui/</em> pronounced as <b>[kwi]</b>, meaning 'mesquite tree'",
                "/uɑ/ → [wɑ], as in <em>/cuɑ/</em> pronounced as <b>[cwɑ]</b>, meaning 'ground up'"
              ]
            }
          ]
        }
      ]
    },

    grammar: {
      morphology: [],
      syntax: []
    },

    lexicon: {
      tableCSV: ""
    },

    maps: {
      trajectory: ""
    }
  }
};
