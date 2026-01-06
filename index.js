


const hamburgerBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

