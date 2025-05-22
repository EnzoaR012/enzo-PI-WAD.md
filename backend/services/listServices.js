const pool = require('../config/db');

const getAllLists = async () => {
  const { rows } = await pool.query('SELECT * FROM lists');
  return rows;
};

const createList = async ({ user_id, name, scope }) => {
  const { rows } = await pool.query(
    `INSERT INTO lists (user_id, name, scope)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, name, scope]
  );
  return rows[0];
};

const addTaskToList = async (list_id, task_id) => {
  await pool.query(
    `INSERT INTO list_tasks (list_id, task_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [list_id, task_id]
  );
};

module.exports = {
  getAllLists,
  createList,
  addTaskToList
};
