const API_URL = '/api/accesorios';
const modal = document.getElementById('modalNuevoAccesorio');
const btnNuevoAccesorio = document.getElementById('btnNuevoAccesorio');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnCancelar = document.getElementById('btnCancelar');
const formularioAccesorio = document.getElementById('formularioAccesorio');
const tituloModal = document.getElementById('tituloModal');
const btnSubmit = document.getElementById('btnSubmit');

// Filtros
const buscarNombre = document.getElementById('buscarNombre');

// Modal de confirmación
const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const nombreAccesorioEliminar = document.getElementById('nombreAccesorioEliminar');
let accesorioActualAEliminar = null;

// Estado de edición
let modoEdicion = false;
let idAccesorioEnEdicion = null;

// --- FUNCIONES CRUD ---

document.addEventListener('DOMContentLoaded', cargarAccesorios);

async function cargarAccesorios() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar accesorios');
        const accesorios = await response.json();
        renderizarTabla(accesorios);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los accesorios.');
    }
}

function renderizarTabla(accesorios) {
    const tbody = document.getElementById('tablaAccesoriosBody');
    tbody.innerHTML = '';

    accesorios.forEach(accesorio => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${accesorio.id || accesorio.accesorioId}</td>
            <td><img src="${accesorio.imagenUrl}" alt="${accesorio.nombre}" class="thumb" onerror="this.onerror=null;this.src='https://placehold.co/50?text=No+Img'"></td>
            <td>${accesorio.nombre}</td>
            <td>${accesorio.precio ? accesorio.precio.toFixed(2) + ' €' : '0.00 €'}</td>
            <td>${accesorio.stock || 0}</td>
            <td>
                <button class="btn-edit" data-id="${accesorio.id || accesorio.accesorioId}">Editar</button>
                <button class="btn-delete" data-id="${accesorio.id || accesorio.accesorioId}" data-nombre="${accesorio.nombre}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    agregarEventosEditar();
    agregarEventosEliminar();
}

// Filtro simple por nombre
buscarNombre.addEventListener('input', () => {
    const texto = buscarNombre.value.toLowerCase();
    const filas = document.querySelectorAll('#tablaAccesoriosBody tr');
    
    filas.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(3)').textContent.toLowerCase();
        fila.style.display = nombre.includes(texto) ? '' : 'none';
    });
});

// Abrir modal Crear
btnNuevoAccesorio.addEventListener('click', () => {
    modoEdicion = false;
    idAccesorioEnEdicion = null;
    tituloModal.textContent = 'Crear Nuevo Accesorio';
    btnSubmit.textContent = 'Crear Accesorio';
    formularioAccesorio.reset();
    document.getElementById('imagenActualTexto').style.display = 'none';
    modal.style.display = 'flex';
});

// Cerrar modales
const cerrarModales = () => {
    modal.style.display = 'none';
    modalConfirmacion.style.display = 'none';
    formularioAccesorio.reset();
};

btnCerrarModal.addEventListener('click', cerrarModales);
btnCancelar.addEventListener('click', cerrarModales);
btnNo.addEventListener('click', cerrarModales);
window.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalConfirmacion) cerrarModales();
});

// Submit Formulario (Crear/Editar)
formularioAccesorio.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accesorioData = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value, 10),
        descripcion: document.getElementById('descripcion').value
    };

    const formData = new FormData();
    formData.append('accesorio', new Blob([JSON.stringify(accesorioData)], { type: 'application/json' }));
    
    const fileInput = document.getElementById('imagenFile');
    if (fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
    }

    try {
        const method = modoEdicion ? 'PUT' : 'POST';
        const url = modoEdicion ? `${API_URL}/${idAccesorioEnEdicion}` : API_URL;

        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (!response.ok) throw new Error('Error al guardar el accesorio');

        alert(modoEdicion ? 'Accesorio actualizado' : 'Accesorio creado');
        cerrarModales();
        cargarAccesorios();
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
                if (!response.ok) throw new Error('Error al obtener accesorio');
                const accesorio = await response.json();

                document.getElementById('nombre').value = accesorio.nombre;
                document.getElementById('precio').value = accesorio.precio;
                document.getElementById('stock').value = accesorio.stock || 0;
                document.getElementById('descripcion').value = accesorio.descripcion || '';
                
                document.getElementById('imagenActualTexto').style.display = 'block';
                document.getElementById('urlImagenActual').textContent = accesorio.imagenUrl || 'Sin imagen';

                modoEdicion = true;
                idAccesorioEnEdicion = id;
                tituloModal.textContent = 'Editar Accesorio';
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
            accesorioActualAEliminar = e.target.getAttribute('data-id');
            nombreAccesorioEliminar.textContent = e.target.getAttribute('data-nombre');
            modalConfirmacion.style.display = 'flex';
        });
    });
}

btnSi.addEventListener('click', async () => {
    if (!accesorioActualAEliminar) return;
    try {
        const response = await fetch(`${API_URL}/${accesorioActualAEliminar}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        alert('Accesorio eliminado');
        cerrarModales();
        cargarAccesorios();
    } catch (error) {
        console.error(error);
        alert('Error al eliminar el accesorio');
    }
});