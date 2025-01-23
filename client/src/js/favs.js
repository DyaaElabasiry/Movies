const userId = localStorage.getItem("userId");
const favoritesContainer = document.querySelector(".grid");

function fetchUserFavorites() {
  fetch(`http://localhost:3000/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const favoriteMovieIds = user.favourites;
      console.log("Favorites:", favoriteMovieIds);
      if (favoriteMovieIds.length > 0) {
        favoriteMovieIds.forEach((movieId) => {
          fetchMovieDetails(movieId);
        });
      } else {
        favoritesContainer.innerHTML = `<p class="text-gray-800 text-center">No favorite movies found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

// Fetch movie details from TMDb API
function fetchMovieDetails(movieId) {
  const apiKey = "d10b21c479b4bc082f3fab5d7cc62326";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      showMovieCard(movie);
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

// Render a movie card
function showMovieCard(movie) {
  const movieCard = `
    <div id="movie-${
      movie.id
    }" class=" movie-card mx-3 flex-shrink-0 relative hover:brightness-110  animate-[fadeIn] transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
      <i id="deleteIcon-${
        movie.id
      }" class="material-icons bg-gradient-to-r from-white to-blue-500 text-transparent bg-clip-text absolute top-7 right-3 lg:top-8 lg:right-10 cursor-pointer">delete</i>
            <img
        id="poster_image-${
          movie.id
        }" class="w-40 sm:w-56 h-auto my-4 rounded-2xl shadow-lg mx-auto"
        src="https://image.tmdb.org/t/p/original${movie.poster_path}"
        alt="${movie.title}"
      />
      <p class="movie-title ml-3 md:ml-3 lg:ml-11 text-base sm:text-lg text-gray-900 font-semibold">
        ${movie.title}
      </p>
      <p class="movie-date ml-3 md:ml-3 lg:ml-11 text-sm text-gray-500">
        ${movie.release_date.slice(0, 4)}
      </p>
    </div>
  `;

  favoritesContainer.insertAdjacentHTML("beforeend", movieCard);

  // Add event listener to the delete icon
  document
    .getElementById(`deleteIcon-${movie.id}`)
    .addEventListener("click", () => {
      console.log(`Delete clicked for movie ID: ${movie.id}`);
      removeFavoriteMovie(movie.id);
    });

  // document
  //   .getElementById(`poster_image-${movie.id}`)
  //   .addEventListener("click", () => {
  //     window.location.href = `details.html?id=${movie.id}`;
  //   });
}

// Remove a movie from the user's favorites
function removeFavoriteMovie(movieId) {
  console.log(`Removing movie ID: ${movieId}`);

  // Fetch the current user data
  fetch(`http://localhost:3000/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      console.log("Current user data:", user);

      // Remove the movie ID from the user's favourites array
      const updatedFavorites = user.favourites.filter(
        (id) => id !== movieId.toString()
      ); // Ensure movieId is a string
      console.log("Updated favorites:", updatedFavorites);

      // Update the user data on the server
      fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favourites: updatedFavorites,
        }),
      })
        .then(() => {
          console.log("Movie removed from favorites");

          // Remove the movie card from the DOM
          const movieElement = document.getElementById(`movie-${movieId}`);
          if (movieElement) {
            movieElement.remove();
          }

          // If no favorites are left, display a message
          if (updatedFavorites.length === 0) {
            favoritesContainer.innerHTML = `<p class="text-gray-800 text-center">No favorite movies found.</p>`;
          }
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

// Initialize the script
window.onload = function () {
  fetchUserFavorites();
};
