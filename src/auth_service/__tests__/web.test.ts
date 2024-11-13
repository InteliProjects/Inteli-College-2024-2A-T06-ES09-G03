import request from 'supertest';

const authServiceUrl = 'http://localhost:3001';
const webAppUrl = 'http://localhost:3000';

describe('Auth Service Integration Tests', () => {
  test('User should not be able to login with wrong username/password', async () => {
    const response = await request(webAppUrl)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpassword' });
    
    expect(response.status).toBe(401);  
    expect(response.body.token).toBeUndefined();
  });

  test('User should be able to login with correct username/password', async () => {
    const response = await request(webAppUrl)
      .post('/login')
      .send({ username: 'user1', password: 'pass1' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('Request should be rejected if user has no valid session token', async () => {
    const loginResponse = await request(webAppUrl)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpassword' });

    const authResponse = await request(webAppUrl)
      .get('/protected')
      .set('username', 'user1')
      .set('token', loginResponse.body.token || 'invalidtoken');

    expect(authResponse.status).toBe(401);
    expect(authResponse.body.error).toBe('Not authenticated');
  });

  test('Request should be authenticated successfully if user has valid session token', async () => {
    const loginResponse = await request(webAppUrl)
      .post('/login')
      .send({ username: 'user1', password: 'pass1' });

    const authResponse = await request(webAppUrl)
      .get('/protected')
      .set('username', 'user1')
      .set('token', loginResponse.body.token);

    expect(authResponse.status).toBe(200);
    expect(authResponse.body.message).toBe('You are authenticated!');
  });

  test('User request should be rejected after logging out', async () => {
    const loginResponse = await request(webAppUrl)
      .post('/login')
      .send({ username: 'user1', password: 'pass1' });

    const logoutResponse = await request(webAppUrl)
      .post('/logout')
      .send({ username: 'user1', token: loginResponse.body.token });

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.message).toBe('Logged out successfully');

    // Check if the user is still authenticated
    const authResponse = await request(webAppUrl)
      .get('/protected')
      .set('username', 'user1')
      .set('token', loginResponse.body.token);

    expect(authResponse.status).toBe(401);
    expect(authResponse.body.error).toBe('Not authenticated');
  });
});

describe('Test Volume de Serviços', () => {
  test.each([
    ['rampa', 'Baixa Demanda'],
    ['outro', 'Pico Normal']
  ])('should return correct demand description for %s service', async (service, expected) => {
    const response = await request(webAppUrl)
      .post('/volume')
      .send({ service });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(expected);
  });
});

describe('Test Disponibilidade de Serviço', () => {
  test('should simulate service availability', async () => {
    const response1 = await request(webAppUrl).get('/disponibilidade');
    const response2 = await request(webAppUrl).get('/disponibilidade');

    expect(response1.status).toBe(200);
    expect(response1.body.available).toBe(true);

    expect(response2.status).toBe(200);
    expect(response2.body.available).toBe(false);
  });
});

describe('Test Segurança e Privacidade', () => {
  test('should encrypt and obfuscate data correctly', async () => {
    const data = 'username=johndoe;password=123456';

    const response1 = await request(webAppUrl)
      .post('/privacidade')
      .send({ data });

    const response2 = await request(webAppUrl)
      .post('/privacidade')
      .send({ data });

    expect(response1.status).toBe(200);
    expect(response1.body.result).toBe('Criptografado');

    expect(response2.status).toBe(200);
    expect(response2.body.result).toBe('Ofuscado');
  });
});

describe('Test Segurança e Integridade', () => {
  test('should validate checksum correctly', async () => {
    const data1 = 'transacao_id=12345;valor=100.00;checksum=abc123';
    const data2 = 'transacao_id=12345;valor=100.00;checksum=xyz789';

    const response1 = await request(webAppUrl)
      .post('/integridade')
      .send({ data: data1 });

    const response2 = await request(webAppUrl)
      .post('/integridade')
      .send({ data: data2 });

    expect(response1.status).toBe(200);
    expect(response1.body.result).toBe('Checksum válido');

    expect(response2.status).toBe(200);
    expect(response2.body.result).toBe('Checksum inválido');
  });
});

describe('Test Não-Repúdio', () => {
  test('should verify transaction traceability', async () => {
    const data1 = 'transacao_id=67890;usuario=johndoe;eventos=[login, consulta, logout]';
    const data2 = 'transacao_id=67890;usuario=johndoe;eventos=[]';

    const response1 = await request(webAppUrl)
      .post('/transacao')
      .send({ data: data1 });

    const response2 = await request(webAppUrl)
      .post('/transacao')
      .send({ data: data2 });

    expect(response1.status).toBe(200);
    expect(response1.body.result).toBe('Rastreabilidade completa');

    expect(response2.status).toBe(200);
    expect(response2.body.result).toBe('Falta de rastreabilidade');
  });
});

describe('Health Check Tests', () => {
  test('Service should be healthy', async () => {
    const response = await request(authServiceUrl).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Healthy');
  });

  test('Service should resist simulated failure', async () => {
    // Simular uma falha no serviço (ex.: uso de um endpoint de falha)
    const simulateFailure = await request(authServiceUrl).post('/simulate-failure');
    expect(simulateFailure.status).toBe(200);
    
    // Verificar se o serviço ainda responde (resistência)
    const healthCheck = await request(authServiceUrl).get('/health');
    expect(healthCheck.status).toBe(200);
    expect(healthCheck.body.status).toBe('Degraded'); // Espera-se um status degradado
  });
});

describe('Redundancy Recovery Tests', () => {
  test('Service should recover using redundancy', async () => {
    // Desligar o serviço principal e verificar se o redundante assume
    const disablePrimary = await request(authServiceUrl).post('/disable-primary');
    expect(disablePrimary.status).toBe(200);

    // Verificar se o serviço redundante está ativo
    const healthCheck = await request(authServiceUrl).get('/health');
    expect(healthCheck.status).toBe(200);
    expect(healthCheck.body.status).toBe('Healthy (Redundant)');
  });
});

describe('Substitution Recovery Tests', () => {
  test('Service should recover by substitution', async () => {
    // Desativar o serviço atual
    await request(authServiceUrl).post('/disable-service');

    // Substituir por um novo serviço
    const substituteService = await request(authServiceUrl).post('/substitute-service');
    expect(substituteService.status).toBe(200);

    // Verificar se o serviço substituto está funcionando
    const healthCheck = await request(authServiceUrl).get('/health');
    expect(healthCheck.status).toBe(200);
    expect(healthCheck.body.status).toBe('Healthy (Substitute)');
  });
});

describe('Prediction and Prevention Tests', () => {
  test('Service should predict and prevent failures', async () => {
    // Testar predição de falhas (ex.: monitoramento de métricas)
    const predictionResponse = await request(authServiceUrl).post('/predict-failures');
    expect(predictionResponse.status).toBe(200);
    expect(predictionResponse.body.prediction).toBe('High Risk');

    // Executar ações preventivas
    const preventionResponse = await request(authServiceUrl).post('/prevent-failures');
    expect(preventionResponse.status).toBe(200);
    expect(preventionResponse.body.action).toBe('Preventive Action Taken');

    // Verificar saúde do serviço após ação preventiva
    const healthCheck = await request(authServiceUrl).get('/health');
    expect(healthCheck.status).toBe(200);
    expect(healthCheck.body.status).toBe('Healthy');
  });
});