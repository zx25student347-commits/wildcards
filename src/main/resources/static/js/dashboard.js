
        const API_URL = '/api/cartas';
        const modal = document.getElementById('modalNuevaCarta');
        const btnNuevaCarta = document.getElementById('btnNuevaCarta');
        const btnCerrarModal = document.getElementById('btnCerrarModal');
        const btnCancelar = document.getElementById('btnCancelar');
        const formularioCarta = document.getElementById('formularioCarta');
        const tituloModal = document.getElementById('tituloModal');
        const btnSubmit = document.getElementById('btnSubmit');
        const selectJuego = document.getElementById('juego');

        // Filtros
        const buscarNombre = document.getElementById('buscarNombre');
        const filtroRareza = document.getElementById('filtroRareza');
        const filtroSet = document.getElementById('filtroSet');

        // Modal de confirmación
        const modalConfirmacion = document.getElementById('modalConfirmacion');
        const btnNo = document.getElementById('btnNo');
        const btnSi = document.getElementById('btnSi');
        const cardNameToDelete = document.getElementById('cardNameToDelete');
        let cartaActualAEliminar = null;

        // Estado de edición
        let modoEdicion = false;
        let idCartaEnEdicion = null;

        // Mapeo para el backend (Asumiendo IDs de juegos y nombres de clases para Jackson)
        const juegoMap = {
            'Magic: The Gathering': { id: 1, classType: 'MagicCarta', badgeClass: 'magic' },
            'Pokémon TCG': { id: 2, classType: 'PokemonCarta', badgeClass: 'pokemon' },
            'Yu-Gi-Oh!': { id: 3, classType: 'YugiohCarta', badgeClass: 'yugioh' }, // Ajustar clase CSS si existe
            'One Piece Card Game': { id: 4, classType: 'OnePieceCarta', badgeClass: 'onepiece' } // Ajustar clase CSS si existe
        };

        // Mapeo de juegos a sus campos específicos
        const camposEspecificos = {
            'Magic: The Gathering': {
                contenedor: 'camposMagic',
                campos: ['manaCost', 'cardType', 'power', 'toughness', 'abilities', 'colors']
            },
            'Pokémon TCG': {
                contenedor: 'camposPokemon',
                campos: ['hp', 'pokemonTipo', 'fase', 'evolucionaDe', 'ataques', 'debilidad', 'resistencia', 'costeRetirada']
            },
            'Yu-Gi-Oh!': {
                contenedor: 'camposYugioh',
                campos: ['nivel', 'atributo', 'tipoDetalle', 'ataque', 'defensa', 'textoEfecto']
            },
            'One Piece Card Game': {
                contenedor: 'camposOnePiece',
                campos: ['coste', 'powerOP', 'colorOP', 'counter', 'effect']
            }
        };

        // Mostrar/ocultar campos según el juego seleccionado
        selectJuego.addEventListener('change', (e) => {
            const juegoSeleccionado = e.target.value;

            // Ocultar todos los campos específicos
            Object.values(camposEspecificos).forEach(juego => {
                const contenedor = document.getElementById(juego.contenedor);
                if (contenedor) contenedor.style.display = 'none';
            });

            // Mostrar los campos del juego seleccionado
            if (juegoSeleccionado && camposEspecificos[juegoSeleccionado]) {
                const contenedor = document.getElementById(camposEspecificos[juegoSeleccionado].contenedor);
                if (contenedor) contenedor.style.display = 'block';
            }
        });

        // --- FUNCIONES CRUD ---

        // Cargar cartas al inicio
        document.addEventListener('DOMContentLoaded', cargarCartas);

        async function cargarCartas() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Error al cargar cartas');
                const cartas = await response.json();
                renderizarTabla(cartas);
                inicializarFiltroSets(cartas);
            } catch (error) {
                console.error(error);
                alert('No se pudieron cargar las cartas.');
            }
        }

        function renderizarTabla(cartas) {
            const tbody = document.getElementById('tablaCartasBody');
            tbody.innerHTML = '';

            cartas.forEach(carta => {
                const tr = document.createElement('tr');
                const juegoNombre = carta.juego ? (carta.juego.nombre || 'Desconocido') : 'Desconocido';
                const badgeClass = Object.values(juegoMap).find(j => j.id === (carta.juego?.id))?.badgeClass || 'default';
                const setNombre = carta.set ? (carta.set.nombre || carta.set) : 'N/A'; // Manejo flexible del Set

                tr.innerHTML = `
                    <td>${carta.cartaId}</td>
                    <td><img src="${carta.imagenUrl || 'placeholder.png'}" alt="${carta.nombre}" class="thumb" onerror="this.src='placeholder.png'"></td>
                    <td>${carta.nombre}</td>
                    <td><span class="badge ${badgeClass}">${juegoNombre}</span></td>
                    <td>${setNombre}</td>
                    <td>${carta.rareza}</td>
                    <td>
                        <button class="btn-edit" data-id="${carta.cartaId}">Editar</button>
                        <button class="btn-delete" data-id="${carta.cartaId}" data-nombre="${carta.nombre}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            agregarEventosEditar();
            agregarEventosEliminar();
        }

        // Inicializar sets disponibles en el filtro
        function inicializarFiltroSets(cartas) {
            const setsUnicos = new Set();
            cartas.forEach(c => {
                if (c.set) setsUnicos.add(c.set.nombre || c.set);
            });
            
            filtroSet.innerHTML = '<option value="">Todos los Sets</option>';
            const setsOrdenados = Array.from(setsUnicos).sort();
            setsOrdenados.forEach(set => {
                const option = document.createElement('option');
                option.value = set;
                option.textContent = set;
                filtroSet.appendChild(option);
            });
        }

        // Función para filtrar la tabla
        function aplicarFiltros() {
            const tablaBody = document.getElementById('tablaCartasBody');
            const filas = tablaBody.querySelectorAll('tr');
            const nombreBusqueda = buscarNombre.value.toLowerCase();
            const rarezaSeleccionada = filtroRareza.value;
            const setSeleccionado = filtroSet.value;

            filas.forEach(fila => {
                let mostrar = true;
                const celdas = fila.querySelectorAll('td');
                const nombre = celdas[2].textContent.toLowerCase();
                const set = celdas[4].textContent;
                const rareza = celdas[5].textContent;

                // Filtro por nombre
                if (nombreBusqueda && !nombre.includes(nombreBusqueda)) {
                    mostrar = false;
                }

                // Filtro por rareza
                if (rarezaSeleccionada && mostrar) {
                    if (rareza !== rarezaSeleccionada) {
                        mostrar = false;
                    }
                }

                // Filtro por set
                if (setSeleccionado && mostrar) {
                    if (set !== setSeleccionado) {
                        mostrar = false;
                    }
                }

                fila.style.display = mostrar ? '' : 'none';
            });
        }

        // Event listeners para filtros
        buscarNombre.addEventListener('input', aplicarFiltros);
        filtroRareza.addEventListener('change', aplicarFiltros);
        filtroSet.addEventListener('change', aplicarFiltros);

        // Abrir modal de crear carta
        btnNuevaCarta.addEventListener('click', () => {
            modoEdicion = false;
            idCartaEnEdicion = null;
            tituloModal.textContent = 'Crear Nueva Carta';
            btnSubmit.textContent = 'Crear Carta';
            formularioCarta.reset();
            selectJuego.value = '';
            // Ocultar todos los campos específicos
            Object.values(camposEspecificos).forEach(juego => {
                const contenedor = document.getElementById(juego.contenedor);
                if (contenedor) contenedor.style.display = 'none';
            });
            modal.style.display = 'flex';
        });

        // Cerrar modal con el botón X
        btnCerrarModal.addEventListener('click', () => {
            modal.style.display = 'none';
            formularioCarta.reset();
            modoEdicion = false;
            idCartaEnEdicion = null;
        });

        // Cerrar modal con el botón Cancelar
        btnCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
            formularioCarta.reset();
            modoEdicion = false;
            idCartaEnEdicion = null;
        });

        // Cerrar modal si se hace clic fuera del contenido
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                formularioCarta.reset();
                modoEdicion = false;
                idCartaEnEdicion = null;
            }
            if (event.target === modalConfirmacion) {
                modalConfirmacion.style.display = 'none';
            }
        });

        // Manejar el envío del formulario
        formularioCarta.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const juegoSeleccionado = selectJuego.value;
            const juegoInfo = juegoMap[juegoSeleccionado];

            // Construir objeto base
            const cartaData = {
                nombre: document.getElementById('nombre').value,
                // Enviamos el objeto juego con ID si el backend lo requiere así
                juego: juegoInfo ? { id: juegoInfo.id } : null, 
                // Nota: 'set' es una entidad. Si el backend no tiene un converter de String a CartaSet, 
                // esto podría fallar o requerir enviar { id: ... } o null. 
                // Por ahora enviamos null en la relación y el nombre en un campo transitorio si fuera necesario, 
                // o asumimos que el backend lo maneja.
                // set: { nombre: document.getElementById('set').value }, // Intento de estructura
                rareza: document.getElementById('rareza').value,
                numeroCarta: document.getElementById('numero').value, // Mapeo correcto al modelo Java
                imagenUrl: document.getElementById('imagen').value,   // Mapeo correcto al modelo Java
                descripcion: document.getElementById('descripcion').value,
                // Discriminador para Jackson (si usas @JsonTypeInfo en el backend)
                // "@type": juegoInfo ? juegoInfo.classType : null 
            };

            // Recopilar campos específicos del juego
            if (juegoSeleccionado && camposEspecificos[juegoSeleccionado]) {
                camposEspecificos[juegoSeleccionado].campos.forEach(campo => {
                    const elemento = document.getElementById(campo);
                    if (elemento) {
                        cartaData[campo] = elemento.value;
                    }
                });
            }

            try {
                const method = modoEdicion ? 'PUT' : 'POST';
                const url = modoEdicion ? `${API_URL}/${idCartaEnEdicion}` : API_URL;

                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cartaData)
                });

                if (!response.ok) throw new Error('Error al guardar la carta');

                alert(modoEdicion ? 'Carta actualizada' : 'Carta creada');
                modal.style.display = 'none';
                formularioCarta.reset();
                modoEdicion = false;
                idCartaEnEdicion = null;
                cargarCartas(); // Recargar tabla
            } catch (error) {
                console.error(error);
                alert('Error: ' + error.message);
            }
        });

        // Manejar clics en botones de editar
        function agregarEventosEditar() {
            const botonesEditar = document.querySelectorAll('.btn-edit');
            botonesEditar.forEach(btn => {
                btn.addEventListener('click', handleEditClick);
            });
        }

        async function handleEditClick(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            
            try {
                // Obtener datos frescos de la API
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error('Error al obtener datos de la carta');
                const carta = await response.json();

                // Determinar nombre del juego basado en el ID o nombre recibido
                let juegoNombre = '';
                if (carta.juego) {
                    // Buscar en nuestro mapa local qué nombre corresponde a este ID/Objeto
                    const entry = Object.entries(juegoMap).find(([key, val]) => val.id === carta.juego.id || carta.juego.nombre === key);
                    if (entry) juegoNombre = entry[0];
                }

                // Llenar formulario con datos básicos
                document.getElementById('nombre').value = carta.nombre;
                document.getElementById('juego').value = juegoNombre;
                document.getElementById('set').value = carta.set ? (carta.set.nombre || '') : '';
                document.getElementById('rareza').value = carta.rareza;
                document.getElementById('numero').value = carta.numeroCarta;
                document.getElementById('imagen').value = carta.imagenUrl;
                document.getElementById('descripcion').value = carta.descripcion || '';

                // Mostrar/ocultar campos específicos del juego
                Object.values(camposEspecificos).forEach(juegoConfig => {
                    const contenedor = document.getElementById(juegoConfig.contenedor);
                    if (contenedor) contenedor.style.display = 'none';
                });

                if (juegoNombre && camposEspecificos[juegoNombre]) {
                    const contenedor = document.getElementById(camposEspecificos[juegoNombre].contenedor);
                    if (contenedor) contenedor.style.display = 'block';

                    // Llenar campos específicos del juego (asumiendo que vienen en el JSON plano o propiedades)
                    camposEspecificos[juegoNombre].campos.forEach(campo => {
                        const elemento = document.getElementById(campo);
                        if (elemento && carta[campo] !== undefined) {
                            elemento.value = carta[campo];
                        }
                    });
                }

                // Cambiar modo a edición
                modoEdicion = true;
                idCartaEnEdicion = id;
                tituloModal.textContent = 'Editar Carta';
                btnSubmit.textContent = 'Guardar Cambios';
                modal.style.display = 'flex';

            } catch (error) {
                console.error(error);
                alert('Error al cargar la carta para editar');
            }
        }

        agregarEventosEditar();

        // Manejar clics en botones de eliminar
        function agregarEventosEliminar() {
            const botonesEliminar = document.querySelectorAll('.btn-delete');
            botonesEliminar.forEach(btn => {
                btn.addEventListener('click', handleDeleteClick);
            });
        }

        function handleDeleteClick(e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            
            cartaActualAEliminar = id;
            cardNameToDelete.textContent = nombre;
            modalConfirmacion.style.display = 'flex';
        }

        agregarEventosEliminar();

        // Botón No - cerrar modal
        btnNo.addEventListener('click', () => {
            modalConfirmacion.style.display = 'none';
            cartaActualAEliminar = null;
        });

        // Botón Sí - eliminar carta
        btnSi.addEventListener('click', async () => {
            if (cartaActualAEliminar) {
                try {
                    const response = await fetch(`${API_URL}/${cartaActualAEliminar}`, {
                        method: 'DELETE'
                    });
                    
                    if (!response.ok) throw new Error('Error al eliminar');

                    modalConfirmacion.style.display = 'none';
                    alert('Carta eliminada correctamente');
                    cartaActualAEliminar = null;
                    cargarCartas(); // Recargar tabla
                } catch (error) {
                    console.error(error);
                    alert('Error al eliminar la carta');
                }
            }
        });

    