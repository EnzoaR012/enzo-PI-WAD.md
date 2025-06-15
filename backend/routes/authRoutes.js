// backend/routes/authRoutes.js
const express = require('express');
const router  = express.Router();
const authCtrl = require('../controllers/authController');

// POST /login    → faz login (consulta email+senha no DB e retorna token ou session)
router.post('/login', authCtrl.login);

// POST /register → cria novo usuário (name, email, senha, etc.)
router.post('/register', authCtrl.register);

module.exports = router;
