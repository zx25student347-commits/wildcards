document.addEventListener('DOMContentLoaded', function () {
            const imagenes = document.querySelector('.carrusel-imagenes');
            const totalImagenes = document.querySelectorAll('.carrusel-imagen').length;
            let indiceActual = 0;

            function mostrarImagen(indice) {
                const anchoImagen = document.querySelector('.carrusel').clientWidth;
                imagenes.style.transform = `translateX(${-indice * anchoImagen}px)`;
            }

            document.querySelector('.carrusel-boton.next').addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % totalImagenes;
                mostrarImagen(indiceActual);
            });

            document.querySelector('.carrusel-boton.prev').addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
                mostrarImagen(indiceActual);
            });
        });