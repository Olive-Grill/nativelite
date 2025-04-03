// This changes the title of your site

var sitename = " "; // Change this to change the name of your website.
var subtext = "Goggle Games - Port Washington's Number One Games Website (V2)"; // set the subtext

// more settings in main.css

// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var localImageBaseUrl = "./images";  // Local image directory (common images folder)
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

    // For new games, load images from a common location (local or external)
    if (game.new) {
      // For new games, images can be hosted in the same general 'images' folder
      gameImage.src = `${localImageBaseUrl}/${game.image}`; // Loading from common images folder or external server
    } else {
      // For existing games, use the server URL to load the images
      gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    }

    gameImage.alt = game.name;
    gameImage.onclick = () => {
      // Fixing the URL format before redirecting (removing trailing slash if present)
      let gameUrl = game.url;
      if (gameUrl.endsWith('/')) {
        gameUrl = gameUrl.slice(0, -1);
      }
      window.location.href = `play.html?gameurl=${gameUrl}/`;
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
