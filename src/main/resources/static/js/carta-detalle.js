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

    // Configurar enlace del Juego
    const juegoElement = document.getElementById('carta-juego');
    const nombreJuego = carta.juego ? carta.juego.nombre : 'N/A';
    juegoElement.textContent = nombreJuego;
    
    let urlJuego = '/';
    if (nombreJuego === 'Pokémon TCG') urlJuego = '/pokemon';
    else if (nombreJuego === 'Magic: The Gathering') urlJuego = '/magic';
    else if (nombreJuego === 'Yu-Gi-Oh!') urlJuego = '/yugioh';
    else if (nombreJuego === 'One Piece Card Game') urlJuego = '/onepiece';
    juegoElement.href = urlJuego;

    const setElement = document.getElementById('carta-set');
    const nombreSet = carta.set ? carta.set.nombre : 'N/A';
    setElement.textContent = nombreSet;
    setElement.href = carta.set ? `${urlJuego}?set=${encodeURIComponent(nombreSet)}` : '#';

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
            // Mover información de evolución a la descripción
            if (carta.evolucionaDe && carta.evolucionaDe !== 'Ninguna') {
                const descEl = document.getElementById('carta-descripcion');
                if (!descEl.textContent.includes(`(Evoluciona de: ${carta.evolucionaDe})`)) {
                    descEl.textContent += ` (Evoluciona de: ${carta.evolucionaDe})`;
                }
            }

            // Función auxiliar para obtener iconos de tipo dinámicos
            const getIconoTipo = (tipo) => {
                if (!tipo || tipo === 'Ninguna' || tipo === 'N/A') return '';
                const t = tipo.toLowerCase();
                const map = {
                    'fuego': { cls: 'type-fire', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s-1 1-1 3c0 2 2 3 2 5s-1 2-2 2-2-1-2-2 1-3 1-3-3 2-3 5c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.5-3-7-3-7s-1 1-1 3c0 2 2 3 2 5s-1 2-2 2-2-1-2-2 1-3 1-3z"/></svg>' },
                    'agua': { cls: 'type-water', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z"/></svg>' },
                    'planta': { cls: 'type-grass', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 7,16 7,16s6-1 8-10M2,1C2,1 2.06,15.44 14,20c0,0-5.26-1.16-12-19z"/></svg>' },
                    'rayo': { cls: 'type-lightning', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>' },
                    'psíquico': { cls: 'type-psychic', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>' },
                    'lucha': { cls: 'type-fighting', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16,14H15V13H14V14H11V10H15V9H16V10H17V13H16V14M10,10H11V14H10V10Z"/></svg>' },
                    'oscuridad': { cls: 'type-darkness', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 1,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/></svg>' },
                    'metal': { cls: 'type-metal', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>' },
                    'incoloro': { cls: 'type-colorless', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.45,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.55,13.97L5.82,21L12,17.27Z"/></svg>' },
                    'dragón': { cls: 'type-dragon', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>' }
                };
                const item = map[t] || { cls: 'type-default', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' };
                return `<span class="pill-icon ${item.cls}">${item.svg}</span>`;
            };

            detallesEspecificos.innerHTML = `
                <div class="pokemon-stats-grid">
                    <div class="stat-pill">
                        <span class="pill-label">PUNTOS DE SALUD</span>
                        <div class="pill-content">
                            <span class="pill-icon heart"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
                            <span class="pill-text">${carta.hp || 'N/A'} HP</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">TIPO DE ENERGIA</span>
                        <div class="pill-content">
                            ${getIconoTipo(carta.pokemonTipo)}
                            <span class="pill-text">${carta.pokemonTipo || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">FASE DE EVOLUCIÓN</span>
                        <div class="pill-content">
                            <span class="pill-icon layers"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg></span>
                            <span class="pill-text">${carta.fase || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">DEBILIDAD</span>
                        <div class="pill-content">
                            ${getIconoTipo(carta.debilidad)}
                            <span class="pill-text">${carta.debilidad || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">RESISTENCIA</span>
                        <div class="pill-content">
                            ${getIconoTipo(carta.resistencia)}
                            <span class="pill-text">${carta.resistencia || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">COSTE DE RETIRADA</span>
                        <div class="pill-content">
                            <span class="pill-icon rhombus"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg></span>
                            <span class="pill-text">${carta.costeRetirada || '0'} Energías</span>
                        </div>
                    </div>
                </div>
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