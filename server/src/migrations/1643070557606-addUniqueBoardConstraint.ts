import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUniqueBoardConstraint1643070557606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE boards ADD CONSTRAINT board_title_unique unique (title);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE boards DROP CONSTRAINT board_title_unique;
    `)
  }
}
