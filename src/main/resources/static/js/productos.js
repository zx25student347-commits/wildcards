document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('productos-grid');
    
    if (!grid) return; // Evitar errores si no estamos en una página de productos
    
    const path = window.location.pathname;
    const endpoint = path.replace(/^\/|\/$/g, '');

    let apiUrl;
    let productoTipo;
    let mensajeErrorCarga;
    let mensajeNoDisponible;
    let allProducts = [];
    let bubbleInterval; // Control para las burbujas de One Piece
    let filterTimeout; // Para controlar la pausa del filtrado

    if (endpoint === 'accesorios') {
        apiUrl = '/api/accesorios';
        productoTipo = 'accesorios';
        mensajeErrorCarga = 'No se pudieron cargar los accesorios';
        mensajeNoDisponible = 'No hay accesorios disponibles.';
    } else {
        apiUrl = `/api/cartas/juego/${endpoint}`;
        productoTipo = 'cartas';
        mensajeErrorCarga = 'No se pudieron cargar las cartas';
        mensajeNoDisponible = 'No hay cartas disponibles para este juego.';
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error(mensajeErrorCarga);
            return response.json();
        })
        .then(items => {
            allProducts = items;
            actualizarRangoPrecio();
            setupFilters();
            aplicarFiltros(); // Render inicial con filtros aplicados
        })
        .catch(err => {
            console.error(`Error cargando ${productoTipo}:`, err);
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error al cargar el catálogo.</p>';
        });

    function toggleGridLoading(show) {
        const grid = document.getElementById('productos-grid');
        let loader = document.getElementById('grid-loader');

        // Crear el loader dinámicamente si no existe
        if (!loader && grid) {
            loader = document.createElement('div');
            loader.id = 'grid-loader';
            loader.className = `grid-loader loader-${endpoint}`;
            loader.innerHTML = '<div class="spinner"></div>';
            grid.parentElement.appendChild(loader);
        }

        if (grid) grid.classList.toggle('loading-blur', show);
        
        if (loader) {
            loader.style.display = show ? 'flex' : 'none';

            // --- Generador de Burbujas para One Piece ---
            if (show && endpoint === 'onepiece') {
                if (!bubbleInterval) {
                    bubbleInterval = setInterval(() => {
                        const bubble = document.createElement('div');
                        bubble.className = 'bubble';
                        const size = Math.random() * 12 + 4;
                        bubble.style.width = `${size}px`;
                        bubble.style.height = `${size}px`;
                        bubble.style.left = `calc(50% + ${(Math.random() - 0.5) * 60}px)`;
                        bubble.style.setProperty('--sway', `${(Math.random() - 0.5) * 100}px`);
                        bubble.style.animationDuration = `${Math.random() * 1.5 + 1}s`;
                        loader.appendChild(bubble);
                        setTimeout(() => bubble.remove(), 2500);
                    }, 150);
                }
            } else if (bubbleInterval) {
                clearInterval(bubbleInterval);
                bubbleInterval = null;
            }
        }
    }

    function actualizarRangoPrecio() {
        if (!allProducts || allProducts.length === 0) return;

        const maxPrecio = allProducts.reduce((max, item) => Math.max(max, parseFloat(item.precio) || 0), 0);
        const maxRedondeado = Math.ceil(maxPrecio) || 500;

        const minInput = document.getElementById('min-price');
        const maxInput = document.getElementById('max-price');

        if (minInput && maxInput) {
            minInput.max = maxRedondeado;
            maxInput.max = maxRedondeado;
            maxInput.value = maxRedondeado;
            
            document.getElementById('max-price-val').textContent = `${maxRedondeado}€`;
        }
        actualizarTrack();
    }

    function actualizarTrack() {
        const minInput = document.getElementById('min-price');
        const maxInput = document.getElementById('max-price');
        const minTooltip = document.getElementById('min-tooltip');
        const maxTooltip = document.getElementById('max-tooltip');
        const track = document.querySelector('.slider-track');
        if (!minInput || !maxInput || !track) return;

        const maxVal = minInput.max || 500;
        const percent1 = (minInput.value / maxVal) * 100;
        const percent2 = (maxInput.value / maxVal) * 100;

        track.style.background = `linear-gradient(to right, rgba(255,255,255,0.1) ${percent1}%, var(--accent) ${percent1}%, var(--accent) ${percent2}%, rgba(255,255,255,0.1) ${percent2}%)`;

        // Posicionar tooltips y actualizar texto
        if (minTooltip) {
            minTooltip.textContent = `${minInput.value}€`;
            minTooltip.style.left = `calc(${percent1}% + (${9 - percent1 * 0.18}px))`;
        }
        if (maxTooltip) {
            maxTooltip.textContent = `${maxInput.value}€`;
            maxTooltip.style.left = `calc(${percent2}% + (${9 - percent2 * 0.18}px))`;
        }
    }

    function setupFilters() {
        const minInput = document.getElementById('min-price');
        const maxInput = document.getElementById('max-price');
        const checkboxesIdioma = document.querySelectorAll('input[name="idioma"]');
        const selectSet = document.getElementById('filtro-set');

        [minInput, maxInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    // Mostrar cargador inmediatamente al tocar el slider
                    toggleGridLoading(true);

                    // Evitar que el min supere al max
                    if (parseInt(minInput.value) > parseInt(maxInput.value)) {
                        if (event.target === minInput) minInput.value = maxInput.value;
                        else maxInput.value = minInput.value;
                    }
                    
                    document.getElementById('min-price-val').textContent = `${minInput.value}€`;
                    document.getElementById('max-price-val').textContent = `${maxInput.value}€`;
                    actualizarTrack();

                    // Cancelar el filtrado anterior y programar uno nuevo (Debounce)
                    clearTimeout(filterTimeout);
                    filterTimeout = setTimeout(() => {
                        aplicarFiltros();
                    }, 500); // Espera 0.5 segundos después de que el usuario deje de mover
                });
            }
        });

        if (selectSet && allProducts.length > 0) {
            const sets = new Set();
            allProducts.forEach(item => {
                if (item.set) {
                    const setName = typeof item.set === 'object' ? item.set.nombre : item.set;
                    if (setName) sets.add(setName);
                }
            });
            
            Array.from(sets).sort().forEach(setName => {
                const option = document.createElement('option');
                option.value = setName;
                option.textContent = setName;
                selectSet.appendChild(option);
            });

            // Preseleccionar set si viene en la URL
            const urlParams = new URLSearchParams(window.location.search);
            const setParam = urlParams.get('set');
            if (setParam && sets.has(setParam)) {
                selectSet.value = setParam;
            }

            selectSet.addEventListener('change', aplicarFiltros);
        }

        checkboxesIdioma.forEach(cb => cb.addEventListener('change', aplicarFiltros));
    }

    function aplicarFiltros() {
        const minInput = document.getElementById('min-price');
        const maxInput = document.getElementById('max-price');
        const minPrecio = minInput ? parseFloat(minInput.value) : 0;
        const maxPrecio = maxInput ? parseFloat(maxInput.value) : Infinity;
        
        const selectSet = document.getElementById('filtro-set');
        const setSeleccionado = selectSet ? selectSet.value : '';

        const checkboxesIdioma = document.querySelectorAll('input[name="idioma"]:checked');
        const idiomasSeleccionados = Array.from(checkboxesIdioma).map(cb => cb.value);

        // Mapeo de valores del checkbox (HTML) a valores de la BD
        const mapaIdiomas = { 'en': 'Inglés', 'es': 'Español', 'jp': 'Japonés' };

        const filtrados = allProducts.filter(item => {
            // Filtro Precio
            if (item.precio && (item.precio < minPrecio || item.precio > maxPrecio)) return false;

            // Filtro Set
            if (setSeleccionado) {
                const itemSet = item.set ? (typeof item.set === 'object' ? item.set.nombre : item.set) : '';
                if (itemSet !== setSeleccionado) return false;
            }

            // Filtro Idioma
            if (idiomasSeleccionados.length > 0) {
                if (!item.idioma) return false; // Si no tiene idioma (ej. accesorio) y se filtra, se oculta
                const idiomaItem = item.idioma;
                if (!idiomasSeleccionados.some(code => mapaIdiomas[code] === idiomaItem)) return false;
            }
            return true;
        });

        // Pequeño delay artificial para que la animación sea perceptible y profesional
        setTimeout(() => {
            renderizarGrid(filtrados);
            toggleGridLoading(false);
        }, 150);
    }

    function renderizarGrid(items) {
        grid.innerHTML = "";
        if (items.length === 0) {
            const msg = allProducts.length === 0 ? mensajeNoDisponible : 'No hay productos que coincidan con los filtros.';
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">${msg}</p>`;
            return;
        }
        grid.innerHTML = items.map(item => crearTarjeta(item)).join('');
    }
});

function crearTarjeta(item) {
    const esCarta = item.hasOwnProperty('cartaId');
    const precio = item.precio ? parseFloat(item.precio).toFixed(2) + ' €' : 'Consultar';
    const imagen = item.imagenUrl || 'https://placehold.co/200x280?text=No+Imagen';
    const id = esCarta ? item.cartaId : item.accesorioId;
    const link = esCarta ? `/carta/${id}` : `/accesorio/${id}`;

    return `
        <a href="${link}" class="producto-card-link">
            <div class="producto-card">
                <div class="producto-imagen">
                    <img src="${imagen}" alt="${item.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/200x280?text=No+Imagen'">
                </div>
                <h3 class="producto-nombre">${item.nombre}</h3>
                <p class="producto-precio">${precio}</p>
            </div>
        </a>
    `;
}