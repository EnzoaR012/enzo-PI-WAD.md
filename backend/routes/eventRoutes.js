const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.getEvents);
router.post('/', EventController.createEvent);

module.exports = router;
