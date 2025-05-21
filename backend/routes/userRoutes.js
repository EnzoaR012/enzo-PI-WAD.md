const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /users - listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// POST /users - adicionar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, data_nascimento, status } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (nome, email, senha, data_nascimento, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, email, senha, data_nascimento, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar usuário:', err);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

module.exports = router;
