// frontend/js/reminder.js
const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('reminders-list');
  const btnNovo = document.getElementById('btn-novo-lembrete');
  const modal = document.getElementById('modal-lembrete');
  const form = document.getElementById('form-lembrete');
  const btnCancelar = document.getElementById('btn-cancelar-lembrete');
  const tituloModal = document.getElementById('titulo-modal-lembrete');

  // 1) Função para carregar todos os lembretes e renderizá-los na UL
  async function carregarLembretes() {
    listContainer.innerHTML = '<li>Carregando lembretes...</li>';
    try {
      const res = await fetch(`${API_BASE}/reminders`);
      if (!res.ok) throw new Error(`Erro ${res.status} ao buscar lembretes`);
      const data = await res.json();

      // Se não houver nenhum lembrete, explica na tela
      if (!data.length) {
        listContainer.innerHTML = '<li>— nenhum lembrete —</li>';
        return;
      }

      // Limpa a lista e insere cada lembrete em um <li>
      listContainer.innerHTML = '';
      data.forEach(lembrete => {
        const li = document.createElement('li');
        li.classList.add('lista-itens');
        li.innerHTML = `
          <div>
            <strong>${lembrete.title}</strong> <em>(${lembrete.date})</em><br>
            <small>${lembrete.description || ''}</small>
          </div>
          <div class="botoes-acoes">
            <button class="btn btn-primary btn-small editar" data-id="${lembrete.id}">
              Editar
            </button>
            <button class="btn btn-secondary btn-small excluir" data-id="${lembrete.id}">
              Excluir
            </button>
          </div>
        `;
        listContainer.appendChild(li);
      });

      // 1.1) Associa evento de clique aos botões “Editar”
      document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', () => {
          abrirEdicao(btn.dataset.id);
        });
      });

      // 1.2) Associa evento de clique aos botões “Excluir”
      document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', () => {
          excluirLembrete(btn.dataset.id);
        });
      });

    } catch (err) {
      listContainer.innerHTML = `<li style="color:red;">Erro: ${err.message}</li>`;
      console.error('Erro ao carregar lembretes:', err);
    }
  }

  // 2) Função para abrir o modal no modo “criar novo lembrete”
  btnNovo.addEventListener('click', () => {
    tituloModal.textContent = 'Criar Novo Lembrete';
    form.reset();
    form.elements['id'].value = ''; // limpa o input hidden
    modal.classList.remove('oculto');
  });

  // 3) Função para fechar o modal ao clicar em “Cancelar”
  btnCancelar.addEventListener('click', () => {
    modal.classList.add('oculto');
  });

  // 4) Submeter formulário (criar ou editar lembrete)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dados = {
      title:       formData.get('title').trim(),
      description: formData.get('description').trim(),
      date:        formData.get('date')
    };
    const id = formData.get('id');

    try {
      if (id) {
        // 4.1) Modo edição: PUT /reminders/:id
        const res = await fetch(`${API_BASE}/reminders/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error(`Erro ${res.status} ao atualizar lembrete`);
      } else {
        // 4.2) Modo criação: POST /reminders
        const res = await fetch(`${API_BASE}/reminders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error(`Erro ${res.status} ao criar lembrete`);
      }

      // Fecha modal e recarrega a lista
      modal.classList.add('oculto');
      await carregarLembretes();

    } catch (err) {
      alert('Não foi possível salvar o lembrete.');
      console.error('Erro ao salvar lembrete:', err);
    }
  });

  // 5) Função que busca um lembrete específico e preenche o formulário para edição
  async function abrirEdicao(id) {
    try {
      const res = await fetch(`${API_BASE}/reminders/${id}`);
      if (!res.ok) throw new Error('Lembrete não encontrado');
      const lembrete = await res.json();

      tituloModal.textContent = 'Editar Lembrete';
      form.elements['id'].value = lembrete.id;
      form.elements['title'].value = lembrete.title;
      form.elements['description'].value = lembrete.description;
      form.elements['date'].value = lembrete.date;

      modal.classList.remove('oculto');
    } catch (err) {
      alert('Erro ao carregar lembrete para edição.');
      console.error('Erro ao abrir lembrete:', err);
    }
  }

  // 6) Função para excluir um lembrete
  async function excluirLembrete(id) {
    const confirmacao = confirm('Deseja realmente excluir este lembrete?');
    if (!confirmacao) return;

    try {
      const res = await fetch(`${API_BASE}/reminders/${id}`, {
        method: 'DELETE'
      });
      if (res.status === 204 || res.ok) {
        // Excluído com sucesso – recarrega lista
        await carregarLembretes();
      } else {
        throw new Error(`Falha ao excluir (status ${res.status})`);
      }
    } catch (err) {
      alert('Não foi possível excluir o lembrete.');
      console.error('Erro ao excluir lembrete:', err);
    }
  }

  // 7) CHAMADA INICIAL: assim que a página carrega, busque todos os lembretes
  carregarLembretes();
});
