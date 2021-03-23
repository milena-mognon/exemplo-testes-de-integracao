import 'reflect-metadata';

import dotEnv from 'dotenv';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';
import CelebrateErrorHandler from './middlewares/CelebrateErrorHandler';
import ErrorHandler from './middlewares/ErrorHandler';

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

createConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(CelebrateErrorHandler);

app.use(ErrorHandler);

export default app;
