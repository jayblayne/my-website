// dialect_profiles.js
const dialectProfiles = {
  akchin: {
    name: "Ak-Chin",
    features: [
      "feature"
    ],
    phonemicInventoryCSV: "dialectprofiles/akchin/akchin_inventory.csv", // IPA chart CSV
    grammaticalNotes: [
      "feature"
    ],
    trajectoryMap: "",
    tableCSV: ""  // optional word table
  },

  tohono: {
    name: "Sells, Arizona",
    features: [
      "Dropping of some determiners",
      "Unique vowel shifts"
    ],
    phonemicInventoryCSV: null,
    grammaticalNotes: [
      "Determiners often dropped sentence-initially",
      "Reduplication signals aspect"
    ],
    trajectoryMap: null,
    tableCSV: "tohono_dialect.csv"
  }
};

