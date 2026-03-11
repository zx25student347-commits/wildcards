document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
});

/**
 * Carga los datos del carrito desde la API y llama a la función para renderizarlos.
 */
async function cargarCarrito() {
    try {
        const response = await fetch('/api/carrito');

        if (response.status === 401 || response.status === 403) {
            window.location.href = `/login?redirect=${window.location.pathname}`;
            return;
        }

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const carrito = await response.json();
        renderizarCarrito(carrito);

    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        const listaCarrito = document.getElementById('listaCarrito');
        if (listaCarrito) {
            listaCarrito.innerHTML = '<p>No se pudo cargar tu carrito. Por favor, intenta recargar la página.</p>';
        }
        renderizarResumen(0, 0);
        actualizarContadorNavbar(0);
    }
}

/**
 * Renderiza la lista de items y el resumen del carrito en el DOM.
 * @param {object} carrito - El objeto del carrito con sus items.
 */
function renderizarCarrito(carrito) {
    const listaCarrito = document.getElementById('listaCarrito');
    const plantilla = document.getElementById('plantillaProducto');
    const botonPagar = document.getElementById('botonPagar');

    if (!listaCarrito || !plantilla) {
        console.error('No se encontraron los elementos necesarios en el DOM.');
        return;
    }

    listaCarrito.innerHTML = ''; // Limpiar antes de renderizar

    if (!carrito || !carrito.items || carrito.items.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        renderizarResumen(0, 0);
        actualizarContadorNavbar(0);
        if (botonPagar) botonPagar.disabled = true;
        return;
    }

    let cantidadTotalArticulos = 0;
    let precioTotal = 0;

    carrito.items.forEach((item, index) => {
        const clone = plantilla.content.cloneNode(true);
        
        // Añade un retardo a la animación de entrada para un efecto escalonado
        const tarjeta = clone.querySelector('.tarjeta-carrito');
        tarjeta.style.animationDelay = `${index * 100}ms`;

        const cantidadInput = clone.querySelector('.cantidad-item');

        // Añade el listener para actualizar la cantidad
        cantidadInput.addEventListener('change', (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            if (nuevaCantidad > 0) {
                actualizarCantidadItem(item.carta.id, nuevaCantidad);
            }
        });
        
        clone.querySelector('.titulo-item').textContent = item.carta.nombre;
        
        const metaParts = [];
        if (item.carta.set && item.carta.set.nombre) metaParts.push(item.carta.set.nombre);
        if (item.carta.rareza) metaParts.push(item.carta.rareza);
        clone.querySelector('.meta-item').textContent = metaParts.join(' - ') || 'Detalles no disponibles';

        cantidadInput.value = item.cantidad;
        const precioItemTotal = item.cantidad * item.precioUnidad;
        clone.querySelector('.precio-item').textContent = `${precioItemTotal.toFixed(2)} €`;

        listaCarrito.appendChild(clone);

        cantidadTotalArticulos += item.cantidad;
        precioTotal += precioItemTotal;
    });

    renderizarResumen(cantidadTotalArticulos, precioTotal);
    actualizarContadorNavbar(cantidadTotalArticulos);
    if (botonPagar) botonPagar.disabled = false;
}

function renderizarResumen(cantidad, precio) {
    const cantidadEl = document.getElementById('cantidadTotal');
    const precioEl = document.getElementById('precioTotal');

    // Añade la clase para disparar la animación
    cantidadEl.classList.add('resumen-actualizado');
    precioEl.classList.add('resumen-actualizado');

    // Actualiza el contenido
    cantidadEl.textContent = cantidad;
    precioEl.textContent = `${precio.toFixed(2)} €`;

    // Elimina la clase cuando la animación termina para poder volver a usarla
    cantidadEl.addEventListener('animationend', () => {
        cantidadEl.classList.remove('resumen-actualizado');
    }, { once: true });

    precioEl.addEventListener('animationend', () => {
        precioEl.classList.remove('resumen-actualizado');
    }, { once: true });
}

function actualizarContadorNavbar(cantidad) {
    const contador = document.getElementById('contadorCarrito');
    if (!contador) return;

    if (cantidad > 0) {
        contador.textContent = cantidad;
        contador.style.display = 'inline-block';
    } else {
        contador.style.display = 'none';
    }
}

/**
 * Llama a la API para actualizar la cantidad de un item y vuelve a renderizar el carrito.
 * @param {number} cartaId El ID de la carta a actualizar.
 * @param {number} cantidad La nueva cantidad.
 */
async function actualizarCantidadItem(cartaId, cantidad) {
    try {
        const response = await fetch(`/api/carrito/item`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartaId: cartaId, cantidad: cantidad })
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar la cantidad del producto.');
        }

        // La API devuelve el carrito actualizado, lo renderizamos de nuevo.
        const carritoActualizado = await response.json();
        renderizarCarrito(carritoActualizado);

    } catch (error) {
        console.error("Error al actualizar el item:", error);
        // En caso de error, recargamos el carrito desde el servidor para asegurar consistencia.
        cargarCarrito();
    }
}