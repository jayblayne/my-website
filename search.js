// Get references to DOM elements
const searchInput = document.getElementById("searchInput");
const dialectSelect = document.getElementById("dialectSelect");
const resultsDiv = document.getElementById("results");

// Auto-populate the dialect dropdown from lexicon
const dialectSet = new Set();
lexicon.forEach(entry => {
  if (entry.dialect) dialectSet.add(entry.dialect);
});
dialectSet.forEach(dialect => {
  const option = document.createElement("option");
  option.value = dialect;
  option.textContent = dialect;
  dialectSelect.appendChild(option);
});

// Main search function
function performSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedDialect = dialectSelect.value;
  resultsDiv.innerHTML = "";

  if (!query && !selectedDialect) return;

  // Filter lexicon based on word and dialect
  const matches = lexicon.filter(entry => {
    const wordMatch =
      (entry.english && entry.english.toLowerCase().includes(query)) ||
      (entry.oodham && entry.oodham.toLowerCase().includes(query)) ||
      (entry.reduplicated && entry.reduplicated.toLowerCase().includes(query));

    const dialectMatch = selectedDialect
      ? entry.dialect && entry.dialect.toLowerCase() === selectedDialect.toLowerCase()
      : true;

    return wordMatch && dialectMatch;
  });

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  // Display matches as cards
  matches.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry card";

    // Build examples HTML
    let examplesHTML = "";
    if (entry.examples) {
      const exampleList = entry.examples.split("||");
      examplesHTML = exampleList
        .map(example => {
          const [oodhamPhrase, englishTranslation] = example.split("::");
          return englishTranslation
            ? `${oodhamPhrase.trim()} – <em>${englishTranslation.trim()}</em>`
            : oodhamPhrase.trim();
        })
        .join("<br>");
      examplesHTML = `<p><strong>Examples:</strong><br>${examplesHTML}</p>`;
    }

    // Build card HTML conditionally
    div.innerHTML = `
      ${entry.oodham ? `<p><strong>O'odham:</strong> ${entry.oodham}</p>` : ""}
      ${entry.english ? `<p><strong>English:</strong> ${entry.english}</p>` : ""}
      ${entry.partOfSpeech ? `<p><strong>Part of Speech:</strong> ${entry.partOfSpeech}</p>` : ""}
      ${entry.pronunciation ? `<p><strong>Pronunciation:</strong> ${entry.pronunciation}</p>` : ""}
      ${entry.reduplicated ? `<p><strong>Reduplicated:</strong> ${entry.reduplicated}</p>` : ""}
      ${entry.redup_pronunciation ? `<p><strong>Reduplicated Pronunciation:</strong> ${entry.redup_pronunciation}</p>` : ""}
      ${entry.redup_meaning ? `<p><strong>Reduplicated Meaning:</strong> ${entry.redup_meaning}</p>` : ""}
      ${entry.dialect ? `<p><strong>Dialect:</strong> ${entry.dialect}</p>` : ""}
      ${examplesHTML ? examplesHTML : ""}
      ${entry.audio ? `<audio controls src="${entry.audio}" style="margin-top:10px;"></audio>` : ""}
      ${entry.image ? `<img src="${entry.image}" alt="${entry.english || 'image'}" style="max-width:200px; margin-top:10px; border-radius:8px;">` : ""}
    `;

    resultsDiv.appendChild(div);
  });
}

// Trigger search when input or dialect changes
searchInput.addEventListener("input", performSearch);
dialectSelect.addEventListener("change", performSearch);
