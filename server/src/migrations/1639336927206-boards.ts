import { MigrationInterface, QueryRunner } from 'typeorm'

export class boards1639336927206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE boards (
        id serial PRIMARY KEY,
        title text NOT NULL UNIQUE
    );`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
