const apiUrl =
  "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=4cee644e88fd1655695e5ce471b4b30b&hash=5b00ad381b4d987e9b16446000a470da";

const characterSelect = document.getElementById("character-select");
const characterDetails = document.getElementById("character-details");

function addOptions(characters) {
  characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character.id;
    option.text = character.name;
    characterSelect.appendChild(option);
  });
}

function showDetails(character) {
  characterDetails.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.thumbnail.path}/portrait_uncanny.${
    character.thumbnail.extension
  }" alt="${character.name}">
    <p>${character.description || "Description non disponible."}</p>
  `;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const characters = data.data.results;
    addOptions(characters);
    showDetails(characters[0]);
    characterSelect.addEventListener("change", () => {
      const selectedId = characterSelect.value;
      const selectedCharacter = characters.find(
        (character) => character.id == selectedId
      );
      showDetails(selectedCharacter);
    });
  })
  .catch((error) => console.error(error));
