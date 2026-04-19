document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();


    const data = {
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Usuario o contraseña incorrectos");
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