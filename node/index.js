const express = require("express");
const app = express();
const port = 8080;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    )
  `;

const insertQuery = `INSERT INTO people(name) VALUES ('Felipe'), ('Maria'), ('Alberto')`;

// Criar a tabela e inserir os registros
connection.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Erro ao criar a tabela:', error);
    return;
  }
  console.log('Tabela "people" criada com sucesso!');

  connection.query(insertQuery, (error, results, fields) => {
    if (error) {
      console.error('Erro ao inserir registros na tabela:', error);
      return;
    }
    console.log('Registros inseridos com sucesso!');
  });
});

// Função para obter os nomes cadastrados no banco de dados
function getNames(callback) {
  // Query para selecionar os nomes da tabela 'people'
  const selectQuery = `SELECT name FROM people`;

  // Executar a query de seleção
  connection.query(selectQuery, (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      callback(error, null);
      return;
    }
    // Extrair os nomes da lista de resultados
    const nomes = results.map((row) => `<br>` + row.name);
    callback(null, nomes);
  });
}

app.get("/", (req, res) => {
  getNames((error, nomes) => {
    if (error) {
      res.status(500).send('Erro interno do servidor');
      return;
    }
    // Enviar a lista de nomes como resposta
    res.send(`
              <h1>FullCycle Rocks!!!</h1>
              <h2>Pessoas cadastradas</h2>
              <h3>${nomes.join(' ')}</h3>
            `);
    // Fechar a conexão ao banco de dados após enviar a resposta
    connection.end();
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log("Running on " + port);
});
