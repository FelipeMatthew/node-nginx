const express = require('express');
const { Repository } = require('./repository');
const app = express();

app.get('/', async (req, res) => {
  const selectSql = `SELECT * FROM people`;
  const people = await Repository.query(selectSql);

  const peopleCreated = `<ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

  res.send(`
  <h1>FullCycle Rocks!!!</h1>
  <h2>Pessoas cadastradas</h2>
  <h3>${peopleCreated}</h3>
`);
});

app.listen(3000, () => {
  console.log('Running on port 3000');

  const createSql = `
    CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id));
  `;
  Repository.query(createSql);

  const insertSql = `INSERT INTO people(name) VALUES ('Felipe'), ('Maria'), ('Alberto');`;
  Repository.query(insertSql);
});

// Another testing