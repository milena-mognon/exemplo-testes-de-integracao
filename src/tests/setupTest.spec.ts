import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Setup Tests', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.dropDatabase();

    await connection.runMigrations();
  });

  it('should setup test', async () => {
    expect(true).toEqual(true);
  });
});
