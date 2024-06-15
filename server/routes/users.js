const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos os usuários
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Adicionar um novo usuário
router.post('/users', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: results.insertId, username, password });
  });
});

// Obter um usuário específico
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.json(results[0]);
  });
});

// Atualizar um usuário
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  db.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Usuário atualizado com sucesso');
  });
});

// Excluir um usuário
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Usuário excluído com sucesso');
  });
});

module.exports = router;