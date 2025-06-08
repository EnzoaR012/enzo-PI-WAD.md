// frontend/js/auth.js

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Credenciais inválidas');
        const { user } = await res.json();
        // Se usar sessionStorage ou localStorage para manter login:
        sessionStorage.setItem('usuario', JSON.stringify(user));
        // Redireciona para dashboard
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert(err.message || 'Erro ao fazer login');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const surname = document.getElementById('reg-surname').value.trim();
      const cpf = document.getElementById('reg-cpf').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, surname, cpf, email, password, confirmPassword }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Erro no cadastro');
        }
        alert('Usuário cadastrado com sucesso! Faça login.');
        window.location.href = 'index.html';
      } catch (err) {
        alert(err.message || 'Erro ao cadastrar');
      }
    });
  }
});
