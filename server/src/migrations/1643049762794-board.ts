import { MigrationInterface, QueryRunner } from 'typeorm'

export class board1643049762794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE boards
      (
        id    serial PRIMARY KEY,
        title text NOT NULL
      );

      INSERT INTO boards (title) values ('My First Board');

      ALTER TABLE sections ADD COLUMN board_id integer;
      UPDATE sections SET board_id = (SELECT id FROM boards);
      ALTER TABLE sections ALTER COLUMN board_id SET NOT NULL;
      ALTER TABLE sections ADD CONSTRAINT board_fk
        FOREIGN KEY (board_id)
          REFERENCES boards (id);    
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE sections DROP CONSTRAINT board_fk;
      ALTER TABLE sections DROP COLUMN board_id;
      DROP TABLE boards;
    `) // reverts things made in "up" method
  }
}
