const pool = require('../config/db');

const getAllReminders = async () => {
  const { rows } = await pool.query('SELECT * FROM reminders');
  return rows;
};

const createReminder = async ({ user_id, task_id, remind_at }) => {
  const { rows } = await pool.query(
    `INSERT INTO reminders (user_id, task_id, remind_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, task_id, remind_at]
  );
  return rows[0];
};

module.exports = {
  getAllReminders,
  createReminder
};
