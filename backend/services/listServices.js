// backend/services/listServices.js
const pool = require('../config/db');

const getAllLists = async () => {
  // lista todas as listas, ordenadas pela data de criação
  const { rows } = await pool.query(
    `SELECT id, user_id, name, description, scope, created_at
       FROM lists
   ORDER BY created_at DESC`
  );
  return rows;
};

const getListsByScope = async (scope) => {
  // lista apenas as listas de um determinado scope
  const { rows } = await pool.query(
    `SELECT id, user_id, name, description, scope, created_at
       FROM lists
      WHERE scope = $1
   ORDER BY created_at DESC`,
    [scope]
  );
  return rows;
};

const createList = async ({ user_id, name, description = null, scope }) => {
  const { rows } = await pool.query(
    `INSERT INTO lists (user_id, name, description, scope)
     VALUES ($1, $2, $3, $4)
     RETURNING id, user_id, name, description, scope, created_at`,
    [user_id, name, description, scope]
  );
  return rows[0];
};

const addTaskToList = async (list_id, task_id) => {
  await pool.query(
    `INSERT INTO list_tasks (list_id, task_id)
     VALUES ($1, $2)
     ON CONFLICT (list_id, task_id) DO NOTHING`,
    [list_id, task_id]
  );
};

module.exports = {
  getAllLists,
  getListsByScope,
  createList,
  addTaskToList,
};
