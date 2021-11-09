import {MigrationInterface, QueryRunner} from "typeorm";

export class addParentIdColumnToCards1636223627501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD COLUMN "parent_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "parent_id"`);
    }
    

}
