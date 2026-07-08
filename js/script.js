
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        // Activa/desactiva la clase 'open' en el menú y en el botón
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carouselNav');
    const dots = Array.from(dotsNav.children);

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