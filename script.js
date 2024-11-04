document.addEventListener('DOMContentLoaded', () => {
    const navbarElement = document.getElementById('navbar');
  
    if (navbarElement) {
      fetch('navbar.html')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load navbar');
          }
          return response.text();
        })
        .then(data => {
          navbarElement.innerHTML = data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  });
  
 
  
  // JavaScript for card animation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const cardsContainer = document.getElementById('cards-container');
    const containerPosition = cardsContainer.offsetTop;
  
    if (scrollPosition > containerPosition - window.innerHeight + 200) {
      document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
          card.style.transform = 'translateY(0)';
        }, index * 300);
      });
    }
  });
  
