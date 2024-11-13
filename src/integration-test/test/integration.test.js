import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';

const baseURL = 'http://localhost:4000'; // URL da sua API Cogny

describe('Testes de integração para a API de placar', () => {
  let server;

  it('Deve retornar um placar válido com sucesso', async () => {
    const response = await axios.get(`${baseURL}/getScore`); // Endpoint para checar o placar

    expect(response.status).toBe(200);
  });
});
