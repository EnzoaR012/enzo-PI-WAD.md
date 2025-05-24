const ListService = require('../services/listServices');

const listController = {
  list: async (req, res) => {
    try {
      const lists = await ListService.getAllLists();
      res.json(lists);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const list = await ListService.createList(req.body);
      res.status(201).json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addTask: async (req, res) => {
    const { list_id, task_id } = req.body;
    try {
      await ListService.addTaskToList(list_id, task_id);
      res.json({ message: 'Task adicionada à lista com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = listController;
