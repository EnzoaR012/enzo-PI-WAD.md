const pool = require('../config/db');

const getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const createTask = async ({ event_id, title, size, duration_minutes, done }) => {
  const result = await pool.query(
    `INSERT INTO tasks 
       (event_id, title, size, duration_minutes, done) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [event_id, title, size, duration_minutes, done]
  );
  return result.rows[0];
};

module.exports = {
  getAllTasks,
  createTask
};
