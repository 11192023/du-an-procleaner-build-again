var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  	res.render('ngv_chitiet', {});
});
router.get('/', function(req, res, next) {
  	res.render('ngv_chitiet', {});
});

module.exports = router;