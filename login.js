document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, clave: password }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = 'listado-claves.html';
        } else {
            errorDiv.textContent = data.message || 'Error en el ingreso.';
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        errorDiv.textContent = 'Error en el servidor.';
        errorDiv.classList.remove('d-none');
    }
});
