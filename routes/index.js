var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET home page. */


module.exports = function (app) {
    //
    

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
        /*if(req.body){
            res.redirect('/form');
        } else {*/
            userDao.add(req, res, function (err, back) {
                if (back.code === 1) {
                    res.render('form/result', {
                        title: '结果',
                        step: 3,
                        code: back.code,
                        msg: back.msg
                    });
                } else if (back.code === 2) {
                    switch (back.msg.direction) {
                        case 'safe':
                            back.msg.direction = '安全组';
                            break;
                        case 'fe' :
                            back.msg.direction = '前端组';
                            break;
                        case 'network' :
                            back.msg.direction = '网络组';
                            break;
                        default:
                            ;
                    }
                    switch (back.msg.grade) {
                        case 'one':
                            back.msg.grade = '大一';
                            break;
                        case 'two' :
                            back.msg.grade = '大二';
                            break;
                        case 'three' :
                            back.msg.grade = '大三';
                            break;
                        case 'four' :
                            back.msg.grade = '大四';
                            break;
                        default:
                            ;
                    }
                    res.render('form/result', {
                        title: '结果',
                        step: 3,
                        code: back.code,
                        msg: back.msg
                    });
                }
            });
       // }
    });

    //查询注册的姓名,学号是否重复
    app.post('/checkNameOrSN', function (req, res) {
        userDao.checkNameOrSN(req, res, function (err, code) {
            if(err) {
                return res.send('数据库链接错误' + err);
            }
            res.json({ code : code });
        });
    });
};
