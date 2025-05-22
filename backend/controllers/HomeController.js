//# Lógica de controle das requisições
const UserService = require('../services/userServices');

const HomeController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = HomeController;
