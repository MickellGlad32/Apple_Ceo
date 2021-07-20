const http = require('http');
const express = require('express');
const db = require('./model/db')

const exp = require('constants');
const { rawListeners } = require('process');
const { REPL_MODE_SLOPPY } = require('repl');
const hostname = '127.0.0.1';
const port = 3000
let id = 9

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))



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
app.get('/new', (req, res) =>{
    res.render('new', {
        title:'New Ceo Form'
    })
})
app.post('/new', (req, res)=>{
    const newCeo = {
        id: id++,
        slug:req.body.ceo_name.toLowerCase().split(' ').join('_'),
        name: req.body.ceo_name,
        year: req.body.ceo_year,

    }
    db.push(newCeo)
    console.log('New Ceo Received', newCeo)
    res.redirect('/ceos')
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});