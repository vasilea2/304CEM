'use strict'

var db = require('./database');

exports.add = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, con){
        //when done check for any error 
        if (err) {
            callback(err);
            return;
        }
        //if no error prepare our user object with the values sent by the client
        const message = {
            name: req.body['formName'],
            email: req.body['formEmail'],
            url: req.body['formSite'],
            message: req.body['formMessage']
        };
        //perform the query 
        con.query('INSERT INTO Messages SET ?', message, function (err, result) {
            //return control to the calling module
            callback(err, message);
        });
    });
}; 