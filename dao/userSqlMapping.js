var user = {
    insert:'INSERT INTO users(id, name, stNumber, telNumber, direction, sex, major, grade) VALUES(0,?,?,?,?,?,?,?)',
    update:'update users set name=?,stNumber=?, telNumber=?, direction=?, sex=?, major=?, grade=? where id=?',
    delete: 'delete from users where id=?',
    queryById: 'select * from users where id=?',
    queryAll: 'select * from users'
};

module.exports = user;