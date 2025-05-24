const TaskService = require('../services/taskServices');

const taskController = {
  // já existiam:
  getTasks: async (req, res) => {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // **atualização**
  updateTask: async (req, res) => {
    try {
      const updated = await TaskService.updateTask(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // **remoção**
  deleteTask: async (req, res) => {
    try {
      const removed = await TaskService.deleteTask(req.params.id);
      if (!removed) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = taskController;
