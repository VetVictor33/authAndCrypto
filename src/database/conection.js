const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRESS_DB
})

module.exports = { pool }