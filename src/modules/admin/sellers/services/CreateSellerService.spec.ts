/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Create New Seller', () => {
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

  it('should be able to create a new seller', async () => {
    const response = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        description: 'Analista comercial 1',
        active: true,
        real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
      }),
    );
  });

  it('should send a message error if the a seller already exist with the same description and real estate', async () => {
    await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    const response = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: '96f0e0ca-5037-450d-aad4-c3062c934204',
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Esse vendedor já existe');
  });

  it('should send a message error if the real estate does not exist', async () => {
    const fake_real_estate_id = '1b0a0802-66d2-4774-891a-4a6d666d2ab3';

    const response = await request(app).post('/vendedores').send({
      description: 'Analista comercial 1',
      active: true,
      real_estate_id: fake_real_estate_id,
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Imobiliária não encontrada');
  });
});
