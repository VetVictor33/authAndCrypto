import { MigrationInterface, QueryRunner, Table } from "typeorm"

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
                    type: ''
                },
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
