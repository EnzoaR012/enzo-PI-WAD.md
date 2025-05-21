//  # Arquivo principal que inicializa o servidor

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const frontendRoutes = require('./routes/frontRoutes');
app.use('/', frontendRoutes);

// Middleware para rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Middleware para erro interno
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} , http://localhost:3000/users`);
});
