// frontend/js/list.js 
const API_BASE = 'http://localhost:3000';  

document.addEventListener('DOMContentLoaded', () => {   
  const form = document.getElementById('form-lista');   
  if (!form) return;  // só roda em newlist.html    
    
  form.addEventListener('submit', async (e) => {     
    e.preventDefault();     

    // 1) resgata o usuário logado da sessão
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (!usuario || !usuario.id) {
      alert('Sessão expirada. Faça login novamente.');
      return;
    }

    // 2) coleta campos do formulário
    const name        = document.getElementById('lista-nome').value.trim();     
    const description = document.getElementById('lista-descricao').value.trim();      
    
    if (!name) {       
      alert('Por favor, informe o nome da lista.');       
      return;     
    }      
    
    try {       
      // 3) monta payload com user_id e scope CORRETO
      const payload = {
        user_id:    usuario.id,
        name,
        description: description || null,
        scope:      'CUSTOM'   // um dos valores permitidos pelo CHECK
      };

      const res = await fetch(`${API_BASE}/lists`, {         
        method: 'POST',         
        headers: { 'Content-Type': 'application/json' },         
        body: JSON.stringify(payload)       
      });       
      const data = await res.json();       
      if (!res.ok) throw new Error(data.error || 'Erro ao criar lista.');

      alert(`Lista "${data.name}" criada com sucesso!`);       
      window.location.href = 'dashboard.html';     
    } catch (err) {       
      alert(err.message);       
      console.error('Erro no list.js:', err);     
    }   
  }); 
});
