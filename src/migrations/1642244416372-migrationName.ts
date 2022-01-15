import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1642244416372 implements MigrationInterface {
  name = 'migrationName1642244416372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "comment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "comment_id" SERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "comment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "comment_id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id")
        `);
  }
}
