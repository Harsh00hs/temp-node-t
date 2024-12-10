const express = require('express')
const app = express()

const logger = require('./logger')
const authorize = require('./authorize')

// req -> middleware -> res
// middleware is like function perform while the req is send to server 

// middleware is like a filter, it can be used to filter the req and res
// middleware can be used to perform some task before the req is send to server
// middleware can be used to perform some task after the req is send to server
// middleware can be used to perform some task while the req is send to server



// app.use(logger)
app.use([logger, authorize])

// app.use('/api', logger)
// api/home api/qwerty/qasd // applies to all path starting with api

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    console.log(req.user);
    res.send('Items ')
})

app.listen(5000, () => console.log('running on 5000 port'))