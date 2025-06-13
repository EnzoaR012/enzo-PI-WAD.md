// backend/routes/eventRoutes.js
const express = require('express');
const router  = express.Router();
const eventController = require('../controllers/eventController');

// GET /events → lista todos os eventos
router.get('/', eventController.list);

// POST /events → cria um novo evento
router.post('/', eventController.create);

module.exports = router;
