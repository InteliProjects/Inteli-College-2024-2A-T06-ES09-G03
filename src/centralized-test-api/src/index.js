const express = require('express');
const bodyParser = require('body-parser');
const promClient = require('prom-client'); 
const { insertTest, getById } = require('./test.BDrepository');
const decisionHandlerMiddleware = require('./decisionMiddleware')

const port = 3000;
const app = express();

app.use(bodyParser.json());
const escopesCounter = require('./escopesCounterMemoryRepository')
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Exemplo de métrica básica: contagem de requisições
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração das requisições HTTP em milissegundos',
  labelNames: ['method', 'route', 'code']
});

app.post('/v1/test', decisionHandlerMiddleware, async (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer(); 
  try {
    const result = await insertTest(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
  } finally {
    end({ route: '/v1/test', code: res.statusCode, method: req.method });
  }
});

app.get('/v1/test/:id', async (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  try {
    const result = await getById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar no banco de dados' });
  } finally {
    end({ route: '/v1/test/:id', code: res.statusCode, method: req.method });
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
