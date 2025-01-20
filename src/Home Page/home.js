const scrollContainer = document.getElementById('scrollContainer');
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');
const trendingMenuItem = document.getElementById('Trending');
const tvShowsMenuItem = document.getElementById('Tvshows');
const peopleMenuItem = document.getElementById('People');
const changingButton = document.getElementById('changingButton');

const dropdownItems = document.querySelectorAll('#DropdownMenu a');
const moviesSection = document.querySelector('#moviesSection');

dropdownItems.forEach(item => {
  item.addEventListener('click', function (event) {
   
    event.preventDefault();

    if (moviesSection) {
      moviesSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

const apiUrlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const apiUrlPopularMovies = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWRlNDBmMDE1MjMwMzQzMWE4NzJkZjc2MjExOTk2NyIsIm5iZiI6MTY5ODY5OTU0NS4wNTQwMDAxLCJzdWIiOiI2NTQwMTkxOTUwNzMzYzAwYzUzNjRlNGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S-Y1wxfILwCAlrlXou3nntBuoaP_m_kbRe_2fkEr7Kk'; // Replace with your actual token

function fetchContent(url, category, targetContainer, showOriginalTitle = false) {
  const getApi = new XMLHttpRequest();
  getApi.open('GET', url);
  getApi.setRequestHeader('Authorization', `Bearer ${bearerToken}`);
  getApi.setRequestHeader('Accept', 'application/json');
  getApi.send();

  getApi.onreadystatechange = function () {
    if (getApi.readyState === 4) {
      if (getApi.status === 200) {
        const response = JSON.parse(getApi.responseText);
        const content = response.results;
        let contentHtml = '';

        content.forEach(item => {
          const { poster_path, profile_path, name, release_date, first_air_date, title, original_title } = item;
          contentHtml += `
          <div class="mx-3 flex-shrink-0 relative hover:brightness-110">
            <!-- Poster Image -->
            <img class="w-40 sm:w-56 h-auto my-4 rounded-2xl shadow-lg" 
                 src="https://image.tmdb.org/t/p/w500${poster_path || profile_path}" 
                 alt="${title || name}">
            
<!-- Three Dot Icon -->
<div class="absolute top-5 right-2 p-1 bg-gray-200/60 rounded-full text-black cursor-pointer hover:bg-gray-700" id="three-dot-${item.id}">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
    <g class="flex justify-between">
      <circle cx="6" cy="12" r="1.5" stroke="none" fill="currentColor"></circle>
      <circle cx="12" cy="12" r="1.5" stroke="none" fill="currentColor"></circle>
      <circle cx="18" cy="12" r="1.5" stroke="none" fill="currentColor"></circle>
    </g>
  </svg>
</div>

<!-- Dropdown Menu -->
<div id="dropdown-${item.id}" class="absolute hidden right-2 top-14 bg-white text-gray-500 rounded-lg shadow-lg w-36 z-10">
  <ul class="text-sm">
    <li class="px-3 py-2 hover:bg-gray-700 hover:text-white font-bold cursor-pointer" onclick="addToFavorites('${title || name}')">
      <!-- Black heart icon for "Favorite" -->
      <i class="fas fa-heart mr-2 text-black"></i> Favorite
    </li>
    <li class="px-3 py-2 hover:bg-gray-700 hover:text-white font-bold cursor-pointer" onclick="addToWatchList('${title || name}')">
      <!-- Black clipboard icon for "Watch List" -->
      <i class="fas fa-clipboard-list mr-2 text-black"></i> Watch List
    </li>
  </ul>
</div>

            <!-- Title and Release Date -->
            <h6 class="ml-3 text-base sm:text-lg text-gray-900 font-semibold">${title || name}</h6>
            <p class="ml-3 text-sm sm:text-base text-gray-500">${release_date || first_air_date || ''}</p>
            ${showOriginalTitle ? `<p class="ml-3 text-sm sm:text-base text-gray-400">${original_title || ''}</p>` : ''}
          </div>`;
        });
        targetContainer.innerHTML = contentHtml;

        
        content.forEach(item => {
          const threeDotButton = document.getElementById(`three-dot-${item.id}`);
          const dropdown = document.getElementById(`dropdown-${item.id}`);

          threeDotButton.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
          });
        });
      } else {
        console.error('Failed to fetch content:', getApi.statusText);
        targetContainer.innerHTML = `<p class="text-red-500">Failed to load data. Please try again later.</p>`;
      }
    }
  };

  changingButton.innerText = ` ${category}`;
}

function addToFavorites(item) {
  alert(`${item} added to Favorites`);

}

function addToWatchList(item) {
  alert(`${item} added to Watch List`);

}

trendingMenuItem.addEventListener('click', () => {
  fetchContent(apiUrlTrendingMovies, 'Trending', scrollContainer, false);
});

tvShowsMenuItem.addEventListener('click', () => {
  const apiUrlTvShows = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'; 
  fetchContent(apiUrlTvShows, 'TV Shows', scrollContainer, false);
});

peopleMenuItem.addEventListener('click', () => {
  const apiUrlPeople = 'https://api.themoviedb.org/3/trending/person/day?language=en-US'; 
  fetchContent(apiUrlPeople, 'People', scrollContainer, false);
});


const popularSectionContainer = document.getElementById('PopularScrollContainer');
fetchContent(apiUrlPopularMovies, ' Movies', popularSectionContainer, true);

const defaultApiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
fetchContent(defaultApiUrl, 'Trending', scrollContainer, false);


scrollLeftButton.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -300, 
    behavior: 'smooth' 
  });
});

scrollRightButton.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 300, 
    behavior: 'smooth' 
  });
});
