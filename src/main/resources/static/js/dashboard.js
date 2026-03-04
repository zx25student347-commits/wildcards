
        const API_URL = '/api/cartas';
        const modal = document.getElementById('modalNuevaCarta');

        // wrapper que añade el token almacenado (si existe) a cada petición
        function authFetch(url, options = {}) {
            options = options || {};
            options.headers = options.headers || {};
            const token = localStorage.getItem('token');
            if (token) {
                options.headers['Authorization'] = 'Bearer ' + token;
            }
            // por defecto fetch no envía credenciales cross-site pero en nuestro
            // caso no hace falta; si más tarde usamos cookies, habilitar:
            // options.credentials = 'same-origin';
            return fetch(url, options);
        }
        const btnNuevaCarta = document.getElementById('btnNuevaCarta');
        const btnCerrarModal = document.getElementById('btnCerrarModal');
        const btnCancelar = document.getElementById('btnCancelar');
        const formularioCarta = document.getElementById('formularioCarta');
        const tituloModal = document.getElementById('tituloModal');
        const btnSubmit = document.getElementById('btnSubmit');
        const selectJuego = document.getElementById('juego');

        // Elementos Modal Set
        const modalNuevoSet = document.getElementById('modalNuevoSet');
        const btnNuevoSet = document.getElementById('btnNuevoSet');
        const btnCerrarModalSet = document.getElementById('btnCerrarModalSet');
        const btnCancelarSet = document.getElementById('btnCancelarSet');
        const formularioSet = document.getElementById('formularioSet');

        // Elementos Modal Borrar Set
        const modalBorrarSet = document.getElementById('modalBorrarSet');
        const btnBorrarSet = document.getElementById('btnBorrarSet');
        const btnCerrarModalBorrarSet = document.getElementById('btnCerrarModalBorrarSet');
        const btnCancelarBorrarSet = document.getElementById('btnCancelarBorrarSet');
        const btnConfirmarBorrarSet = document.getElementById('btnConfirmarBorrarSet');
        const selectSetBorrar = document.getElementById('selectSetBorrar');

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
            'Magic: The Gathering': { id: 2, classType: 'MagicCarta', badgeClass: 'magic' },
            'Pokémon TCG': { id: 1, classType: 'PokemonCarta', badgeClass: 'pokemon' },
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
                const response = await authFetch(API_URL);
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
                const badgeClass = Object.values(juegoMap).find(j => j.id === (carta.juego?.juegoId || carta.juego?.id))?.badgeClass || 'default';
                const setNombre = carta.set ? (carta.set.nombre || carta.set) : 'N/A'; // Manejo flexible del Set

                tr.innerHTML = `
                    <td>${carta.cartaId}</td>
                    <td><img src="${carta.imagenUrl}" alt="${carta.nombre}" class="thumb" onerror="this.onerror=null;this.src='https://placehold.co/50?text=No+Img'"></td>
                    <td>${carta.nombre}</td>
                    <td><span class="badge ${badgeClass}">${juegoNombre}</span></td>
                    <td>${setNombre}</td>
                    <td>${carta.rareza}</td>
                    <td>${carta.stock || 0}</td>
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
            document.getElementById('imagenActualTexto').style.display = 'none';
            document.getElementById('imagenFile').value = '';
            // Ocultar todos los campos específicos
            Object.values(camposEspecificos).forEach(juego => {
                const contenedor = document.getElementById(juego.contenedor);
                if (contenedor) contenedor.style.display = 'none';
            });
            modal.style.display = 'flex';
        });

        // Abrir modal de crear Set
        if (btnNuevoSet) {
            btnNuevoSet.addEventListener('click', () => {
                formularioSet.reset();
                modalNuevoSet.style.display = 'flex';
            });
        }

        // Cerrar modal Set
        if (btnCerrarModalSet) btnCerrarModalSet.addEventListener('click', () => modalNuevoSet.style.display = 'none');
        if (btnCancelarSet) btnCancelarSet.addEventListener('click', () => modalNuevoSet.style.display = 'none');

        // Manejo de envío del formulario Set (Placeholder)
        if (formularioSet) {
            formularioSet.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const juegoSeleccionado = document.getElementById('juegoSet').value;
                const juegoInfo = juegoMap[juegoSeleccionado];

                const setData = {
                    nombre: document.getElementById('nombreSet').value,
                    fechaLanzamiento: document.getElementById('fechaSalida').value,
                    codigo: document.getElementById('codigoSet').value,
                    totalCartas: parseInt(document.getElementById('cartasTotal').value),
                    juego: juegoInfo ? { juegoId: juegoInfo.id } : null
                };

                try {
                    
                    const response = await authFetch('/api/sets', { 
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify(setData) 
                    });
                    
                    if (!response.ok) throw new Error('Error al crear el set');

                    alert('Set creado correctamente');
                    modalNuevoSet.style.display = 'none';
                    formularioSet.reset();
                } catch (error) {
                    console.error(error);
                    alert('Error al crear el set: ' + error.message);
                }
            });
        }

        // Abrir modal Borrar Set
        if (btnBorrarSet) {
            btnBorrarSet.addEventListener('click', async () => {
                modalBorrarSet.style.display = 'flex';
                // Cargar sets disponibles desde el backend
                try {
                    const response = await authFetch('/api/sets');
                    if (response.ok) {
                        const sets = await response.json();
                        selectSetBorrar.innerHTML = '<option value="">-- Seleccionar Set --</option>';
                        sets.forEach(set => {
                            // Asumimos que el objeto set tiene 'id' y 'nombre'
                            const option = document.createElement('option');
                            option.value = set.id || set.setId; 
                            option.textContent = `${set.nombre} (${set.codigo || 'N/A'})`;
                            selectSetBorrar.appendChild(option);
                        });
                    } else {
                        console.error('Error al cargar sets');
                        alert('No se pudieron cargar los sets.');
                    }
                } catch (e) {
                    console.error('Error de conexión al cargar sets', e);
                }
            });
        }

        // Cerrar modal Borrar Set
        if (btnCerrarModalBorrarSet) btnCerrarModalBorrarSet.addEventListener('click', () => modalBorrarSet.style.display = 'none');
        if (btnCancelarBorrarSet) btnCancelarBorrarSet.addEventListener('click', () => modalBorrarSet.style.display = 'none');

        // Confirmar borrado de Set
        if (btnConfirmarBorrarSet) {
            btnConfirmarBorrarSet.addEventListener('click', async () => {
                const setId = selectSetBorrar.value;
                if (!setId) {
                    alert('Por favor selecciona un set.');
                    return;
                }

                if (!confirm('¿Estás seguro de que quieres eliminar este set?')) {
                    return;
                }

                try {
                    const response = await authFetch(`/api/sets/${setId}`, { method: 'DELETE' });
                    if (response.ok) {
                        alert('Set eliminado correctamente');
                        modalBorrarSet.style.display = 'none';
                        cargarCartas(); // Recargar para actualizar filtros si es necesario
                    } else {
                        alert('Error al eliminar el set. Verifica que no tenga cartas asociadas.');
                    }
                } catch (e) {
                    console.error(e);
                    alert('Error de conexión al eliminar el set');
                }
            });
        }

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
            if (event.target === modalNuevoSet) {
                modalNuevoSet.style.display = 'none';
            }
            if (event.target === modalBorrarSet) {
                modalBorrarSet.style.display = 'none';
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
                // Usamos 'juegoId' para que coincida con la entidad Java Juego
                juego: juegoInfo ? { juegoId: juegoInfo.id } : null,
                // Enviamos el juego dentro del set también, por si se crea un Set nuevo
                set: { nombre: document.getElementById('set').value, 
                       juego: juegoInfo ? { juegoId: juegoInfo.id } : null },
                rareza: document.getElementById('rareza').value,
                numeroCarta: document.getElementById('numero').value,
                // imagenUrl se gestiona en backend si hay fichero, o se mantiene
                descripcion: document.getElementById('descripcion').value,
                precio: document.getElementById('precio') ? parseFloat(document.getElementById('precio').value) : null,
                stock: document.getElementById('stock') ? parseInt(document.getElementById('stock').value, 10) : 0,
                idioma: document.getElementById('idioma') ? document.getElementById('idioma').value : null,
                tipo: document.getElementById('tipo') ? document.getElementById('tipo').value : null,
                "@type": juegoInfo ? juegoInfo.classType : null
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

            // Crear FormData para enviar archivo + JSON
            const formData = new FormData();
            // 1. Añadir el JSON como Blob
            formData.append('carta', new Blob([JSON.stringify(cartaData)], { type: 'application/json' }));
            
            // 2. Añadir el archivo si existe
            const fileInput = document.getElementById('imagenFile');
            if (fileInput.files[0]) {
                formData.append('file', fileInput.files[0]);
            }

            try {
                const method = modoEdicion ? 'PUT' : 'POST';
                const url = modoEdicion ? `${API_URL}/${idCartaEnEdicion}` : API_URL;

                const response = await authFetch(url, {
                    method: method,
                    // No establecer Content-Type, el navegador lo pone como multipart/form-data automáticamente
                    body: formData
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
                const response = await authFetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error('Error al obtener datos de la carta');
                const carta = await response.json();

                // Determinar nombre del juego basado en el ID o nombre recibido
                let juegoNombre = '';
                if (carta.juego) {
                    // Buscar en nuestro mapa local qué nombre corresponde a este ID/Objeto
                    const entry = Object.entries(juegoMap).find(([key, val]) => val.id === (carta.juego.juegoId || carta.juego.id) || carta.juego.nombre === key);
                    if (entry) juegoNombre = entry[0];
                }

                // Llenar formulario con datos básicos
                document.getElementById('nombre').value = carta.nombre;
                document.getElementById('juego').value = juegoNombre;
                document.getElementById('set').value = carta.set ? (carta.set.nombre || '') : '';
                document.getElementById('rareza').value = carta.rareza;
                document.getElementById('numero').value = carta.numeroCarta;
                
                document.getElementById('imagenFile').value = ''; // Limpiar input file
                document.getElementById('imagenActualTexto').style.display = 'block';
                document.getElementById('urlImagenActual').textContent = carta.imagenUrl || 'Sin imagen';

                document.getElementById('descripcion').value = carta.descripcion || '';
                if (document.getElementById('precio')) document.getElementById('precio').value = carta.precio || '';
                if (document.getElementById('stock')) document.getElementById('stock').value = carta.stock || 0;
                if (document.getElementById('idioma')) document.getElementById('idioma').value = carta.idioma || '';
                if (document.getElementById('tipo')) document.getElementById('tipo').value = carta.tipo || '';

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
                    const response = await authFetch(`${API_URL}/${cartaActualAEliminar}`, {
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

    