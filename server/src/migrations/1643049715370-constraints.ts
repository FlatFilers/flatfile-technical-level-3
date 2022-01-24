import { MigrationInterface, QueryRunner } from 'typeorm'

export class constraints1643049715370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cards ALTER COLUMN section_id TYPE integer;
      ALTER TABLE cards ALTER COLUMN section_id DROP DEFAULT;
      ALTER TABLE cards ADD CONSTRAINT section_fk
        FOREIGN KEY (section_id)
          REFERENCES sections (id);
      ALTER TABLE cards ALTER COLUMN title TYPE varchar(256);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cards DROP CONSTRAINT section_fk;
      ALTER TABLE cards ALTER COLUMN title TYPE text;
    `) // reverts things made in "up" method
  }
}
