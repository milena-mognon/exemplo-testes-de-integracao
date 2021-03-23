/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Find a Seller By Id', () => {
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

  it('should be able to find a seller by ID', async () => {
    const seller = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    const response = await request(app).get(`/vendedores/${seller.body.id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        description: 'Analista comercial 1',
        active: true,
        real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
        real_estate: expect.objectContaining({
          description: 'Imobiliária 1',
        }),
      }),
    );
  });

  it('should send an error message if does not find a seller by ID', async () => {
    const fake_seller_id = 'fda59412-9d56-41c9-bb59-f0f1d09e5e00';

    const response = await request(app).get(`/vendedores/${fake_seller_id}`);

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Vendedor não encontrado');
  });
});
