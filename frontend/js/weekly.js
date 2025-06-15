// frontend/js/weekly.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const ul = document.getElementById('weekly-list');
  if (!ul) return;  // só roda em weekly.html

  ul.innerHTML = '<li>Carregando eventos da semana...</li>';

  // 1) calcula segunda-feira e domingo desta semana
  const today = new Date();
  const day = today.getDay(); // 0=Dom,1=Seg...
  // dif para chegar à segunda (1): se domingo (0), volta 6 dias; senão 1 - day
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const toYMD = d => d.toISOString().slice(0, 10);

  try {
    // 2) busca eventos nesse intervalo
    const res = await fetch(
      `${API_BASE}/events?weekStart=${toYMD(monday)}&weekEnd=${toYMD(sunday)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    ul.innerHTML = '';
    if (events.length === 0) {
      ul.innerHTML = '<li>— nenhum evento nesta semana —</li>';
      return;
    }

    // 3) mapa dia→lista de eventos
    const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    const map = {};
    events.forEach(ev => {
      const dt = new Date(ev.event_datetime);
      const name = days[dt.getDay()];
      if (!map[name]) map[name] = [];
      map[name].push(ev);
    });

    // 4) renderiza para cada dia da semana
    for (let i = 0; i < 7; i++) {
      const current = new Date(monday.getTime() + i * 86400000);
      const dayName = days[current.getDay()];
      const dateLabel = current.toLocaleDateString();
      const li = document.createElement('li');

      // cabeçalho do dia
      li.innerHTML = `<strong>${dayName} (${dateLabel})</strong>`;

      // eventos do dia
      (map[dayName] || []).forEach(ev => {
        const time = new Date(ev.event_datetime).toLocaleTimeString().slice(0,5);
        const div = document.createElement('div');
        div.textContent = `${time} — ${ev.title}`;
        li.appendChild(div);
      });

      ul.appendChild(li);
    }

  } catch (err) {
    ul.innerHTML = `<li style="color:red;">Erro: ${err.message}</li>`;
    console.error('Erro no weekly.js:', err);
  }
});
