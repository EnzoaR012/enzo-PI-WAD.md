// frontend/js/monthly.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const table = document.getElementById('monthly-calendar');
  const tbody = table.querySelector('tbody');

  // 1) Determina ano e mês atuais
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth(); // 0=Janeiro

  // 2) Quantos dias no mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Em que dia da semana começa (0=Dom ... 6=Sáb)
  const firstWeekday = new Date(year, month, 1).getDay();

  // 3) Busca eventos deste mês (YYYY-MM)
  const monthStr = `${year}-${String(month+1).padStart(2,'0')}`;
  let events = [];
  try {
    const res = await fetch(`${API_BASE}/events?month=${monthStr}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    events = await res.json();
  } catch (err) {
    console.error('Erro no monthly.js ao buscar eventos:', err);
  }
  // Agrupa por dia do mês
  const eventsByDay = {};
  events.forEach(ev => {
    const dt = new Date(ev.event_datetime);
    const d  = dt.getDate(); // 1..31
    if (!eventsByDay[d]) eventsByDay[d] = [];
    eventsByDay[d].push({ time: dt.toLocaleTimeString().slice(0,5), title: ev.title });
  });

  // 4) Gera as células
  let tr = document.createElement('tr');
  let dayCounter = 1;
  // Primeira linha: células vazias até firstWeekday
  for (let i = 0; i < firstWeekday; i++) {
    tr.appendChild(document.createElement('td'));
  }
  // Preenche até fim do mês
  while (dayCounter <= daysInMonth) {
    if (tr.children.length === 7) {
      tbody.appendChild(tr);
      tr = document.createElement('tr');
    }
    const td = document.createElement('td');
    // Número do dia
    const dn = document.createElement('div');
    dn.className = 'day-number';
    dn.textContent = dayCounter;
    td.appendChild(dn);

    // Lista de eventos, se houver
    const evList = document.createElement('ul');
    evList.className = 'day-events';
    (eventsByDay[dayCounter] || []).forEach(ev => {
      const li = document.createElement('li');
      li.textContent = `${ev.time} – ${ev.title}`;
      evList.appendChild(li);
    });
    td.appendChild(evList);

    tr.appendChild(td);
    dayCounter++;
  }
  // Preenche células vazias no final
  while (tr.children.length < 7) {
    tr.appendChild(document.createElement('td'));
  }
  tbody.appendChild(tr);
});
