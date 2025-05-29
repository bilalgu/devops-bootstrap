const express = require('express')
const app = express()

app.get('/health', (req, res) => {
    res.send('OK\n')
})

app.get('/api/articles', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM articles')
        res.json(result.rows)
    } catch (err) {
        console.error('DB error:', err)
        res.status(500).send('Internal Server Error')
    }
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`)
})

const pool = require('./utils/db')

pool.query('SELECT NOW()')
    .then(res => console.log('Connected to DB:', res.rows[0]))
    .catch(err => console.error('DB connection error:', err))