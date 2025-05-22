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
      console.log('📚 Tabelas no DB:', res.rows.map(row => row.table_name).join(', '));
    }
  }
);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no DB:', err.message);
  } else {
    console.log('✅ Conectado ao DB. Horário do servidor:', res.rows[0].now);
  }
});

// Importa rotas
const userRoutes  = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const taskRoutes  = require('./routes/taskRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz para facilitar testes
app.get('/', (req, res) => {
  res.send('API rodando! Use /users, /events ou /tasks');
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
