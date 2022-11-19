const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.engine('handlebar', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/custom-layout', (req, res) => res.render('custom-layout', {
    layout: 'custom'
}))

app.get('*', (req, res) => res.send('check out the "<a href="/custom-layout">custom layout</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/custom-layout\n`))