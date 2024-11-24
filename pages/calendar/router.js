var express = require('express');
var router = express.Router();

router.use(express.static('pages/calendar'));

router.get('/', (req, res) => {
    res.render('calendar/calendar.ejs');
});

module.exports=router;