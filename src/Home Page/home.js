const scrollContainer = document.getElementById('scrollContainer');
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');

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