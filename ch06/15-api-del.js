const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const tours = [{
        id: 0,
        name: 'hood River',
        price: 99.99
    },
    {
        id: 1,
        name: 'oregon coast',
        price: 149.92
    }
]

app.get('/api/tours', (req, res) => res.json(tours))

app.put('/api/tours/:id', (req, res) => {
    const p = tours.find(p => p.id === parseInt(req.params.id))
    if (!p) return res.status(410).json({
        error: 'no such tour exits'
    })
    if (req.body.name) p.name = req.body.name
    if (req.body.price) p.price = req.body.price
    res.json({
        success: true
    })
})

app.use('*', (req, res) => res.send(
            `<p>Use a tool like <a href="https://www.getpostman.com">Postman</a> ` +
            `or <a href="https://curl.haxx.se/">curl</a> to try the following:</p>' ` +
            '<pre>' +
            `GET /api/tours\n' ` +
            `PUT /api/tour/0 with JSON body { "price": 129.99 }\n' ` +
            `GET /api/tours'`
))