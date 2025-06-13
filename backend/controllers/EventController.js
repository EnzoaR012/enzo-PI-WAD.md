// backend/controllers/eventController.js
const eventService = require('../services/eventServices');

const EventController = {
  /**
   * GET /events
   * Se vier query ?date=YYYY-MM-DD → eventos desse dia
   * Se vier ?weekStart=YYYY-MM-DD&weekEnd=YYYY-MM-DD → eventos desse intervalo
   * Se vier ?month=YYYY-MM → eventos desse mês
   * Caso contrário → todos os eventos
   */
  list: async (req, res) => {
    try {
      const { date, weekStart, weekEnd, month } = req.query;
      let events;

      if (date) {
        // filtra pelo dia exato
        events = await eventService.getEventsByDate(date);
      } else if (weekStart && weekEnd) {
        // filtra pelo intervalo (semana)
        events = await eventService.getEventsInRange(weekStart, weekEnd);
      } else if (month) {
        // filtra pelo mês
        events = await eventService.getEventsByMonth(month);
      } else {
        // todos
        events = await eventService.getAllEvents();
      }

      return res.json(events);
    } catch (err) {
      console.error('Erro listando eventos:', err);
      return res.status(500).json({ error: 'Erro ao listar eventos.' });
    }
  },

  /**
   * POST /events
   * body precisa de { user_id, title, event_datetime, description? }
   */
  create: async (req, res) => {
    const {
      user_id,               // provisório: enquanto não houver auth real
      title,
      description = null,
      event_datetime         // ISO string "YYYY-MM-DDTHH:MM:SS"
    } = req.body;

    // validações
    if (!user_id || !title || !event_datetime) {
      return res.status(400).json({
        error: 'Os campos "user_id", "title" e "event_datetime" são obrigatórios.'
      });
    }

    // valida timestamp
    const dt = new Date(event_datetime);
    if (isNaN(dt.getTime())) {
      return res.status(400).json({
        error: 'Formato de "event_datetime" inválido. Use ISO "YYYY-MM-DDTHH:MM:SS".'
      });
    }

    try {
      const newEvent = await eventService.createEvent({
        user_id,
        title,
        description,
        event_datetime: dt
      });
      return res.status(201).json(newEvent);
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      return res.status(500).json({ error: 'Erro ao criar evento.' });
    }
  }
};

module.exports = EventController;
