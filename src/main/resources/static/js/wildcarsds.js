document.addEventListener('DOMContentLoaded', function () {
            const imagenes = document.querySelector('.carrusel-imagenes');
            const totalImagenes = document.querySelectorAll('.carrusel-imagen').length;
            let indiceActual = 0;

            function mostrarImagen(indice) {
                const anchoImagen = document.querySelector('.carrusel').clientWidth;
                imagenes.style.transform = `translateX(${-indice * anchoImagen}px)`;
            }

            document.querySelector('.carrusel-boton.next').addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % totalImagenes;
                mostrarImagen(indiceActual);
            });

            document.querySelector('.carrusel-boton.prev').addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
                mostrarImagen(indiceActual);
            });
        });

        
    document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('productos-grid');
    
    
    const path = window.location.pathname;
    const endpoint = path.substring(1); // Quita la barra inicial

    fetch(`/api/cartas/${endpoint}`)
        .then(response => response.json())
        .then(cartas => {
            grid.innerHTML = ""; // Limpiamos el grid
            cartas.forEach(carta => {
                grid.innerHTML += crearTarjeta(carta);
            });
        })
        .catch(err => console.error("Error cargando cartas:", err));
});

function crearTarjeta(carta) {
    

    return `
        <div class="producto-card">
            <div class="producto-imagen">
                <img src="${carta.imagenUrl}" alt="${carta.nombre}">
            </div>
            <h3 class="producto-nombre">${carta.nombre}</h3>
            <p class="producto-precio">${carta.precio}</p>
        </div>
    `;
}

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.text();
    alert(result);

    window.location.href = "/login"; // URL limpia gestionada por WebController
});

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    // Guardamos el token
    localStorage.setItem("token", result.token);

    window.location.href = "/"; // URL limpia a la raíz
});
