var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  	res.render('ngv_chitiet', {cmnd : req.params.id});
});
router.get('/', function(req, res, next) {
  	res.render('ngv_chitiet', {});
});

module.exports = router;