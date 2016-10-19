var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');



module.exports = function (app) {


    app.get('/sign', function (req, res) {
        res.render('sign_up/countdown', {
            title : '倒计时'
        });
    });

    app.get('/form', function (req, res) {
        res.render('form/form', {
            title : '表单'
        });
    });
    
    app.post('/form', function (req, res) {
            userDao.add(req, res, function (err, back) {
                switch (back.msg.direction) {
                    case '1':
                        back.msg.direction = '安全组';
                        break;
                    case '2' :
                        back.msg.direction = '前端组';
                        break;
                    case '3' :
                        back.msg.direction = '网络组';
                        break;
                    default:
                        ;
                }
                switch (back.msg.grade) {
                    case '1' :
                        back.msg.grade = '大一';
                        break;
                    case '2' :
                        back.msg.grade = '大二';
                        break;
                    case '3' :
                        back.msg.grade = '大三';
                        break;
                    case '4' :
                        back.msg.grade = '大四';
                        break;
                    default:
                        ;
                }
                switch (back.msg.sex) {
                    case '1' :
                        back.msg.sex = '男';
                        break;
                    case '2' :
                        back.msg.sex = '女';
                        break;
                    default:
                        ;
                }

                res.json({code : back.code, msg : back.msg});
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
    
    app.get('/result', function (req, res) {
        var params = req.query;
        var msg = {
            name : params.name,
            stNumber : params.stNumber,
            telNumber : params.telNumber,
            direction : params.direction,
            sex : params.sex,
            major : params.major,
            grade : params.grade
        }
        res.render('form/result', {
            title : '结果',
            code : params.code,
            msg : msg
        })
    });

};
