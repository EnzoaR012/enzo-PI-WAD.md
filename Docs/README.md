# enzo-PI-WAD.md
# PI-WAD • Sistema de Gestão de Eventos

Um sistema web de cadastro e gerenciamento de usuários, eventos, tarefas, lembretes e listas, desenvolvido como projeto acadêmico para demonstração de modelagem de dados em PostgreSQL, API REST em Node.js/Express e frontend em HTML/CSS/JavaScript puro.

---

## 📋 Funcionalidades

- **Usuários**  
  - Cadastro (POST `/users`)  
  - Listagem (GET  `/users`)  

- **Eventos**  
  - Criação de evento com título, descrição, data e hora (POST `/events`)  
  - Listagem geral (GET  `/events`)  
  - Filtros:
    - Diário: GET `/events/diario?date=YYYY-MM-DD`
    - Semanal: GET `/events/semanal?weekStart=YYYY-MM-DD&weekEnd=YYYY-MM-DD`
    - Mensal: GET `/events/mensal?month=YYYY-MM`

- **Tarefas**  
  - Criação vinculada a eventos (POST `/tasks`)  
  - Listagem (GET  `/tasks`)  

- **Lembretes**  
  - CRUD de lembretes (POST/GET/PUT/DELETE em `/reminders`)  
  - Modal de criação/edição no frontend  

- **Listas**  
  - Criação com escopo (`DIARIO`, `SEMANAL`, `MENSAL`, `CUSTOM`) (POST `/lists`)  
  - Listagem geral ou por escopo (GET `/lists?scope=DIARIO|SEMANAL|MENSAL`)  
  - Associação de tarefas (POST `/lists/task`)  

- **Agendas**  
  - **Lista Diária**: grid de 24 h (`daily.html` + `daily.js`)  
  - **Lista Semanal**: lista de dias da semana (`weekly.html` + `weekly.js`)  
  - **Lista Mensal**: calendário em tabela (`monthly.html` + `monthly.js`)  

---

## 🔧 Tecnologias

- **Banco de Dados**: PostgreSQL  
- **Backend**:  
  - Node.js  
  - Express  
  - `pg` (Postgres pool)  
  - Arquitetura em camadas: _controllers_, _services_, _routes_  
- **Frontend**:  
  - HTML5 / CSS3 (variáveis, reset, responsividade)  
  - JavaScript (Fetch API, DOM)  

---

## 🚀 Como Executar

1. **Clone e instale**  
   ```bash
   git clone https://github.com/EnzoaR012/enzo-PI-WAD.git
   cd enzo-PI-WAD/backend
   npm install
 
**Endpoints da API**
-Método	Rota	Descrição
USERS		
GET/users	Lista todos os usuários
POST/users	Cria um novo usuário

EVENTS		
GET/events	Lista todos os eventos
POST/events	Cria um novo evento
GET/events/diario	Eventos de um dia (?date=YYYY-MM-DD)
GET/events/semanal	Eventos em intervalo (?weekStart=…&weekEnd=…)
GET/events/mensal	Eventos de um mês (?month=YYYY-MM)

TASKS		
GET/tasks	Lista todas as tarefas
POST/tasks	Cria nova tarefa

REMINDERS		
GET/reminders	Lista lembretes
POST/reminders	Cria lembrete
PUT/reminders/:id	Atualiza lembrete
DELETE/reminders/:id	Deleta lembrete

LISTS		
GET/lists	Lista todas as listas
GET/lists?scope=DIARIO	Lista apenas escopo diário
POST/lists	Cria lista ({ user_id, name, scope })
POST/lists/task	Adiciona tarefa à lista ({ list_id, task_id })

**Frontend**
index.html: login/cadastro
dashboard.html: cards de acesso rápido
reminders.html: lista e modal de lembretes
newevent.html: formulário de evento (título, descrição, data, hora)
daily.html: grid de horas
weekly.html: lista dos dias da semana
monthly.html: calendário mensal

Cada página carrega css/estilos.css e um <aside class="sidebar"> comum, com logo /assets/Logoprojeto.png, links e botão de logout.

**Conclusão**
Durante o desenvolvimento do Projeto, construí uma API REST robusta em Node.js/Express, com conexão estável a um banco PostgreSQL para gerenciar usuários, eventos, tarefas, lembretes e listas, seguindo boas práticas de separação de responsabilidades entre controllers, services e routes. No frontend, entreguei uma interface leve em HTML/CSS/JS puro, com um design consistente de barra lateral e páginas dedicadas para login, dashboard, lembretes, cadastro de eventos (com data e hora), além de visualizações de agenda diária, semanal e mensal. Entre os pontos fortes estão a modularização do código, a tipagem clara dos endpoints, as validações tanto no cliente quanto no servidor e o uso de variáveis CSS para manter a identidade visual. Para melhorar, sugeri implementar autenticação real (por exemplo, JWT), injetar dinamicamente os eventos nas visualizações de agenda, adicionar recursos de edição e exclusão de eventos no calendário, e evoluir para uma PWA com notificações em tempo real e suporte offline. Esses avanços tornariam o sistema mais completo, seguro e interativo, elevando a experiência do usuário e a confiabilidade da aplicação.