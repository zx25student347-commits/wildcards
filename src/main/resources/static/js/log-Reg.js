
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


