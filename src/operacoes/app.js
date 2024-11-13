const express = require('express');
const app = express();
const port = 3000;

serverDelay = 2500;

app.get('/', function (req, res) {
  setTimeout(() => {
    res.send('Processamento realizado com sucesso!');
  }, serverDelay);
});

app.listen(port, function () {
  console.log(`Servidor rodando na porta: ${port}`);
});
