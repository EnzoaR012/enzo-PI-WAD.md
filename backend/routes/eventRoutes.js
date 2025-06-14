// backend/routes/eventRoutes.js
const express = require('express');
const router  = express.Router();

const {
  list,
  listByDate,
  listByRange,
  listByMonth,
  create
} = require('../controllers/eventController');

router.get('/',        list);
router.get('/diario',  listByDate);
router.get('/semanal', listByRange);
router.get('/mensal',  listByMonth);
router.post('/',       create);

module.exports = router;
