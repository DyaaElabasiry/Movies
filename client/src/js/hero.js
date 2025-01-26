
const genreList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];


const HeroContainer = document.getElementById('hero-container');
function getGenreNameById(id) {
  const genre = genreList.find((genre) => genre.id === id);
  return genre ? genre.name : "Genre not found";
}
var heroMovies;
var genre;

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function toggleClassWithDelay() {
    while (true) {
      for (let i = 2; i < 9; i++) {
        document.getElementById('movieTitle').innerText = heroMovies[i - 2].title;
        document.getElementById("movieDescription").innerText = heroMovies[i-2].overview;
        HeroContainer.children[i].classList.toggle('bigger');
        HeroContainer.children[i].children[0].classList.toggle('brighter');
        HeroContainer.children[0].children[i-2].classList.toggle('hidden');
        document.getElementById('genres').innerHTML = "";
        for (let j = 0; j < 3 && j < heroMovies[i-2].genre_ids.length ; j++) {
          genre = getGenreNameById(heroMovies[i-2].genre_ids[j]);
          document.getElementById('genres').innerHTML += `<span class="text-slate-300 text-2xl mr-5 ring-1 ring-slate-400 rounded-lg px-3 py-1">${genre}</span>`;
        }
        
        
        
        await delay(2000); 

        HeroContainer.children[i].classList.toggle('bigger');
        HeroContainer.children[i].children[0].classList.toggle('brighter');
        HeroContainer.children[0].children[i-2].classList.toggle('hidden');
        
      }
    }
  }



  var xhr = new XMLHttpRequest()
  xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=d10b21c479b4bc082f3fab5d7cc62326`, true)

  xhr.send()
  var response;

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4) {
      response = JSON.parse(xhr.responseText);
      heroMovies = response.results.slice(0, 7); 
      for (let i = 0; i < 7; i++) {
        HeroContainer.innerHTML+= `<div  class="box w-32 mx-10  my-14">
                                      <div class="dimmer rounded-lg">
                                          <img class="w-32 rounded-lg" src="https://image.tmdb.org/t/p/original${heroMovies[i].poster_path}" alt="" >
                                      </div>
                                      <div class="text-white text-center italic text-two-lines">${heroMovies[i].title}</div>
                                    </div>`;
        HeroContainer.children[0].innerHTML+= `<img class="hidden animate-background-fade-in" src="https://image.tmdb.org/t/p/original${heroMovies[i].backdrop_path}" alt="">`                            
        //console.log(heroMovies[i].poster_path)  
      }
      toggleClassWithDelay();
      
    }
  })
