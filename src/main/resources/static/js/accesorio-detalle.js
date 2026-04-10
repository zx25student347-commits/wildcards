document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID de la URL (asumiendo formato /accesorio/{id})
    const pathParts = window.location.pathname.split('/');
    const accesorioId = pathParts[pathParts.length - 1];

    if (!accesorioId) {
        console.error("No se encontró ID de accesorio en la URL");
        return;
    }

    try {
        const response = await fetch(`/api/accesorios/${accesorioId}`);
        if (!response.ok) throw new Error('Accesorio no encontrado');
        
        const accesorio = await response.json();
        renderizarDetalle(accesorio);

        // Lógica para el botón de Añadir al Carrito
        const btnAgregar = document.getElementById('btnAgregarCarrito');
        if (btnAgregar) {
            btnAgregar.addEventListener('click', async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Si no hay token (usuario no logueado), redirigir al login
                    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                    return;
                }

                try {
                    const response = await fetch('/api/carrito/items', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            accesorioId: parseInt(accesorioId),
                            cantidad: 1
                        })
                    });

                    if (response.ok) {
                        // Si wildcards.js tiene la función global, la llamamos
                        if (window.actualizarContadorGlobal) window.actualizarContadorGlobal();
                    } else if (response.status === 401 || response.status === 403) {
                        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                    }
                } catch (error) {
                    console.error('Error al añadir al carrito:', error);
                }
            });
        }

    } catch (error) {
        console.error(error);
        document.querySelector('.detail-center').innerHTML = '<h2>Error al cargar el accesorio</h2><p>Es posible que el producto no exista o haya un problema de conexión.</p>';
    }
});

function renderizarDetalle(accesorio) {
    // Título de la página
    document.title = `${accesorio.nombre} - WildCards`;

    // Breadcrumb
    setText('accesorio-breadcrumb-nombre', accesorio.nombre);

    // Imagen
    const img = document.getElementById('accesorio-imagen');
    if (img) {
        img.src = accesorio.imagenUrl || 'https://placehold.co/400x560?text=No+Imagen';
        img.alt = accesorio.nombre;
        // Fallback si la imagen falla al cargar
        img.onerror = function() { this.src = 'https://placehold.co/400x560?text=No+Imagen'; };
    }

    // Información Principal
    setText('accesorio-nombre', accesorio.nombre);
    setText('accesorio-descripcion', accesorio.descripcion || 'Sin descripción disponible.');
    
    // Precio y Stock
    const precio = accesorio.precio ? parseFloat(accesorio.precio).toFixed(2) + ' €' : 'Consultar';
    setText('accesorio-precio', precio);
    setText('accesorio-stock', (accesorio.stock && accesorio.stock > 0) ? `${accesorio.stock} unidades en stock` : 'Agotado');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}