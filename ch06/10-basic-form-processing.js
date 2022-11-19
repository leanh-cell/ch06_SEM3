const express = require('express')
const bodyParser = require('body-parser')
const expresshandlebars = require('express-handlebars')
const app = express()

app.engine('handlebars',expressHandlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(bodyParser.urlencoded({extended:false}))

app.get('/thank-you',(req,res) => res.render('10-thank-you'))

app.get('*',(req,res) => res.render('10-home'))

app.post('/process-contact',(req,res) => {
    console.log(`received contact form ${req.body.name} <${req.body.email}>`)
    res.redirect(303,'/thank-you')
})
const port = process.env.PORT || 3000
app.listen(port,() => console.log(`\nnavigate to http://localhost:${port}/text\n`))