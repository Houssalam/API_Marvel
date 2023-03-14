const apiUrl =
  "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=4cee644e88fd1655695e5ce471b4b30b&hash=5b00ad381b4d987e9b16446000a470da";

const characterSelect = document.getElementById("character-select");
const characterDetails = document.getElementById("character-details");

fetch(apiUrl)
  .then((response) => response.json())
  .then((result) => {
    result.data.results.forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;

      characterSelect.appendChild(option);
    });
  });

characterSelect.addEventListener("change", () => {
  const selectedCharacterId = characterSelect.value;

  const characterUrl = `${apiUrl}&id=${selectedCharacterId}`;

  fetch(characterUrl)
    .then((response) => response.json())
    .then((result) => {
      const character = result.data.results[0];

      characterDetails.innerHTML = `
              <h2>${character.name}</h2>
              <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
              <p>${character.description}</p>
            `;
    });
});
