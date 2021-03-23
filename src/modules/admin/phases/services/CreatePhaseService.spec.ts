/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Create New Phase', () => {
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

  it('should be able to create a new phase', async () => {
    const response = await request(app).post('/fases').send({
      description: 'Fase 1',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        description: 'Fase 1',
      }),
    );
  });

  it('should send a message error if the a phase already exist with the same description', async () => {
    await request(app).post('/fases').send({
      description: 'Fase 1',
    });

    const response = await request(app).post('/fases').send({
      description: 'Fase 1',
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Esta fase já existe!');
  });
});
