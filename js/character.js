var tototalPagiacion;

const URL_PATH = "https://rickandmortyapi.com/api";

document.addEventListener("DOMContentLoaded", async () => {
  var characterId = getUrlVars().id;
  renderCharacter(characterId);
});

const getUrlVars = () => {
  let vars = {};
  let url = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};


const btnSearch = () => {
  event.preventDefault();
  const inputSearch = document.querySelector("#search-character");
  let txtCharacter = inputSearch.value;
  let { page } = getUrlVars();
  page == undefined ? (page = 1) : null;

  window.location.href = `../buscador.html?page=${page}&name=${txtCharacter}`;
};


const getCharacter = (characterId) => {
  const url = `${URL_PATH}/character/${characterId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result);
};

const renderCharacter = async (characterId) => {
  const character = await getCharacter(characterId);

  let htmlCharacter = "";
  console.log(character);

  if (character != undefined) {
    const {
      episode,
      id,
      name,
      image,
      species,
      status,
      gender,
      location,
      origin,
    } = character;
    htmlCharacter += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
               <ul>
                <li>${status}</li>
                <li>${species}</li>
                <li>${gender}</li>
               </ul>
               <div>
               <p>Origin:  <span>${origin.name}</span> </p>
                <p>Last known location:  <span>${location.name}</span> </p>
           

               <div>
            </div>
          </div>
        </div>
      </div>

        `;
  } else {
    htmlCharacter = `<div><h1>No hay personaje </h1> </div>`;
  }

  const appDiv = document.querySelector("#render-character");
  appDiv.innerHTML = htmlCharacter;
};
