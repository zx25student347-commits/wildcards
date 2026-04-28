document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Limpiar errores
    document.querySelectorAll(".error-mensaje").forEach(el => el.textContent = "");
    const errorGeneral = document.getElementById("error-general");
    errorGeneral.style.display = "none";

    // Validaciones de cliente
    let hasError = false;
    if (!nombre) { document.getElementById("error-nombre").textContent = "Campo obligatorio"; hasError = true; }
    if (!email) { document.getElementById("error-email").textContent = "Campo obligatorio"; hasError = true; }
    if (!password) { document.getElementById("error-password").textContent = "Campo obligatorio"; hasError = true; }
    if (hasError) return;

    if (password.length < 4) {
        document.getElementById("error-password").textContent = "Mínimo 4 caracteres";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("error-email").textContent = "Email inválido";
        return;
    }

    const data = {
        username: email,
        password: password
    };

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.text(); // Asumiendo que el backend devuelve un mensaje de texto
    if (!response.ok) {
        errorGeneral.textContent = result;
        errorGeneral.style.display = "block";
        window.mostrarToast(result, null, true); 
    } else {
        window.mostrarToast(result); // Mostrar como éxito si la respuesta es OK
    }

    if (response.ok) {
        window.location.href = "/login"; // URL limpia gestionada por WebController
    }
});
