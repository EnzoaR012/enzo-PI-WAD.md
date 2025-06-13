// frontend/js/monthly.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const ul = document.getElementById('monthly-list');
  ul.innerHTML = '<li>Carregando listas mensais...</li>';

  try {
    const res = await fetch(`${API_BASE}/lists/mensal`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const lists = await res.json();

    ul.innerHTML = '';
    if (lists.length === 0) {
      ul.innerHTML = '<li>— nenhuma lista mensal —</li>';
      return;
    }
    lists.forEach(l => {
      const li = document.createElement('li');
      li.textContent = `${l.name} (${new Date(l.created_at).toLocaleDateString()})`;
      ul.appendChild(li);
    });
  } catch (err) {
    ul.innerHTML = `<li style="color:red;">Erro: ${err.message}</li>`;
  }
});
