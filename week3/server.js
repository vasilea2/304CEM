#!/usr/bin/env node

'use strict'

// import dependencies (npm install <name>)
const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})    // render main.handlebar
const bodyParser = require('body-parser');
const db = require('./modules/database')
const message = require('./modules/messages')

// initiate application using express and set listening port
const app = express(); 
const port = 8080;

// import directories
app.use(express.static('public'))
app.use(express.static('css'))

// using express engine and the handlebar views
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }));

const databaseData = {
    host: 'sql2.freemysqlhosting.net',
    user: 'sql2261741',
    password: 'zR9%aE1*',
    database: 'sql2261741',
    port: 3306
}

// foundation route
app.get('/', (req, res) => {
    let lang = ''
    if(req.query !== undefined && req.query.lang !== undefined) {
        if (req.query.lang === 'en') {
            lang = 'Welcome'
            console.log('Clicked on english')
        } else if (req.query.lang === 'fr') { 
            console.log('Clicked on french')
            lang = 'Bonjour'
        } else if (req.query.lang === 'sp') { 
            console.log('Clicked on spanish') 
            lang = 'Bienvenido'
        }  
    }
    res.render('myCv', {language: lang})
})

app.post('/process_contact_submission', (req, res) => {
    if (req.body) console.log(req.body['formName'])
    message.add(databaseData, req, function (err, data) {
        if (err) {
            res.status(400)
            res.end('error: ' + err)
        }
        res.status(201)
        res.end('success')
    })
    // if (req.body) formResponse = req.body
    // console.log(formResponse)
    // console.log('Nice to see you ' + formResponse.name)
    // res.end(JSON.stringify(req.body, null, 2));
})

app.get('/createTables', (req, res) => {
    db.createTables(databaseData, function(err, state){
        if(err) {
            res.status(400);
            res.end("an error has occured:" + err);
            return;
        }
    res.status(200);
    res.end("tables were created successfully");
    })
})

// start server and listen on ${port}
app.listen(port, err => {
    if (err) console.error(err)
    else console.log(`App is ready on port ${port}`)
})