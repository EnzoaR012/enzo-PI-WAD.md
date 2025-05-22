const TaskService = require('../services/taskServices');

const taskController = {
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
  }
};

module.exports = taskController;

