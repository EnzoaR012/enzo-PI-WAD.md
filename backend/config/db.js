//# Arquivos de configuração (ex: conexão com banco)
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false, // ⚠️ Isso permite certificados autoassinados
  },
});

module.exports = pool;
