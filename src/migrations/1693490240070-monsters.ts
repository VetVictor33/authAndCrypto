import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Monsters1693490240070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const monsters = new Table({
            name: 'monsters',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'int'
                },
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'nickname',
                    type: 'text'
                },
                {
                    name: 'skills',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'image_url',
                    type: 'text',
                    isNullable: true
                }
            ]
        })
        await queryRunner.createTable(monsters)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('monsters')
    }

}
