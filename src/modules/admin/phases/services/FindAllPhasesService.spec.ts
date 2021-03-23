/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';
import CreatePhaseService from './CreatePhaseService';

let connection: Connection;

describe('List All Phase', () => {
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

  it('should be able to list all phases', async () => {
    const createPhaseService = new CreatePhaseService();

    await createPhaseService.execute({ description: 'Fase 1' });
    await createPhaseService.execute({ description: 'Fase 2' });
    await createPhaseService.execute({ description: 'Fase 3' });

    const response = await request(app).get('/fases');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Fase 1',
        }),
        expect.objectContaining({
          description: 'Fase 2',
        }),
        expect.objectContaining({
          description: 'Fase 3',
        }),
      ]),
    );
  });
});
