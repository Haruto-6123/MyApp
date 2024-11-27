var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
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

router.use(express.static('pages/markdown'));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    const currentPathName = "markdown";
    connection.query(
        `SELECT * FROM markdown;`,
        (error, results) => {
            res.render('markdown/markdown_folder.ejs', 
                {
                    folders: results,
                    currentPathName: currentPathName
                });
        }
    );
});

router.get('/:pathName', (req, res) => {
    res.render('markdown/markdown.ejs', {pathName: req.params.pathName});
});

router.get('/edit/:pathName', (req, res) => {
    res.render('markdown/markdown_edit.ejs', {pathName: req.params.pathName});
});

router.get('/load_markdown/:pathName', (req, res) => {
    const filePath = path.join(__dirname, `/pages/${req.params.pathName}`);
    const defaultContent = '';
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error loading markdown.');
            }
            res.status(200).send(data); // ファイルの内容を返す
        });
    } else {
        try {
            fs.writeFileSync(filePath, defaultContent);
            console.log(`${filePath} created successfuuly.`);
        } catch (err) {
            console.error(err);
        }
    }
});

router.post('/save_markdown/:pathName', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send("Content is required.");
    }
    const filePath = path.join(__dirname, `/pages/${req.params.pathName}`);
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error saving markdown.');
        }
        res.status(200).send('Markdown saved succeessfully.');
    });
});

router.post('/add_file', (req, res) => {
    connection.query(
        'INSERT INTO markdown (name,url) VALUES (?,?);',
        [req.body.name, req.body.url],
        (error, results) => {
            res.redirect('/markdown');
        }
    );
});

router.post('/edit_file/:id', (req, res) => {
    // console.log(req.body.name);
    connection.query(
        'UPDATE markdown SET name=? WHERE id=?;',
        [req.body.name, req.params.id],
        (error, results) => {
            res.redirect('/markdown');
        }
    );
});

router.post('/delete_file/:id', (req, res) => {
    const filePath = path.join(__dirname, `/pages/${req.body.pathName}`);
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('File deleted successfully');
          });
    } else {
        console.error('Not file');
    }
    connection.query(
        'DELETE FROM markdown WHERE id = ?;',
        [req.params.id],
        (error, results) => {
            res.redirect('/markdown');
        }
    );
});

router.post('/test/:pathName', (req, res) => {
    console.log(req.params.pathName);
    if (req.params.pathName == 'markdown') {
        res.redirect('/markdown');
    } else if (req.params.pathName == 'main') {
        res.redirect('/main');
    } else {
        res.redirect('/markdown');
    }
});

module.exports=router;