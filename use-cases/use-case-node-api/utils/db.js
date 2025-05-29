const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    database: process.env.DB_NAME || 'appdb',
    port: process.env.DB_PORT || 5432
})

module.exports = pool