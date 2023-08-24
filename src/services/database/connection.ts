import knex from 'knex';

const connection = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
    // connection: {
    //     connectionString: process.env.DB_CONNECTION_STRING,
    //     ssl: { rejectUnauthorized: false }
    // }
};

const db = knex(connection);

export default db;
