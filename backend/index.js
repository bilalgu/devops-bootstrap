// https://www.npmjs.com/package/express?activeTab=versions
const express = require('express')
const app = express()
const port = 8080

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js!'})
})

app.get('/health', (req, res) => {
    res.send('OK\n')
})

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`)
})
