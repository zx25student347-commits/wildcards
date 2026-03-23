document.addEventListener('DOMContentLoaded', () => {
    const pathParts = window.location.pathname.split('/');
    const cartaId = pathParts[pathParts.length - 1];

    if (!cartaId || isNaN(cartaId)) {
        document.querySelector('.container').innerHTML = '<p>ID de carta no válido.</p>';
        return;
    }

    fetch(`/api/cartas/${cartaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo encontrar la carta.');
            }
            return response.json();
        })
        .then(carta => {
            renderizarDetalleCarta(carta);
        })
        .catch(error => {
            console.error('Error al cargar la carta:', error);
            document.querySelector('.container').innerHTML = `<p>${error.message}</p>`;
        });

    // Lógica para el botón de Añadir al Carrito
    const btnAgregar = document.getElementById('btnAgregarCarrito');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                // Si no hay token, redirigir al login guardando la página actual
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                return;
            }

            const cantidadInput = document.getElementById('cantidad');
            const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

            try {
                const response = await fetch('/api/carrito/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        cartaId: parseInt(cartaId),
                        cantidad: cantidad
                    })
                });

                if (response.ok) {
                    console.log('Producto añadido al carrito correctamente.');
                } else if (response.status === 401 || response.status === 403) {
                    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                } else {
                    console.log('Error al añadir el producto al carrito.');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Hubo un problema de conexión.');
            }
        });
    }
});

function renderizarDetalleCarta(carta) {
    document.title = carta.nombre; // Actualizar el título de la página

    const imgElement = document.getElementById('carta-imagen');
    if (imgElement) {
        imgElement.src = carta.imagenUrl || 'https://placehold.co/400x560?text=No+Imagen';
        imgElement.alt = carta.nombre;

        // Aseguramos que el contenedor tenga la clase necesaria para el efecto Glassmorphism
        if (imgElement.parentElement) {
            imgElement.parentElement.classList.add('single-img');
            iniciarEfectoExpositor(imgElement.parentElement);
        }
    }
    
    document.getElementById('carta-nombre').textContent = carta.nombre;
    document.getElementById('carta-juego').textContent = carta.juego ? carta.juego.nombre : 'N/A';
    document.getElementById('carta-set').textContent = carta.set ? carta.set.nombre : 'N/A';
    document.getElementById('carta-precio').textContent = carta.precio ? `${parseFloat(carta.precio).toFixed(2)} €` : 'Consultar';
    document.getElementById('carta-descripcion').textContent = carta.descripcion || 'No hay descripción disponible.';

    const detallesEspecificos = document.getElementById('detalles-especificos');
    detallesEspecificos.innerHTML = '<h3>Detalles del Juego</h3>';
    const listaDetalles = document.createElement('ul');

    // Usamos el @type para identificar el tipo de carta
    switch (carta['@type']) {
        case 'MagicCarta':
            listaDetalles.innerHTML = `
                <li><strong>Coste de Maná:</strong> ${carta.manaCost || 'N/A'}</li>
                <li><strong>Tipo:</strong> ${carta.cardType || 'N/A'}</li>
                <li><strong>Fuerza/Resistencia:</strong> ${carta.power || 'N/A'} / ${carta.toughness || 'N/A'}</li>
                <li><strong>Colores:</strong> ${carta.colors || 'N/A'}</li>
                <li><strong>Habilidades:</strong> ${carta.abilities || 'N/A'}</li>
            `;
            break;
        case 'PokemonCarta':
            listaDetalles.innerHTML = `
                <li><strong>HP:</strong> ${carta.hp || 'N/A'}</li>
                <li><strong>Tipo:</strong> ${carta.pokemonTipo || 'N/A'}</li>
                <li><strong>Fase:</strong> ${carta.fase || 'N/A'}</li>
                <li><strong>Evoluciona de:</strong> ${carta.evolucionaDe || 'N/A'}</li>
                <li><strong>Debilidad:</strong> ${carta.debilidad || 'N/A'}</li>
                <li><strong>Resistencia:</strong> ${carta.resistencia || 'N/A'}</li>
                <li><strong>Coste de Retirada:</strong> ${carta.costeRetirada || 'N/A'}</li>
            `;
            break;
        case 'YugiohCarta':
             listaDetalles.innerHTML = `
                <li><strong>Nivel/Rango:</strong> ${carta.nivel || 'N/A'}</li>
                <li><strong>Atributo:</strong> ${carta.atributo || 'N/A'}</li>
                <li><strong>Tipo:</strong> ${carta.tipoDetalle || 'N/A'}</li>
                <li><strong>ATK/DEF:</strong> ${carta.ataque || 'N/A'} / ${carta.defensa || 'N/A'}</li>
            `;
            break;
        case 'OnePieceCarta':
            listaDetalles.innerHTML = `
                <li><strong>Coste:</strong> ${carta.coste || 'N/A'}</li>
                <li><strong>Poder:</strong> ${carta.power || 'N/A'}</li>
                <li><strong>Color:</strong> ${carta.color || 'N/A'}</li>
                <li><strong>Counter:</strong> ${carta.counter || 'N/A'}</li>
            `;
            break;
        default:
            detallesEspecificos.style.display = 'none';
            break;
    }
    
    if (listaDetalles.children.length > 0) {
        detallesEspecificos.appendChild(listaDetalles);
    }

    
}

/**
 * Habilita el efecto de expositor 3D interactivo (arrastrar para rotar)
 */
function iniciarEfectoExpositor(elemento) {
    let isDragging = false;
    let centerX, centerY;

    // Evitar arrastre nativo de la imagen (ghost image)
    const img = elemento.querySelector('img');
    if (img) {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // Doble clic para abrir Lightbox
    elemento.addEventListener('dblclick', () => {
        if (img) {
            mostrarLightbox(img.src);
        }
    });

    elemento.addEventListener('mousedown', (e) => {
        isDragging = true;
        elemento.classList.add('is-dragging');
        
        // Capturar centro actual para cálculos relativos
        const rect = elemento.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            elemento.classList.remove('is-dragging');
            
            // Restaurar posición original suavemente (el CSS transition se reactiva al quitar is-dragging)
            elemento.style.transform = '';
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Sensibilidad y límites
        const rotateY = deltaX / 10; // Mover ratón derecha -> girar eje Y positivo
        const rotateX = -deltaY / 10; // Mover ratón abajo -> girar eje X negativo

        elemento.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
    });
}

/**
 * Crea y muestra un lightbox a pantalla completa con la imagen proporcionada
 */
function mostrarLightbox(imagenUrl) {
    let overlay = document.getElementById('lightbox-overlay');
    
    // Si no existe el elemento en el DOM, lo creamos
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <img src="" alt="Vista ampliada">
        `;
        document.body.appendChild(overlay);

        // Eventos para cerrar
        const cerrar = () => overlay.classList.remove('activo');
        
        overlay.querySelector('.lightbox-close').addEventListener('click', cerrar);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cerrar();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cerrar();
        });
    }

    // Actualizamos la imagen y mostramos
    const img = overlay.querySelector('img');
    img.src = imagenUrl;
    
    // Pequeño delay para permitir que la transición CSS funcione
    requestAnimationFrame(() => {
        overlay.classList.add('activo');
    });
}