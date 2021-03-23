/**
 * Quando importa assim:
 * import createConnection from 'shared/infra/typeorm';
 *
 * Causa este erro:
 * SyntaxError: Cannot use import statement outside a module
 */

/**
 * Se importar assim:
 * const createConnection = require('shared/infra/typeorm');
 * ou
 * const { createConnection } = require('shared/infra/typeorm');
 *
 * Causa este erro:
 * Error: Cannot find module 'shared/infra/typeorm'
 */

/**
 * Se importar direto do typeorm:
 * const { createConnection } = require('typeorm');
 *
 * Causa este erro:
 * C:\Users\Milena\Desktop\Empresas\src\modules\admin\phases\infra\typeorm\entities\Phase.ts:1
    import {
    ^^^^^^
    SyntaxError: Cannot use import statement outside a module
    const { createConnection } = require('typeorm');
 */

const { createConnection } = require('typeorm');

module.exports = async () => {
  const connection = await createConnection('test-connection');

  await connection.dropDatabase();

  await connection.runMigrations();
};
