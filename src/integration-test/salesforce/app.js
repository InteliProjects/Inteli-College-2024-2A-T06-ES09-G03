const express = require('express');
const app = express();
const port = 4002;

app.use(express.json());

app.post('/salesforceUpdate', (req, res) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = req.body;

  console.log('Recebido do Firebase:', req.body);

  // Verificar se os dados foram recebidos corretamente
  if (!homeTeam || !awayTeam || isNaN(homeScore) || isNaN(awayScore)) {
    console.error('Dados inválidos recebidos:', req.body); // Log de erro
    return res.status(400).json({ error: 'Dados inválidos recebidos.' });
  }

  // Gerar uma resposta aleatória
  const randomOutcome = Math.random();

  if (randomOutcome < 0.8) {
    // 80% das vezes retorna o placar validado com sucesso
    res.json({
      message: `Salesforce sincronizado com sucesso. Resultado: ${homeTeam} ${homeScore} x ${awayTeam} ${awayScore}`,
    });
  } else if (randomOutcome < 0.9) {
    // 15% das vezes simula erro de disparidade
    res.status(409).json({
      error:
        'Disparidade na sincronização do placar. Resultados inconsistentes.',
    });
  } else {
    // 5% das vezes simula erro interno
    res
      .status(500)
      .json({ error: 'Erro interno do Salesforce ao processar a requisição' });
  }
});

app.listen(port, () => {
  console.log(`Salesforce API rodando em http://localhost:${port}`);
});

module.exports = { app };
