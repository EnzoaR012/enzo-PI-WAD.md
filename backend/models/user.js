//# Definição de modelos de dados (estrutura do banco)
const pool = require('../config/db');


async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM users ORDER BY id');
  return rows;
}


async function getUserById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return rows[0];
}


async function createUser({ name, email }) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING *`,
    [name, email]
  );
  return rows[0];
}


async function updateUser(id, fields) {
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const key in fields) {
    sets.push(`${key} = $${idx}`);
    vals.push(fields[key]);
    idx++;
  }
  const { rows } = await pool.query(
    `UPDATE users SET ${sets.join(', ')}
     WHERE id = $${idx}
     RETURNING *`,
    [...vals, id]
  );
  return rows[0] || null;
}


async function deleteUser(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
