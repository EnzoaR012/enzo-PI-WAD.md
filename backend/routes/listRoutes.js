const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/',       listController.list);
router.post('/',      listController.create);
router.post('/task',  listController.addTask);

module.exports = router;
