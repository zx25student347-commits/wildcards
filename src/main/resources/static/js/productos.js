document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('productos-grid');
    
    if (!grid) return; // Evitar errores si no estamos en una página de productos
    
    const path = window.location.pathname;
    const endpoint = path.replace(/^\/|\/$/g, '');

    let apiUrl;
    let productoTipo;
    let mensajeErrorCarga;
    let mensajeNoDisponible;

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
            grid.innerHTML = ""; // Limpiamos el grid
            
            if (items.length === 0) {
                grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">${mensajeNoDisponible}</p>`;
                return;
            }

            items.forEach(item => {
                grid.innerHTML += crearTarjeta(item);
            });
        })
        .catch(err => {
            console.error(`Error cargando ${productoTipo}:`, err);
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error al cargar el catálogo.</p>';
        });
});

function crearTarjeta(item) {
    const esCarta = item.hasOwnProperty('cartaId');
    const precio = item.precio ? parseFloat(item.precio).toFixed(2) + ' €' : 'Consultar';
    const imagen = item.imagenUrl || 'https://placehold.co/200x280?text=No+Imagen';
    const id = esCarta ? item.cartaId : item.id;
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