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

  // Global audio player (required for inline onclick)
  window.playAudio = function (id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

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

      /* ---------- Examples + Example Audio ---------- */
      let examplesHTML = "";
      if (entry.examples) {
        const exampleList = entry.examples.split("||");
        const audioList = entry.example_audio
          ? entry.example_audio.split("||")
          : [];

        examplesHTML = exampleList
          .map((example, i) => {
            const [oodham, english] = example.split("::");
            const exampleAudioId = `example-audio-${index}-${i}`;

            return `
              <div class="example-line">
                ${oodham.trim()} – <em>${english.trim()}</em>
                ${
                  audioList[i]
                    ? `
                      <span class="audio-icon"
                            onclick="playAudio('${exampleAudioId}')">🔈</span>
                      <audio id="${exampleAudioId}" src="${audioList[i]}"></audio>
                    `
                    : ""
                }
              </div>
            `;
          })
          .join("");
      }

      /* ---------- Entry HTML ---------- */
      div.innerHTML = `
        <div class="entry-headword">
          <strong>${entry.oodham || ""}</strong>
          ${entry.sing_audio ? `
            <span class="audio-icon"
                  onclick="playAudio('${singularAudioId}')">🔈</span>
            <audio id="${singularAudioId}" src="${entry.sing_audio}"></audio>
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
            ${entry.pl_audio ? `
              <span class="audio-icon"
                    onclick="playAudio('${pluralAudioId}')">🔈</span>
              <audio id="${pluralAudioId}" src="${entry.pl_audio}"></audio>
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
