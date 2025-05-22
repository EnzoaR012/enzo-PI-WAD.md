const API_BASE = 'http://localhost:3000';

async function fetchAndRender(path, listId, formatter) {
  const ul = document.getElementById(listId);
  try {
    const res = await fetch(`${API_BASE}/${path}`);
    const data = await res.json();
    ul.innerHTML = '';
    if (data.length === 0) {
      ul.innerHTML = '<li>— nenhum registro —</li>';
      return;
    }
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = formatter(item);
      ul.appendChild(li);
    });
  } catch (err) {
    ul.innerHTML = `<li style="color: red;">Erro ao carregar: ${err.message}</li>`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchAndRender('users',  'users-list',  u => `${u.name} (${u.email})`);
  fetchAndRender('events', 'events-list', e => `${e.title} — ${e.event_date}`);
  fetchAndRender('tasks',  'tasks-list',  t => `${t.title} [${t.done ? '✔' : '✖'}]`);
});
