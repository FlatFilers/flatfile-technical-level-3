import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class sample1632290555242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cards", new TableColumn({
            name: "description",
            type: "varchar",
            default: null,
            isNullable: true
        }))

        await queryRunner.createTable(new Table({
            name: "images",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "url",
                    type: "varchar",
                },
                {
                    name: "upload_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "card_id",
                    type: "int",
                    isNullable: false
                }
            ]
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cards", "description")

        await queryRunner.dropTable("images", true)
    }

}
