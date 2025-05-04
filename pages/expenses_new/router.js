var express = require('express');
var router = express.Router();

var pool = require('../../app.js');
router.use(express.static('pages/expenses_new'));

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            `SELECT * FROM expenses_new order by date DESC;`,
            (error, results) => {
                connection.release();
                res.render('expenses_new/expenses.ejs', {expenses: results});
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
            'INSERT INTO expenses_new (date,amount,category,content,expenses) VALUES (?,?,?,?,?);',
            [req.body.date, req.body.money, req.body.category, req.body.content, req.body.expenses],
            (error, results) => {
                connection.release();
                res.redirect('/expenses_new');
            }
        );
    });
});

router.post('/delete_expenses/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'DELETE FROM expenses_new WHERE id = ?;',
            [req.params.id],
            (error, results) => {
                connection.release();
                res.redirect('/expenses_new');
            }
        );
    });
});

module.exports=router;