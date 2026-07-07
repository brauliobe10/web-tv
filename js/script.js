
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        // Activa/desactiva la clase 'open' en el menú y en el botón
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
});
