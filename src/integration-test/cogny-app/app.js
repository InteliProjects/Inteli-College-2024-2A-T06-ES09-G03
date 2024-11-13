const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

app.get('/getScore', async (req, res) => {
  try {
    // Fazer a requisição para o Firebase
    const firebaseResponse = await axios.get(
      'http://localhost:4001/firebaseScore'
    );

    // Verificar se os dados do Firebase foram retornados corretamente
    const firebaseData = firebaseResponse.data;
    if (
      !firebaseData ||
      !firebaseData.homeTeam ||
      !firebaseData.awayTeam ||
      isNaN(firebaseData.homeScore) ||
      isNaN(firebaseData.awayScore)
    ) {
      return res
        .status(400)
        .json({ error: 'Os dados recebidos do Firebase são inválidos.' });
    }

    // Enviar os dados completos para o Salesforce
    const salesforceResponse = await axios.post(
      'http://localhost:4002/salesforceUpdate',
      firebaseData // Enviando o objeto completo
    );

    // Retornar a resposta do Salesforce para o Cogny App
    res.json({
      status: 'Success',
      salesforceData: salesforceResponse.data,
    });
  } catch (error) {
    // Diferenciar tipos de erros para fornecer respostas mais claras
    if (error.response) {
      // Erro com resposta da API externa (Firebase ou Salesforce)
      const statusCode = error.response.status;
      if (statusCode === 400) {
        res
          .status(400)
          .json({ error: 'Erro de validação: dados inválidos recebidos.' });
      } else if (statusCode === 409) {
        res.status(409).json({
          error: 'Erro de sincronização: disparidade nos resultados.',
        });
      } else if (statusCode === 500) {
        res.status(500).json({ error: 'Erro interno no servidor Salesforce.' });
      } else {
        res
          .status(statusCode)
          .json({ error: `Erro inesperado com código ${statusCode}` });
      }
    } else {
      // Erro de conexão ou outro erro inesperado
      res
        .status(500)
        .json({ error: 'Erro ao tentar se conectar com as APIs externas.' });
    }
  }
});

app.listen(port, () => {
  console.log(`Cogny API rodando em http://localhost:${port}`);
});

module.exports = { app };
