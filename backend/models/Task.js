const pool = require('../config/db');


async function getAllTasks() {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
  return rows;
}


async function getTaskById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE id = $1',
    [id]
  );
  return rows[0];
}


async function createTask({ description, done = false }) {
  const { rows } = await pool.query(
    `INSERT INTO tasks (description, done)
     VALUES ($1, $2)
     RETURNING *`,
    [description, done]
  );
  return rows[0];
}


async function updateTask(id, fields) {
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const key in fields) {
    sets.push(`${key} = $${idx}`);
    vals.push(fields[key]);
    idx++;
  }
  const { rows } = await pool.query(
    `UPDATE tasks SET ${sets.join(', ')}
     WHERE id = $${idx}
     RETURNING *`,
    [...vals, id]
  );
  return rows[0] || null;
}


async function deleteTask(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM tasks WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
