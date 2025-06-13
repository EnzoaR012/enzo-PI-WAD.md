// frontend/js/event.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-evento');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // 1) Usuário logado
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (!usuario?.id) {
      alert('Sessão expirada. Faça login novamente.');
      return;
    }

    // 2) Pega valores dos inputs
    const title       = document.getElementById('evento-title').value.trim();
    const description = document.getElementById('evento-description').value.trim();
    const datePart    = document.getElementById('evento-date').value;  // "YYYY-MM-DD"
    const timePart    = document.getElementById('evento-time').value;  // "HH:MM"

    // 3) Validações
    if (!title || !datePart || !timePart) {
      alert('Título, data e hora são obrigatórios.');
      return;
    }

    // 4) Monta ISO completo: "YYYY-MM-DDTHH:MM:00"
    const eventDateTime = `${datePart}T${timePart}:00`;

    try {
      // 5) Dispara a requisição incluindo user_id e event_datetime
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: usuario.id,
          title,
          description: description || null,
          event_datetime: eventDateTime
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao criar evento');

      alert(`Evento "${data.title}" criado com sucesso!`);
      window.location.href = 'dashboard.html';

    } catch (err) {
      alert(err.message);
      console.error('Erro no event.js:', err);
    }
  });
});
