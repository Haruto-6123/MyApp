var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../../app.js');

router.use(express.static('pages/person'));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'SELECT * FROM person;',
            (error, results) => {
                connection.release();
                res.render('person/person.ejs', {persons: results});
            }
        );
    });
});

router.post('/add_person', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'INSERT INTO person (date,name,place,impression,memo) VALUES (?,?,?,?,?);',
            [req.body.date, req.body.name, req.body.place, req.body.impression, req.body.memo],
            (error, results) => {
                connection.release();
                res.redirect('/person');
            }
        );
    });
});

router.post('/delete_person/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            'DELETE FROM person WHERE ids = ?;',
            [req.params.id],
            (error, results) => {
                connection.release();
                res.redirect('/person');
            }
        );
    });
});

router.post('/edit_person/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
            `UPDATE person SET ${req.body.column}=? WHERE id=?;`,
            [req.body.value, req.params.id],
            (error, results) => {
                connection.release();
                res.redirect('/person');
            }
        );
    });
});

module.exports=router;