import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePhases1613412825118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'phases',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(
      "INSERT INTO public.phases (id, description) VALUES('b49b27a0-d63c-4ec4-bad2-eb2875e9de78', 'Elaboração de Contrato');" +
        "INSERT INTO public.phases (id, description) VALUES('cb083870-22a6-4ad2-8302-046da95fcd16', 'Preenchimento de Formulário');" +
        "INSERT INTO public.phases (id, description) VALUES('f0082d3c-3e66-4702-9e30-84fcd60593cb', 'Contato Iniciado');" +
        "INSERT INTO public.phases (id, description) VALUES('80b04184-f4da-4a27-9b78-22b5b5d91132', 'Contato Retomado');" +
        "INSERT INTO public.phases (id, description) VALUES('ab7a7ca9-70cd-416e-9c08-4cbc67989126', 'Reprovada');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phases');
  }
}
