var tototalPagiacion;

const URL_PATH = "https://rickandmortyapi.com/api";

const HTMLresponse = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", async () => {
  let { page } = getUrlVars();
  let { name } = getUrlVars();
  page == undefined ? (page = 1) : null;
  renderListCharacter(page, name);
  renderControls(page, name);
});

const getUrlVars = () => {
  let vars = {};
  let url = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );

  console.log(vars);
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

const getCharacter = (page, n) => {
  const url = `${URL_PATH}/character/?page=${page}&name=${n}`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.log(error));
};

const renderListCharacter = async (page, n) => {
  const character = await getCharacter(page, n);
  let htmlCharacter = "";
  console.log(character);

  if (character != undefined) {
    character.forEach((element) => {
      const { id, name, image, species, status, location } = element;
      htmlCharacter += `
     
        <div class="card card-character" style="width: 14rem;">
          
        <a href="./personaje.html?id=${id}" class="card-link">
          <img src="${image}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title card-title__color">${name}</h5>
           
            <ul class="card-list__background">
    <li class="">${status}</li>
    <li class="">${species}</li>
  
  </ul>
  
          </div>
          
          <div class="card-character-teleportation">
           
          </div>
  
          </a>
          
  
   
  
        </div>
        
        `;
    });
  } else {
    htmlCharacter = `<div><h1>No hay personaje </h1> </div>`;
  }

  const appDiv = document.querySelector("#app");
  appDiv.innerHTML = htmlCharacter;
};

const renderControls = (page, name) => {
  const baseUrlpage = `./buscador.html?page=`;
  const number = parseInt(page);
  const prev = number - 1;
  const next = number + 1;
  const prueba = `&name=${name}`;
  let html = `<ul class="pagination justify-content-center">`;
  if (page == 1) {
    html += `
         <li class="page-item disabled"><a class="page-link" href="">Previous</a></li>
         <li class="page-item active"><a class="page-link" href="${
           baseUrlpage + page + prueba
         }">1</a></li>
         <li class="page-item"><a class="page-link" href="${
           baseUrlpage + next + prueba
         }">2</a></li>
         <li class="page-item"><a class="page-link" href="${
           baseUrlpage + (next + 1) + prueba
         }">3</a></li>
         <li class="page-item"><a class="page-link" href="${
           baseUrlpage + next + prueba
         }">Next</a></li>
      
       `;
  }
  if (page > 1) {
    html += `
      <li class="page-item"><a class="page-link" href="${
        baseUrlpage + prev + prueba
      }">Previous</a></li>
  
      <li class="page-item"><a class="page-link" href="${
        baseUrlpage + prev + prueba
      }">${prev}</a></li>
      <li class="page-item active"><a class="page-link " href="${
        baseUrlpage + number + prueba
      }">${number}</a></li>
      <li class="page-item"><a class="page-link" href="${
        baseUrlpage + next + prueba
      }">${next}</a></li>
  
      <li class="page-item"><a class="page-link" href="${
        baseUrlpage + next + prueba
      }">Next</a></li>
    
    `;
  }

  html += "</ul>";

  const navNavigation = document.querySelector(".navigation");
  navNavigation.innerHTML = `${html}`;
};
