/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Find All Active Sellers', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    connection = await createConnection('test-connection');

    // await connection.dropDatabase();

    // await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM sellers');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to find all active sellers', async () => {
    await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });
    await request(app).post('/vendedores').send({
      description: 'Vendedor 1',
      active: true,
      real_estate_id: '5966db62-dc70-43ae-9f0a-16c600e3dce4',
    });
    await request(app).post('/vendedores').send({
      description: 'Analista comercial 3',
      active: false,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });
    await request(app).post('/vendedores').send({
      description: 'Vendedor 2',
      active: true,
      real_estate_id: '5966db62-dc70-43ae-9f0a-16c600e3dce4',
    });

    const response = await request(app).get('/vendedores/ativos');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Analista comercial 1',
          active: true,
          real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
          real_estate: expect.objectContaining({
            description: 'Imobiliária 1',
          }),
        }),
        expect.objectContaining({
          description: 'Vendedor 1',
          active: true,
          real_estate_id: '5966db62-dc70-43ae-9f0a-16c600e3dce4',
          real_estate: expect.objectContaining({
            description: 'Imobiliária 6',
          }),
        }),
        expect.objectContaining({
          description: 'Vendedor 2',
          active: true,
          real_estate_id: '5966db62-dc70-43ae-9f0a-16c600e3dce4',
          real_estate: expect.objectContaining({
            description: 'Imobiliária 6',
          }),
        }),
      ]),
    );
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'Analista comercial 3',
          active: false,
          real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
          real_estate: expect.objectContaining({
            description: 'Imobiliária 1',
          }),
        }),
      ]),
    );
  });
});
