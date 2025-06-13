// backend/controllers/eventController.js
const eventService = require('../services/eventServices');

const EventController = {
  // GET /events — lista todos os eventos
  list: async (req, res) => {
    try {
      const events = await eventService.getAllEvents();
      return res.json(events);
    } catch (err) {
      console.error('Erro listando eventos:', err);
      return res.status(500).json({ error: 'Erro ao listar eventos.' });
    }
  },

  // POST /events — cria um novo evento, agora recebendo um TIMESTAMP completo
  create: async (req, res) => {
    const {
      user_id,               // provisório: pull do body enquanto não há auth real
      title,
      description = null,
      event_datetime         // string ISO: "YYYY-MM-DDTHH:MM:SS"
    } = req.body;

    // validações
    if (!user_id || !title || !event_datetime) {
      return res
        .status(400)
        .json({ error: 'Os campos "user_id", "title" e "event_datetime" são obrigatórios.' });
    }

    // valida timestamp
    const dt = new Date(event_datetime);
    if (isNaN(dt)) {
      return res
        .status(400)
        .json({ error: 'Formato de "event_datetime" inválido. Use ISO "YYYY-MM-DDTHH:MM:SS".' });
    }

    try {
      const newEvent = await eventService.createEvent({
        user_id,
        title,
        description,
        event_datetime: dt  // pode enviar Date ou string ISO
      });
      return res.status(201).json(newEvent);
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      return res.status(500).json({ error: 'Erro ao criar evento.' });
    }
  }
};

module.exports = EventController;
