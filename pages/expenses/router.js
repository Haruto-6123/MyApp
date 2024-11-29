var express = require('express');
var router = express.Router();

var pool = require('../../app.js');

router.use(express.static('pages/expenses'));

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            `SELECT * FROM expenses order by date DESC;`,
            (error, results) => {
                connection.release();
                res.render('expenses/expenses.ejs', {expenses: results});
            }
        );
    });
});

router.post('/add_expenses', (req, res) => {
    var bool = 0;
    if (req.body.expenses == null) {
        bool = 0;
    } else {
        bool = 1;
    }
    pool.getConnection((err, connection) => {
        connection.query(
            'INSERT INTO expenses (date,content,amount,expenses) VALUES (?,?,?,?);',
            [req.body.date, req.body.content, req.body.money, bool],
            (error, results) => {
                connection.release();
                res.redirect('/expenses');
            }
        );
    });
});

router.post('/delete_expenses/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'DELETE FROM expenses WHERE id = ?;',
            [req.params.id],
            (error, results) => {
                connection.release();
                res.redirect('/expenses');
            }
        );
    });
});

module.exports=router;