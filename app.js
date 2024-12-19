const express = require('express');
const app = express();

// MySqlのsetput
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb',
    dateStrings: 'date',
    multipleStatements: true
});

module.exports = pool;

// ミドルウェア(HTTPリクエストとレスポンスの間の処理)
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//　
app.use('/', require('./pages/top/router.js'));
app.use('/main', require('./pages/main/router.js'));
app.use('/calendar', require('./pages/calendar/router.js'));
app.use('/todolist', require('./pages/todolist/router.js'));
app.use('/expenses', require('./pages/expenses/router.js'));
app.use('/markdown', require('./pages/markdown/router.js'));
app.use('/person', require('./pages/person/router.js'));

// サーバの起動
var listener = app.listen(3000, () => {
    console.log(`localhost:${listener.address().port}`);
});