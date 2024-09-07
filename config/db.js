const Mysql = require('mysql2/promise');

const mySqlPool = Mysql.createPool({  
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_db',
});

module.exports = mySqlPool;
