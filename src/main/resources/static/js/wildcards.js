document.addEventListener('DOMContentLoaded', () => {
    // Lógica del Menú Hamburguesa
    const menuBtn = document.getElementById('menuHamburguesa');
    const nav = document.querySelector('.nav-principal');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('activo');
            menuBtn.classList.toggle('activo');
        });
    }

    // Lógica del Header Sticky (cambio de estilo al hacer scroll)
    const header = document.querySelector(".cabecera-sitio");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});