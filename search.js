document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const dialectSelect = document.getElementById("dialectSelect");
  const resultsDiv = document.getElementById("results");

  // Auto-populate dialect dropdown
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
    const selectedDialect = dialectSelect.value.toLowerCase();
    resultsDiv.innerHTML = "";

    if (!query && !selectedDialect) return;

    const matches = lexicon.filter(entry => {
      const wordMatch =
        (entry.english && entry.english.toLowerCase().startsWith(query)) ||
        (entry.oodham && entry.oodham.toLowerCase().startsWith(query)) ||
        (entry.reduplicated && entry.reduplicated.toLowerCase().startsWith(query));

      const dialectMatch = selectedDialect
        ? entry.dialect && entry.dialect.toLowerCase() === selectedDialect
        : true;

      return wordMatch && dialectMatch;
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    matches.forEach(entry => {
      const div = document.createElement("div");
      div.className = "card";

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

      div.innerHTML = `
        ${entry.oodham ? `<p><strong>O'odham:</strong> ${entry.oodham}</p>` : ""}
        ${entry.english ? `<p><strong>English:</strong> ${entry.english}</p>` : ""}
        ${entry.pos ? `<p><strong>Part of Speech:</strong> ${entry.pos}</p>` : ""}
        ${entry.pronunciation ? `<p><strong>Pronunciation:</strong> ${entry.pronunciation}</p>` : ""}
        ${entry.reduplicated ? `<p><strong>Reduplicated:</strong> ${entry.reduplicated}</p>` : ""}
        ${entry.redup_pronunciation ? `<p><strong>Reduplicated Pronunciation:</strong> ${entry.redup_pronunciation}</p>` : ""}
        ${entry.redup_meaning ? `<p><strong>Reduplicated Meaning:</strong> ${entry.redup_meaning}</p>` : ""}
        ${entry.dialect ? `<p><strong>Dialect:</strong> ${entry.dialect}</p>` : ""}
        ${examplesHTML ? examplesHTML : ""}
        ${entry.audio ? `<audio controls src="${entry.audio}"></audio>` : ""}
        ${entry.image ? `<img src="${entry.image}" alt="${entry.english || 'image'}">` : ""}
      `;

      resultsDiv.appendChild(div);
    });
  }

  searchInput.addEventListener("input", performSearch);
  dialectSelect.addEventListener("change", performSearch);
});
