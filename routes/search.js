var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var typesearch = req.body.typesearch;
  if(typesearch == 'nh'){
    var quan = req.body.quan;
    var ngay = req.body.ngay;
    var giobd1 = req.body.giobd1;
    var giokt1 = req.body.giokt1;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&ngay=' + ngay 
      + '&giobd1=' + giobd1 
      + '&giokt1=' + giokt1;
    res.redirect('/search' + q);
  }
  else if(typesearch == 'dh'){
    var quan = req.body.quan;
    var ngaybd = req.body.ngaybd;
    var ngaykt = req.body.ngaykt;
    var giobd1 = req.body.giobd1;
    var giokt1 = req.body.giokt1;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&ngaybd=' + ngaybd + '&ngaykt=' + ngaykt 
      + '&giobd1=' + giobd1 + '&giokt1=' + giokt1;
    res.redirect('/search' + q);
  }
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
