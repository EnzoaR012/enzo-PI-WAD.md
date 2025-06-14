// backend/server.js

require('dotenv').config();
console.log('🔹 server.js carregado, iniciando aplicação...');

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const app     = express();
const pool    = require('./config/db');

// 1) Teste de conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no DB:', err.message);
  } else {
    console.log('✅ Conectado ao DB. Horário do servidor:', res.rows[0].now);
  }
});

// 2) Listar tabelas (opcional)
pool.query(
  `SELECT table_name 
     FROM information_schema.tables 
    WHERE table_schema='public';`,
  (err, res) => {
    if (err) {
      console.error('❌ Erro ao listar tabelas:', err.message);
    } else {
      console.log('📚 Tabelas no DB:', res.rows.map(r => r.table_name).join(', '));
    }
  }
);

// 3) Rotas de API
const userRoutes     = require('./routes/userRoutes');
const eventRoutes    = require('./routes/eventRoutes');
const taskRoutes     = require('./routes/taskRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const listRoutes     = require('./routes/listRoutes');

// 4) Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5) Servir assets (pasta fora de frontend)
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// 6) Servir o frontend estático
app.use(express.static(path.join(__dirname, '../frontend')));

// 7) Rota raiz → redireciona para login
app.get('/', (req, res) => res.redirect('/index.html'));

// 8) Enviar HTML explicitamente (opcional)
//    Ajuste newlist → newevent
app.get('/index.html',    (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, '../frontend/register.html')));
app.get('/dashboard.html',(req, res) => res.sendFile(path.join(__dirname, '../frontend/dashboard.html')));
app.get('/reminders.html',(req, res) => res.sendFile(path.join(__dirname, '../frontend/reminders.html')));
app.get('/newevent.html',(req, res) => res.sendFile(path.join(__dirname, '../frontend/newevent.html')));
app.get('/daily.html',    (req, res) => res.sendFile(path.join(__dirname, '../frontend/daily.html')));
app.get('/weekly.html',   (req, res) => res.sendFile(path.join(__dirname, '../frontend/weekly.html')));
app.get('/monthly.html',  (req, res) => res.sendFile(path.join(__dirname, '../frontend/monthly.html')));

// 9) Logout
app.get('/logout', (req, res) => res.redirect('/index.html'));

// 10) Montagem das APIs
app.use('/users',     userRoutes);
app.use('/events',    eventRoutes);
app.use('/tasks',     taskRoutes);
app.use('/reminders', reminderRoutes);
app.use('/lists',     listRoutes);

// 11) Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`🔗 Abra http://localhost:${PORT}/dashboard.html para acessar a interface.`);
});
