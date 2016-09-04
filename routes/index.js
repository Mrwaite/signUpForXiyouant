var express = require('express');
var router = express.Router();

/* GET home page. */


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.post('/', function (req, res) {
        
        res.send('该用户未报名!');
    });
};
