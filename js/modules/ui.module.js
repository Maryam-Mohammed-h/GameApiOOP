import { Games } from "./games.module.js";
import { GameDetails } from "./details.module.js";

let navbar = document.querySelector("#navbarNav");
let categoryName;
let gamesCardsArea = document.querySelector("#gamesCards");
let GameDetailsModal = document.querySelector(
  "#myModal .modal-dialog .modal-content"
);

let allGames = new Games();
let gamesDetailsObject = new GameDetails();
//get category name and assign to function

if (categoryName == undefined) {
  categoryName = "mmorpg";
}

navbar.addEventListener("click", function (event) {
  categoryName = event.target.getAttribute("data-category-name");
  allGames.getGames(categoryName).then((response) => {
    displayGames(response);
  });
});

const allGamesArray = allGames.getGames(categoryName).then((response) => {
  displayGames(response);
});
function displayGames(games) {
  let content = "";
  for (var i = 0; i < games.length; i++) {
    content += `<div id="gamesCardsContainer"class="col-3 d-flex align-items-stretch">
    <a type="button"data-bs-toggle="modal"
    data-bs-target="#myModal">
    <div class="card bg-transparent rounded-2" data-game-id=${games[i].id}>
    <img src=${games[i].thumbnail} class="card-img-top p-2 rounded-2" alt="${games[i].title} image">
    <div class="p-3 pb-0 d-flex justify-content-between">
      <h5 class="card-title">${games[i].title}</h5>
      <h5  class="btn gamePrice">Free</h5> 
    </div>
    <div class="card-body position-reltive ">
    <p class="card-text pb-3 ">${games[i].short_description}</p>
    <div class="card-links pb-2 position-absolute bottom-0 d-flex justify-content-between">
    <h6  class="card-link rounded-pill">${games[i].genre}</h6>
    <h6  class="card-link rounded-pill">${games[i].platform}</h6>
    </div>
    
    </div>
  </div>
  </a>
  </div>`;

    gamesCardsArea.innerHTML = content;
    selectSpecificGame();
  }
}
function selectSpecificGame() {
  let gamesCards = document.querySelectorAll("#gamesCardsContainer .card");

  for (let x = 0; x < gamesCards.length; x++) {
    gamesCards[x].addEventListener("click", () => {
      displayGameDetails(gamesCards[x].getAttribute("data-game-id"));
    });
  }
}

function displayGameDetails(gameID) {
  let gameModal = "";
  const eachGameDetails = gamesDetailsObject
    .getGameDetails(gameID)
    .then((response) => {
      gameModal += ` 
    
      <div class="row">
      <div class="col-1 offset-11 text-white p-3">
      <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
    ></button>
      </div>
      
      <div class="col-3 p-3">
      <h2> Games Details</h2>
      <div > <img class="gameImage"src="${response.thumbnail}" /></div>
      </div>
      <div class="col-8 p-4">
      <div class="gameData">
      <h2>Title : ${response.title}</h2>
      <h4><span>Category </span> ${response.genre}</h4>
      <h4><span>Platform</span>  ${response.platform}</h4>
      <h4><span>Status </span> ${response.status}</h4>
      <p class="p-3"> ${response.description}</p>
      </div>
      <a
      type="button"
      title="The link will open in new tab"
      href="${response.game_url}"
      class="btn btn-dark border-warning"
      target="_blank"
      
    >Show Game</a>
      </div>
      </div>
 
`;

      GameDetailsModal.innerHTML = gameModal;
    });
}
