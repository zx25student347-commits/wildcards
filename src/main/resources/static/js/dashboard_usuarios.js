const API_URL = '/api/usuarios';
const modal = document.getElementById('modalNuevoUsuario');
const btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnCancelar = document.getElementById('btnCancelar');
const formularioUsuario = document.getElementById('formularioUsuario');
const tituloModal = document.getElementById('tituloModal');
const btnSubmit = document.getElementById('btnSubmit');

// Función auxiliar para incluir el Token JWT en las peticiones
function authFetch(url, options = {}) {
    options.headers = options.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
    }
    return fetch(url, options);
}

// Filtros
const buscarUsername = document.getElementById('buscarUsername');
const buscarPedidoUsername = document.getElementById('buscarPedidoUsername');

// Modal de confirmación
const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const nombreUsuarioEliminar = document.getElementById('nombreUsuarioEliminar');
let usuarioActualAEliminar = null;
let pedidoActualAEliminar = null;
let pedidoActualAEditar = null;

// Modal Editar Pedido
const modalEditarPedido = document.getElementById('modalEditarPedido');
const btnCerrarModalPedido = document.getElementById('btnCerrarModalPedido');
const btnCancelarPedido = document.getElementById('btnCancelarPedido');
const formularioPedido = document.getElementById('formularioPedido');

// Estado de edición
let modoEdicion = false;
let idUsuarioEnEdicion = null;

// --- FUNCIONES CRUD ---

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarTodosLosPedidos();
});

async function cargarUsuarios() {
    try {
        const response = await authFetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar usuarios');
        const usuarios = await response.json();
        renderizarTabla(usuarios);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los usuarios.');
    }
}

async function cargarTodosLosPedidos() {
    try {
        const response = await authFetch('/api/pedido/all');
        if (!response.ok) throw new Error('Error al cargar todos los pedidos');
        const pedidos = await response.json();
        renderizarTablaPedidosGlobal(pedidos);
    } catch (error) {
        console.error(error);
        const tbody = document.getElementById('tablaPedidosGlobalBody');
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red;">${error.message}</td></tr>`;
    }
}

function renderizarTabla(usuarios) {
    const tbody = document.getElementById('tablaUsuariosBody');
    tbody.innerHTML = '';

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        
        // Procesar roles para mostrar
        let rolesStr = '';
        if (usuario.roles && Array.isArray(usuario.roles)) {
            rolesStr = usuario.roles.map(r => r.nombre || r).join(', ');
        }

        const estado = usuario.enabled ? '<span style="color: #4ade80;">Activo</span>' : '<span style="color: #f87171;">Inactivo</span>';
        
        // Verificar si es admin para mostrar o no el botón de pedidos
        const esAdmin = rolesStr.includes('ADMIN');
        let btnPedidos = '';
        if (!esAdmin) {
            btnPedidos = `<button class="btn-ver-pedidos" data-username="${usuario.username}">Pedidos</button>`;
        }

        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.username}</td>
            <td>${rolesStr}</td>
            <td>${estado}</td>
            <td>
                <button class="btn-edit" data-id="${usuario.id}">Editar</button>
                <button class="btn-delete" data-id="${usuario.id}" data-nombre="${usuario.username}">Eliminar</button>
                ${btnPedidos}
            </td>
        `;
        tbody.appendChild(tr);
    });

    agregarEventosEditar();
    agregarEventosEliminar();
    agregarEventosVerPedidos();
}

function renderizarTablaPedidosGlobal(pedidos) {
    const tbody = document.getElementById('tablaPedidosGlobalBody');
    tbody.innerHTML = '';

    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay pedidos registrados.</td></tr>';
        return;
    }

    // Ordenar por ID descendente para ver los más nuevos primero
    pedidos.sort((a, b) => (b.id || b.pedidoId) - (a.id || a.pedidoId));

    pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        const fecha = new Date(pedido.fechaPedido).toLocaleDateString('es-ES');
        const total = pedido.total ? `${pedido.total.toFixed(2)} €` : 'N/A';
        const cliente = pedido.cliente ? pedido.cliente.username : 'Usuario no disponible';
        const pedidoId = pedido.id || pedido.pedidoId;

        // Asignar una clase CSS para el estado para poder darle estilo
        const estadoClass = (pedido.estado || 'desconocido').toLowerCase().replace('_', '-');

        tr.innerHTML = `
            <td>${pedidoId}</td>
            <td>${cliente}</td>
            <td>${fecha}</td>
            <td>${total}</td>
            <td><span class="pedido-estado estado-${estadoClass}">${(pedido.estado || 'N/A').replace('_', ' ')}</span></td>
            <td>
                <button class="btn-edit btn-edit-pedido" data-id="${pedidoId}">Editar</button>
                <button class="btn-delete btn-delete-pedido" data-id="${pedidoId}" data-nombre="Pedido #${pedidoId}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    agregarEventosPedidosGlobal();
}

// Filtro simple por username
buscarUsername.addEventListener('input', () => {
    const texto = buscarUsername.value.toLowerCase();
    const filas = document.querySelectorAll('#tablaUsuariosBody tr');
    
    filas.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
        fila.style.display = nombre.includes(texto) ? '' : 'none';
    });
});

// Filtro simple por username en pedidos
if (buscarPedidoUsername) {
    buscarPedidoUsername.addEventListener('input', () => {
        const texto = buscarPedidoUsername.value.toLowerCase();
        const filas = document.querySelectorAll('#tablaPedidosGlobalBody tr');
        
        filas.forEach(fila => {
            const usuario = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
            fila.style.display = usuario.includes(texto) ? '' : 'none';
        });
    });
}

// Abrir modal Crear
btnNuevoUsuario.addEventListener('click', () => {
    modoEdicion = false;
    idUsuarioEnEdicion = null;
    tituloModal.textContent = 'Crear Nuevo Usuario';
    btnSubmit.textContent = 'Crear Usuario';
    formularioUsuario.reset();
    document.getElementById('enabled').checked = true;
    modal.style.display = 'flex';
});

// Cerrar modales
const cerrarModales = () => {
    modal.style.display = 'none';
    modalConfirmacion.style.display = 'none';
    modalEditarPedido.style.display = 'none';
    formularioUsuario.reset();
    formularioPedido.reset();
    usuarioActualAEliminar = null;
    pedidoActualAEliminar = null;
    pedidoActualAEditar = null;
};

btnCerrarModal.addEventListener('click', cerrarModales);
btnCancelar.addEventListener('click', cerrarModales);
btnNo.addEventListener('click', cerrarModales);
btnCerrarModalPedido.addEventListener('click', cerrarModales);
btnCancelarPedido.addEventListener('click', cerrarModales);

window.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalConfirmacion || e.target === modalEditarPedido) {
        cerrarModales();
    }
});

// Submit Formulario (Crear/Editar)
formularioUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const rolSeleccionado = document.getElementById('roles').value;
    // Construir array de roles según selección. 
    let roles = [];
    if (rolSeleccionado === 'ADMIN') {
        roles.push({ id: 1, nombre: 'ROLE_ADMIN' });
        roles.push({ id: 2, nombre: 'ROLE_USER' });
    } else {
        roles.push({ id: 2, nombre: 'ROLE_USER' });
    }

    const usuarioData = {
        username: document.getElementById('username').value,
        enabled: document.getElementById('enabled').checked,
        roles: roles
    };

    const password = document.getElementById('password').value;
    if (password) {
        usuarioData.password = password;
    }

    try {
        const method = modoEdicion ? 'PUT' : 'POST';
        const url = modoEdicion ? `${API_URL}/${idUsuarioEnEdicion}` : API_URL;

        const response = await authFetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });

        if (!response.ok) throw new Error('Error al guardar el usuario');

        alert(modoEdicion ? 'Usuario actualizado' : 'Usuario creado');
        cerrarModales();
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});

formularioPedido.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!pedidoActualAEditar) return;

    const nuevoEstado = document.getElementById('estadoPedido').value;

    try {
        const response = await authFetch(`/api/pedido/${pedidoActualAEditar}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error al actualizar estado: ${errorData}`);
        }

        alert('Estado del pedido actualizado correctamente.');
        cerrarModales();
        cargarTodosLosPedidos(); // Refrescar la tabla de pedidos
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

// Editar
function agregarEventosEditar() {
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            
            try {
                const response = await authFetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error('Error al obtener usuario');
                const usuario = await response.json();

                document.getElementById('username').value = usuario.username;
                document.getElementById('password').value = ''; // No mostrar password
                document.getElementById('enabled').checked = usuario.enabled;
                
                // Determinar rol para el select
                const esAdmin = usuario.roles.some(r => r.nombre === 'ROLE_ADMIN' || r.id === 1);
                document.getElementById('roles').value = esAdmin ? 'ADMIN' : 'USER';

                modoEdicion = true;
                idUsuarioEnEdicion = id;
                tituloModal.textContent = 'Editar Usuario';
                btnSubmit.textContent = 'Guardar Cambios';
                modal.style.display = 'flex';
            } catch (error) {
                console.error(error);
                alert('Error al cargar datos para editar');
            }
        });
    });
}

// Función para ir a la tabla de pedidos y filtrar por usuario
function agregarEventosVerPedidos() {
    document.querySelectorAll('.btn-ver-pedidos').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const username = e.target.getAttribute('data-username');
            const filtroInput = document.getElementById('buscarPedidoUsername');
            const headerPedidos = document.getElementById('headerPedidos');
            
            if (headerPedidos && filtroInput) {
                headerPedidos.scrollIntoView({ behavior: 'smooth' });
                filtroInput.value = username;
                filtroInput.dispatchEvent(new Event('input')); // Disparar el evento para que se aplique el filtro
            }
        });
    });
}

// Eliminar
function agregarEventosEliminar() {
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            usuarioActualAEliminar = e.target.getAttribute('data-id');
            nombreUsuarioEliminar.textContent = e.target.getAttribute('data-nombre');
            modalConfirmacion.style.display = 'flex';
        });
    });
}

function agregarEventosPedidosGlobal() {
    // Editar pedido
    document.querySelectorAll('.btn-edit-pedido').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const pedidoId = e.target.getAttribute('data-id');
            pedidoActualAEditar = pedidoId;
            document.getElementById('pedidoIdEditar').textContent = pedidoId;

            // Cargar datos actuales del pedido para pre-seleccionar el estado
            try {
                const response = await authFetch(`/api/pedido/${pedidoId}`);
                if (!response.ok) throw new Error('No se pudo cargar el pedido');
                const pedido = await response.json();
                document.getElementById('estadoPedido').value = pedido.estado;
            } catch (error) {
                console.error(error);
                // Si falla, al menos el modal se abre
            }

            modalEditarPedido.style.display = 'flex';
        });
    });

    // Eliminar pedido
    document.querySelectorAll('.btn-delete-pedido').forEach(btn => {
        btn.addEventListener('click', (e) => {
            pedidoActualAEliminar = e.target.getAttribute('data-id');
            nombreUsuarioEliminar.textContent = e.target.getAttribute('data-nombre');
            modalConfirmacion.style.display = 'flex';
        });
    });
}

btnSi.addEventListener('click', async () => {
    if (usuarioActualAEliminar) {
        try {
            const response = await authFetch(`${API_URL}/${usuarioActualAEliminar}`, { method: 'DELETE' });
            if (response.status === 405) throw new Error('Método DELETE no soportado en el servidor para Usuarios.');
            
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Error al eliminar');
            }
            
            alert('Usuario eliminado');
            cerrarModales();
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    } else if (pedidoActualAEliminar) {
        try {
            const response = await authFetch(`/api/pedido/${pedidoActualAEliminar}`, { method: 'DELETE' });
            if (response.status === 405) throw new Error('Método DELETE no soportado en el servidor para Pedidos.');
            if (!response.ok) throw new Error('Error al eliminar el pedido.');
            
            alert('Pedido eliminado');
            cerrarModales();
            cargarTodosLosPedidos(); // Recargar la tabla de pedidos
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    }
});