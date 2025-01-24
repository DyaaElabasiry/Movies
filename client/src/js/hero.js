

const movieTitle = document.getElementById('movieTitle');
const HeroContainer = document.getElementById('hero-container');
//const posterImg = document.getElementById('posterImg');
console.log(movieTitle.innerText)
var heroMovies;

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
        
        console.log(movieTitle.innerText)
        
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
      console.log(response.results)
      for (let i = 0; i < 7; i++) {
        HeroContainer.innerHTML+= `<div  class="box w-32 mx-10  my-14">
                                      <div class="dimmer rounded-lg">
                                          <img class="w-32 rounded-lg" src="https://image.tmdb.org/t/p/original${heroMovies[i].poster_path}" alt="" >
                                      </div>
                                      <div class="text-white text-center italic text-two-lines">${heroMovies[i].title}</div>
                                    </div>`;
        HeroContainer.children[0].innerHTML+= `<img class="background-poster hidden" src="https://image.tmdb.org/t/p/original${heroMovies[i].backdrop_path}" alt="">`                            
        //console.log(heroMovies[i].poster_path)  
      }
      toggleClassWithDelay();
      
    }
  })
