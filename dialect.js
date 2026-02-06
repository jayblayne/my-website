// dialect.js — ONLY for dialect.html

const params = new URLSearchParams(window.location.search);
const dialectId = params.get("dialect");

const profile = dialectProfiles[dialectId];

function renderDialectProfile(profile) {
  if (!profile) return;

  const container = document.getElementById("dialectProfile");

  container.innerHTML = `
    <section class="dialect-profile">
      <h2>${profile.name}</h2>

      <h3>Dialectal Features</h3>
      <ul>
        ${profile.features.map(f => `<li>${f}</li>`).join("")}
      </ul>

      <h3>Phonemic Inventory</h3>
      <p><strong>Consonants:</strong> ${profile.phonemicInventory.consonants.join(", ")}</p>
      <p><strong>Vowels:</strong> ${profile.phonemicInventory.vowels.join(", ")}</p>

      <h3>Grammatical Notes</h3>
      <ul>
        ${profile.grammaticalNotes.map(n => `<li>${n}</li>`).join("")}
      </ul>

      ${
        profile.trajectoryMap
          ? `<h3>Phonetic Trajectory</h3>
             <img src="${profile.trajectoryMap}" alt="Phonetic trajectory map">`
          : ""
      }
    </section>
  `;
}

renderDialectProfile(profile);
