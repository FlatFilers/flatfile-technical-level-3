import { MigrationInterface, QueryRunner } from 'typeorm'

export class addSizeLimitForBoardTitle1643070590257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE boards ALTER COLUMN title TYPE varchar(256);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE boards ALTER COLUMN title TYPE text;
        `)
  }
}
