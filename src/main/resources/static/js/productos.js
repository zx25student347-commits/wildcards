document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('productos-grid');
    
    
    const path = window.location.pathname;
    const endpoint = path.substring(1); // Quita la barra inicial

    fetch(`/api/cartas/${endpoint}`)
        .then(response => response.json())
        .then(cartas => {
            grid.innerHTML = ""; // Limpiamos el grid
            cartas.forEach(carta => {
                grid.innerHTML += crearTarjeta(carta);
            });
        })
        .catch(err => console.error("Error cargando cartas:", err));
});

function crearTarjeta(carta) {
    

    return `
        <div class="producto-card">
            <div class="producto-imagen">
                <img src="${carta.imagenUrl}" alt="${carta.nombre}">
            </div>
            <h3 class="producto-nombre">${carta.nombre}</h3>
            <p class="producto-precio">${carta.precio}</p>
        </div>
    `;
}