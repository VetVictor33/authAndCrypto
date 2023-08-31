import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Users1693490277832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'text'
                },
                {
                    name: 'email',
                    type: 'text',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'text',
                }
            ]
        })
        await queryRunner.createTable(users)
        await queryRunner.createForeignKey('monsters', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
