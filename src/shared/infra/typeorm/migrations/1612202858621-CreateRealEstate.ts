import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRealEstate1612202858621
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'real_estate',
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
            length: '100',
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
      "INSERT INTO public.real_estate (id, description) VALUES('96f0e0ca-5037-450d-aad4-c3062c934204', 'Imobiliária 1');" +
        "INSERT INTO public.real_estate (id, description) VALUES('18a6dfdd-9c7e-4491-8a6a-06830929c12c', 'Imobiliária 2');" +
        "INSERT INTO public.real_estate (id, description) VALUES('4e20f7eb-a702-4080-bec8-9c93ff013277', 'Imobiliária 3');" +
        "INSERT INTO public.real_estate (id, description) VALUES('5cf1c7df-609e-46b2-96a9-b198d51b56be', 'Imobiliária 4');" +
        "INSERT INTO public.real_estate (id, description) VALUES('c3ab8e8f-6fef-4c5f-8e25-0cdfeaa30dd0', 'Imobiliária 5');" +
        "INSERT INTO public.real_estate (id, description) VALUES('5966db62-dc70-43ae-9f0a-16c600e3dce4', 'Imobiliária 6');" +
        "INSERT INTO public.real_estate (id, description) VALUES('45801c39-d766-432c-a772-e3e4bf6d45f6', 'Corretor Independente');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('real_estate');
  }
}
