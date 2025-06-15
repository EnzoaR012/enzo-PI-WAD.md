// frontend/js/user.js

const API_USERS = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', () => {
  const listEl      = document.getElementById('users-list');
  const btnNovo     = document.getElementById('btn-novo-usuario');
  const modal       = document.getElementById('modal-usuario');
  const form        = document.getElementById('form-usuario');
  const btnCancelar = document.getElementById('btn-cancelar-usuario');
  const tituloModal = document.getElementById('titulo-modal-usuario');

  // 1) Buscar e renderizar todos os usuários
  async function carregarUsuarios() {
    listEl.innerHTML = '<li>Carregando...</li>';
    try {
      const res   = await fetch(API_USERS);
      const data  = await res.json();
      listEl.innerHTML = '';
      if (data.length === 0) {
        listEl.innerHTML = '<li>— nenhum usuário —</li>';
        return;
      }
      data.forEach(u => {
        const li = document.createElement('li');
        li.className = 'lista-itens';
        li.innerHTML = `
          <div>
            <strong>${u.name}</strong> (${u.email})<br>
            <small>${u.birth_date || ''}</small>
          </div>
          <div class="botoes-acoes">
            <button class="btn btn-primary btn-small editar" data-id="${u.id}">Editar</button>
            <button class="btn btn-secondary btn-small excluir" data-id="${u.id}">Excluir</button>
          </div>
        `;
        listEl.appendChild(li);
      });

      // vincula eventos de editar/excluir
      listEl.querySelectorAll('.editar').forEach(btn =>
        btn.addEventListener('click', () => abrirEdicao(btn.dataset.id))
      );
      listEl.querySelectorAll('.excluir').forEach(btn =>
        btn.addEventListener('click', () => excluirUsuario(btn.dataset.id))
      );

    } catch (err) {
      listEl.innerHTML = `<li style="color:red;">Erro ao carregar: ${err.message}</li>`;
    }
  }

  // 2) Abrir modal para criar
  btnNovo.addEventListener('click', () => {
    form.reset();
    form.elements['id'].value = '';
    tituloModal.textContent   = 'Criar Novo Usuário';
    modal.classList.remove('oculto');
  });

  // 3) Fechar modal sem salvar
  btnCancelar.addEventListener('click', () => {
    modal.classList.add('oculto');
  });

  // 4) Submeter criação ou edição
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const id         = form.elements['id'].value;
    const payload    = {
      name:       form.elements['name'].value.trim(),
      email:      form.elements['email'].value.trim(),
      birth_date: form.elements['birth_date'].value
    };
    const url    = id ? `${API_USERS}/${id}` : API_USERS;
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || 'Erro ao salvar usuário');
      }
      modal.classList.add('oculto');
      carregarUsuarios();
    } catch (err) {
      alert(err.message);
    }
  });

  // 5) Abrir modal no modo “editar”
  async function abrirEdicao(id) {
    try {
      const res = await fetch(`${API_USERS}/${id}`);
      if (!res.ok) throw new Error('Usuário não encontrado');
      const u = await res.json();
      form.elements['id'].value        = u.id;
      form.elements['name'].value      = u.name;
      form.elements['email'].value     = u.email;
      form.elements['birth_date'].value = u.birth_date;
      tituloModal.textContent = 'Editar Usuário';
      modal.classList.remove('oculto');
    } catch (err) {
      alert(err.message);
    }
  }

  // 6) Excluir usuário
  async function excluirUsuario(id) {
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    try {
      const res = await fetch(`${API_USERS}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir usuário');
      carregarUsuarios();
    } catch (err) {
      alert(err.message);
    }
  }

  // Inicializa
  carregarUsuarios();
});
