require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sql = `
-- Tabelas de usuários, eventos e tarefas
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  birth_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  size TEXT,
  duration_minutes NUMERIC,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

(async () => {
  try {
    console.log('🏗️ Executando migração do banco...');
    await pool.query(sql);
    console.log('✅ Migração concluída com sucesso.');
  } catch (err) {
    console.error('❌ Erro ao executar migração:', err.message);
  } finally {
    await pool.end();
    process.exit();
  }
})();
