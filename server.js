const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.render('index.handlebars')
})
app.listen(3000)