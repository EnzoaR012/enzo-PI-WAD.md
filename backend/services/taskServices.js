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

const updateTask = async (id, { title, size, duration_minutes, done }) => {
  const result = await pool.query(
    `UPDATE tasks
       SET title = $1,
           size = $2,
           duration_minutes = $3,
           done = $4,
           updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
    RETURNING *`,
    [title, size, duration_minutes, done, id]
  );
  return result.rows[0];  // undefined se não encontrou
};

const deleteTask = async (id) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];  // undefined se não encontrou
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
