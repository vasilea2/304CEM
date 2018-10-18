#!/usr/bin/env node

'use strict'

// import dependencies (npm install <name>)
var express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})    // render main.handlebar

// initiate application using express and set listening port
var app = express();
var port = 8080;

// import directories
app.use(express.static('public'))
app.use(express.static('css'))

// using express engine and the handlebar views
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// foundation route
app.get('/', (req, res) => res.render('myCv'))

// start server and listen on ${port}
app.listen(port, () => console.log(`listening on port ${port}`));