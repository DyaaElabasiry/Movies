var xhr = new XMLHttpRequest()
var image = document.getElementById('poster')
var container = document.getElementById('poster-container')
var addToFavourites = document.getElementById('add-to-favourites')
var userId;
var movieId;
console.log('details.js loaded')
window.onload = function() {
  userId = localStorage.getItem('userId');
  const params = new URLSearchParams(window.location.search);
  movieId = params.get('movieId');

  var checkMovieRequest = new XMLHttpRequest();
  checkMovieRequest.open('GET', `http://localhost:3000/users/${userId}`,true);
  checkMovieRequest.setRequestHeader('Content-Type', 'application/json');
  checkMovieRequest.onload = function(){
    if(checkMovieRequest.status === 200){
      var user = JSON.parse(checkMovieRequest.responseText);
      if(user.favourites.includes(movieId)){
        addToFavourites.style.color = 'red';
      }
    }
  }
  checkMovieRequest.send();

  xhr.open('GET', `https://api.themoviedb.org/3/movie/${movieId}?api_key=d10b21c479b4bc082f3fab5d7cc62326`, true)

  xhr.send()
  var response;

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4) {
      response = JSON.parse(xhr.responseText);
      image.src = 'https://image.tmdb.org/t/p/original' + response.poster_path
      container.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${response.backdrop_path}')`
      container.style.backgroundSize = 'cover'
      container.style.backgroundPosition = 'right center'
      document.getElementById('title').innerText = response.title
      document.getElementById('year').innerText = `(${response.release_date.slice(0, 4)})`
      addSpecs(response)
      document.getElementById('tagline').innerText = response.tagline
      document.getElementById('overview').innerText = response.overview
      document.getElementById('user-score').innerText =  Math.floor(response.vote_average*10) + '%'
      console.log(response)
    }
  })

}



function addSpecs(response) {
  var specs = document.getElementById('specs')
  specs.innerText+= response.release_date
  specs.innerText+= ` (${response.origin_country[0]}) `
  response.genres.forEach(genre => {
    specs.innerText+= `  ${genre.name}  .` 
  })
}

addToFavourites.addEventListener('click', function(event) {
  event.preventDefault();
  if(this.style.color==='red') {
    this.style.color = 'white'
  }else{
    this.style.color = 'red'
  }
  addFavs();
})
//addFavs(121);
function addFavs(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:3000/users/${userId}`,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onload = function(){
    if(xhr.status === 200){
      var user = JSON.parse(xhr.responseText);
      user.favourites.push(movieId);
      var xhr2 = new XMLHttpRequest();
      xhr2.open('PUT', `http://localhost:3000/users/${userId}`,true);
      xhr2.setRequestHeader('Content-Type', 'application/json');
      xhr2.send(JSON.stringify(user));
    }
  }
  
  
}