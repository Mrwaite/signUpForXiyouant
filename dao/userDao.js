//实现与数据库的交互
var mysql = require('mysql'),
    $conf = require('../conf/db'),
    $sql = require('./userSqlMapping');




//使用连接池,提升性能
var pool = mysql.createPool($conf.mysql);

//向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code : '1',
            msg : '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports ={
    //向数据库添加记录
    add : function (req, res) {
        pool.getConnection(function (err, connection) {
            //获取前台页面传过来的数据
            var param = req.body;
            var paramArray = [];

            //var iconv = new Iconv('GBK', 'UTF-8');

            for(var key in param) {
                if(param.hasOwnProperty(key)) {
                    paramArray.push(param[key]);
                }
            }
            //建立连接
            //'INSERT INTO USER'
            connection.query($sql.insert, paramArray, function (err, result) {
                if (err) {
                    res.send(err);
                    connection.release();
                } else {
                    if (result) {
                        result = {
                            code : 200,
                            msg : '增加成功',

                        };
                    }

                    //以json形式, 把操作结果返回给前台页面
                    jsonWrite(res, result);

                    //释放连接
                    connection.release();
                }

            });
        });
    },
    
    checkNameOrSN : function (req, res) {
        pool.getConnection(function (err, connection) {
            if(err) {
                //数据库连接失败
            }
            var param = req.body;
            var select = '';
            if(param.name) {
                select = "select users.name from users where users.name=" + "'" + param.name + "'";
                connection.query(select, function (err, result) {
                    if(err) {
                        res.send(err);
                    }
                    if(result.length > 0) {
                        //表示存在这个name
                        res.json({code : 1});
                    } else {
                        //表示不存在这个name
                        res.json({code : 2});
                    }
                    connection.release();
                });
            } else if (param.stNumber) {
                select = "select users.stNumber from users where users.stNumber=" + "'" + param.stNumber + "'";
                connection.query(select, function (err, result) {
                    if(err) {
                        res.send(err);
                    }
                    if(result.length > 0) {
                        //res.redirect('http://baidu.com');
                        //表示存在这个name
                        res.json({code : 1});
                    } else {
                        //表示不存在这个name
                        res.json({code : 2});
                    }
                    connection.release();
                });
            }
        });
    }
    
}
