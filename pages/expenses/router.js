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

router.use(express.static('pages/expenses'));

router.get('/', (req, res) => {
    connection.query(
        `SELECT * FROM expenses order by date DESC;`,
        (error, results) => {
            res.render('expenses/expenses.ejs', {expenses: results});
        }
    );
});

router.post('/add_expenses', (req, res) => {
    var bool = 0;
    if (req.body.expenses == null) {
        bool = 0;
    } else {
        bool = 1;
    }
    connection.query(
        'INSERT INTO expenses (date,content,amount,expenses) VALUES (?,?,?,?);',
        [req.body.date, req.body.content, req.body.money, bool],
        (error, results) => {
            res.redirect('/expenses');
        }
    );
});

router.post('/delete_expenses/:id', (req, res) => {
    connection.query(
        'DELETE FROM expenses WHERE id = ?;',
        [req.params.id],
        (error, results) => {
            res.redirect('/expenses');
        }
    );
});

module.exports=router;