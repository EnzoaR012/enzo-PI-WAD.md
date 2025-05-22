const ReminderService = require('../services/reminderServices');

const reminderController = {
  list: async (req, res) => {
    try {
      const reminders = await ReminderService.getAllReminders();
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const reminder = await ReminderService.createReminder(req.body);
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = reminderController;
