var express = require('express');
var router = express.Router();
var pool = require('../../app.js');

router.use(express.static('pages/main'));
router.use(express.static('pages/calendar'));
router.use(express.static('pages/todolist'));
router.use(express.static('pages/expenses'));

router.get('/', (req, res) => {
    const currentPathName = "main";
    const sql_1 = `SELECT * FROM todo_list;`;
    const sql_2 = `SELECT * FROM expenses;`;
    pool.getConnection((err, connection) => {
        connection.query(
            sql_1 + sql_2,
            (error, results) => {
                connection.release();
                res.render('main/main.ejs', 
                    {
                        todoList: results[0],
                        expenses: results[1],
                        currentPathName: currentPathName
                    });
            }
        );
    });
});

module.exports=router;