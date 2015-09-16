var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var thanhpho = req.body.thanhpho;
  var ngay = req.body.ngay;
  var tgbd = req.body.tgbd;
  var tgkt = req.body.tgkt;
  res.redirect('/search' + '?thanhpho=' 
  	+ thanhpho + '&ngay=' 
  	+ ngay + '&tgbd=' 
  	+ tgbd + '&tgkt=' 
  	+ tgkt);
});
/* GET users listing. */
router.get('/', function(req, res, next) {
	var thanhpho = req.query.thanhpho;
	var ngay = req.query.ngay;
	var tgbd = req.query.tgbd;
	var tgkt = req.query.tgkt;
  	res.render('search', { title: 'Express',
  	  thanhpho : thanhpho,
  	  ngay : ngay,
  	  tgbd : tgbd,
  	  tgkt : tgkt });
});

module.exports = router;
