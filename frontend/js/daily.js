// frontend/js/daily.js

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('daily-grid');
  if (!grid) return;            // sai se não estiver na daily.html
  grid.innerHTML = '';          // limpa conteúdo anterior

  // Gera 24 células de hora (00:00 → 23:00)
  for (let h = 0; h < 24; h++) {
    const cell = document.createElement('div');
    cell.className = 'daily-cell';
    cell.textContent = h.toString().padStart(2, '0') + ':00';
    grid.appendChild(cell);
  }
});

