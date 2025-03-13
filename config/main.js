// This changes the title of your site
var sitename = "Goggle Games"; // Change this to change the name of your website.
var subtext = "Port Washington's Number One Games Website"; // Set the subtext

// More settings in main.css

// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOU'RE DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = [];

// Function to display games
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");

    // Check if the game is local or external
    if (game.source === "local" && game.image) {
      gameImage.src = `./${game.image}`; // Load local image from folder
    } else {
      gameImage.src = `${serverUrl1}/${game.url}/${game.image}`; // Load external image
    }

    gameImage.alt = game.name;

    // Handle click event to either display iframe or navigate
    gameImage.onclick = () => {
      if (game.source === "local" && game.externalUrl) {
        // Open the local game (AI 2048) in a new page with an iframe
        window.location.href = `play.html?gameurl=${encodeURIComponent(game.externalUrl)}`;
      } else if (game.source === "external" && game.url) {
        // Open the external URL directly in the same window
        window.location.href = game.url;
      }
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Handle search input
function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Fetch game data and display it
fetch("./config/games.json")
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

// Event listener for search input
document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;
document.getElementById("subtitle").innerHTML = `${subtext}`;
