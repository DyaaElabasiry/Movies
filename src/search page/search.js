/*document.addEventListener('DOMContentLoaded', async function () {
    const resultsContainer = document.getElementById('results');
  
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
  
    if (!query) {
      resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
      return;
    }
  
    try {
      const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
      const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWRlNDBmMDE1MjMwMzQzMWE4NzJkZjc2MjExOTk2NyIsIm5iZiI6MTY5ODY5OTU0NS4wNTQwMDAxLCJzdWIiOiI2NTQwMTkxOTUwNzMzYzAwYzUzNjRlNGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S-Y1wxfILwCAlrlXou3nntBuoaP_m_kbRe_2fkEr7Kk';
  
      // Fetch data from the API
      const response = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        resultsContainer.innerHTML = data.results
          .map(result => {
            const name = result.title || result.name;
            const poster = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : '';
            return `
              <div class="result-item">
                <img src="${poster}" alt="${name}">
                <h3>${name}</h3>
              </div>
            `;
          })
          .join('');
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      resultsContainer.innerHTML = '<p>Failed to load data. Please try again later.</p>';
    }
  });*/