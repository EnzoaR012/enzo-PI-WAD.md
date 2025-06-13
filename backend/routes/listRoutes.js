// backend/routes/listRoutes.js
const express = require('express');
const router  = express.Router();
const listController = require('../controllers/listController');

// GET /lists – todas as listas (sem filtro)
router.get('/', listController.list);

// GET /lists/diario – só listas DIARIO
router.get(
  '/diario',
  (req, res, next) => { req.query.scope = 'DIARIO'; next(); },
  listController.list
);

// GET /lists/semanal – só listas SEMANAL
router.get(
  '/semanal',
  (req, res, next) => { req.query.scope = 'SEMANAL'; next(); },
  listController.list
);

// GET /lists/mensal – só listas MENSAL
router.get(
  '/mensal',
  (req, res, next) => { req.query.scope = 'MENSAL'; next(); },
  listController.list
);

// POST /lists – cria lista (CUSTOM ou outro scope enviado)
router.post('/', listController.create);

// POST /lists/task – adiciona tarefa à lista
router.post('/task', listController.addTask);

module.exports = router;
