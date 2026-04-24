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

        // Configurar botones +/-
        const btnMinus = document.querySelector('.qty-btn.minus');
        const btnPlus = document.querySelector('.qty-btn.plus');
        const input = document.getElementById('cantidad');
        if(btnMinus && btnPlus && input) {
            btnMinus.onclick = () => {
                const val = parseInt(input.value) || 1;
                if (val > 1) input.value = val - 1;
            };
            btnPlus.onclick = () => {
                const val = parseInt(input.value) || 1;
                const max = parseInt(input.max) || 0;
                if (val < max) input.value = val + 1;
            };
        }

        // Lógica para el botón de Añadir al Carrito
        const btnAgregar = document.getElementById('btnAgregarCarrito');
        if (btnAgregar) {
            btnAgregar.addEventListener('click', async () => {
                if (btnAgregar.disabled) {
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    // Si no hay token (usuario no logueado), redirigir al login
                    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                    return;
                }

                const cantidadInput = document.getElementById('cantidad');
                const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

                const stockActual = parseInt(document.getElementById('accesorio-stock-num').textContent) || 0;
                if (cantidad > stockActual) {
                    return;
                }

                try {
                    const response = await fetch('/api/carrito/items', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            accesorioId: parseInt(accesorioId),
                            cantidad: cantidad
                        })
                    });

                    if (response.ok) {
                        // Actualizar el stock visualmente
                        const stockNumEl = document.getElementById('accesorio-stock-num');
                        if (stockNumEl) {
                            const stockActual = parseInt(stockNumEl.textContent) || 0;
                            const nuevoStock = Math.max(0, stockActual - cantidad);
                            stockNumEl.textContent = nuevoStock;
                            if (cantidadInput) cantidadInput.max = nuevoStock;
                            if (nuevoStock <= 0) {
                                btnAgregar.disabled = true;
                                btnAgregar.textContent = 'Agotado';
                            }
                        }

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
    const stock = accesorio.stock || 0;
    setText('accesorio-stock-num', stock);

    const cantidadInput = document.getElementById('cantidad');
    if (cantidadInput) cantidadInput.max = stock;

    const btnAgregar = document.getElementById('btnAgregarCarrito');
    if (btnAgregar && stock <= 0) {
        btnAgregar.disabled = true;
        btnAgregar.textContent = 'Agotado';
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}