const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    }
})
module.exports = { knex }