/**
 * Función Debounce: retrasa la ejecución de una función hasta que haya pasado
 * un tiempo determinado sin que se haya vuelto a llamar.
 */
function debounce(func, delay = 400) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE ENLACE DE USUARIO (TOKEN JWT) ---
    const enlaceUsuario = document.getElementById('enlace-usuario');
    if (enlaceUsuario) {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                // Decodificar payload del JWT
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const payload = JSON.parse(jsonPayload);

                // Verificar expiración
                if (payload.exp && Date.now() >= payload.exp * 1000) {
                    localStorage.removeItem('token'); // Token expirado
                } else {
                    // Verificar roles (asumiendo formato estándar o Spring Security)
                    const rolesRaw = payload.roles || payload.authorities || payload.scope || [];
                    let esAdmin = false;

                    if (Array.isArray(rolesRaw)) {
                        // Comprueba si es string directo ('ROLE_ADMIN') o objeto con propiedad (r.authority/r.nombre)
                        esAdmin = rolesRaw.some(r => r === 'ROLE_ADMIN' || (r && (r.authority === 'ROLE_ADMIN' || r.nombre === 'ROLE_ADMIN')));
                    } else if (typeof rolesRaw === 'string') {
                        esAdmin = rolesRaw.includes('ROLE_ADMIN');
                    }

                    if (esAdmin) {
                        enlaceUsuario.href = '/admin/dashboard';
                    } else {
                        enlaceUsuario.href = '/pedidos';
                    }
                }
            } catch (e) {
                console.error("Error al procesar token de usuario", e);
            }
        }
    }

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

        // +++ Crear y añadir el spinner de carga al formulario +++
        const spinner = document.createElement('div');
        spinner.classList.add('search-spinner');
        formularioBusqueda.appendChild(spinner);

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

            spinner.style.display = 'block'; // Mostrar spinner

            try {
                // Esta API (a crear en el backend) debería devolver un array de strings con nombres de productos
                const response = await fetch(`/api/productos/sugerencias?q=${encodeURIComponent(consulta)}`);
                if (!response.ok) throw new Error('Respuesta no válida de la API');

                const sugerencias = await response.json();
                renderizarSugerencias(sugerencias);
            } catch (error) {
                console.error('Error al obtener sugerencias:', error);
                sugerenciasContainer.style.display = 'none';
            } finally {
                spinner.style.display = 'none'; // Ocultar spinner
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

    // --- INICIO: LÓGICA DE FILTROS AUTOMÁTICOS EN PÁGINA DE BÚSQUEDA ---
    const formFiltros = document.getElementById('form-filtros');
    if (formFiltros) {
        const mainContent = document.querySelector('.listado-productos');
        const sidebar = document.querySelector('.barra-lateral');

        const submitForm = async () => {
            if (!mainContent || !sidebar) return;

            // 1. Añadir estado de carga
            mainContent.classList.add('cargando');

            // Prepara los datos del formulario para la petición
            const currentForm = document.getElementById('form-filtros');
            if (!currentForm) return;

            // Helper para gestionar los inputs ocultos de los filtros de checkbox.
            const manageHiddenInput = (form, name) => {
                const anyChecked = form.querySelector(`input[name="${name}"]:checked`);
                let hiddenInput = form.querySelector(`input[name="${name}"][type="hidden"]`);
                if (!anyChecked && !hiddenInput) {
                    hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = name;
                    form.appendChild(hiddenInput);
                } else if (anyChecked && hiddenInput) {
                    hiddenInput.remove();
                }
            };

            manageHiddenInput(currentForm, 'categorias');
            manageHiddenInput(currentForm, 'juegos');

            const params = new URLSearchParams(new FormData(currentForm)).toString();
            const url = `${currentForm.action}?${params}`;

            try {
                // 2. Realizar la petición fetch
                const response = await fetch(url);
                const html = await response.text();
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');

                // 3. Reemplazar el contenido
                const newMainContent = newDoc.querySelector('.listado-productos');
                const newSidebar = newDoc.querySelector('.barra-lateral');

                if (newMainContent && newSidebar) {
                    mainContent.innerHTML = newMainContent.innerHTML;
                    sidebar.innerHTML = newSidebar.innerHTML;
                }

                // 4. Actualizar la URL del navegador
                history.pushState({}, '', url);

                // 5. Re-asociar los listeners a los nuevos elementos dinámicos
                attachDynamicListeners();

            } catch (error) {
                console.error('Error al actualizar los resultados con AJAX:', error);
                window.location.href = url; // Como fallback, recarga la página
            } finally {
                // 6. Quitar estado de carga
                mainContent.classList.remove('cargando');
                // Scroll suave hacia la parte superior de los resultados
                window.scrollTo({ top: mainContent.offsetTop - 100, behavior: 'smooth' });
            }
        };

        // Crear una versión "debounced" de la función de envío para el slider
        const debouncedSubmit = debounce(submitForm, 500);

        // Función para añadir listeners a elementos que se recargan (paginación y ordenación)
        function attachDynamicListeners() {
            const sortSelect = document.getElementById('sort-select');
            if (sortSelect) {
                sortSelect.addEventListener('change', () => {
                    const currentForm = document.getElementById('form-filtros');
                    const pageInput = currentForm.querySelector('input[name="page"]');
                    if (pageInput) pageInput.value = 0; // Reset a pág 1 al reordenar
                    submitForm();
                });
            }

            document.querySelectorAll('.btn-paginacion').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = btn.dataset.page;
                    const currentForm = document.getElementById('form-filtros');
                    const pageInput = currentForm.querySelector('input[name="page"]');
                    if (pageInput) {
                        pageInput.value = page;
                    }
                    submitForm(); // Llamada AJAX
                });
            });
        }

        // Listener principal delegado al body para los cambios en los filtros
        document.body.addEventListener('input', (event) => {
            const currentForm = document.getElementById('form-filtros');
            if (!currentForm || !currentForm.contains(event.target)) {
                return; // El evento no ocurrió dentro del formulario de filtros
            }

            const target = event.target;

            // Resetear a página 0 si se cambia cualquier filtro
            if (target.name !== 'page') {
                const pageInput = currentForm.querySelector('input[name="page"]');
                if (pageInput) pageInput.value = 0;
            }

            if (target.type === 'range') {
                const valorPrecioMaxDisplay = document.getElementById('valor-precio-max');
                if (valorPrecioMaxDisplay) valorPrecioMaxDisplay.textContent = `${target.value}€`;
                debouncedSubmit(); // Envío con retardo
            } else if (target.type === 'checkbox') {
                submitForm(); // Envío inmediato para checkboxes
            }
        });

        // Llamada inicial para los elementos que ya están en la página
        attachDynamicListeners();
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