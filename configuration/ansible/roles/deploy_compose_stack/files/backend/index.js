// https://www.npmjs.com/package/express?activeTab=versions
// https://www.npmjs.com/package/pg?activeTab=versions
const express = require('express')
const app = express()
const port = 8080

const { Client } = require('pg')

const dbClient = new Client({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    database: process.env.DB_NAME || 'appdb',
    port: 5432
})

dbClient.connect()
    .then(() => {
        console.log('Connected to PostgreSQL!')
        return dbClient.query('SELECT NOW()')
    })
    .then(res => {
        console.log('Time from DB :', res.rows[0])
    })
    .catch(err => {
        console.error('Error connecting to the database :', err)
    })

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js!'})
})

app.get('/api/health', (req, res) => {
    res.send('OK\n')
})

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`)
})
