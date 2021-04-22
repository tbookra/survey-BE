const mysql = require("mysql2");


const pool = mysql.createPool({
  host: 'rt-test.xyz',
  user: 'portal',
  password:' Az12345678' ,
  database: 'studentsTest2',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();

/*
SQL_HOST=localhost
SQL_USER=root
SQL_PASSWORD=1234
DB_NAME=project_database
SQL_DB1=bicycle_shop
PORT=5000
SQL_PORT=3306
*/