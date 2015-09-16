var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  var thanhpho = req.body.thanhpho;
  var ngay = req.body.ngay;
  var tgbd = req.body.tgbd;
  var tgkt = req.body.tgkt;
  res.writehead('/search' + '?thanhpho=' 
  	+ thanhpho + '&ngay=' 
  	+ ngay + '&tgbd=' 
  	+ tgbd + '&tgkt=' 
  	+ tgkt);
});
/*
router.get('/', function(req, res, next) {
  res.json({ message: 'hello json' });
}); */

module.exports = router;
