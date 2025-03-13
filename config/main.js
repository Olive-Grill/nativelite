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

    // Check if localImage exists; otherwise, use external
    if (game.localImage) {
      gameImage.src = `./${game.localImage}`; // Load from local folder
    } else {
      gameImage.src = `${serverUrl1}/${game.url}/${game.image}`; // Load from external server
    }

    gameImage.alt = game.name;

    // Handle click event based on source
    gameImage.onclick = () => {
      if (game.source === "local") {
        window.location.href = `./games/${game.url}/index.html`; // Local game
      } else if (game.source === "external" && game.externalUrl) {
        window.location.href = game.externalUrl; // Direct external URL
      } else {
        window.location.href = `play.html?gameurl=${game.url}/`; // Generic external game
      }
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Function to handle search input
function handleSearchInput() {
  const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Fetch games from games.json
fetch("./config/games.json")
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

// Add event listener to search input
document.getElementById("searchInput").addEventListener("input", handleSearchInput);

// Set website title and subtitle
document.getElementById("title").innerHTML = `${sitename}`;
document.getElementById("subtitle").innerHTML = `${subtext}`;
