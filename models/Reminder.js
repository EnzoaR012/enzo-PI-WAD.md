const pool = require('../config/db');


async function getAllReminders() {
  const { rows } = await pool.query('SELECT * FROM reminders ORDER BY id');
  return rows;
}


async function getReminderById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM reminders WHERE id = $1',
    [id]
  );
  return rows[0];
}


async function createReminder({ text, remind_at }) {
  const { rows } = await pool.query(
    `INSERT INTO reminders (text, remind_at)
     VALUES ($1, $2)
     RETURNING *`,
    [text, remind_at]
  );
  return rows[0];
}


async function deleteReminder(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM reminders WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}


module.exports = {
  getAllReminders,
  getReminderById,
  createReminder,
  deleteReminder,
};
