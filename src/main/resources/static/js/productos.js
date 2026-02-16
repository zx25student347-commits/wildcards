document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('productos-grid');
    
    if (!grid) return; // Evitar errores si no estamos en una página de productos
    
    const path = window.location.pathname;
    // Obtener el nombre del juego limpiando barras (ej: /pokemon -> pokemon)
    const endpoint = path.replace(/^\/|\/$/g, ''); 

    fetch(`/api/cartas/juego/${endpoint}`)
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron cargar las cartas');
            return response.json();
        })
        .then(cartas => {
            grid.innerHTML = ""; // Limpiamos el grid
            
            if (cartas.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No hay cartas disponibles para este juego.</p>';
                return;
            }

            cartas.forEach(carta => {
                grid.innerHTML += crearTarjeta(carta);
            });
        })
        .catch(err => {
            console.error("Error cargando cartas:", err);
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error al cargar el catálogo.</p>';
        });
});

function crearTarjeta(carta) {
    const precio = carta.precio ? parseFloat(carta.precio).toFixed(2) + ' €' : 'Consultar';
    const imagen = carta.imagenUrl || 'https://placehold.co/200x280?text=No+Imagen';

    return `
        <a href="/carta/${carta.cartaId}" class="producto-card-link">
            <div class="producto-card">
                <div class="producto-imagen">
                    <img src="${imagen}" alt="${carta.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/200x280?text=No+Imagen'">
                </div>
                <h3 class="producto-nombre">${carta.nombre}</h3>
                <p class="producto-precio">${precio}</p>
            </div>
        </a>
    `;
}