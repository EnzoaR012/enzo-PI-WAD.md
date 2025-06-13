const pool = require('../config/db');   

async function getAllLists() {   
  const { rows } = await pool.query('SELECT * FROM lists ORDER BY id');   
  return rows; 
}   

async function getListById(id) {   
  const { rows } = await pool.query(     
    'SELECT * FROM lists WHERE id = $1',     
    [id]   
  );   
  return rows[0]; 
}   

async function createList({ title }) {   
  const { rows } = await pool.query(     
    `INSERT INTO lists (title)      
     VALUES ($1)      
     RETURNING *`,     
    [title]   
  );   
  return rows[0]; 
}   

async function addTaskToList(listId, taskId) {   
  await pool.query(     
    `INSERT INTO list_tasks (list_id, task_id)      
     VALUES ($1, $2)`,     
    [listId, taskId]   
  ); 
}   

module.exports = {   
  getAllLists,   
  getListById,   
  createList,   
  addTaskToList, 
};