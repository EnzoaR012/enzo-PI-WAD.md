const pool = require('../config/db');

const getAllEvents = async () => {
  const result = await pool.query('SELECT * FROM events');
  return result.rows;
};

const createEvent = async ({ user_id, title, description, event_date }) => {
  const result = await pool.query(
    'INSERT INTO events (user_id, title, description, event_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, title, description, event_date]
  );
  return result.rows[0];
};

module.exports = {
  getAllEvents,
  createEvent
};
