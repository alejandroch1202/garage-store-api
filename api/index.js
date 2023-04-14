const express = require('express');
const data = require('./db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Garage Store API');
});

app.get('/users', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app running at: http://localhost:${port}/`);
});
