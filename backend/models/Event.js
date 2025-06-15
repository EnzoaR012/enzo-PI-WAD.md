const pool = require('../config/db');


async function getAllEvents() {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY id');
  return rows;
}


async function getEventById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM events WHERE id = $1',
    [id]
  );
  return rows[0];
}


async function createEvent({ title, date, location }) {
  const { rows } = await pool.query(
    `INSERT INTO events (title, date, location)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, date, location]
  );
  return rows[0];
}


async function updateEvent(id, fields) {
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const key in fields) {
    sets.push(`${key} = $${idx}`);
    vals.push(fields[key]);
    idx++;
  }
  const { rows } = await pool.query(
    `UPDATE events SET ${sets.join(', ')}
     WHERE id = $${idx}
     RETURNING *`,
    [...vals, id]
  );
  return rows[0] || null;
}


async function deleteEvent(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM events WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}


module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
