/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Update Seller', () => {
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

  it('should be able to update a seller', async () => {
    const seller = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    const response = await request(app)
      .put(`/vendedores/${seller.body.id}`)
      .send({
        description: 'Analista comercial 1 - atualizado',
        active: true,
      });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        description: 'Analista comercial 1 - atualizado',
        active: true,
      }),
    );
  });

  it('should send a message error if the a seller already exist with the same description and real estate', async () => {
    const seller = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    await request(app).post('/vendedores').send({
      description: 'Analista comercial 2',
      active: false,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    const response = await request(app)
      .put(`/vendedores/${seller.body.id}`)
      .send({
        description: 'Analista comercial 2',
        active: true,
      });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Esse vendedor já existe');
  });

  it('should send a message error if the seller does not exist', async () => {
    const fake_seller_id = '1b0a0802-66d2-4774-891a-4a6d666d2ab3';

    const response = await request(app)
      .put(`/vendedores/${fake_seller_id}`)
      .send({
        description: 'Analista comercial 1',
        active: true,
      });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Vendedor não encontrado');
  });
});
