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
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Lógica de la Barra de Búsqueda del Header
    const formularioBusqueda = document.querySelector('.formulario-busqueda');
    if (formularioBusqueda) {
        const inputDeBusqueda = formularioBusqueda.querySelector('input[type="search"]');

        // --- INICIO: APARTADO DE AUTOCOMPLETADO DE LA BARRA DE NAVEGACIÓN ---

        // 1. Crear el contenedor para las sugerencias y añadirlo al body para evitar problemas de z-index.
        const sugerenciasContainer = document.createElement('div');
        sugerenciasContainer.classList.add('sugerencias-busqueda');
        document.body.appendChild(sugerenciasContainer);

        // 2. Función para renderizar y posicionar las sugerencias
        const renderizarSugerencias = (sugerencias) => {
            if (!sugerencias || sugerencias.length === 0) {
                sugerenciasContainer.style.display = 'none';
                return;
            }

            // Posicionar el contenedor justo debajo del input
            const rect = inputDeBusqueda.getBoundingClientRect();
            sugerenciasContainer.style.left = `${rect.left}px`;
            sugerenciasContainer.style.top = `${rect.bottom + window.scrollY + 5}px`;
            sugerenciasContainer.style.width = `${rect.width}px`;

            sugerenciasContainer.innerHTML = '';
            const lista = document.createElement('ul');
            sugerencias.forEach(sugerencia => {
                const item = document.createElement('li');
                item.textContent = sugerencia;
                // Al hacer clic en una sugerencia, se rellena el input y se busca
                item.addEventListener('click', () => {
                    inputDeBusqueda.value = sugerencia;
                    sugerenciasContainer.style.display = 'none';
                    formularioBusqueda.requestSubmit(); // Envía el formulario
                });
                lista.appendChild(item);
            });
            sugerenciasContainer.appendChild(lista);
            sugerenciasContainer.style.display = 'block';
        };

        // 3. Event listener en el input que dispara la búsqueda de sugerencias
        inputDeBusqueda.addEventListener('input', async () => {
            const consulta = inputDeBusqueda.value.trim();

            if (consulta.length < 2) { // No buscar si la consulta es muy corta
                sugerenciasContainer.style.display = 'none';
                return;
            }

            try {
                // Esta API (a crear en el backend) debería devolver un array de strings con nombres de productos
                const response = await fetch(`/api/productos/sugerencias?q=${encodeURIComponent(consulta)}`);
                if (!response.ok) throw new Error('Respuesta no válida de la API');
                
                const sugerencias = await response.json();
                renderizarSugerencias(sugerencias);
            } catch (error) {
                console.error('Error al obtener sugerencias:', error);
                sugerenciasContainer.style.display = 'none';
            }
        });

        // 4. Ocultar sugerencias si se hace clic fuera
        document.addEventListener('click', (event) => {
            if (!formularioBusqueda.contains(event.target)) {
                sugerenciasContainer.style.display = 'none';
            }
        });

        // --- FIN: APARTADO DE AUTOCOMPLETADO DE LA BARRA DE NAVEGACIÓN ---

        formularioBusqueda.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío normal del formulario
            const consulta = inputDeBusqueda.value.trim();

            if (consulta) {
                // Redirigir a una página de resultados de búsqueda.
                window.location.href = `/tienda/buscar?q=${encodeURIComponent(consulta)}`;
            }
        });
    }
    // Lógica del Carrusel
    const carrusel = document.querySelector('.carrusel');
    if (carrusel) {
        const imagenesContainer = carrusel.querySelector('.carrusel-imagenes');
        const prevBtn = carrusel.querySelector('.carrusel-boton.prev');
        const nextBtn = carrusel.querySelector('.carrusel-boton.next');
        let imagenes = carrusel.querySelectorAll('.carrusel-imagen');
        const totalRealImagenes = imagenes.length;

        if (totalRealImagenes === 0) return; // Salir si no hay imágenes

        // 1. Clonar nodos para el efecto infinito
        const firstClone = imagenes[0].cloneNode(true);
        const lastClone = imagenes[totalRealImagenes - 1].cloneNode(true);
        imagenesContainer.appendChild(firstClone);
        imagenesContainer.insertBefore(lastClone, imagenes[0]);

        // Crear puntos de navegación (basado en el número real de imágenes)
        const puntosContainer = document.createElement('div');
        puntosContainer.classList.add('carrusel-puntos');
        carrusel.appendChild(puntosContainer);

        for (let i = 0; i < totalRealImagenes; i++) {
            const punto = document.createElement('span');
            punto.classList.add('punto-nav');
            punto.dataset.index = i;
            puntosContainer.appendChild(punto);
        }
        const puntos = carrusel.querySelectorAll('.punto-nav');

        // 2. Estado inicial
        let currentIndex = 1; // Empezamos en la primera imagen REAL
        let isTransitioning = false;
        let intervalId = null;

        const setPosition = () => {
            imagenesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const updatePuntos = () => {
            const puntoActivoIndex = (currentIndex - 1 + totalRealImagenes) % totalRealImagenes;
            puntos.forEach((punto, index) => {
                punto.classList.toggle('activo', index === puntoActivoIndex);
            });
        };

        const mover = (direccion) => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex += direccion;
            imagenesContainer.style.transition = 'transform 0.5s ease-in-out';
            setPosition();
            updatePuntos();
        };

        const resetInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(() => mover(1), 5000);
        };

        imagenesContainer.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex <= 0) {
                currentIndex = totalRealImagenes;
                imagenesContainer.style.transition = 'none';
                setPosition();
            } else if (currentIndex >= totalRealImagenes + 1) {
                currentIndex = 1;
                imagenesContainer.style.transition = 'none';
                setPosition();
            }
        });

        nextBtn.addEventListener('click', () => { mover(1); resetInterval(); });
        prevBtn.addEventListener('click', () => { mover(-1); resetInterval(); });

        puntos.forEach(punto => {
            punto.addEventListener('click', (e) => {
                if (isTransitioning) return;
                currentIndex = parseInt(e.target.dataset.index) + 1;
                imagenesContainer.style.transition = 'transform 0.5s ease-in-out';
                setPosition();
                updatePuntos();
                resetInterval();
            });
        });

        setPosition();
        updatePuntos();
        resetInterval();
    }
});