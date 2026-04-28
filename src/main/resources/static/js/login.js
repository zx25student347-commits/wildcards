document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Limpiar errores previos
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-password").textContent = "";
    const errorGeneral = document.getElementById("error-general");
    errorGeneral.textContent = "";
    errorGeneral.style.display = "none";

    // Validaciones básicas en el cliente
    let hasError = false;
    if (!email) {
        document.getElementById("error-email").textContent = "El email es obligatorio";
        hasError = true;
    }
    if (!password) {
        document.getElementById("error-password").textContent = "La contraseña es obligatoria";
        hasError = true;
    }
    if (hasError) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("error-email").textContent = "Introduce un email válido";
        return;
    }

    const data = {
        username: email,
        password: password
    };

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        try {
            const errorData = await response.json();
            errorGeneral.textContent = errorData.message || "Usuario o contraseña incorrectos";
        } catch(e) {
            errorGeneral.textContent = "Usuario o contraseña incorrectos";
        }
        errorGeneral.style.display = "block";
        // Seguimos usando el Toast como refuerzo visual
        window.mostrarToast("Credenciales inválidas", null, true);
        return;
    }

    const result = await response.json();
    
    if (result.token) {
        localStorage.setItem("token", result.token);
        // si la URL de login contenía ?redirect=/algo intentamos volver ahí
        const params = new URLSearchParams(window.location.search);
        let redirect = params.get('redirect');

        // Evitar volver a páginas de error o bucles de login
        if (redirect && !redirect.includes('/error') && !redirect.includes('/login')) {
            window.location.href = redirect;
        } else {
            window.location.href = "/"; // URL limpia a la raíz
        }
    }
});