// backend/services/eventServices.js
const pool = require('../config/db');

const getAllEvents = async () => {
  const result = await pool.query(
    `SELECT 
       id,
       user_id,
       title,
       description,
       event_datetime,
       created_at
     FROM events
     ORDER BY event_datetime`
  );
  return result.rows;
};

const createEvent = async ({ user_id, title, description = null, event_datetime }) => {
  const result = await pool.query(
    `INSERT INTO events (user_id, title, description, event_datetime)
     VALUES ($1, $2, $3, $4)
     RETURNING 
       id,
       user_id,
       title,
       description,
       event_datetime,
       created_at`,
    [user_id, title, description, event_datetime]
  );
  return result.rows[0];
};

module.exports = {
  getAllEvents,
  createEvent
};


