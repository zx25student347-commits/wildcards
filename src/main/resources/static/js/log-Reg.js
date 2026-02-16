
document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.text();
    alert(result);

    if (response.ok) {
        window.location.href = "/login"; // URL limpia gestionada por WebController
    }
});

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
        window.location.href = "/"; // URL limpia a la raíz
    }
});
