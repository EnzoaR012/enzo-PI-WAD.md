# enzo-PI-WAD.md
# Projeto de Gestão de Eventos

## Visão Geral

Sistema web para cadastro e gerenciamento de usuários, eventos e tarefas, desenvolvido como critério de avaliação de um projeto acadêmico. O objetivo é demonstrar a modelagem de dados em Supabase, criação de uma API REST em Node.js/Express e uma interface mínima em JavaScript puro.

## Funcionalidades

* Cadastro, listagem e criação de usuários.
* Cadastro, listagem e criação de eventos vinculados a usuários.
* Cadastro, listagem e criação de tarefas vinculadas a eventos.
* Exibição dinâmica dos dados em uma página web.

## Tecnologias Utilizadas

* **Banco de Dados**: Supabase (PostgreSQL)
* **Backend**: Node.js, Express, pg (pool de conexões)
* **Frontend**: HTML, CSS (inline) e JavaScript (Fetch API)

## Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* Conta e projeto criado no [Supabase](https://supabase.com)
* Git instalado (opcional, para clonar o repositório)

## Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/EnzoaR012/enzo-PI-WAD.md.git
   cd enzo-PI-WAD.md/backend
   ```
2. **Instale as dependências**

   ```bash
   npm install
   ```
3. **Configure a conexão com o banco**

   * No Dashboard do Supabase, copie a **Connection String** (Transaction Pooler).
   * Crie o arquivo `backend/.env` com:

     ```env
     DATABASE_URL=postgresql://postgres:SUA_SENHA@seu-host.supabase.co:5432/postgres
     PORT=3000
     ```
4. **Crie as tabelas** (se ainda não tiver)

   * No Supabase, execute este SQL:

     ```sql
     DROP TABLE IF EXISTS users, events, tasks CASCADE;
     CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, birth_date DATE NOT NULL, created_at TIMESTAMP DEFAULT NOW());
     CREATE TABLE events (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, title TEXT NOT NULL, description TEXT, event_date DATE NOT NULL, created_at TIMESTAMP DEFAULT NOW());
     CREATE TABLE tasks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), event_id UUID REFERENCES events(id) ON DELETE CASCADE, title TEXT NOT NULL, size TEXT, duration_minutes NUMERIC, done BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT NOW());
     ```

## Execução

### Backend

1. Dentro de `backend/`, rode:

   ```bash
   node server.js
   ```
2. Verifique no console:

   ```
   ```

🚀 Servidor rodando em [http://localhost:3000](http://localhost:3000)

```

### Frontend

- Abra o arquivo `frontend/index.html` em seu navegador. A página carregará automaticamente as listas de usuários, eventos e tarefas.

## Endpoints da API

| Método | Rota      | Descrição                    |
| ------ | --------- | ---------------------------- |
| GET    | `/users`  | Lista todos os usuários      |
| POST   | `/users`  | Cria um novo usuário         |
| GET    | `/events` | Lista todos os eventos       |
| POST   | `/events` | Cria um novo evento          |
| GET    | `/tasks`  | Lista todas as tarefas       |
| POST   | `/tasks`  | Cria uma nova tarefa         |

## Como Utilizar

1. Insira registros via API (cURL, Postman ou formulário frontend).
2. Atualize o frontend para ver os dados em tempo real.

---

*Desenvolvido por Enzo sob orientação de Ryan — Maio de 2025*

```
