// Navbar
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Generic Scroll Function
function setupScroll(containerId, leftButtonId, rightButtonId, scrollAmount = 300) {
  const container = document.getElementById(containerId);
  const leftButton = document.getElementById(leftButtonId);
  const rightButton = document.getElementById(rightButtonId);

  leftButton.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightButton.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// Setup Scrolling for Sections
setupScroll('scrollContainer', 'scrollLeft', 'scrollRight');
setupScroll('scrollContainerSeries', 'scrollLeftSeries', 'scrollRightSeries');
setupScroll('scrollContainerActors', 'scrollLeftActors', 'scrollRightActors');

// API Configuration
const Api_Key = 'bf6de15b7b7a3f0005e93bbde1715684';
const base_Url = 'https://api.themoviedb.org/3';

// API Endpoints
const api_Url = `${base_Url}/trending/movie/day?language=en-US&api_key=${Api_Key}`;
const search_Movie_Url = `${base_Url}/search/movie?api_key=${Api_Key}`;
const search_Series_Url = `${base_Url}/search/tv?api_key=${Api_Key}`;
const series_Url = `${base_Url}/tv/popular?api_key=${Api_Key}&language=en-US`;
const actors_Url = `${base_Url}/person/popular?api_key=${Api_Key}&language=en-US`;
const imges_Url = 'https://image.tmdb.org/t/p/w500';

// Fallback Image URL
const fallbackImage = 'https://assets.vogue.in/photos/5f16b3bc9ffca08d1848369b/2:3/w_2560%2Cc_limit/must-watch%2520action%2520movies.jpg';

// DOM Elements
const main = document.querySelector('.main');
const search = document.getElementById('searchInput');
const form = document.getElementById('searchForm');
const tagsEl = document.getElementById('tags');
let selectedGenre = [];

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

// Set Genres
function setGenre() {
  const genreDropdown = document.getElementById('genreDropdown');
  genreDropdown.innerHTML = '';

  genres.forEach((genre) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="#" class="block text-xlg px-4 py-2 text-base text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition duration-300" data-genre-id="${genre.id}">
        ${genre.name}
      </a>
    `;
    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      const genreId = e.target.getAttribute('data-genre-id');
      fetchMoviesAndSeriesByGenre([genreId]); // Fetch movies and series by genre
    });
    genreDropdown.appendChild(li);
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
      showCombinedResults(combinedResults); // Display the results
    })
}

// function to create a media card for movies and series
function createMediaCard(media, type) {
  const { title, name, poster_path, vote_average, release_date, first_air_date, id } = media;

  const mediaTitle = type === 'movie' ? title : name;
  const mediaDate = type === 'movie' ? release_date : first_air_date;
  const imageUrl = poster_path ? `${imges_Url}${poster_path}` : fallbackImage;

  // Return the card HTML
  return `
    <div class="media-card mx-3 flex-shrink-0 w-40 sm:w-48 lg:w-56">
      <div class="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <!-- Image with redirect to details page -->
        <img class="w-full h-48 sm:h-56 lg:h-64 object-cover cursor-pointer" src="${imageUrl}" alt="${mediaTitle}" onerror="this.src='${fallbackImage}'" onclick="redirectToDetails('${type}', ${id})">
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-yellow-400">${(vote_average * 10).toFixed(0)}%</span>
            <!-- Trailer button -->
            <button class="bg-blue-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600 transition-colors duration-300" onclick="event.stopPropagation(); fetchTrailer('${type}', ${id})">
              Trailer
            </button>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <h6 class="text-sm sm:text-base font-semibold text-white truncate">${mediaTitle}</h6>
        <p class="text-xs sm:text-sm text-gray-400">${mediaDate}</p>
      </div>
    </div>
  `;
}

// Create a movie card
function createMovieCard(movie) {
  return createMediaCard(movie, 'movie');
}

// Create a series card
function createSeriesCard(series) {
  return createMediaCard(series, 'tv');
}

// redirect to details page
function redirectToDetails(type, id) {
  const detailsUrl = `details.html?type=${type}&id=${id}`; // a8dt el-url 3ashan i will use to redirect for deails page
  window.location.href = detailsUrl;   // hna ana har7 3la el-details page
}

// Function to fetch trailer
function fetchTrailer(type, id) {
  fetch(`${base_Url}/${type}/${id}/videos?api_key=${Api_Key}`)
    .then((res) => res.json())
    .then((videoData) => {
      if (videoData.results && videoData.results.length > 0) {
        const trailer = videoData.results.find((video) => video.type === 'Trailer');
        if (trailer) {
          const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
          openVideoOverlay(videoUrl);
        } else {
          alert('No trailer available for this item.');
        }
      } else {
        alert('No trailer available for this item.');
      }
    })
}

// Video Overlay Functions
function openVideoOverlay(videoUrl) {
  const videoOverlay = document.getElementById('videoOverlay');
  const videoContainer = document.getElementById('videoContainer');

  // Clear previous video
  videoContainer.innerHTML = '';

  // Create the iframe for the video
  const iframe = document.createElement('iframe');
  iframe.src = videoUrl;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.classList.add('w-full', 'h-96', 'sm:h-128', 'rounded-lg', 'shadow-lg');

  // Append the iframe to the video container
  videoContainer.appendChild(iframe);

  // Show the overlay
  videoOverlay.classList.remove('hidden');
}

function closeVideoOverlay() {
  const videoOverlay = document.getElementById('videoOverlay');
  const videoContainer = document.getElementById('videoContainer');

  // Clear the video
  videoContainer.innerHTML = '';

  // Hide the overlay
  videoOverlay.classList.add('hidden');
}

// Add event listener to the close button
document.getElementById('closeVideoButton').addEventListener('click', closeVideoOverlay);

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
          showCombinedResults(combinedResults); // Display the results
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
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    })
}

// Fetch Series
function getSeries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSeries(data.results);
    })
}

// Fetch Actors
function getActors(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showActors(data.results);
    })
}

// Show Movies
function showMovies(data) {
  const moviesContainer = document.getElementById('scrollContainer');
  moviesContainer.innerHTML = '';

  data.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = createMovieCard(movie);
    moviesContainer.appendChild(movieElement);
  });
}

// Show Series
function showSeries(data) {
  const seriesContainer = document.getElementById('scrollContainerSeries');
  seriesContainer.innerHTML = '';

  data.forEach((series) => {
    const seriesElement = document.createElement('div');
    seriesElement.innerHTML = createSeriesCard(series);
    seriesContainer.appendChild(seriesElement);
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

    if (isMovie) {
      element.innerHTML = createMovieCard(item);
      moviesContainer.appendChild(element);
    } else {
      element.innerHTML = createSeriesCard(item);
      seriesContainer.appendChild(element);
    }
  });
}

// Show Actors
function showActors(data) {
  const actorsContainer = document.getElementById('scrollContainerActors');
  actorsContainer.innerHTML = '';

  data.forEach((actor) => {
    const { name, profile_path, known_for_department } = actor;
    const actorElement = document.createElement('div');
    actorElement.classList.add('actor', 'mx-3', 'flex-shrink-0', 'relative', 'hover:brightness-110');

    const imageUrl = profile_path ? `${imges_Url}${profile_path}` : fallbackImage;

    actorElement.innerHTML = `
      <div class="relative">
        <img class="w-40 sm:w-56 h-60 sm:h-80 object-cover rounded-2xl shadow-lg opacity-85 hover:opacity-100" src="${imageUrl}" alt="${name}" onerror="this.src='${fallbackImage}'">
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
setGenre();
getMovies(api_Url);
getSeries(series_Url);
getActors(actors_Url);