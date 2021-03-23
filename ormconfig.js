/* eslint-disable @typescript-eslint/no-var-requires */
const dotEnv = require('dotenv');

dotEnv.config();

switch (process.env.NODE_ENV) {
  case 'development':
    dotEnv.config({ path: '.env.dev' });
    break;
  case 'beta':
    dotEnv.config({ path: '.env.beta' });
    break;
  case 'production':
    dotEnv.config({ path: '.env.prod' });
    break;
  case 'test':
    dotEnv.config({ path: '.env.test' });
    break;
  default:
    dotEnv.config({ path: '.env.dev' });
}

module.exports = {
  // name: process.env.DB_NAME,
  name: 'default',
  url: process.env.DB_URL,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: ['./src/shared/infra/typeorm/migrations'],
  },
};
