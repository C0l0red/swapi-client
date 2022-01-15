import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1642257613858 implements MigrationInterface {
  name = 'migrationName1642257613858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "comment" (
                "comment_id" SERIAL NOT NULL,
                "film_id" integer NOT NULL,
                "text" character varying(500) NOT NULL,
                "commenter_ip_address" character varying(15) NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "comment"
        `);
  }
}
