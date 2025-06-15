// frontend/js/auth.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // ====== LOGIN ======
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email    = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      if (!email || !password) {
        alert('Por favor, preencha email e senha.');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Credenciais inválidas.');
        sessionStorage.setItem('usuario', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert(err.message);
        console.error('Erro no login:', err);
      }
    });
  }

  // ====== CADASTRO ======
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // captura de todos os campos, inclusive birth_date
      const name            = document.getElementById('reg-name').value.trim();
      const surname         = document.getElementById('reg-surname').value.trim();
      const cpf             = document.getElementById('reg-cpf').value.trim();
      const email           = document.getElementById('reg-email').value.trim();
      const password        = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;
      const birthDate       = document.getElementById('reg-birthdate').value;  // novo

      // validações
      if (!name || !email || !password || !confirmPassword || !birthDate) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
      if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            surname,
            cpf,
            email,
            password,
            birth_date: birthDate,   // envia aqui
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erro no cadastro.');
        }

        // Sucesso: armazena e redireciona
        sessionStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = 'dashboard.html';

      } catch (err) {
        alert(err.message);
        console.error('Erro no cadastro:', err);
      }
    });
  }
});

