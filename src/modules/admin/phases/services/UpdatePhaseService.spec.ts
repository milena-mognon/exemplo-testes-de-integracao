/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Update Phase', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    connection = await createConnection('test-connection');
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM phases');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to update a phase', async () => {
    const phase = await request(app).post('/fases').send({
      description: 'Fase 1',
    });

    const response = await request(app).put(`/fases/${phase.body.id}`).send({
      description: 'Fase 1 - Atualizado',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        description: 'Fase 1 - Atualizado',
      }),
    );
  });

  it('should send a message error if the a phase already exist with the same description', async () => {
    const phase = await request(app).post('/fases').send({
      description: 'Fase 1',
    });

    await request(app).post('/fases').send({
      description: 'Fase 2',
    });

    const response = await request(app).put(`/fases/${phase.body.id}`).send({
      description: 'Fase 2',
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Esta fase já existe!');
  });

  it('should send a message error if the phase was not found', async () => {
    const fake_id = '3e201051-151b-4cab-8181-12ed11ed80b1';

    const response = await request(app).get(`/fases/${fake_id}`);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Fase não encontrada!');
  });
});
