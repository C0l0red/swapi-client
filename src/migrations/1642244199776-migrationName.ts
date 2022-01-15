import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1642244199776 implements MigrationInterface {
  name = 'migrationName1642244199776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "url"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "url" character varying(120) NOT NULL
        `);
  }
}
