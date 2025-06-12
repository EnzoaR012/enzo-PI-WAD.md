// backend/services/reminderServices.js
const pool = require('../config/db');

const ReminderService = {
  // Retorna todos os lembretes
  getAll: async () => {
    const { rows } = await pool.query(
      'SELECT id, title, description, date, created_at FROM reminders ORDER BY created_at DESC'
    );
    return rows;
  },

  // Retorna um lembrete pelo ID
  getById: async (id) => {
    const { rows } = await pool.query(
      'SELECT id, title, description, date, created_at FROM reminders WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  // Cria um novo lembrete
  create: async ({ title, description, date }) => {
    if (!title || !date) throw new Error('Título e data são obrigatórios.');
    const { rows } = await pool.query(
      `INSERT INTO reminders (title, description, date)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, date, created_at`,
      [title, description || null, date]
    );
    return rows[0];
  },

  // Atualiza um lembrete existente
  update: async (id, { title, description, date }) => {
    if (!title || !date) throw new Error('Título e data são obrigatórios.');
    const { rows } = await pool.query(
      `UPDATE reminders
         SET title = $1,
             description = $2,
             date = $3
       WHERE id = $4
       RETURNING id, title, description, date, created_at`,
      [title, description || null, date, id]
    );
    return rows[0] || null;
  },

  // Remove um lembrete pelo ID
  remove: async (id) => {
    const res = await pool.query(
      'DELETE FROM reminders WHERE id = $1',
      [id]
    );
    return res.rowCount > 0;
  }
};

module.exports = ReminderService;
