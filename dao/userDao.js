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
    } 
    
}
