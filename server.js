const http = require('http');
const express = require('express');
const db = require('./model/db')

const exp = require('constants');
const { rawListeners } = require('process');
const { REPL_MODE_SLOPPY } = require('repl');
const hostname = '127.0.0.1';
const port = 3000

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.get('/', (req, res)=>{
    res.render('home',{
        title: "Apple CEOs",
        special:'Important people that you want to know.'
    })
})
app.get('/CEOs', (req,res) =>{
    res.render('ceo-list',{
        title: "Apple CEOs",
        CEOs:db
    })
})
app.get('/CEOs/:slug', (req, res) =>{
    const selectedCEO = db.find((CEO) =>{
        return CEO.slug === req.params.slug
    })
    res.render('ceo-details',{
        title: 'CEO',
        CEO: selectedCEO
    })
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});