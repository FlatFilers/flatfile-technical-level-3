import {MigrationInterface, QueryRunner,TableColumn} from "typeorm";

export class addDescript21697196342354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cards", new TableColumn({
            name: "description",
            type: "text", // Use the appropriate data type for your database
            isNullable: true, // You can set this to false if the description is required
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cards", "description");
    }

}
