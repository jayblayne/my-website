document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const dialectSelect = document.getElementById("dialectSelect");
  const resultsDiv = document.getElementById("results");

  /* -------------------------------
     TRUE LAZY-LOADED AUDIO PLAYER
  -------------------------------- */
  let currentAudio = null;

  window.playAudio = function (src) {
    if (!src) return;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(src);
    currentAudio.play();
  };

  /* -------------------------------
     Normalize CSV keys
  -------------------------------- */
  const normalizedLexicon = lexicon.map(entry => {
    const normalizedEntry = {};
    for (let key in entry) {
      normalizedEntry[key.trim()] = entry[key];
    }
    return normalizedEntry;
  });

  /* -------------------------------
     Populate dialect dropdown
  -------------------------------- */
  const dialectSet = new Set();

  normalizedLexicon.forEach(entry => {
    if (entry.dialect) {
      dialectSet.add(entry.dialect);
    }
  });

  dialectSet.forEach(dialect => {
    const option = document.createElement("option");
    option.value = dialect;
    option.textContent = dialect;
    dialectSelect.appendChild(option);
  });

  /* -------------------------------
     Search logic
  -------------------------------- */
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedDialect = dialectSelect.value.toLowerCase();
    resultsDiv.innerHTML = "";

    if (!query && !selectedDialect) return;

    let matches = normalizedLexicon.filter(entry => {

      const wordMatch =
        !query ||
        (entry.english && entry.english.toLowerCase().includes(query)) ||
        (entry.oodham && entry.oodham.toLowerCase().includes(query)) ||
        (entry.reduplicated && entry.reduplicated.toLowerCase().includes(query)) ||
        (entry.redup_meaning && entry.redup_meaning.toLowerCase().includes(query));

      const dialectMatch = selectedDialect
        ? entry.dialect && entry.dialect.toLowerCase() === selectedDialect
        : true;

      return wordMatch && dialectMatch;
    });

    /* --------------------------------
       ✅ SORT alphabetically ONLY when:
       - dialect selected
       - query is empty
    -------------------------------- */
    if (!query && selectedDialect) {
      matches.sort((a, b) => {
        const aWord = (a.oodham || "").toLowerCase();
        const bWord = (b.oodham || "").toLowerCase();
        return aWord.localeCompare(bWord);
      });
    }

    if (matches.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    /* -------------------------------
       Render results
    -------------------------------- */
    matches.forEach(entry => {
      const div = document.createElement("div");
      div.className = "card";

      /* -------- Examples -------- */
      let examplesHTML = "";
      if (entry.examples) {
        const exampleList = entry.examples.split("||");
        const audioList = entry.example_audio
          ? entry.example_audio.split("||")
          : [];

        examplesHTML = exampleList
          .map((example, i) => {
            const [oodham, english] = example.split("::");

            return `
              <div class="example-line">
                ${oodham.trim()} – <em>${english.trim()}</em>
                ${
                  audioList[i]
                    ? `<span class="audio-icon"
                             onclick="playAudio('${audioList[i]}')">🔈</span>`
                    : ""
                }
              </div>
            `;
          })
          .join("");
      }

      /* -------- Entry HTML -------- */
      div.innerHTML = `
        <div class="entry-headword">
          <strong>${entry.oodham || ""}</strong>
          ${
            entry.sing_audio
              ? `<span class="audio-icon"
                       onclick="playAudio('${entry.sing_audio}')">🔈</span>`
              : ""
          }
        </div>

        <div class="entry-english">
          ${entry.english || ""}
        </div>

        <div class="entry-grammar">
          ${entry.partOfSpeech || ""}
          ${entry.partOfSpeech && entry.pattern ? ", " : ""}
          ${entry.pattern ? `Pattern ${entry.pattern}` : ""}
        </div>

        ${
          entry.pronunciation
            ? `<div class="entry-ipa">
                 <strong>Singular IPA:</strong> ${entry.pronunciation}
               </div>`
            : ""
        }

        ${
          entry.reduplicated
            ? `<div class="entry-plural">
                 <strong>Plural:</strong> ${entry.reduplicated}

                 ${
                   entry.redup_pronunciation
                     ? `<div class="entry-redup-ipa">
                          <strong>Plural IPA:</strong> ${entry.redup_pronunciation}
                        </div>`
                     : ""
                 }

                 ${
                   entry.redup_meaning
                     ? `<div class="entry-redup-meaning">
                          <em>${entry.redup_meaning}</em>
                        </div>`
                     : ""
                 }

                 ${
                   entry.pl_audio
                     ? `<span class="audio-icon"
                              onclick="playAudio('${entry.pl_audio}')">🔈</span>`
                     : ""
                 }
               </div>`
            : ""
        }

        ${
          examplesHTML
            ? `<div class="entry-examples">
                 <strong>Example(s):</strong>
                 ${examplesHTML}
               </div>`
            : ""
        }
      `;

      resultsDiv.appendChild(div);
    });
  }

  /* -------------------------------
     Event listeners
  -------------------------------- */
  searchInput.addEventListener("input", performSearch);
  dialectSelect.addEventListener("change", performSearch);
});
