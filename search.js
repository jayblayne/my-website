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

  function playAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

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

    matches.forEach((entry, index) => {
      const div = document.createElement("div");
      div.className = "card";

      const singularAudioId = `singular-audio-${index}`;
      const pluralAudioId = `plural-audio-${index}`;

      // Examples
      let examplesHTML = "";
      if (entry.examples) {
        const exampleList = entry.examples.split("||");
        examplesHTML = exampleList
          .map(example => {
            const [oodham, english] = example.split("::");
            return `<div>${oodham.trim()} – <em>${english.trim()}</em></div>`;
          })
          .join("");
      }

      div.innerHTML = `
        <div class="entry-headword">
          <strong>${entry.oodham || ""}</strong>
          ${entry.audio_singular ? `
            <span class="audio-icon" onclick="(${playAudio})('${singularAudioId}')">🔈</span>
            <audio id="${singularAudioId}" src="${entry.audio_singular}"></audio>
          ` : ""}
        </div>

        <div class="entry-english">
          ${entry.english || ""}
        </div>

        <div class="entry-grammar">
  ${entry.partOfSpeech ? entry.partOfSpeech : ""}
  ${entry.partOfSpeech && entry.pattern ? ", " : ""}
  ${entry.pattern ? `Pattern ${entry.pattern}` : ""}
</div>

        ${entry.pronunciation ? `
          <div class="entry-ipa">
            <strong>IPA:</strong> ${entry.pronunciation}
          </div>
        ` : ""}

        ${entry.reduplicated ? `
          <div class="entry-plural">
            <strong>Plural:</strong> ${entry.reduplicated}
            ${entry.audio_red ? `
              <span class="audio-icon" onclick="(${playAudio})('${pluralAudioId}')">🔈</span>
              <audio id="${pluralAudioId}" src="${entry.audio_red}"></audio>
            ` : ""}
          </div>
        ` : ""}

        ${examplesHTML ? `
          <div class="entry-examples">
            <strong>Example(s):</strong>
            ${examplesHTML}
          </div>
        ` : ""}
      `;

      resultsDiv.appendChild(div);
    });
  }

  searchInput.addEventListener("input", performSearch);
  dialectSelect.addEventListener("change", performSearch);
});
