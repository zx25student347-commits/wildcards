const API_URL = '/api/usuarios';
const modal = document.getElementById('modalNuevoUsuario');
const btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnCancelar = document.getElementById('btnCancelar');
const formularioUsuario = document.getElementById('formularioUsuario');
const tituloModal = document.getElementById('tituloModal');
const btnSubmit = document.getElementById('btnSubmit');

// Filtros
const buscarUsername = document.getElementById('buscarUsername');

// Modal de confirmación
const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const nombreUsuarioEliminar = document.getElementById('nombreUsuarioEliminar');
let usuarioActualAEliminar = null;

// Estado de edición
let modoEdicion = false;
let idUsuarioEnEdicion = null;

// --- FUNCIONES CRUD ---

document.addEventListener('DOMContentLoaded', cargarUsuarios);

async function cargarUsuarios() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar usuarios');
        const usuarios = await response.json();
        renderizarTabla(usuarios);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los usuarios.');
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

        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.username}</td>
            <td>${rolesStr}</td>
            <td>${estado}</td>
            <td>
                <button class="btn-edit" data-id="${usuario.id}">Editar</button>
                <button class="btn-delete" data-id="${usuario.id}" data-nombre="${usuario.username}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    agregarEventosEditar();
    agregarEventosEliminar();
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
    formularioUsuario.reset();
};

btnCerrarModal.addEventListener('click', cerrarModales);
btnCancelar.addEventListener('click', cerrarModales);
btnNo.addEventListener('click', cerrarModales);
window.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalConfirmacion) cerrarModales();
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
        enabled: document.getElementById('enabled').checked ? 1 : 0,
        roles: roles
    };

    const password = document.getElementById('password').value;
    if (password) {
        usuarioData.password = password;
    }

    try {
        const method = modoEdicion ? 'PUT' : 'POST';
        const url = modoEdicion ? `${API_URL}/${idUsuarioEnEdicion}` : API_URL;

        const response = await fetch(url, {
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

// Editar
function agregarEventosEditar() {
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error('Error al obtener usuario');
                const usuario = await response.json();

                document.getElementById('username').value = usuario.username;
                document.getElementById('password').value = ''; // No mostrar password
                document.getElementById('enabled').checked = (usuario.enabled === 1 || usuario.enabled === true);
                
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

btnSi.addEventListener('click', async () => {
    if (!usuarioActualAEliminar) return;
    try {
        const response = await fetch(`${API_URL}/${usuarioActualAEliminar}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        alert('Usuario eliminado');
        cerrarModales();
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        alert('Error al eliminar el usuario');
    }
});