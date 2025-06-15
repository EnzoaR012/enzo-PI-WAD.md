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
 segue o link para o figma
https://www.figma.com/design/mgrzrAlEB3nWsHy0Y6y6m9/Untitled?node-id=0-1&t=QlKaFikn6DfYV655-1


### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)
Segue o link descrevendo os endpoints
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
## Visão Geral do Sistema Web (PI-WAD)

A aplicação do site foi construída seguindo uma arquitetura full-stack modular, com um backend em Node.js/Express conectado a um PostgreSQL, e um frontend em HTML/CSS/JS vanila que consome APIs REST. No backend, o ponto de entrada é o server.js, que carrega variáveis de ambiente, inicializa o pool de conexões com o PostgreSQL via pg-pool e expõe duas camadas de funcionalidade:
-Rotas estáticas e assets
-Usa express.static para servir todo o conteúdo da pasta /frontend sob /.
-Expõe a pasta /assets (logo, imagens) via app.use('/assets', express.static(...)).
-Define rotas explícitas para cada página HTML (login, registro, dashboard, lembretes, novo evento, listas).
-APIs REST
Cada recurso (Users, Events, Tasks, Reminders, Lists) segue o padrão:
-Routes recebem as requisições em /users, /events, /tasks, /reminders, /lists.
-Controllers (*.js em /controllers) extraem parâmetros, fazem validação básica (por exemplo, campos obrigatórios, formato de data/hora, escopo válido) e chamam o Service, retornando JSON ou códigos de erro HTTP.
-Services (*.js em /services) encapsulam as queries SQL, usando prepared statements ($1, $2…) para segurança. Exemplos:
-eventServices.getAllEvents() faz SELECT id, title, description, event_datetime… ORDER BY event_datetime.
-Métodos especializados filtram por data (WHERE DATE(event_datetime)=…), intervalo semanal ou mês (TO_CHAR(event_datetime,'YYYY-MM') = …).

A camada de modelagem de dados no PostgreSQL define tabelas com UUIDs, chaves estrangeiras referenciando integridade (por exemplo, reminders.user_id → users.id) e campos de timestamp.Internamente, o server.js conecta todas as routes (app.use('/events', eventRoutes) etc.) após configurar o middleware JSON e CORS, e inicializa o servidor em http://localhost:3000. No frontend, cada página HTML herda um layout uniforme: 
-<aside class="sidebar"> com a logo (<img src="/assets/Logoprojeto.png">), links de navegação e botão de logout que limpa sessionStorage e redireciona ao login.
-O CSS global (css/estilos.css) usa CSS Custom Properties para cores, tipografia e espaçamentos, além de regras de reset e responsividade básica.

Cada página carrega um script em JS específico sendo esses:

Login / Cadastro (auth.js):
Captura submit dos formulários de #login-form e #register-form. Envia POST /users/login ou POST /users com JSON, armazena o objeto user em sessionStorage e redireciona ao /dashboard.html.

Dashboard:
Contém cards que apontam para /reminders.html, /newevent.html, /daily.html, /weekly.html, /monthly.html.

Lembretes (reminder.js):
Ao carregar, faz GET /reminders, popula <ul id="reminders-list"> com cada lembrete e associa botões “Editar” abre modal via GET /reminders/:id e “Excluir” chama  o DELETE /reminders/:id. O modal de criação/edição dispara POST /reminders ou PUT /reminders/:id com título, data e descrição.

Novo Evento (event.js):
Formulário com campos de título, descrição, data e hora. Dando submit, concatena data + hora em ISO 860 e faz POST /events incluindo user_id, title, description, event_datetime. Apos terminar, exibe alerta e retorna ao dashboard.

Listas:
-Diária (daily.js): gera dinamicamente 24 células de hora num grid CSS (display: grid; grid-template-columns: repeat(4,1fr);), pronto para no futuro injetar eventos nesse calendário horário.
-Semanal (weekly.js): consome GET /events/semanal?start=…&end=…, itera dias (Domingo a Sábado) e exibe cada lista com data e título do evento.
-Mensal (monthly.js): consome GET /events/mensal?month=YYYY-MM, constrói uma tabela HTML de 7 colunas (dias da semana) e preenche as células correspondentes a cada dia com eventos daquele mês.
Em geral o site entrega uma jornada completa de cadastro e login, criação e listagem de lembretes, criação de eventos com data/hora, e visões em lista e calendário para apoiar a gestão diária, semanal e mensal de atividades. A separação clara entre Controllers, Services e rotas no backend, aliada ao uso de CSS modular e scripts JS focados em cada página, garante manutenibilidade e fácil extensão futura.

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

<figure>
  <video controls width="100%">
    <source src="/assets/videosite.mp4" type="video/mp4">
    Seu navegador não suporta o elemento <code>video</code>.
  </video>
  <figcaption>
    <sub>VÍDEO 1 – Demonstração do site</sub><br>
    <sup>Fonte: Material produzido pelo autore, 2025</sup>
  </figcaption>
</figure>

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

Por fim a maior parte das funcionalidades centrais do Projeto e posso identificar claramente onde o trabalho se destacou e quais aspectos ainda pode melhorar.

Do lado positivo, a arquitetura em camadas mostrou-se robusta: o backend em Node.js com Express e PostgreSQL entrega uma API REST coerente, modular e fácil de estender; a separação clara entre serviços, controladores e rotas facilitou tanto o desenvolvimento quanto a manutenção. No frontend, adotamos um padrão de componentes HTML/CSS+JavaScript puro que garante um visual uniforme (barra lateral, cards, modais) e responsivo, sem dependência de frameworks pesados. A listagem dinâmica de lembretes, criação de eventos com data e hora e as visualizações de agenda diária, semanal e mensal já formam um esqueleto funcional do sistema.

Por outro lado, ainda tenho pontos a melhorar. Falta implementar autenticação e autorização adequadas (hoje usamos user_id “manual” nos payloads), o que é crítico para tornar o sistema seguro em produção. A experiência de usuário pode ser aprimorada com mensagens de erro mais amigáveis, validações de formulário mais completas e feedback visual (por exemplo, estados de loading ou sucesso). A integração dos eventos nos calendários diário, semanal e mensal ainda está “estática” – precisamos consumir a API de eventos nesses contextos e posicionar cada compromisso na célula correta. Também precisamos adicionar cobertura de testes automatizados (unitários e de integração) para garantir a confiabilidade das rotas e dos componentes de interface.

Para o futuro, planejamento:
-Autenticação completa: implementar login via JWT ou sessão, proteger rotas do backend e adaptar o frontend para armazenar token/credenciais com segurança.
-Integração de eventos na agenda: consumir endpoints específicos (/events/diario, /events/semanal, /events/mensal) e injetar cada evento na célula correta do grid, habilitando edição direta no calendário.
-Notificações e lembretes: agendar alertas de eventos pendentes (via email ou push), usando a tabela de reminders já criada.
-Recorrência e repetições: permitir criar eventos periódicos (diários, semanais, mensais) e estender o modelo de dados para suportar regras de recorrência.
-Melhorias de usabilidade: arrastar e soltar tarefas na agenda, editar diretamente no modal de cada célula, temas claro/escuro e acessibilidade.
-PWA e offline: transformar o frontend em uma Progressive Web App para uso offline e instalação em dispositivos móveis.
Com essas evoluções, o Projeto poderá entregar uma experiência mais completa, segura e escalável, acompanhando fielmente as necessidades de organização de tarefas, lembretes e eventos  de cada usuário.



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
