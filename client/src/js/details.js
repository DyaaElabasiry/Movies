var xhr = new XMLHttpRequest()
var image = document.getElementById('poster')
var container = document.getElementById('poster-container')
var addToFavourites = document.getElementById('add-to-favourites')

window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('movieId');

  xhr.open('GET', `https://api.themoviedb.org/3/movie/${id}?api_key=d10b21c479b4bc082f3fab5d7cc62326`, true)

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

addToFavourites.addEventListener('click', function() {
  if(this.style.color==='red') {
    this.style.color = 'white'
  }else{
    this.style.color = 'red'
  }
})
