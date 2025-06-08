// backend/controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { name, surname, cpf, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Senhas não coincidem." });
    }
    // Hash da senha
    const hashed = await bcrypt.hash(password, 10);
    // Insere usuário no DB
    const result = await pool.query(
      "INSERT INTO users (name, surname, cpf, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email",
      [name, surname, cpf, email, hashed]
    );
    return res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar conta." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Busca usuário pelo email
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!userRes.rows.length) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }
    const user = userRes.rows[0];
    // Verifica senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }
    // Caso queira usar JWT, gere token aqui. Como exemplo, devolvo apenas o usuário sem a senha:
    delete user.password;
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
};
