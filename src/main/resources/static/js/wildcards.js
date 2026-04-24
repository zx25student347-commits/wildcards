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
   
    // --- GESTIÓN GLOBAL DE TOKEN JWT ---
    const token = localStorage.getItem('token');
    const esPaginaLogin = window.location.pathname.includes('/login');

    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            const payload = JSON.parse(jsonPayload);

            // Verificar expiración proactivamente en cada carga de página
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                console.warn("Token expirado detectado. Limpiando...");
                localStorage.removeItem('token');
                if (!esPaginaLogin) {
                    window.location.reload(); // Recargar para limpiar estado de la app
                }
            }
        } catch (e) {
            console.error("Token corrupto detectado:", e);
            localStorage.removeItem('token');
        }
    }

    const enlaceUsuario = document.getElementById('enlace-usuario');
    if (enlaceUsuario) {
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const payload = JSON.parse(jsonPayload);

                if (!(payload.exp && Date.now() >= payload.exp * 1000)) {
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

        // Estructura para Ghost Text (Autocompletado visual detrás del texto)
        const wrapper = document.createElement('div');
        wrapper.classList.add('search-wrapper');
        inputDeBusqueda.parentNode.insertBefore(wrapper, inputDeBusqueda);

        const ghost = document.createElement('div');
        ghost.classList.add('search-ghost');
        wrapper.appendChild(ghost);
        wrapper.appendChild(inputDeBusqueda);

        // Función para normalizar texto (quitar tildes y pasar a minúsculas)
        const normalizarTexto = (texto) => 
            texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Configuración de categorías para evitar duplicados y mejorar la búsqueda
        const categoriasConfig = [
            { nombre: 'Pokémon TCG', url: '/pokemon', terminos: ['pokemon', 'pokémon', 'tcg'] },
            { nombre: 'One Piece Card Game', url: '/onepiece', terminos: ['one piece', 'onepiece', 'opcg'] },
            { nombre: 'Yu-Gi-Oh!', url: '/yugioh', terminos: ['yugioh', 'yu-gi-oh', 'yugi'] },
            { nombre: 'Magic: The Gathering', url: '/magic', terminos: ['magic', 'mtg', 'gathering'] },
            { nombre: 'Accesorios', url: '/accesorios', terminos: ['fundas', 'tapetes', 'accesorios'] }
        ];

        // Manejar teclas para aceptar la sugerencia (Tab o Flecha Derecha)
        inputDeBusqueda.addEventListener('keydown', (e) => {
            const ghostText = ghost.textContent;
            if (ghostText && (e.key === 'Tab' || e.key === 'ArrowRight')) {
                // Solo si el cursor está al final de lo escrito
                if (inputDeBusqueda.selectionStart === inputDeBusqueda.value.length) {
                    e.preventDefault();
                    inputDeBusqueda.value = ghostText;
                    ghost.innerHTML = '';
                    sugerenciasContainer.style.display = 'none';
                }
            }
        });

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
                    ghost.innerHTML = '';
                    sugerenciasContainer.style.display = 'none';
                    formularioBusqueda.requestSubmit(); // Envía el formulario
                });
                lista.appendChild(item);
            });
            sugerenciasContainer.appendChild(lista);
            sugerenciasContainer.style.display = 'block';
        };

        // 3. Event listener en el input que dispara la búsqueda de sugerencias
        inputDeBusqueda.addEventListener('input', async (event) => {
            const textoEscrito = inputDeBusqueda.value;
            const consulta = textoEscrito.trim();
            const consultaNorm = normalizarTexto(consulta);

            if (consulta.length < 2) { // No buscar si la consulta es muy corta
                sugerenciasContainer.style.display = 'none';
                ghost.innerHTML = '';
                return;
            }

            spinner.style.display = 'block'; // Mostrar spinner

            // Filtrar categorías configuradas (sin duplicados por URL)
            const sugerenciasLocales = categoriasConfig
                .filter(cat => 
                    normalizarTexto(cat.nombre).includes(consultaNorm) || 
                    cat.terminos.some(t => normalizarTexto(t).includes(consultaNorm))
                )
                .map(cat => cat.nombre);

            try {
                // Esta API (a crear en el backend) debería devolver un array de strings con nombres de productos
                const response = await fetch(`/api/productos/sugerencias?q=${encodeURIComponent(consulta)}`);
                if (!response.ok) throw new Error('Respuesta no válida de la API');

                const sugerencias = await response.json();
                
                // Mezclar locales con API y eliminar duplicados (insensible a mayúsculas)
                const todasSugerencias = [...sugerenciasLocales];
                sugerencias.forEach(s => {
                    if (!todasSugerencias.some(local => local.toLowerCase() === s.toLowerCase())) {
                        todasSugerencias.push(s);
                    }
                });

                renderizarSugerencias(todasSugerencias.slice(0, 10));

                // --- Lógica de "Ghost Text" ---
                const primeraSugerencia = todasSugerencias[0];
                if (primeraSugerencia && consulta.length > 0) {
                    const sugerenciaNorm = normalizarTexto(primeraSugerencia);
                    if (sugerenciaNorm.startsWith(consultaNorm)) {
                        // El texto ya escrito se pone en un span invisible para alinear el resto perfectamente
                        const parteEscrita = primeraSugerencia.substring(0, consulta.length);
                        const resto = primeraSugerencia.substring(consulta.length);
                        ghost.innerHTML = `<span style="opacity: 0">${parteEscrita}</span><span>${resto}</span>`;
                    } else {
                        ghost.innerHTML = '';
                    }
                } else {
                    ghost.innerHTML = '';
                }
            } catch (error) {
                console.error('Error al obtener sugerencias:', error);
                renderizarSugerencias(sugerenciasLocales); // Fallback a locales si falla la API
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
            const consultaNorm = normalizarTexto(consulta);

            if (consulta) {
                // Buscar si la consulta coincide con una categoría para redirigir directamente
                const catMatch = categoriasConfig.find(cat => 
                    normalizarTexto(cat.nombre) === consultaNorm || 
                    cat.terminos.some(t => normalizarTexto(t) === consultaNorm)
                );

                if (catMatch) {
                    window.location.href = catMatch.url;
                    return;
                }

                // Si no es un juego, redirigir a la página de resultados de búsqueda normal.
                window.location.href = `/tienda/buscar?q=${encodeURIComponent(consulta)}`;
            }
        });
    }

    // --- LÓGICA DE FILTROS COLAPSABLES EN MÓVIL ---
    const sidebar = document.querySelector('.barra-lateral');
    const containerTienda = document.querySelector('.contenedor-tienda');

    if (sidebar && containerTienda) {
        // Crear el botón de toggle
        const btnToggle = document.createElement('button');
        btnToggle.className = 'btn-toggle-filtros';
        btnToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>Mostrar Filtros</span>
        `;
        
        // Insertarlo al principio del contenedor
        containerTienda.insertBefore(btnToggle, containerTienda.firstChild);

        btnToggle.addEventListener('click', () => {
            const estaAbierto = sidebar.classList.toggle('abierto');
            btnToggle.querySelector('span').textContent = estaAbierto ? 'Ocultar Filtros' : 'Mostrar Filtros';
            // Si se abre, hacemos un scroll suave para ver los filtros
            if (estaAbierto) sidebar.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- INICIO: LÓGICA DE FILTROS AUTOMÁTICOS EN PÁGINA DE BÚSQUEDA ---
    const formFiltros = document.getElementById('form-filtros');
    if (formFiltros) {
        const mainContent = document.querySelector('.listado-productos');
        const sidebar = document.querySelector('.barra-lateral');

        // Obtener el grid de productos para manipularlo
        const productosGrid = document.querySelector('.productos-grid');

        // Función para renderizar esqueletos en la página de búsqueda
        function renderizarSkeletonsBusqueda() {
            if (!productosGrid) return;
            // Usamos 12 esqueletos, que es el número por defecto de items por página
            productosGrid.innerHTML = Array(12).fill(0).map(() => `
                <div class="skeleton-card">
                    <div class="skeleton-img"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-price"></div>
                </div>
            `).join('');
            const infoResultadosP = document.querySelector('.info-resultados p');
            if (infoResultadosP) {
                infoResultadosP.textContent = 'Cargando productos...';
            }
        }

        // Función para alternar el estado de carga (blur y esqueletos)
        function toggleGridLoadingBusqueda(show) {
            if (productosGrid) {
                productosGrid.classList.toggle('loading-blur', show);
            }
            if (show) renderizarSkeletonsBusqueda();
        }

        // --- Lógica del Slider Doble en Búsqueda (Sincronizada con diseño de catálogo) ---
        const actualizarTrackBusqueda = () => {
            const minInput = document.getElementById('min-price');
            const maxInput = document.getElementById('max-price');
            const track = document.querySelector('.slider-track');
            const minTooltip = document.getElementById('min-tooltip');
            const maxTooltip = document.getElementById('max-tooltip');
            
            if (!minInput || !maxInput || !track) return;
            
            const maxVal = parseFloat(minInput.max) || 500;
            const percent1 = (parseFloat(minInput.value) / maxVal) * 100;
            const percent2 = (parseFloat(maxInput.value) / maxVal) * 100;

            // Actualizar color de la barra
            track.style.background = `linear-gradient(to right, rgba(255,255,255,0.1) ${percent1}%, var(--accent) ${percent1}%, var(--accent) ${percent2}%, rgba(255,255,255,0.1) ${percent2}%)`;

            // Posicionar y actualizar tooltips
            if (minTooltip) {
                minTooltip.textContent = `${minInput.value}€`;
                minTooltip.style.left = `calc(${percent1}% + (${9 - percent1 * 0.18}px))`;
            }
            if (maxTooltip) {
                maxTooltip.textContent = `${maxInput.value}€`;
                maxTooltip.style.left = `calc(${percent2}% + (${9 - percent2 * 0.18}px))`;
            }
        };

        const submitForm = async () => {
            if (!mainContent || !sidebar) return;

            // 1. Añadir estado de carga (skeletons y blur)
            toggleGridLoadingBusqueda(true);

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
                // Re-inicializar visualmente el slider tras la recarga AJAX
                actualizarTrackBusqueda();

            } catch (error) {
                console.error('Error al actualizar los resultados con AJAX:', error);
                window.location.href = url; // Como fallback, recarga la página
            } finally {
                // 6. Quitar estado de carga
                toggleGridLoadingBusqueda(false);
                // Scroll suave hacia la parte superior de los resultados
                window.scrollTo({ top: mainContent.offsetTop - 100, behavior: 'smooth' });
            }
        };

        // Crear una versión "debounced" de la función de envío para el slider
        const debouncedSubmit = debounce(submitForm, 500);

        // Botón Reset para Búsqueda (Mismo comportamiento que catálogo)
        document.body.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'btn-reset-filtros') {
                const currentForm = document.getElementById('form-filtros');
                if (!currentForm) return;
                
                currentForm.reset();
                // Forzar visualmente el track al estado inicial
                setTimeout(() => {
                    actualizarTrackBusqueda();
                    submitForm();
                }, 10);
            }
        });

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
                const minI = document.getElementById('min-price');
                const maxI = document.getElementById('max-price');
                
                if (minI && maxI) {
                    // Evitar que los tiradores se crucen
                    if (parseInt(minI.value) > parseInt(maxI.value)) {
                        if (target === minI) minI.value = maxI.value;
                        else maxI.value = minI.value;
                    }
                    document.getElementById('min-price-val').textContent = `${minI.value}€`;
                    document.getElementById('max-price-val').textContent = `${maxI.value}€`;
                    actualizarTrackBusqueda();
                }
                debouncedSubmit(); // Envío con retardo
            } else if (target.type === 'checkbox') {
                submitForm(); // Envío inmediato para checkboxes
            }
        });

        // Llamada inicial para los elementos que ya están en la página
        attachDynamicListeners();
        actualizarTrackBusqueda(); // Asegurar que el track del slider se renderice correctamente al cargar la página
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

    // --- EFECTO DE CONFETI AL AÑADIR AL CARRITO ---
    // Usamos delegación de eventos al body para detectar clics en botones dinámicos
    document.body.addEventListener('click', (e) => {
        // Busca si el clic fue en (o dentro de) un botón con clases típicas de compra
        // Añade aquí las clases que usen tus botones, ej: 'btn-add', 'btn-comprar', 'agregar-carrito'
        const btn = e.target.closest('.btn-add, .btn-agregar, .btn-comprar, .boton-comprar, #btnAgregarCarrito');
        
        if (btn) {
            // Si el botón está deshabilitado, mostramos error y cancelamos la acción
            if (btn.disabled) {
                mostrarToast("No hay stock disponible para este producto", null, true);
                return;
            }

            // Validación de cantidad vs stock
            const cantidadInput = document.getElementById('cantidad');
            const stockNumEl = document.getElementById('carta-stock-num') || document.getElementById('accesorio-stock-num');
            if (cantidadInput && stockNumEl) {
                const cantidad = parseInt(cantidadInput.value) || 1;
                const stockActual = parseInt(stockNumEl.textContent) || 0;
                if (cantidad > stockActual) {
                    mostrarToast("No puedes añadir más unidades de las disponibles en stock", null, true);
                    return;
                }
            }

            // Obtenemos las coordenadas del centro del botón para que el confeti salga de ahí
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // --- Detección de imagen para el Toast ---
            let imgElement = null;
            
            // 1. Si el botón está en una tarjeta de producto (vista grid/lista)
            const card = btn.closest('.producto-card');
            if (card) {
                imgElement = card.querySelector('img');
            } 
            // 2. Si no, busca por ID en páginas de detalle (Carta o Accesorio)
            else {
                imgElement = document.getElementById('carta-imagen') || document.getElementById('accesorio-imagen');
            }
            
            const imgUrl = imgElement ? imgElement.src : null;
            
            crearConfeti(x, y);
            mostrarToast("¡Producto añadido al carrito!", imgUrl);
            
            // Actualizar contador global tras un breve delay para que la petición de guardado termine
            

            // --- ANIMACIÓN VUELO AL CARRITO ---
            if (imgElement) {
                animarVueloAlCarrito(imgElement);
            }
        }
    });

    function crearConfeti(x, y) {
        const colores = ['#ff00ff', '#32cd32', '#FFCB05', '#00ffff', '#ffffff']; // Paleta neón
        const cantidad = 30; // Número de partículas

        for (let i = 0; i < cantidad; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula-confeti');
            document.body.appendChild(particula);

            // Posición inicial
            particula.style.left = `${x}px`;
            particula.style.top = `${y}px`;
            particula.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

            // Física aleatoria para cada partícula
            const angulo = Math.random() * Math.PI * 2;
            const velocidad = 60 + Math.random() * 100; // Distancia de dispersión
            const tx = Math.cos(angulo) * velocidad;
            const ty = Math.sin(angulo) * velocidad;

            // Animación: se mueven hacia afuera y se desvanecen (scale 0)
            const animacion = particula.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600 + Math.random() * 400, // Duración variable
                easing: 'cubic-bezier(0, .9, .57, 1)', // Efecto "explosión" suave
                fill: 'forwards'
            });

            // Limpieza del DOM al terminar
            animacion.onfinish = () => particula.remove();
        }
    }

    // --- SISTEMA DE NOTIFICACIONES TOAST ---
    window.mostrarToast = function(mensaje, imagenUrl, esError = false) {
        // 1. Verificar si existe el contenedor, si no, crearlo
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.classList.add('toast-container');
            document.body.appendChild(container);
        }

        // 2. Crear el elemento toast
        const toast = document.createElement('div');
        toast.classList.add('toast-notification');
        if (esError) toast.classList.add('toast-error');
        
        // Construimos el HTML: Imagen (opcional) + Icono + Mensaje
        const imgHtml = imagenUrl ? `<img src="${imagenUrl}" class="toast-img" alt="Producto">` : '';
        const iconoHtml = esError 
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        toast.innerHTML = `
            ${imgHtml}
            <div class="toast-icono">
                ${iconoHtml}
            </div>
            <span>${mensaje}</span>
        `;

        // 3. Añadir al DOM y animar entrada
        container.appendChild(toast);
        // Pequeño delay para permitir que el navegador renderice antes de transformar
        requestAnimationFrame(() => toast.classList.add('mostrar'));

        // 4. Eliminar automáticamente después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('mostrar'); // Animar salida
            // Esperar a que termine la transición CSS para eliminar del DOM
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }
    
    // --- ANIMACIÓN VUELO AL CARRITO ---
    let isAnimating = false; // Variable de control para el cooldown

    function animarVueloAlCarrito(imgSource) {
        if (isAnimating) return; // Si ya hay una animación en curso, no hacer nada

        let cartTarget = document.querySelector('a[href*="carrito"]'); 
        if (!cartTarget) cartTarget = document.getElementById('contadorCarrito');
        
        if (!imgSource || !cartTarget) return;

        isAnimating = true; // Bloquear nuevas animaciones

        // 1. Crear el clon principal que volará
        const flyImg = imgSource.cloneNode(true);
        flyImg.classList.add('fly-item');
        
        // 2. Posición Inicial (Coordenadas exactas)
        const startRect = imgSource.getBoundingClientRect();
        flyImg.style.left = `${startRect.left}px`;
        flyImg.style.top = `${startRect.top}px`;
        flyImg.style.width = `${startRect.width}px`;
        flyImg.style.height = `${startRect.height}px`;
        flyImg.style.transition = 'all 1.6s cubic-bezier(0.19, 1, 0.22, 1)'; // Transición ajustada
        
        document.body.appendChild(flyImg);
        
        // Crear overlay oscuro
        const overlay = document.createElement('div');
        overlay.classList.add('fly-overlay');
        document.body.appendChild(overlay);

        // Forzar reflow para que el navegador registre la posición inicial
        flyImg.getBoundingClientRect();

        // --- FASE 1: IR AL CENTRO (Presentación) ---
        setTimeout(() => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Centramos la imagen restando la mitad de su tamaño al centro de la pantalla
            const centerX = (viewportWidth / 2) - (startRect.width / 2);
            const centerY = (viewportHeight / 2) - (startRect.height / 2);

            flyImg.style.left = `${centerX}px`;
            flyImg.style.top = `${centerY}px`;
            flyImg.style.transform = 'scale(1.5)'; // Zoom Grande
            flyImg.classList.add('fly-glow'); // Brillo intenso
            overlay.style.opacity = '1'; // Oscurecer fondo
        }, 10);

        // --- FASE 2: VOLAR AL CARRITO (Curva) ---
        // Esperamos 1650ms (tiempo de viaje al centro 1.6s + pequeña pausa 0.05s)
        setTimeout(() => {
            const endRect = cartTarget.getBoundingClientRect();
            
            // Calcular posición final centrada en el icono del carrito
            // El tamaño final será pequeño (ej. 30px)
            const finalSize = 30;
            const endLeft = endRect.left + (endRect.width / 2) - (finalSize / 2);
            const endTop = endRect.top + (endRect.height / 2) - (finalSize / 2);

            // Quitamos el brillo y cambiamos la transición para crear la CURVA
            flyImg.classList.remove('fly-glow');
            overlay.style.opacity = '0'; // Restaurar luz fondo
            setTimeout(() => overlay.remove(), 500); // Eliminar del DOM al terminar transición
            
            // TRUCO CURVA: 'left' lineal y 'top' con cubic-bezier (o viceversa) desincronizan el movimiento
            // creando un arco en lugar de una línea recta.
            flyImg.style.transition = 'left 0.8s linear, top 0.8s cubic-bezier(0.5, 0, 0.5, 1), width 0.8s ease, height 0.8s ease, transform 0.8s ease';
            
            flyImg.style.left = `${endLeft}px`;
            flyImg.style.top = `${endTop}px`;
            flyImg.style.width = `${finalSize}px`;
            flyImg.style.height = `${finalSize}px`;
            flyImg.style.transform = 'scale(1) rotate(360deg)'; // Pequeña rotación al viajar

            // Iniciamos la estela solo durante el vuelo rápido
            const trailInterval = setInterval(() => {
                const rect = flyImg.getBoundingClientRect();
                const trail = flyImg.cloneNode();
                trail.classList.remove('fly-item', 'fly-glow'); // Limpiar clases funcionales
                trail.classList.add('fly-trail');
                
                trail.style.position = 'fixed';
                trail.style.left = `${rect.left}px`;
                trail.style.top = `${rect.top}px`;
                trail.style.width = `${rect.width}px`;
                trail.style.height = `${rect.height}px`;
                trail.style.transition = 'none';
                trail.style.transform = flyImg.style.transform;
                
                document.body.appendChild(trail);
                
                trail.addEventListener('animationend', () => trail.remove());
            }, 50);

            // Limpieza al llegar
            setTimeout(() => {
                clearInterval(trailInterval);
                flyImg.remove();
                isAnimating = false; // Liberar bloqueo (Cooldown terminado)
                
                // Efecto "golpe" en el carrito
                cartTarget.classList.add('cart-flash');
                cartTarget.addEventListener('animationend', () => cartTarget.classList.remove('cart-flash'), { once: true });
            }, 800); // Coincide con la duración de la transición (0.8s)
        
        }, 1650);
    }
});