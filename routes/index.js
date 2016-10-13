var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');



module.exports = function (app) {


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
                var url = '';
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
                switch (back.msg.sex) {
                    case 'male':
                        back.msg.sex = '男';
                        break;
                    case 'female' :
                        back.msg.sex = '女';
                        break;
                    default:
                        ;
                }
                url = '/result?code=' + back.code + '&name='+ back.msg.name +  '&stNumber=' + back.msg.stNumber + '&telNumber=' + back.msg.telNumber  + '&direction=' + back.msg.direction  + '&sex=' + back.msg.sex + '&major=' + back.msg.major + '&grade=' + back.msg.grade ;
                res.redirect(url);
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
            step : 3,
            code : params.code,
            msg : msg
        })
    });
};
