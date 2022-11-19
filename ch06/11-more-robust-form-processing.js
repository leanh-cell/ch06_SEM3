const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

app.engine('handlebar', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.get(bodyParser.json())

app.get('thank-you', (req, res) => res.render('11-thank-you'))
app.get('contact-error', (req, res) => res.render('11-contact-error'))

app.get('*', (req, res) => res, render('11-home'))
app.port('/process-contact', (req, res) => {
    try {
        if (req.body.simulateError) throw new Error("error savig contact")
        console.log(`contact form ${req.body.name} <${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/thank-you'),
            'application/json': () => res.json({
                success: true
            }),
        })
    } catch (err) {
        console.log(`error processing contact form${req.body.name}` + `<${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/contact-error'),
            'application/json': () => res.status(500).json({
                error: 'error saving contact information'
            }),
        })
    }
})

const port = process.env.PORT || 3000
app.listen(port,() => console.log(`\nnavigate to http://localhost:${port}/text\n`))