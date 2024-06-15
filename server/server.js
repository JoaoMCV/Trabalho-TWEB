const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

pool.query(sql, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela users:', err);
    return;
  }
  console.log('Tabela users criada com sucesso');
});

app.use(express.json());
app.use(cors());

// Endpoint para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Consulta SQL para buscar usuário com o username e password informados
    const [rows, fields] = await pool.promise().query(
      'SELECT * FROM users WHERE username = ? AND password = ? ',
      [username, password]
    );

    // Verifica se encontrou algum usuário com as credenciais fornecidas
    if (rows.length > 0) {
      res.json({ message: 'Login bem-sucedido!' });
    } else {
      res.status(400).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao verificar usuário no banco de dados:', error);
    res.status(500).json({ message: 'Erro ao verificar usuário' });
  }
});


// Endpoint para registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    const [existingUsers, fields] = await pool.promise().query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    // Insere o novo usuário no banco de dados
    const [result, _] = await pool.promise().query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );

    res.json({ message: 'Cadastro bem-sucedido!' });
  } catch (error) {
    console.error('Erro ao registrar usuário no banco de dados:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});