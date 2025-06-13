// frontend/js/daily.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('daily-grid');
  if (!grid) return;               // só roda na daily.html

  // 1) Limpa e gera 24 células (uma por hora)
  grid.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const cell = document.createElement('div');
    cell.className = 'daily-cell';
    // armazena a hora para referência
    const hour = h.toString().padStart(2, '0');
    cell.dataset.hour = hour;
    cell.innerHTML = `
      <div class="hour-label">${hour}:00</div>
      <ul class="events-list"></ul>
    `;
    grid.appendChild(cell);
  }

  // 2) Monta a data de hoje no formato YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  // 3) Busca eventos de hoje
  try {
    const res = await fetch(`${API_BASE}/events?date=${today}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    // 4) Para cada evento, insere na célula certa
    events.forEach(ev => {
      const dt = new Date(ev.event_datetime);
      const hour = dt.getHours().toString().padStart(2, '0');
      const ul = grid
        .querySelector(`.daily-cell[data-hour="${hour}"] .events-list`);
      if (ul) {
        const li = document.createElement('li');
        // Mostra hora e título
        li.textContent = `${dt.toLocaleTimeString().slice(0,5)} — ${ev.title}`;
        ul.appendChild(li);
      }
    });
  } catch (err) {
    // em caso de erro, mostra mensagem na primeira célula
    const fallback = grid.querySelector('.daily-cell .events-list');
    if (fallback) {
      fallback.innerHTML = `<li style="color:red;">Erro ao carregar: ${err.message}</li>`;
    }
    console.error('Erro no daily.js:', err);
  }
});
