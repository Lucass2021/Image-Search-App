const accessKey = "Iuhw4awdz3tq5Hut5BfV3EAyeIo-He_LOsvGWtHJzNI";

const formElement = document.querySelector("form");
const searchInputElement = document.querySelector("#search-input");
const searchResultsElement = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&client_secret=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultsElement.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResultsElement.appendChild(imageWrapper);
  });

  page++;

  if (page > 0 && page < 1000) {
    showMoreButton.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
