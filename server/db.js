const mysql = require('mysql2');

// Conecte-se sem especificar o banco de dados para criar um novo
const connection = mysql.createConnection({
  host: '127.0.0.1', // substitua pelo seu host do MySQL
  user: 'root',      // substitua pelo seu usuário do MySQL
  password: '1234',      // substitua pela sua senha do MySQL
  // Não especificamos o database aqui
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL.');

  // Verifique e crie o banco de dados se não existir
  const dbName = 'testdb'; // substitua pelo seu banco de dados

  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result) => {
    if (err) {
      console.error('Erro ao criar o banco de dados:', err);
      return;
    }
    console.log(`Banco de dados '${dbName}' verificado ou criado.`);
    
    // Feche a conexão inicial
    connection.end();

    // Conecte-se agora ao banco de dados criado ou existente
    const dbConnection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      database: dbName
    });

    dbConnection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
      }
      console.log(`Conectado ao banco de dados '${dbName}'.`);
    });

    // Exporte a conexão
    module.exports = dbConnection;
  });
});