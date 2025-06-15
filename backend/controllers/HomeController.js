// backend/controllers/HomeController.js
const UserService = require('../services/userServices');

const HomeController = {
  // Lista todos os usuários
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca um usuário por ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cria um novo usuário
  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Atualiza usuário existente
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await UserService.updateUser(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Exclui usuário
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UserService.deleteUser(id);
      if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Autentica usuário (login)
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.authenticate(email, password);
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = HomeController;
