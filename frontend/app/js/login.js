document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('client_id', 'app');
    formData.append('response_type', 'code');
    formData.append('redirect_uri', 'http://localhost:3000');
    formData.append('scope', 'read');
    formData.append('state', 'xwz');

    try {
        const response = await fetch('http://localhost:3000/authorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        });

        if (!response.ok) throw new Error('Falha no login');
        const data = await response.json();
        console.log('Código de autorização:', data);
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Erro: ' + error.message;
    }
});