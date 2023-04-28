var paginaActual = 2;
var tototalPagiacion;

const URL_PATH = "https://rickandmortyapi.com/api";

const HTMLresponse = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", () => {
  let { page } = getUrlVars();
  page == undefined ? (page = 1) : null;
  renderListCharacter(page,"");
  renderControls(page);

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

  renderListCharacter(page,txtCharacter);

};

const getCharacter = (page,n) => {
  const url = `${URL_PATH}/character/?page=${page}&name=${n}`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log(error));
};

const renderListCharacter = async (page,n) => {
  const character = await getCharacter(page,n);
  let htmlCharacter = "";
  console.log(character);
  character.results.forEach((element) => {
    const { id, name, image, species, status } = element;
    htmlCharacter += `<div class="card" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    `;
  });

  const appDiv = document.querySelector("#app");
  appDiv.innerHTML = htmlCharacter;
};

const renderControls = (page) => {
  
  const baseUrlpage = "../index.html?page=";
  const number = parseInt(page);
  const prev = number - 1;
  const next = number + 1;
  let html = `<ul class="pagination justify-content-center">`;
  if (page == 1) {
    html += `
       <li class="page-item disabled"><a class="page-link" href="">Previous</a></li>
       <li class="page-item active"><a class="page-link" href="${
         baseUrlpage + page
       }">1</a></li>
       <li class="page-item"><a class="page-link" href="${
         baseUrlpage + next
       }">2</a></li>
       <li class="page-item"><a class="page-link" href="${
         baseUrlpage + (next + 1)
       }">3</a></li>
       <li class="page-item"><a class="page-link" href="${
         baseUrlpage + next
       }">Next</a></li>
    
     `;
  }
  if (page > 1) {
    html += `
    <li class="page-item"><a class="page-link" href="${
      baseUrlpage + prev
    }">Previous</a></li>

    <li class="page-item"><a class="page-link" href="${
      baseUrlpage + prev
    }">${prev}</a></li>
    <li class="page-item active"><a class="page-link " href="${
      baseUrlpage + number
    }">${number}</a></li>
    <li class="page-item"><a class="page-link" href="${
      baseUrlpage + next
    }">${next}</a></li>

    <li class="page-item"><a class="page-link" href="${
      baseUrlpage + next
    }">Next</a></li>
  
  `;
  }

  html += "</ul>";

  const navNavigation = document.querySelector(".navigation");
  navNavigation.innerHTML = `${html}`;
};
