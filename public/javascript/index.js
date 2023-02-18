/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const displayedCharactersSection = document.querySelector(".character-info");
const charContainer = document.querySelector(".characters-container");
const template = document.getElementById("template");
const characterId = document.querySelector(".operation input");
const characterIdDelete = document.querySelector(".delete input");
const deleteBtn = document.getElementById("delete-one");

const myUrl = "http://localhost:5005/api/characters/";

function createCharacter(element) {
  const cloneCharacter = template.content.cloneNode(true);
  cloneCharacter.querySelector(".character-id span").textContent = element._id;
  cloneCharacter.querySelector(".name span").textContent = element.name;
  cloneCharacter.querySelector(".occupation span").textContent =
    element.occupation;
  cloneCharacter.querySelector(".cartoon span").textContent = element.cartoon;
  cloneCharacter.querySelector(".weapon span").textContent = element.weapon;
  charContainer.append(cloneCharacter);
}

async function displayAll() {
  charContainer.innerHTML = "";
  try {
    const { data } = await axios.get(myUrl);
    // console.log(data);
    for (const character of data) {
      //a voir si ca marche ou pas
      if (!character) {
        return (charContainer.textContent = "Oups... no result... try again");
      }
      createCharacter(character);
      // console.log(character);
    }
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("fetch-all").addEventListener("click", displayAll);
// je ne trouve pas comment recuperer un nom via l'input puis filtrer avec son ID. Du coup la recherche se fait avec l'ID
document
  .getElementById("fetch-one")
  .addEventListener("click", async function () {
    let idInput = characterId.value;
    console.log(idInput);
    charContainer.innerHTML = "";
    try {
      const { data } = await axios.get(myUrl + `${idInput}`);
      // ne marche pas => data._id !== idInput
      if (idInput === "" || data._id !== idInput) {
        return (charContainer.textContent = "Oups... no results... try again");
      }

      createCharacter(data);
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("delete-one")
  .addEventListener("click", async function () {
    let idInput = characterIdDelete.value;
    try {
      const deleteCharacter = await axios.delete(myUrl + `${idInput}`);
      console.log(deleteCharacter.status);
      deleteBtn.classList.remove("noWorks");
      deleteBtn.classList.add("active");
      setInterval(() => {
        deleteBtn.classList.remove("active");
      }, 4000);
      console.log(deleteCharacter, "has been deleted");
      displayAll();
    } catch (error) {
      deleteBtn.classList.add("noWorks");
      setInterval(() => {
        deleteBtn.classList.remove("noWorks");
      }, 4000);
      console.log(error);
    }
  });

document
  .getElementById("edit-character-form")
  .addEventListener("submit", function (event) {});

document
  .getElementById("new-character-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });
