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
        })
        .catch(error => {
            console.error('Error al cargar la carta:', error);
            document.querySelector('.container').innerHTML = `<p>${error.message}</p>`;
        });

    // Lógica para el botón de Añadir al Carrito
    const btnAgregar = document.getElementById('btnAgregarCarrito');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', async () => {
            if (btnAgregar.disabled) {
                return;
            }

            const token = localStorage.getItem('token');
            
            if (!token) {
                // Si no hay token, redirigir al login guardando la página actual
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                return;
            }

            const cantidadInput = document.getElementById('cantidad');
            const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

            const stockActual = parseInt(document.getElementById('carta-stock-num').textContent) || 0;
            if (cantidad > stockActual) {
                // La notificación la maneja el listener global en wildcards.js
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
                        cartaId: parseInt(cartaId),
                        cantidad: cantidad
                    })
                });

                if (response.ok) {
                    console.log('Producto añadido al carrito correctamente.');
                    
                    // Actualizar el stock visualmente sin recargar la página
                    const stockNumEl = document.getElementById('carta-stock-num');
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
    const stock = carta.stock || 0;
    document.getElementById('carta-stock-num').textContent = stock;
    
    const cantidadInput = document.getElementById('cantidad');
    if (cantidadInput) cantidadInput.max = stock;

    const btnAgregar = document.getElementById('btnAgregarCarrito');
    if (btnAgregar && stock <= 0) {
        btnAgregar.disabled = true;
        btnAgregar.textContent = 'Agotado';
    }

    document.getElementById('carta-descripcion').textContent = carta.descripcion || 'No hay descripción disponible.';

    const detallesEspecificos = document.getElementById('detalles-especificos');
    detallesEspecificos.innerHTML = '<h3>Detalles del Juego</h3>';

    // Usamos el @type para identificar el tipo de carta
    switch (carta['@type']) {
        case 'MagicCarta':
            detallesEspecificos.innerHTML += `
                <div class="pokemon-stats-grid">
                    <div class="stat-pill">
                        <span class="pill-label">COSTE DE MANÁ</span>
                        <div class="pill-content">
                            <span class="pill-icon mana"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg></span>
                            <span class="pill-text">${carta.manaCost || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">TIPO</span>
                        <div class="pill-content">
                            <span class="pill-icon layers"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg></span>
                            <span class="pill-text">${carta.cardType || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">FUERZA / RESISTENCIA</span>
                        <div class="pill-content">
                            <span class="pill-icon sword"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3l-2-2-9 9-2.5-2.5L3 12l2.5 2.5L2 18l3 3 3.5-3.5L11 20l4.5-4.5-2.5-2.5 9-9z"/></svg></span>
                            <span class="pill-text">${carta.power || '0'} / ${carta.toughness || '0'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">COLORES</span>
                        <div class="pill-content">
                            <span class="pill-icon rhombus"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg></span>
                            <span class="pill-text">${carta.colors || 'N/A'}</span>
                        </div>
                    </div>
                </div>
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
                    'lucha': { cls: 'type-fighting', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12 10,10 0 0,0 12,22 10,10 0 0,0 22,12 10,10 0 0,0 12,2 M17,13.5c0,1.9-1.6,3.5-3.5,3.5h-3c-1.9,0-3.5-1.6-3.5-3.5V11c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V12h1V9.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V12h1V11c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V13.5z"/></svg>' },
                    'oscuridad': { cls: 'type-darkness', svg: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12,2A10,10 0 1,0 12,22A10,10 0 1,0 12,2Z M4.5,10 A7.5,7.5 0 1,0 19.5,10 A12,12 0 0,1 4.5,10 Z"/></svg>' },
                    'metal': { cls: 'type-metal', svg: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12,2A10,10 0 1,0 12,22A10,10 0 1,0 12,2Z M12,6 L7,8.5 V12 C7,15.5 12,18.5 12,18.5 S17,15.5 17,12 V8.5 L12,6 Z M11,9 H13 V12 H15 V13 H13 V16 H11 V13 H9 V12 H11 V9 Z"/></svg>' },
                    'incoloro': { cls: 'type-colorless', svg: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12,2A10,10 0 1,0 12,22A10,10 0 1,0 12,2Z M12,17.27L18.18,21L16.45,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.55,13.97L5.82,21L12,17.27Z"/></svg>' },
                    'dragón': { cls: 'type-dragon', svg: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12,2A10,10 0 1,0 12,22A10,10 0 1,0 12,2Z M12,19 L7,10 L5,5 L12,9 L19,5 L17,10 Z"/></svg>' },
                    'hada': { cls: 'type-fairy', svg: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12,2A10,10 0 1,0 12,22A10,10 0 1,0 12,2Z M12,13 C12,13 15,16 18,13 C20,11 19,8 16,8.5 C14.5,9 12,11 12,11 C12,11 9.5,9 8,8.5 C5,8 4,11 6,13 C9,16 12,13 12,13 Z"/></svg>' }
                };
                const item = map[t] || { cls: 'type-default', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' };
                return `<span class="pill-icon ${item.cls}">${item.svg}</span>`;
            };

            detallesEspecificos.innerHTML += `
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
             detallesEspecificos.innerHTML += `
                <div class="pokemon-stats-grid">
                    <div class="stat-pill">
                        <span class="pill-label">NIVEL / RANGO</span>
                        <div class="pill-content">
                            <span class="pill-icon star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                            <span class="pill-text">${carta.nivel || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">ATRIBUTO</span>
                        <div class="pill-content">
                            <span class="pill-icon rhombus"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg></span>
                            <span class="pill-text">${carta.atributo || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">TIPO</span>
                        <div class="pill-content">
                            <span class="pill-icon layers"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg></span>
                            <span class="pill-text">${carta.tipoDetalle || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">ATK / DEF</span>
                        <div class="pill-content">
                            <span class="pill-icon sword"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3l-2-2-9 9-2.5-2.5L3 12l2.5 2.5L2 18l3 3 3.5-3.5L11 20l4.5-4.5-2.5-2.5 9-9z"/></svg></span>
                            <span class="pill-text">${carta.ataque || '0'} / ${carta.defensa || '0'}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'OnePieceCarta':
            detallesEspecificos.innerHTML += `
                <div class="pokemon-stats-grid">
                    <div class="stat-pill">
                        <span class="pill-label">COSTE</span>
                        <div class="pill-content">
                            <span class="pill-icon coin"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.39 2.1-1.39 1.47 0 1.96.72 2.03 1.46h1.52c-.06-1.33-1.01-2.45-2.61-2.78V5.5h-1.93v1.26c-1.47.31-2.67 1.28-2.67 2.72 0 1.91 1.6 2.88 3.99 3.45 2.18.51 2.68 1.18 2.68 2.13 0 1.13-.93 1.64-2.26 1.64-1.87 0-2.48-.96-2.58-1.79H8.2c.08 1.52 1.25 2.62 2.7 3.01v1.29h1.93v-1.28c1.55-.26 2.76-1.16 2.76-2.68 0-2.31-1.85-3-4.28-3.62z"/></svg></span>
                            <span class="pill-text">${carta.coste || '0'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">PODER</span>
                        <div class="pill-content">
                            <span class="pill-icon type-fighting"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12 10,10 0 0,0 12,22 10,10 0 0,0 22,12 10,10 0 0,0 12,2 M17,13.5c0,1.9-1.6,3.5-3.5,3.5h-3c-1.9,0-3.5-1.6-3.5-3.5V11c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V12h1V9.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V12h1V11c0-.8.7-1.5 1.5-1.5s1.5.7 1.5,1.5V13.5z"/></svg></span>
                            <span class="pill-text">${carta.power || '0'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">COLOR</span>
                        <div class="pill-content">
                            <span class="pill-icon rhombus"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg></span>
                            <span class="pill-text">${carta.color || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="stat-pill">
                        <span class="pill-label">COUNTER</span>
                        <div class="pill-content">
                            <span class="pill-icon shield"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></span>
                            <span class="pill-text">${carta.counter || '0'}</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            detallesEspecificos.style.display = 'none';
            break;
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