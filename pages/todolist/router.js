var express = require('express');
var router = express.Router();

var mysql = require('mysql');
// MySqlのsetput
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb',
    dateStrings: 'date',
    multipleStatements: true
});

router.use(express.static('pages/todolist'));

router.get('/', (req, res) => {
    const sql_1 = 'set @n:=0;';
    const sql_2 = 'update todo_list set ids=(@n:=@n+1);';
    const sql_3 = 'SELECT * FROM todo_list;';
    connection.query(
        sql_1 + sql_2 + sql_3,
        (error, results) => {
            res.render('todolist/todolist.ejs', {todoList: results[2]});
        }
    );
});

router.post('/add_todo', (req, res) => {
    connection.query(
        'INSERT INTO todo_list (contents,dates) VALUES (?,?);',
        [req.body.contents, req.body.dates],
        (error, results) => {
            res.redirect('/todolist');
        }
    );
});

router.post('/delete_todo/:id', (req, res) => {
    connection.query(
        'DELETE FROM todo_list WHERE ids = ?;',
        [req.params.id],
        (error, results) => {
            res.redirect('/todolist');
        }
    );
});

module.exports=router;