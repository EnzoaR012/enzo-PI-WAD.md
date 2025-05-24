const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.get('/',  reminderController.list);
router.post('/', reminderController.create);

module.exports = router;
