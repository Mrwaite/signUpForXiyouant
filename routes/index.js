var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET home page. */


module.exports = function (app) {
    //
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.post('/', function (req, res) {
        
        res.send('该用户未报名!');
    });

    app.get('/sign', function (req, res) {
        res.render('sign_up/countdown', {
            title : '倒计时',
            step : 1
        });
    });

    app.get('/form', function (req, res) {
        res.render('form/form', {
            title : '表单',
            step : 2
        });
    });
    
    app.post('/form', function (req, res) {
        userDao.add(req, res);
    });

    //查询注册的姓名,学号是否重复
    app.post('/checkNameOrSN', function (req, res) {
        
    });
};
