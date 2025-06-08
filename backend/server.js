// backend/server.js

// 1) Carrega variáveis de ambiente antes de tudo
require('dotenv').config();
console.log('🔹 server.js carregado, iniciando aplicação...');

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const app     = express();
const pool    = require('./config/db'); // sua conexão com o DB

// 2) Teste de conexão inicial ao banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no DB:', err.message);
  } else {
    console.log('✅ Conectado ao DB. Horário do servidor:', res.rows[0].now);
  }
});

// 3) Lista tabelas existentes para diagnóstico (opcional)
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

// 4) Importa rotas de API existentes
const userRoutes     = require('./routes/userRoutes');
const eventRoutes    = require('./routes/eventRoutes');
const taskRoutes     = require('./routes/taskRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const listRoutes     = require('./routes/listRoutes');

// 5) Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6) SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND
//    Tudo dentro de "../frontend" ficará disponível sob "/"
//    Exemplo: 
//      "/index.html" → "../frontend/index.html"
//      "/css/estilos.css" → "../frontend/css/estilos.css"
//      "/js/reminder.js" → "../frontend/js/reminder.js"
//      "/img/logo.png" → "../frontend/img/logo.png"
//    ... e assim por diante para todo conteúdo estático do seu front.
app.use(express.static(path.join(__dirname, '../frontend')));

// 7) ROTA RAIZ ("/") → redireciona para a tela de login (index.html)
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// 8) EM CASO DE QUERER ENTREGAR CADA PÁGINA COM ROTA EXPLÍCITA
//    (não é estritamente necessário, já que express.static cobre, 
//     mas mantive aqui para que você tenha o controle “manual”):
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});
app.get('/reminders.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/reminders.html'));
});
app.get('/newlist.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/newlist.html'));
});
app.get('/daily.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/daily.html'));
});
app.get('/weekly.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/weekly.html'));
});
app.get('/monthly.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/monthly.html'));
});

// 9) ROTA DE LOGOUT (OPCIONAL):
//    Se você quiser invalidar algo no servidor ao deslogar, 
//    crie uma rota que limpe sessão, cookie, token etc.
//    Neste exemplo, apenas redireciona para a tela de login.
app.get('/logout', (req, res) => {
  // aqui você poderia destruir sessão ou cookie, se aplicável
  return res.redirect('/index.html');
});

// 10) MONTAGEM DAS ROTAS DE API (JSON)
//     Todas as rotas de API continuam funcionando normalmente:
app.use('/users',     userRoutes);
app.use('/events',    eventRoutes);
app.use('/tasks',     taskRoutes);
app.use('/reminders', reminderRoutes);
app.use('/lists',     listRoutes);

// 11) CATCH‐ALL OPICIONAL PARA FRONT‐END 
//     Se você quiser que qualquer rota que não seja API seja redirecionada
//     automaticamente para a tela de login, descomente abaixo:
//
// app.get('*', (req, res) => {
//   res.redirect('/index.html');
// });

// 12) INICIA O SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`🔗 Abra http://localhost:${PORT}/index.html para acessar a interface.`);
});
