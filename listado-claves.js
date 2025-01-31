document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const errorDiv = document.getElementById('error');
    const clavesTable = document.getElementById('clavesTable');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/claves', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = 'index.html';
            return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            clavesTable.innerHTML = data.map(clave => `
                <tr>
                    <td>${clave.IdUsuario}</td>
                    <td>${clave.NombreClave}</td>
                    <td>${clave.UsuarioClave}</td>
                    <td>${clave.Clave}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editClave(${
                              clave.IdUsuario
                            })">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteClave(${
                              clave.IdUsuario
                            })">Borrar</button>
                        </td>
                </tr>
            `).join('');
        } else {
            errorDiv.textContent = 'Error al obtener datos.';
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        errorDiv.textContent = 'Error en el servidor.';
        errorDiv.classList.remove('d-none');
    }
});
