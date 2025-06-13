// backend/routes/eventRoutes.js
const express = require('express');
const router  = express.Router();
const eventController = require('../controllers/eventController');

// GET /events
router.get('/', eventController.list);

// GET /events/diario?date=YYYY-MM-DD
router.get('/diario', eventController.listByDate);

// GET /events/semanal?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/semanal', eventController.listByRange);

// GET /events/mensal?month=YYYY-MM
router.get('/mensal', eventController.listByMonth);

// POST /events
router.post('/', eventController.create);

module.exports = router;
