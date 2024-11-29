var express = require('express');
var router = express.Router();
var pool = require('../../app.js');

router.use(express.static('pages/todolist'));

router.get('/', (req, res) => {
    const sql_1 = 'set @n:=0;';
    const sql_2 = 'update todo_list set ids=(@n:=@n+1);';
    const sql_3 = 'SELECT * FROM todo_list;';
    pool.getConnection((err, connection) => {
        connection.query(
            sql_1 + sql_2 + sql_3,
            (error, results) => {
                connection.release();
                res.render('todolist/todolist.ejs', {todoList: results[2]});
            }
        );
    });
});

router.post('/add_todo', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'INSERT INTO todo_list (contents,dates) VALUES (?,?);',
            [req.body.contents, req.body.dates],
            (error, results) => {
                connection.release();
                res.redirect('/todolist');
            }
        );
    });
});

router.post('/delete_todo/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'DELETE FROM todo_list WHERE ids = ?;',
            [req.params.id],
            (error, results) => {
                connection.release();
                res.redirect('/todolist');
            }
        );
    });
});

module.exports=router;