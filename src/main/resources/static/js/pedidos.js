document.addEventListener('DOMContentLoaded', () => {
    // Función para añadir el token a las peticiones (si usas autenticación por token)
    function authFetch(url, options = {}) {
        options.headers = options.headers || {};
        const token = localStorage.getItem('token');
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }
        return fetch(url, options);
    }

    // Función para formatear la fecha a un formato legible
    function formatFecha(fechaString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaString).toLocaleDateString('es-ES', options);
    }

    // Función para crear la tarjeta HTML de un pedido
    function crearTarjetaPedido(pedido) {
        const itemsHtml = pedido.itemsPedido.map(item => {
            const producto = item.carta || item.accesorio;
            const nombre = producto ? producto.nombre : 'Producto no disponible';
            const imagenUrl = producto ? (producto.imagenUrl || 'https://placehold.co/60x84?text=N/A') : 'https://placehold.co/60x84?text=N/A';

            return `
                <li class="pedido-item">
                    <img src="${imagenUrl}" alt="${nombre}" class="pedido-item-img">
                    <div class="pedido-item-details">
                        <h5 class="pedido-item-nombre">${nombre}</h5>
                        <p class="pedido-item-info">Cantidad: ${item.cantidadCompra} | Precio: ${item.precioCompra.toFixed(2)}€</p>
                    </div>
                </li>
            `;
        }).join('');

        return `
            <div class="pedido-card">
                <div class="pedido-header">
                    <div class="pedido-info">
                        <span>Pedido</span>
                        <strong>#${pedido.id}</strong>
                    </div>
                    <div class="pedido-info">
                        <span>Fecha</span>
                        <strong>${formatFecha(pedido.fechaPedido)}</strong>
                    </div>
                    <div class="pedido-info">
                        <span>Total</span>
                        <strong>${pedido.total.toFixed(2)}€</strong>
                    </div>
                    <span class="pedido-estado estado-${pedido.estado}">${pedido.estado.replace('_', ' ')}</span>
                </div>
                <div class="pedido-body">
                    <h4>Artículos del pedido</h4>
                    <ul class="pedido-items-lista">
                        ${itemsHtml}
                    </ul>
                </div>
            </div>
        `;
    }

    // Función principal para cargar y mostrar los pedidos
    async function cargarPedidos() {
        try {
            const response = await authFetch('/api/pedido');

            if (response.status === 401 || response.status === 403) {
                document.querySelector('.contenedor-pedidos').innerHTML = '<h1>Acceso denegado</h1><p>Debes <a href="/login">iniciar sesión</a> para ver tus pedidos.</p>';
                return;
            }

            if (!response.ok) throw new Error('Error al cargar los pedidos.');

            const pedidos = await response.json();
            const contenedorPedidos = document.getElementById('lista-pedidos');

            if (pedidos.length === 0) {
                contenedorPedidos.innerHTML = '<p>Aún no has realizado ningún pedido.</p>';
                return;
            }

            contenedorPedidos.innerHTML = '';

            // Ordenar por fecha descendente (más nuevo primero) y renderizar
            pedidos.sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido));
            
            pedidos.forEach(pedido => {
                contenedorPedidos.insertAdjacentHTML('beforeend', crearTarjetaPedido(pedido));
            });

        } catch (error) {
            console.error(error);
            document.querySelector('.contenedor-pedidos').innerHTML = '<h1>Error</h1><p>No se pudieron cargar tus pedidos. Inténtalo de nuevo más tarde.</p>';
        }
    }

    cargarPedidos();
});
