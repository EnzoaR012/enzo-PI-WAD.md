# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto

#### Autor do projeto

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Neste projeto desenvolver um sistema de gerenciamento de tarefas, focando na organização pessoal e no aumento da produtividade. Viso utilizar este, os usuários poderão criar, editar, excluir e organizar suas tarefas de maneira fácil e rápida; elas serão organizadas conforme prioridade, data de entrega e vão classificar por  status( pendente, em andamento ou concluído). Terá disponível uma interface intuitiva, possibilitando a visualização da tarefa em lista ou quadros ,parecido com o modelo do kanban, o que possibilita o monitoramento do andamento. Além das notificações para lembretes de prazo, também permitirão filtros para pesquisar de maneira mais eficaz as tarefas. O sistema terá um objetivo para diminuir a procrastinação e oferecer uma alternativa fácil e intuitiva a ser usada no dia-a-dia para estudos, trabalho ou qualquer outro tipo de processo pessoal.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

<br>
<div align="center">
<sub>Foto da persona</sub>
<br>
<br>
<img src="/assets/Perfil2.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

Nome: Euler Rezende

Idade: 20 anos

Curso: Administração

Perfil: Euler é um estudante universitário que sabe o que precisa fazer, mas sempre deixa para depois. Ele sempre costuma começar trabalhos e estudar para provas apenas na véspera pois e muito procastinador, o que gera ansiedade e noites mal dormidas. Mesmo sabendo que isso não o faz bem, ele se distrai facilmente, principalmente com redes sociais, séries e jogos.

Comportamento:

-Costuma anotar tarefas, mas raramente segue a lista.

-Sente-se sobrecarregado quando o prazo está próximo.

-Tem dificuldade de dividir grandes projetos em pequenas etapas.


Motivações:

-Quer ser mais produtivo.

-Deseja não ter tanto estresse na vespera da prova.

-Busca a melhora de seus habitos.

Frustrações:

-Sensação constante de estar "atrasado".

-Perda de oportunidades por não se preparar a tempo.

-Dificuldade em manter uma boa rotina.



### 2.2. User Stories (Semana 01)

US01 | Como usuário, quero criar, editar e excluir tarefas, para que eu possa gerenciar melhor minhas atividades diárias.

US02 | Como usuário, quero classificar as tarefas por prioridade e prazo, para que eu possa focar primeiro nas tarefas mais urgentes e importantes.

US03 | Como usuário, quero visualizar minhas tarefas em formato de quadro kanban, para que eu possa acompanhar facilmente o andamento de cada atividade.



Análise INVEST da User Story US01
US01 | Como usuário, quero criar, editar e excluir tarefas, para que eu possa organizar minhas atividades.

I – Independente: Não depende de outras funções.

N – Negociável: Pode ser ajustada conforme necessário.

V – Valiosa: É essencial para o usuário organizar o que precisa fazer.

E – Estimável: É fácil calcular o tempo de desenvolvimento.

S – Pequena: Pode ser feita em pouco tempo.

T – Testável: Dá para testar criando, editando e excluindo tarefas.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

<br>
<div align="center">
<sub>Diagrama banco de dados</sub>
<br>
<br>
<img src="/assets/modelo-banco.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>
 Nesse diagrama, tem a relação entre user, taks e evento, que se conectao pelo user id

### 3.1.1 BD e Models (Semana 5)

  - Tabela: `users`  
  - Campos:  
    - `id` (UUID) – chave primária  
    - `name` (TEXT) – nome do usuário  
    - `email` (TEXT) – e-mail único  
    - `password` (TEXT) – senha  
    - `birth_date` (DATE) – data de nascimento  
    - `created_at` (TIMESTAMP) – registro de criação  

- **EventModel**  
  - Tabela: `events`  
  - Campos:  
    - `id` (UUID) – chave primária  
    - `user_id` (UUID) – FK para `users.id`  
    - `title` (TEXT) – título do evento  
    - `description` (TEXT) – descrição opcional  
    - `event_date` (DATE) – data do evento  
    - `created_at` (TIMESTAMP) – registro de criação  

- **TaskModel**  
  - Tabela: `tasks`  
  - Campos:  
    - `id` (UUID) – chave primária  
    - `event_id` (UUID) – FK para `events.id`  
    - `title` (TEXT) – título da tarefa  
    - `size` (TEXT) – tamanho da tarefa  
    - `duration_minutes` (NUMERIC) – duração em minutos  
    - `done` (BOOLEAN) – status de conclusão  
    - `created_at` (TIMESTAMP) – registro de criação  

Todos os Models são acessados no backend pelos serviços em `services/` e manipulados pelos Controllers em `controllers/`, seguindo o padrão MVC sem uso de ORM.

### 3.2. Arquitetura (Semana 5)

mermaid
flowchart TB
    subgraph View [View<br>Interface]
        A[Frontend HTML/JS]
    end

    subgraph Controller [Controller<br>Business Logic]
        B[UserController\nEventController\nTaskController]
    end

    subgraph Model [Model<br>Data Layer]
        C[(PostgreSQL Tables:\nusers, events, tasks)]
    end

    A -->|HTTP Request| B
    B -->|SQL Query| C
    C -->|Query Result| B
    B -->|HTTP Response| A


**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.

### 3.3. Wireframes (Semana 03)

<br>
<div align="center">
<sub>Login</sub>
<br>
<br>
<img src="/assets/projeto.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Cadastro</sub>
<br>
<br>
<img src="/assets/projeto1.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Home</sub>
<br>
<br>
<img src="/assets/projeto2.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Lembretes</sub>
<br>
<br>
<img src="/assets/projeto3.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Nova Lista</sub>
<br>
<br>
<img src="/assets/projeto4.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Lista Diaria</sub>
<br>
<br>
<img src="/assets/projeto5.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Lista Semanal</sub>
<br>
<br>
<img src="/assets/projeto6.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Lista Mensal</sub>
<br>
<br>
<img src="/assets/projeto7.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

<br>
<div align="center">
<sub>Wireframe</sub>
<br>
<br>
<img src="/assets/wireframe.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

https://www.figma.com/design/mgrzrAlEB3nWsHy0Y6y6m9/Untitled?node-id=0-1&t=QlKaFikn6DfYV655-1


### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)
  
https://docs.google.com/document/d/1vj0mvv-DinUWmTqMJxs-_Lmc_Cl4yF1V9EtyZoEtSvw/edit?usp=sharing

### 3.7 Interface e Navegação (Semana 07)

Durante esse entrega,fui incluindo a criação de um layout consistente, com uma barra lateral de navegação e as páginas principais do sistema, junto com uma logo. A seguir, descreverei brevemente o proceso:

1. Dashboard
Sendo o ponto de entrada após o login, apresenta atalhos para as principais funcionalidades.
Código: o codigo da pagina home esta em dashboard.html com estrutura de <aside> para a sidebar e <main> para o conteúdo,com um  CSS inline para o layout de cards, botões de navegação que redirecionam para reminders.html, newevent.html, daily.html, weekly.html e monthly.html.
<br>
<div align="center">
<sub>Home Page</sub>
<br>
<br>
<img src="/assets/painelpage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

2. Barra Lateral de Navegação (Sidebar)
Disponibiliza links permanentes para as seções do sistema e permitir logout alem de possuir atalhos para todas as outras paginas.
Código: Componente <aside class="sidebar"> em cada página HTML, CSS em estilos.css tendo seletor .sidebar para cor de fundo, espaçamento e responsividade, inclusão de logo via <img src="/assets/Logoprojeto.png" alt="Logo do Sistema">.
<br>
<div align="center">
<sub>Barra Lateral</sub>
<br>
<br>
<img src="/assets/sidebar.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

3. Página de Lembretes (reminders.html)
Lista os lembretes existentes e permitir criação/edição via modal.
Código: HTML com <ul id="reminders-list"> para renderização dinamicamente via reminder.js, Modal de formulário em HTML/CSS+JavaScript para criar e editar lembretes, consumo da API REST /reminders pelo frontend.
<br>
<div align="center">
<sub>Lembretes Page</sub>
<br>
<br>
<img src="/assets/lembretespage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

4. Novo Evento (newevent.html)
Cria eventos com título, descrição, data e hora, integrando-os posteriormente às listas diárias, semanais e mensais.
Código: Formulário com campos title, description, event_date e event_time, event.js monta o payload { title, description, event_datetime } e faz POST em /events,
<br>
<div align="center">
<sub>Novo Evento</sub>
<br>
<br>
<img src="/assets/eventopage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

5. Lista Diária (daily.html)
Exibe um grid de 24 horas (00:00–23:00) para futuramente alocar events/reminders por horário.
Código: HTML/CSS definem .daily-grid com display: grid, daily.js popula as horas dinamicamente via loop em JavaScript.
<br>
<div align="center">
<sub>Lista Diaria</sub>
<br>
<br>
<img src="/assets/diariopage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

6. Lista Semanal (weekly.html)
Apresenta cada dia da semana em uma lista vertical para alocação de eventos/reminders diários.
Código: <ul class="weekly-list"> com os dias da semana, estilização em CSS via seletor .weekly-list li, weekly.js consumirá futuramente /events/semanal.
<br>
<div align="center">
<sub>Lista Semanal</sub>
<br>
<br>
<img src="/assets/semanapage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

7. Lista Mensal (monthly.html)
Renderiza um calendário mensal estruturado em tabela para visualizar eventos ao longo do mês.
Código: <table class="monthly-calendar"> com cabeçalho de weekdays e células de datas, CSS define bordas e espaçamento, monthly.js consumirá /events/mensal?month=YYYY-MM e injetará os eventos nas células correspondentes.
<br>
<div align="center">
<sub>Lista Mensal</sub>
<br>
<br>
<img src="/assets/mespage.png" width="100%">
<br>
<br>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
<br>

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
