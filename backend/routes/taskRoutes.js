const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rota para listar todas as tasks
router.get('/', taskController.getTasks);

// Criar nova task
router.post('/', taskController.createTask);

// Atualizar task existente
router.put('/:id', taskController.updateTask);

// Excluir task existente
router.delete('/:id', taskController.deleteTask);

module.exports = router;
