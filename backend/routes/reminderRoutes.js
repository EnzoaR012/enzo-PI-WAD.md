const express = require('express');
const router  = express.Router();
const reminderCtrl = require('../controllers/reminderController');

// GET /reminders            → lista todos os lembretes
router.get('/', reminderCtrl.listAll);

// GET /reminders/:id        → busca lembrete por ID
router.get('/:id', reminderCtrl.getById);

// POST /reminders           → cria lembrete com dados em req.body { title, description, date }
router.post('/', reminderCtrl.create);

// PUT /reminders/:id        → atualiza lembrete
router.put('/:id', reminderCtrl.update);

// DELETE /reminders/:id     → deleta lembrete
router.delete('/:id', reminderCtrl.remove);

module.exports = router;
