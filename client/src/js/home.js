// Navbar
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});



// API Configuration
const Api_Key = 'bf6de15b7b7a3f0005e93bbde1715684';
const base_Url = 'https://api.themoviedb.org/3';

// API Endpoints
const api_Url           = `${base_Url}/trending/movie/day?language=en-US&api_key=${Api_Key}`;
const search_Movie_Url  = `${base_Url}/search/movie?api_key=${Api_Key}`;
const search_Series_Url = `${base_Url}/search/tv?api_key=${Api_Key}`;
const series_Url        = `${base_Url}/tv/popular?api_key=${Api_Key}&language=en-US`;
const actors_Url        = `${base_Url}/person/popular?api_key=${Api_Key}&language=en-US`;
const imges_Url         = 'https://image.tmdb.org/t/p/w500';

// Fallback Image URL
const fallbackImage = 'https://www.example.com/images/default-poster.jpg'; 

// Genres
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

// DOM Elements
const main = document.querySelector('.main');
const search = document.getElementById('searchInput');
const form = document.getElementById('searchForm');
const tagsEl = document.getElementById('tags');
let selectedGenre = [];

// Set Genres
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach((genre) => {
    const t = document.createElement('div');
    t.classList.add('tag', 'text-white', 'text-lg', 'font-semibold', 'cursor-pointer',
      'hover:bg-blue-800', 'hover:text-white', 'transition', 'duration-300', 'bg-red-500',
      'rounded-full', 'flex-1', 'min-w-[48%]', 'py-2', 'text-center', 'sm:min-w-[32%]', 'md:min-w-[24%]', 'lg:min-w-[19%]');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.includes(genre.id)) {
        selectedGenre = selectedGenre.filter((id) => id !== genre.id);
        t.classList.remove('bg-blue-800');
      } else {
        selectedGenre.push(genre.id);
        t.classList.add('bg-blue-800');
      }
      console.log(selectedGenre);
      fetchMoviesAndSeriesByGenre(selectedGenre);
    });
    tagsEl.append(t);
  });
}

// Fetch Movies and Series by Genre
function fetchMoviesAndSeriesByGenre(selectedGenre) {
  const genreQuery = encodeURI(selectedGenre.join(','));

  // Fetch movies by genre
  const moviesUrl = `${base_Url}/discover/movie?api_key=${Api_Key}&with_genres=${genreQuery}`;
  const seriesUrl = `${base_Url}/discover/tv?api_key=${Api_Key}&with_genres=${genreQuery}`;

  Promise.all([
    fetch(moviesUrl).then((res) => res.json()),
    fetch(seriesUrl).then((res) => res.json())
  ])
    .then(([moviesData, seriesData]) => {
      // Combine results
      const combinedResults = [...moviesData.results, ...seriesData.results];
      showCombinedResults(combinedResults);
    })
    .catch((error) => {
      console.error('Error fetching movies and series by genre:', error);
    });
}

// Show Combined Results
function showCombinedResults(data) {
  const moviesContainer = document.getElementById('scrollContainer');
  const seriesContainer = document.getElementById('scrollContainerSeries');

  // Clear both containers
  moviesContainer.innerHTML = '';
  seriesContainer.innerHTML = '';

  data.forEach((item) => {
    const isMovie = item.title; 
    const element = document.createElement('div');
    element.classList.add('item', 'mx-3', 'flex-shrink-0', 'relative', 'hover:brightness-110');

    // Use the fallback image if poster_path is not available
    const imageUrl = item.poster_path ? `${imges_Url}${item.poster_path}` : fallbackImage;

    element.innerHTML = `
      <div class="relative">
        <img class="w-40 sm:w-56 h-60 sm:h-80 object-cover rounded-2xl shadow-lg" src="${imageUrl}" alt="${isMovie ? item.title : item.name}">
        <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-2 flex items-center justify-center">
          <span class="text-sm font-bold text-yellow-400">${((item.vote_average || 0) * 10).toFixed(0)}%</span>
        </div>
      </div>

      <h6 class="ml-3 text-base sm:text-lg text-white font-semibold mt-2">${isMovie ? item.title : item.name}</h6>
      <p class="ml-3 text-sm sm:text-base text-white opacity-70">${isMovie ? item.release_date : item.first_air_date}</p>

    `;

    // Append to the appropriate container
    if (isMovie) {
      moviesContainer.appendChild(element);
    } else {
      seriesContainer.appendChild(element);
    }
  });
}

// Search Functionality
let searchTimeout;
search.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchAction = search.value.trim();
    if (searchAction) {
      // Fetch both movies and series
      Promise.all([
        fetch(`${search_Movie_Url}&query=${encodeURIComponent(searchAction)}`).then((res) => res.json()),
        fetch(`${search_Series_Url}&query=${encodeURIComponent(searchAction)}`).then((res) => res.json())
      ])
        .then(([moviesData, seriesData]) => {
          // Combine results
          const combinedResults = [...moviesData.results, ...seriesData.results];
          showCombinedResults(combinedResults);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      // If search is empty, show trending movies and popular series
      getMovies(api_Url);
      getSeries(series_Url);
    }
  }, 300);
});

// Fetch Movies
function getMovies(url) {
  fetch(url).then((res) => res.json()).then((data) => {
      console.log(data.results);

      // Check if there are no results
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class="text=red">No Result Found </h1>`
      }
    })
}

// Show Movies
function showMovies(data) {
  const moviesContainer = document.getElementById('scrollContainer');
  moviesContainer.innerHTML = ''; // Clear the container

  data.forEach((movie) => {

    const { id,title, poster_path, vote_average, release_date } = movie;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie', 'mx-3', 'flex-shrink-0', 'relative', 'hover:brightness-110');

    // Use the fallback image if poster_path is not available
    const imageUrl = poster_path ? `${imges_Url}${poster_path}` : fallbackImage;

    
    const movieLink = document.createElement('a');
    movieLink.href = `details.html?movieID=${id}`;

    movieElement.innerHTML = `
      <div class="relative">
          <img
    class="w-40 sm:w-56 h-60 sm:h-80 object-cover rounded-2xl shadow-lg opacity-85 hover:opacity-100"
    src="${imageUrl}"
    alt="${name}"
  />

  <!-- Favorite Icon -->
   <!-- Favorite Icon -->
        <div
          class="absolute top-2 right-2 bg-black bg-opacity-20 rounded-full p-2 flex items-center justify-center cursor-pointer"
          onclick="toggleFavorite('${id}')"
          id="favorite-icon-${id}" 
        >
          <i class="fas fa-heart text-white text-lg transition duration-300 hover:text-red-500" id="icon-${id}"></i>
        </div>


        <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-2 flex items-center justify-center">
          <span class="text-sm font-bold text-yellow-400">${(vote_average * 10).toFixed(0)}%</span>
        </div>
      </div>
      <h6 class="ml-3 text-base sm:text-lg text-white font-semibold mt-2">${title}</h6>
      <p class="ml-3 text-sm sm:text-base text-white opacity-70">${release_date}</p>
    `;

    movieLink.appendChild(movieElement);
    moviesContainer.appendChild(movieLink);

  });
}

// Fetch Series
function getSeries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSeries(data.results);
    })
    .catch((error) => {
      console.error('Error fetching series:', error);
    });
}

// Show Series
function showSeries(data) {
  const seriesContainer = document.getElementById('scrollContainerSeries');
  seriesContainer.innerHTML = ''; // Clear the container

  data.forEach((series) => {
    const { name, poster_path, vote_average, first_air_date } = series;
    const seriesElement = document.createElement('div');
    seriesElement.classList.add('series', 'mx-3', 'flex-shrink-0', 'relative', 'hover:brightness-110');

    const imageUrl = poster_path ? `${imges_Url}${poster_path}` : fallbackImage;

    seriesElement.innerHTML = `
      <div class="relative">

          <img
    class="w-40 sm:w-56 h-60 sm:h-80 object-cover rounded-2xl shadow-lg opacity-85 hover:opacity-100"
    src="${imageUrl}"
    alt="${name}"
  />

  <!-- Favorite Icon -->
  <div
    class="absolute top-2 right-2 bg-black bg-opacity-20 rounded-full p-2 flex items-center justify-center cursor-pointer"
    onclick="toggleFavorite('${name}')"
  >
    <i class="fas fa-heart text-white text-lg transition duration-300 hover:text-red-500"></i>
  </div>

        <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-2 flex items-center justify-center">
          <span class="text-sm font-bold text-yellow-400">${(vote_average * 10).toFixed(0)}%</span>
        </div>
      </div>

      <h6 class="ml-3 text-base sm:text-lg text-gray-900 font-semibold mt-2">${name}</h6>
      <p class="ml-3 text-sm sm:text-base text-gray-700">${first_air_date}</p>

    `;

    seriesContainer.appendChild(seriesElement);
  });
}

// Fetch Actors
function getActors(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showActors(data.results);
    })
    .catch((error) => {
      console.error('Error fetching actors:', error);
    });
}

// Show Actors
function showActors(data) {
  const actorsContainer = document.getElementById('scrollContainerActors');
  actorsContainer.innerHTML = ''; // Clear the container

  data.forEach((actor) => {
    const { name, profile_path, known_for_department } = actor;

    // Create an actor element
    const actorElement = document.createElement('div');
    actorElement.classList.add('actor', 'mx-3', 'flex-shrink-0', 'relative', 'hover:brightness-110');

    // Use the fallback image if profile_path is not available
    const imageUrl = profile_path ? `${imges_Url}${profile_path}` : fallbackImage;

    actorElement.innerHTML = `

   <div class="relative">
  <img
    class="w-40 sm:w-56 h-60 sm:h-80 object-cover rounded-2xl shadow-lg opacity-85 hover:opacity-100"
    src="${imageUrl}"
    alt="${name}"
  />

  <!-- Favorite Icon -->
  <div
    class="absolute top-2 right-2 bg-black bg-opacity-20 rounded-full p-2 flex items-center justify-center cursor-pointer"
    onclick="toggleFavorite('${name}')"
  >
    <i class="fas fa-heart text-white text-lg transition duration-300 hover:text-red-500"></i>
  </div>

  <!-- Known For Department -->
  <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-2 flex items-center justify-center">
    <span class="text-sm font-bold text-yellow-400">${known_for_department}</span>
  </div>
</div>
<h6 class="ml-3 text-base sm:text-lg text-white font-semibold mt-2">${name}</h6>

`;

    actorsContainer.appendChild(actorElement);
  });
}

// Calling Functions
getMovies(api_Url);
getSeries(series_Url);
getActors(actors_Url);
setGenre();