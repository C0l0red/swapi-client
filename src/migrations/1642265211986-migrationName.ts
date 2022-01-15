import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1642265211986 implements MigrationInterface {
  name = 'migrationName1642265211986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "commenter_ip_address"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "commenter_ip_address" character varying(30) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "commenter_ip_address"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "commenter_ip_address" character varying(15) NOT NULL
        `);
  }
}
