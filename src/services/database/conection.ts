import knex from 'knex';

const connection = {
    client: 'pg',
    connection: {
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    }
};

const db = knex(connection);

export default db;
