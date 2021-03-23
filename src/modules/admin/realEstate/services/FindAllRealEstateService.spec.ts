/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('Find All Real Estate', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    connection = await createConnection('test-connection');
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM sellers');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list all real estate', async () => {
    const response = await request(app).get('/imobiliarias');

    // imobiliarias já estão cadastradas no banco de dados
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '96f0e0ca-5037-450d-aad4-c3062c934204',
          description: 'Imobiliária 1',
        }),
        expect.objectContaining({
          id: '18a6dfdd-9c7e-4491-8a6a-06830929c12c',
          description: 'Imobiliária 2',
        }),
        expect.objectContaining({
          id: '4e20f7eb-a702-4080-bec8-9c93ff013277',
          description: 'Imobiliária 3',
        }),
        expect.objectContaining({
          id: '5cf1c7df-609e-46b2-96a9-b198d51b56be',
          description: 'Imobiliária 4',
        }),
        expect.objectContaining({
          id: 'c3ab8e8f-6fef-4c5f-8e25-0cdfeaa30dd0',
          description: 'Imobiliária 5',
        }),
        expect.objectContaining({
          id: '5966db62-dc70-43ae-9f0a-16c600e3dce4',
          description: 'Imobiliária 6',
        }),
        expect.objectContaining({
          id: '45801c39-d766-432c-a772-e3e4bf6d45f6',
          description: 'Corretor Independente',
        }),
      ]),
    );
  });
});
