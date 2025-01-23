

const container = document.getElementById('container');
const posterImg = document.getElementById('posterImg');

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function toggleClassWithDelay() {
    while (true) {
      for (let i = 1; i < container.children.length; i++) {
        container.children[i].classList.toggle('bigger');
        await delay(1000); // 4 second delay
        container.children[i].classList.toggle('bigger');
        console.log("hello")
      }
    }
  }


  var xhr = new XMLHttpRequest()
  xhr.open('GET', `https://api.themoviedb.org/3/movie/${157350}?api_key=d10b21c479b4bc082f3fab5d7cc62326`, true)

  xhr.send()
  var response;

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4) {
      response = JSON.parse(xhr.responseText);
      posterImg.children[0].src= 'https://image.tmdb.org/t/p/original' + response.backdrop_path
      for (let i = 1; i < container.children.length; i++) {
        container.children[i].children[0].src= 'https://image.tmdb.org/t/p/original' + response.poster_path
        console.log(container.children[i].children[0].src)
      }
      
    }
  })
  
  toggleClassWithDelay();