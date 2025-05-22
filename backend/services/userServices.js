//# Serviços auxiliares do sistema
const pool = require('../config/db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const createUser = async ({ name, email, password, birth_date }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, birth_date]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser
};
