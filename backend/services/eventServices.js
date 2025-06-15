// backend/services/eventServices.js
const pool = require('../config/db');

const getAllEvents = async () => {
  const result = await pool.query(`
    SELECT
      id,
      user_id,
      title,
      description,
      event_datetime,
      created_at
    FROM events
    ORDER BY event_datetime
  `);
  return result.rows;
};

const getEventsByDate = async (date) => {
  // date no formato "YYYY-MM-DD"
  const result = await pool.query(`
    SELECT
      id,
      user_id,
      title,
      description,
      event_datetime,
      created_at
    FROM events
    WHERE DATE(event_datetime) = $1
    ORDER BY event_datetime
  `, [date]);
  return result.rows;
};

const getEventsInRange = async (weekStart, weekEnd) => {
  // weekStart, weekEnd no formato "YYYY-MM-DD"
  const result = await pool.query(`
    SELECT
      id,
      user_id,
      title,
      description,
      event_datetime,
      created_at
    FROM events
    WHERE event_datetime >= $1::timestamptz
      AND event_datetime <= $2::timestamptz
    ORDER BY event_datetime
  `, [
    `${weekStart}T00:00:00`,
    `${weekEnd}T23:59:59`
  ]);
  return result.rows;
};

const getEventsByMonth = async (month) => {
  // month no formato "YYYY-MM"
  const result = await pool.query(`
    SELECT
      id,
      user_id,
      title,
      description,
      event_datetime,
      created_at
    FROM events
    WHERE TO_CHAR(event_datetime, 'YYYY-MM') = $1
    ORDER BY event_datetime
  `, [month]);
  return result.rows;
};

const createEvent = async ({ user_id, title, description = null, event_datetime }) => {
  const result = await pool.query(`
    INSERT INTO events (user_id, title, description, event_datetime)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      user_id,
      title,
      description,
      event_datetime,
      created_at
  `, [user_id, title, description, event_datetime]);
  return result.rows[0];
};

module.exports = {
  getAllEvents,
  getEventsByDate,
  getEventsInRange,
  getEventsByMonth,
  createEvent
};
