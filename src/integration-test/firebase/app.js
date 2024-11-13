const express = require('express');
const axios = require('axios');
const app = express();
const port = 4001;

app.get('/firebaseScore', async (req, res) => {
  try {
    // Simular um placar
    const homeTeam = 'Time A';
    const awayTeam = 'Time B';
    // Placar aleatório de 0 a 4
    const homeScore = Math.floor(Math.random() * 5);
    // Placar aleatório de 0 a 4
    const awayScore = Math.floor(Math.random() * 5);

    const matchResult = {
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
    };

    console.log('Enviando para o Cogny:', matchResult);

    // Retornar os dados simulados
    res.json(matchResult);
  } catch (error) {
    console.error('Erro no Firebase:', error.message);
    res.status(500).json({ error: 'Erro ao gerar o placar no Firebase' });
  }
});

app.listen(port, () => {
  console.log(`Firebase API rodando em http://localhost:${port}`);
});

module.exports = { app };
