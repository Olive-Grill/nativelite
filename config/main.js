// This changes the title of your site

var sitename = "Goggle Games"; // Change this to change the name of your website.
var subtext = "Port Washington's Number One Games Website"; // set the subtext

// more settings in main.css

// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var localServerUrl = "./games";  // New server or local path for new games
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");

    // Check if the game is new and load accordingly
    if (game.new) {
      // For new games, load images from a custom location, like a local folder
      gameImage.src = `./images/${game.image}`;  // New way to load images
      game.url = `${localServerUrl}/${game.url}`;  // New server path for new games
    } else {
      // For existing games, keep the old server URL structure
      gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;  // Old way to load images
      game.url = `${serverUrl1}/${game.url}`;  // Old server path
    }

    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;

document.getElementById("subtitle").innerHTML = `${subtext}`;
