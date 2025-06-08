const pool = require('../config/db');

exports.listAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reminders ORDER BY created_at DESC');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar lembretes.' });
  }
};

exports.create = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reminders (title, description, date) VALUES ($1,$2,$3) RETURNING *',
      [title, description, date]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar lembrete.' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    await pool.query(
      'UPDATE reminders SET title=$1, description=$2, date=$3 WHERE id=$4',
      [title, description, date, id]
    );
    const updated = await pool.query('SELECT * FROM reminders WHERE id=$1', [id]);
    return res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar lembrete.' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM reminders WHERE id=$1', [id]);
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar lembrete.' });
  }
};
