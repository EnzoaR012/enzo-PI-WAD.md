const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

// Lista todos os usuários
router.get('/', HomeController.getUsers);

// Busca usuário por ID (para edição)
router.get('/:id', HomeController.getUserById);

// Cria um novo usuário
router.post('/', HomeController.createUser);

// Atualiza usuário existente
router.put('/:id', HomeController.updateUser);

// Exclui usuário
router.delete('/:id', HomeController.deleteUser);

// Rota de login
router.post('/login', HomeController.loginUser);

module.exports = router;
