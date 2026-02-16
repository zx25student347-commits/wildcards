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
});

function renderizarDetalleCarta(carta) {
    document.title = carta.nombre; // Actualizar el título de la página

    document.getElementById('carta-imagen').src = carta.imagenUrl || 'https://placehold.co/400x560?text=No+Imagen';
    document.getElementById('carta-imagen').alt = carta.nombre;
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