const APIkey = "0VmFaORh2fcZ7J2rf5cLewQnaYkwa97br8QPHSxxWCq6Kk6tFnE5qfHq"; //Authorization key

const pexelsURL = "https://api.pexels.com/v1/search?query="; // Pexels generic search URL

// modifies PLACEHOLDERS CARDS for a better layout
const allCards = document.querySelectorAll(".album .col-md-4");
const allCardsTitles = document.querySelectorAll(".album .col-md-4 h5");
const allCardBadges = document.querySelectorAll("small");
const allCardsBodies = document.querySelectorAll(".card-body");
const allCardParagraphs = document.querySelectorAll(".album .col-md-4 p");
const allViewButtons = document.querySelectorAll(".card button:nth-of-type(1)");
allViewButtons.forEach((button) => {});

allCards.forEach((card, i) => {
  card.classList.add("d-flex");

  const cardTitle = allCardsTitles[i];
  cardTitle.innerText = `Photo ${i + 1}`;

  const cardBadge = allCardBadges[i];
  cardBadge.innerText = `ID ...`;

  const cardBody = allCardsBodies[i];
  cardBody.classList.add("d-flex", "flex-column");

  const cardParagraph = allCardParagraphs[i];
  cardParagraph.classList.add("flex-grow-1");

  const viewButton = allViewButtons[i];
  viewButton.setAttribute("data-bs-toggle", "modal");
  viewButton.setAttribute("data-bs-target", "#exampleModal");
});

// create a function that displays all cards again after being hidden
const displayAllCards = function () {
  allCards.forEach((card) => {
    card.classList.remove("d-none");
  });
};

// GET request to Pexels to substitute images
const getImages = function (string) {
  fetch(pexelsURL + string, {
    headers: {
      Authorization: APIkey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        button;
        throw new Error("Error in getting images from pexels");
      }
    })
    .then((album) => {
      console.log(album);

      const photosArray = album.photos;
      const allCardImages = document.querySelectorAll("img");

      photosArray.forEach((photo, i) => {
        if (i < 9) {
          const photoSRC = photo.src;
          const landscapeSRC = photoSRC.landscape;
          const cardImage = allCardImages[i];
          cardImage.src = landscapeSRC;

          const photoDescription = photo.alt;
          cardImage.alt = photoDescription;

          const photoID = photo.id;
          const cardBadge = allCardBadges[i];
          cardBadge.innerText = `ID ${photoID}`;

          const cardParagraph = allCardParagraphs[i];
          cardParagraph.innerText = `${photoDescription}`;

          const viewButton = allViewButtons[i];

          viewButton.addEventListener("click", () => {
            const modalTitle = document.querySelector(".modal-title");
            modalTitle.innerHTML = `Photo ${[i + 1]}`;
            // modalTitle.innerHTML = `${photoDescription}`;

            const modalImg = document.querySelector(".modal-body img");
            modalImg.src = landscapeSRC;
            modalImg.alt = photoDescription;

            const modalCaption = document.querySelector(".modal-footer p");
            modalCaption.innerHTML = `${photoDescription}`;
          });
        }
      });
    })
    .catch((error) => {
      console.log("Error", error);
      alert("Error");
    });
};

//add events listeners to buttons
const primaryLoadButton = document.getElementById("primaryLoadButton");
primaryLoadButton.addEventListener("click", () => {
  getImages("dolphins");
  displayAllCards();
});

const secondaryLoadButton = document.getElementById("secondaryLoadButton");
secondaryLoadButton.addEventListener("click", () => {
  getImages("tigers");
  displayAllCards();
});

// change EDIT button to HIDE button and make it active
const allEditButtons = document.querySelectorAll(".card button:nth-of-type(2)");

allEditButtons.forEach((button, i) => {
  button.innerText = "Hide";
  const card = allCards[i];

  button.addEventListener("click", function () {
    card.classList.add("d-none");
  });
});

// Add search bar to search custom images
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchInput = document.getElementById("search").value;
  getImages(searchInput);
  displayAllCards();
});

// start browser with random images
getImages("random");
