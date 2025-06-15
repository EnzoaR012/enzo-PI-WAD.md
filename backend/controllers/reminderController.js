// backend/controllers/reminderController.js
const pool = require('../config/db');

// Lista todos os lembretes
exports.listAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, date, created_at FROM reminders ORDER BY created_at DESC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar lembretes.' });
  }
};

// Busca um lembrete pelo ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, title, description, date, created_at FROM reminders WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lembrete não encontrado.' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar lembrete.' });
  }
};

// Cria um novo lembrete
exports.create = async (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: 'Título e data são obrigatórios.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO reminders (title, description, date) VALUES ($1, $2, $3) RETURNING id, title, description, date, created_at',
      [title, description || null, date]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar lembrete.' });
  }
};

// Atualiza um lembrete existente
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: 'Título e data são obrigatórios.' });
  }
  try {
    const updateRes = await pool.query(
      'UPDATE reminders SET title=$1, description=$2, date=$3 WHERE id=$4 RETURNING id, title, description, date, created_at',
      [title, description || null, date, id]
    );
    if (updateRes.rows.length === 0) {
      return res.status(404).json({ error: 'Lembrete não encontrado.' });
    }
    return res.json(updateRes.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar lembrete.' });
  }
};

// Remove um lembrete pelo ID
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const delRes = await pool.query('DELETE FROM reminders WHERE id=$1', [id]);
    if (delRes.rowCount === 0) {
      return res.status(404).json({ error: 'Lembrete não encontrado.' });
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar lembrete.' });
  }
};

