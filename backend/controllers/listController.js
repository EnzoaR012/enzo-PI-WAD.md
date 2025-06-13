// backend/controllers/listController.js
const ListService = require('../services/listServices');

const VALID_SCOPES = ['DIARIO','SEMANAL','MENSAL','CUSTOM'];

const listController = {
  // GET /lists?scope=…
  list: async (req, res) => {
    const { scope } = req.query;

    try {
      let lists;
      if (scope) {
        const up = scope.toUpperCase();
        if (!VALID_SCOPES.includes(up)) {
          return res
            .status(400)
            .json({ error: `Scope inválido. Deve ser um de: ${VALID_SCOPES.join(', ')}` });
        }
        lists = await ListService.getListsByScope(up);
      } else {
        lists = await ListService.getAllLists();
      }
      return res.json(lists);
    } catch (err) {
      console.error('Erro listController.list:', err);
      return res.status(500).json({ error: err.message });
    }
  },

  // POST /lists
  create: async (req, res) => {
    const { user_id, name, description = null, scope } = req.body;

    if (!user_id || !name || !scope) {
      return res
        .status(400)
        .json({ error: 'Os campos user_id, name e scope são obrigatórios.' });
    }
    const up = scope.toUpperCase();
    if (!VALID_SCOPES.includes(up)) {
      return res
        .status(400)
        .json({ error: `Scope inválido. Deve ser um de: ${VALID_SCOPES.join(', ')}` });
    }

    try {
      const list = await ListService.createList({
        user_id,
        name,
        description,
        scope: up
      });
      // o service deve retornar o objeto completo com created_at
      return res.status(201).json(list);
    } catch (err) {
      console.error('Erro listController.create:', err);
      return res.status(500).json({ error: err.message });
    }
  },

  // POST /lists/task
  addTask: async (req, res) => {
    const { list_id, task_id } = req.body;

    if (!list_id || !task_id) {
      return res
        .status(400)
        .json({ error: 'Os campos list_id e task_id são obrigatórios.' });
    }

    try {
      await ListService.addTaskToList(list_id, task_id);
      return res.status(204).end();
    } catch (err) {
      console.error('Erro listController.addTask:', err);
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = listController;
