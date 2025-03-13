// This changes the title of your site

var sitename = "Goggle Games"; // Change this to change the name of your website.
var subtext = "Port Washington's Number One Games Website"; // set the subtext

// more settings in main.css



// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // External Image
    const gameImage1 = document.createElement("img");
    gameImage1.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage1.alt = `${game.name} (External)`;
    gameImage1.classList.add("game-image");

    // Local Image
    const gameImage2 = document.createElement("img");
    gameImage2.src = `config/${game.image}`;
    gameImage2.alt = `${game.name} (Local)`;
    gameImage2.classList.add("game-image");

    // Clicking any image should load the game
    [gameImage1, gameImage2].forEach((img) => {
      img.onclick = () => {
        window.location.href = `play.html?gameurl=${game.url}`;
      };
    });

    // Append both images
    imageContainer.appendChild(gameImage1);
    imageContainer.appendChild(gameImage2);

    // Game name
    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    // Add everything to the game div
    gameDiv.appendChild(imageContainer);
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

document.getElementById("subtitle").innerHTML = `${subtext}`

