const trendingMenuItem = document.getElementById("Trending");
const tvShowsMenuItem = document.getElementById("Tvshows");
const peopleMenuItem = document.getElementById("People");
const changingButton = document.getElementById("changingButton");
const dropdownItems = document.querySelectorAll("#DropdownMenu a");
const moviesSection = document.querySelector("#moviesSection");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    if (moviesSection) {
      moviesSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
trendingMenuItem.addEventListener("click", () => {
  fetchContent(apiUrlTrendingMovies, "Trending", scrollContainer, false);
});

tvShowsMenuItem.addEventListener("click", () => {
  const apiUrlTvShows =
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  fetchContent(apiUrlTvShows, "TV Shows", scrollContainer, false);
});

peopleMenuItem.addEventListener("click", () => {
  const apiUrlPeople =
    "https://api.themoviedb.org/3/trending/person/day?language=en-US";
  fetchContent(apiUrlPeople, "People", scrollContainer, false);
});
const defaultApiUrl =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
fetchContent(defaultApiUrl, "Trending", scrollContainer, false);
content.forEach((item) => {
  const threeDotButton = document.getElementById(`three-dot-${item.id}`);
  const dropdown = document.getElementById(`dropdown-${item.id}`);

  threeDotButton.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });
});
scrollLeftButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: -300,
    behavior: "smooth",
  });
});

scrollRightButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});
