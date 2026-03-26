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

    function actualizarRangoPrecio() {
        if (!allProducts || allProducts.length === 0) return;

        const maxPrecio = allProducts.reduce((max, item) => Math.max(max, parseFloat(item.precio) || 0), 0);
        const maxRedondeado = Math.ceil(maxPrecio);

        const sliderPrecio = document.querySelector('.slider-precio');
        if (sliderPrecio) {
            sliderPrecio.max = maxRedondeado;
            sliderPrecio.value = maxRedondeado; // Inicializar con el rango completo
        }

        const rangoValores = document.querySelector('.rango-valores');
        if (rangoValores) {
            const spans = rangoValores.querySelectorAll('span');
            if (spans.length > 1) spans[1].textContent = `${maxRedondeado}€`;
        }
    }

    function setupFilters() {
        const sliderPrecio = document.querySelector('.slider-precio');
        const checkboxesIdioma = document.querySelectorAll('input[name="idioma"]');
        const selectSet = document.getElementById('filtro-set');

        if (sliderPrecio) {
            sliderPrecio.addEventListener('input', aplicarFiltros);
        }

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
        const sliderPrecio = document.querySelector('.slider-precio');
        const maxPrecio = sliderPrecio ? parseFloat(sliderPrecio.value) : Infinity;
        
        const selectSet = document.getElementById('filtro-set');
        const setSeleccionado = selectSet ? selectSet.value : '';

        const checkboxesIdioma = document.querySelectorAll('input[name="idioma"]:checked');
        const idiomasSeleccionados = Array.from(checkboxesIdioma).map(cb => cb.value);

        // Mapeo de valores del checkbox (HTML) a valores de la BD
        const mapaIdiomas = { 'en': 'Inglés', 'es': 'Español', 'jp': 'Japonés' };

        const filtrados = allProducts.filter(item => {
            // Filtro Precio
            if (item.precio && item.precio > maxPrecio) return false;

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

        renderizarGrid(filtrados);
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