// Variables globales para Stripe
let stripe;
let cardElement;

// Función auxiliar para incluir el Token JWT en las peticiones (Igual que en dashboard.js)
function authFetch(url, options = {}) {
    options.headers = options.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }
    return fetch(url, options);
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();

    // --- LÓGICA DEL MODAL DE PAGO ---
    const modal = document.getElementById('modalPago');
    const btnPagar = document.getElementById('botonPagar');
    const formularioPago = document.getElementById('formularioPago');
    const spanCerrar = document.querySelector('.close-modal');
    const radiosPago = document.querySelectorAll('input[name="metodoPago"]');

    // Abrir modal
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            // Inicializa Stripe Elements solo si se abre el modal y se elige tarjeta
            inicializarStripe();
            const precioTotalTexto = document.getElementById('precioTotal').textContent;
            document.getElementById('totalModal').textContent = precioTotalTexto;
            modal.style.display = 'block';
        });
    }

    // Cerrar modal
    if (spanCerrar) {
        spanCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Cambiar formulario según método de pago
    radiosPago.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cambiarMetodoPago(e.target.value);
        });
    });

    // Manejar el envío del formulario de pago
    if (formularioPago) {
        formularioPago.addEventListener('submit', handlePagoSubmit);
    }

});

/**
 * Carga los datos del carrito desde la API y llama a la función para renderizarlos.
 */
async function cargarCarrito() {
    try {
        const response = await authFetch('/api/carrito');

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token'); // Limpiar token inválido
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

        const producto = item.carta || item.accesorio;
        const esCarta = !!item.carta;

        const cantidadInput = clone.querySelector('.cantidad-item');

        // Añade el listener para actualizar la cantidad
        cantidadInput.addEventListener('change', (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            actualizarCantidadItem(esCarta ? producto.cartaId : null, !esCarta ? producto.accesorioId : null, nuevaCantidad);
        });
        
        clone.querySelector('.titulo-item').textContent = producto.nombre;
        
        const metaParts = [];
        if (esCarta) {
            if (item.carta.set && item.carta.set.nombre) metaParts.push(item.carta.set.nombre);
            if (item.carta.rareza) metaParts.push(item.carta.rareza);
        } else {
            metaParts.push(item.accesorio.tipo || 'Accesorio');
        }
        clone.querySelector('.meta-item').textContent = metaParts.join(' - ') || 'Detalles no disponibles';

        cantidadInput.value = item.cantidad;
        const precioItemTotal = item.cantidad * item.precioUnidad;
        clone.querySelector('.precio-item').textContent = `${precioItemTotal.toFixed(2)} €`;

        // Funcionalidad Botón Eliminar
        const btnEliminar = clone.querySelector('.boton-eliminar');
        btnEliminar.setAttribute('data-id', item.carritoItemId);
        btnEliminar.addEventListener('click', () => eliminarItem(item.carritoItemId));

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
 * @param {number|null} cartaId El ID de la carta a actualizar.
 * @param {number|null} accesorioId El ID del accesorio a actualizar.
 * @param {number} cantidad La nueva cantidad.
 */
async function actualizarCantidadItem(cartaId, accesorioId, cantidad) {
    try {
        const response = await authFetch(`/api/carrito/items`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartaId, accesorioId, cantidad })
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

/**
 * Elimina un item del carrito.
 * @param {number} itemId El ID del item del carrito (carritoItemId).
 */
async function eliminarItem(itemId) {
    try {
        const response = await authFetch(`/api/carrito/items/${itemId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar el producto.');
        
        // Recargar el carrito para actualizar la vista
        cargarCarrito();
    } catch (error) {
        console.error("Error eliminando item:", error);
    }
}

function cambiarMetodoPago(metodo) {
    // Ocultar todos los detalles
    document.querySelectorAll('.detalles-pago').forEach(el => el.classList.remove('activo'));
    
    // Mostrar el seleccionado
    if (metodo === 'tarjeta') {
        document.getElementById('formTarjeta').classList.add('activo');
    } else if (metodo === 'paypal') {
        document.getElementById('infoPaypal').classList.add('activo');
    }
    // Puedes añadir lógica para Bizum aquí si decides poner un formulario específico
}

/**
 * Inicializa Stripe y monta el Card Element en el DOM.
 */
async function inicializarStripe() {
    // Usa tu clave publicable de Stripe
    // Clave obtenida de tu application.properties
    const publicKey = 'pk_test_51TA4pECCdDp5MHKnMNkptLX62A29ThhvbtpzUWkdcz2V8fdVBWt6D3Mcj0gXvPkJAUJzU6vrdQlsEwTQ5tdXNUSW00mGJK4KzK';
    stripe = Stripe(publicKey);

    const elements = stripe.elements();
    const style = {
        base: {
            color: "#fff",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    cardElement = elements.create('card', { style: style, hidePostalCode: true });
    cardElement.mount('#card-element');

    // Escuchar cambios en el CardElement y mostrar errores
    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

/**
 * Maneja el evento de submit del formulario de pago.
 * @param {Event} event
 */
async function handlePagoSubmit(event) {
    event.preventDefault();

    // Mostrar spinner y deshabilitar botón
    const botonConfirmar = document.getElementById('botonConfirmarPago');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    botonConfirmar.disabled = true;
    buttonText.style.display = 'none';
    spinner.style.display = 'inline';
    document.getElementById('card-errors').textContent = ''; // Limpiar errores previos

    // 1. Crear PaymentIntent en el backend
    const response = await authFetch('/api/payment/create-payment-intent', { method: 'POST' });
    
    // Si la respuesta no es OK (p.ej. 400 por falta de stock), manejamos el error.
    if (!response.ok) {
        const errorMessage = await response.text(); // El cuerpo del error será texto plano
        document.getElementById('card-errors').textContent = errorMessage;
        // Reactivar botón
        botonConfirmar.disabled = false;
        buttonText.style.display = 'inline';
        spinner.style.display = 'none';
        return;
    }

    const { clientSecret } = await response.json();

    // 2. Confirmar el pago en el frontend con el clientSecret
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret, {
            payment_method: { card: cardElement }
        }
    );

    if (stripeError) {
        document.getElementById('card-errors').textContent = stripeError.message;
        botonConfirmar.disabled = false;
        buttonText.style.display = 'inline';
        spinner.style.display = 'none';
    } else {
        // 3. Pago exitoso
        console.log('Pago completado:', paymentIntent);
        
        // Llamar al backend para crear el pedido y limpiar el carrito
        try {
            const responsePedido = await authFetch('/api/pedido', { method: 'POST' });
            if (responsePedido.ok) {
                window.location.href = '/pedidos?status=success';
            } else {
                alert('Pago realizado, pero hubo un error al crear el pedido. Contacta con soporte.');
                window.location.href = '/pedidos?status=error';
            }
        } catch (error) {
            console.error('Error creando el pedido:', error);
            window.location.href = '/pedidos?status=error';
        }
    }
}