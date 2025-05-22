const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.getUsers);
router.post('/', HomeController.createUser);

module.exports = router;
