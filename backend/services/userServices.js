// backend/services/userServices.js
const pool = require('../config/db');

const UserService = {
  // Retorna todos os usuários
  getAllUsers: async () => {
    const result = await pool.query(
      'SELECT id, name, email, birth_date FROM users ORDER BY id'
    );
    return result.rows;
  },

  // Retorna um usuário pelo ID
  getUserById: async (id) => {
    const result = await pool.query(
      'SELECT id, name, email, birth_date FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  // Cria um novo usuário
  createUser: async ({ name, email, password, birth_date }) => {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, birth_date)
       VALUES ($1, $2, $3, $4) RETURNING id, name, email, birth_date`,
      [name, email, password, birth_date]
    );
    return result.rows[0];
  },

  // Atualiza usuário existente
  updateUser: async (id, { name, email, birth_date }) => {
    const result = await pool.query(
      `UPDATE users
         SET name = $1,
             email = $2,
             birth_date = $3
       WHERE id = $4
       RETURNING id, name, email, birth_date`,
      [name, email, birth_date, id]
    );
    return result.rows[0] || null;
  },

  // Exclui um usuário pelo ID
  deleteUser: async (id) => {
    const res = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return res.rowCount > 0;
  },

  // Autentica usuário (login)
  authenticate: async (email, password) => {
    const result = await pool.query(
      `SELECT id, name, email, birth_date
         FROM users
        WHERE email = $1 AND password = $2`,
      [email, password]
    );
    return result.rows[0] || null;
  }
};

module.exports = UserService;
