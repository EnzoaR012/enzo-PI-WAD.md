const EventService = require('../services/eventServices');

const EventController = {
  getEvents: async (req, res) => {
    try {
      const events = await EventService.getAllEvents();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createEvent: async (req, res) => {
    try {
      const event = await EventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = EventController;
