const APIkey = "0VmFaORh2fcZ7J2rf5cLewQnaYkwa97br8QPHSxxWCq6Kk6tFnE5qfHq"; //Authorization key

const pexelsURL = "https://api.pexels.com/v1/search?query="; // Pexels generic search URL

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
        throw new Error("Error in getting images from pexels");
      }
    })
    .then((album) => {
      console.log(album);

      const photosArray = album.photos;
      const allCardImages = document.querySelectorAll("img");
      const allCardBadges = document.querySelectorAll("small");
      const allCardParagraphs = document.querySelectorAll(".album .col-md-4 p");

      photosArray.forEach((photo, i) => {
        if (i < 9) {
          const photoSRC = photo.src;
          const landscapeSRC = photoSRC.landscape;
          const cardImage = allCardImages[i];
          cardImage.setAttribute("src", landscapeSRC);

          const photoDescription = photo.alt;
          cardImage.setAttribute("alt", photoDescription);

          const photoID = photo.id;
          const cardBadge = allCardBadges[i];
          cardBadge.innerText = `ID ${photoID}`;

          const cardParagraph = allCardParagraphs[i];
          cardParagraph.innerText = `${photoDescription}`;
        }
      });
    })
    .catch((error) => {
      console.log("Error", error);
      alert("Error");
    });
};

//add events listeners to buttonss
const primaryLoadButton = document.getElementById("primaryLoadButton");
primaryLoadButton.addEventListener("click", () => {
  getImages("dolphins");
});

const secondaryLoadButton = document.getElementById("secondaryLoadButton");
secondaryLoadButton.addEventListener("click", () => {
  getImages("tigers");
});

// change EDIT button to HIDE button and make it active
const allEditButtons = document.querySelectorAll(".card button:nth-of-type(2)");
const allCards = document.querySelectorAll(".album .col-md-4");

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
});

// change CARD TITLE inner text
const allCardsTitles = document.querySelectorAll(".album .col-md-4 h5");
const allCardBadges = document.querySelectorAll("small");

allCards.forEach((title, i) => {
  const cardTitle = allCardsTitles[i];
  cardTitle.innerText = `Photo ${i + 1}`;

  const cardBadge = allCardBadges[i];
  cardBadge.innerText = `ID ...`;
});
