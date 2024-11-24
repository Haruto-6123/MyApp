var express = require('express');
var router = express.Router();

router.use(express.static('pages/top'));

router.get('/', (req, res) => {
    res.render('top/top.ejs');
});

module.exports=router;