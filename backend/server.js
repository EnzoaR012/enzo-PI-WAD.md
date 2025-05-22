// Carrega variáveis de ambiente antes de tudo
require('dotenv').config();
console.log('🔹 server.js carregado, iniciando aplicação...');

const express = require('express');
const cors    = require('cors');
const app     = express();
const pool    = require('./config/db');

// Teste de conexão inicial ao banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no DB:', err.message);
  } else {
    console.log('✅ Conectado ao DB. Horário do servidor:', res.rows[0].now);
  }
});

// Lista tabelas existentes para diagnóstico
pool.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema='public';`,
  (err, res) => {
    if (err) {
      console.error('❌ Erro ao listar tabelas:', err.message);
    } else {
      console.log('📚 Tabelas no DB:', res.rows.map(r => r.table_name).join(', '));
    }
  }
);

// Importa rotas
const userRoutes  = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const taskRoutes  = require('./routes/taskRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz interativa com links para endpoints
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>API Rotas Disponíveis</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    h1 { color: #333; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { text-decoration: none; color: #0066cc; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Rotas Disponíveis</h1>
  <ul>
    <li><strong>GET</strong> <a href="/users">/users</a> – Lista usuários</li>
    <li><strong>POST</strong> <a href="/users">/users</a> – Cria usuário</li>
    <li><strong>GET</strong> <a href="/events">/events</a> – Lista eventos</li>
    <li><strong>POST</strong> <a href="/events">/events</a> – Cria evento</li>
    <li><strong>GET</strong> <a href="/tasks">/tasks</a> – Lista tarefas</li>
    <li><strong>POST</strong> <a href="/tasks">/tasks</a> – Cria tarefa</li>
  </ul>
</body>
</html>
  `);
});

// Monta as rotas
app.use('/users',  userRoutes);
app.use('/events', eventRoutes);
app.use('/tasks',  taskRoutes);

// Inicia servidor escutando em todas as interfaces
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
