
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
        // Activa/desactiva la clase 'open' en el menú y en el botón
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach((img) => {
        const isPriorityImage = img.closest('header') || img.classList.contains('logo-img') || img.classList.contains('footer-logo');

        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', isPriorityImage ? 'eager' : 'lazy');
        }

        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }

        if (isPriorityImage && !img.hasAttribute('fetchpriority')) {
            img.setAttribute('fetchpriority', 'high');
        }
    });

    const track = document.getElementById('carouselTrack');
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');

    if (!track || !nextButton || !prevButton || !dotsNav) return;

    const slides = Array.from(track.children);
    const dots = Array.from(dotsNav.children);

    if (!slides.length || !dots.length) return;

    let currentIndex = 0;

    // Función para mover el carrusel a una posición específica
    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;

        // Actualizar clase activa en los puntos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        currentIndex = index;
    };

    // Evento Botón Siguiente
    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0; // Regresa al inicio
        moveToSlide(nextIndex);
    });

    // Evento Botón Anterior
    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1; // Va al final
        moveToSlide(prevIndex);
    });

    // Evento para los puntos indicadores
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(targetIndex);
    });
});