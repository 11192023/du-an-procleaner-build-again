var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var typesearch = req.body.typesearch;
  if(typesearch == 'nh'){
    var quan = req.body.quan;
    var ngay = req.body.ngay;
    var giobd1 = req.body.giobd1;
    var giobd2 = req.body.giobd2;
    var giobd3 = req.body.giobd3;
    var giokt1 = req.body.giokt1;
    var giokt2 = req.body.giokt2;
    var giokt3 = req.body.giokt3;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&ngay=' + ngay 
      + '&giobd1=' + giobd1 
      + '&giokt1=' + giokt1;
    if(giobd2!=null)
      q += '&giobd2=' + giobd2 + '&giokt2=' + giokt2;
    if(giobd3!=null)
      q += '&giobd3=' + giobd3 + '&giokt3=' + giokt3;
    res.redirect('/search' + q);
  }
  if(typesearch == 'dh'){
    var quan = req.body.quan;
    var ngaybd = req.body.ngaybd;
    var ngaykt = req.body.ngaykt;
    var giobd1 = req.body.giobd1;
    var giobd2 = req.body.giobd2;
    var giobd3 = req.body.giobd3;
    var giokt1 = req.body.giokt1;
    var giokt2 = req.body.giokt2;
    var giokt3 = req.body.giokt3;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&ngaybd=' + ngaybd + '&ngaykt=' + ngaykt 
      + '&giobd1=' + giobd1 + '&giokt1=' + giokt1;
    if(giobd2!=null)
      q += '&giobd2=' + giobd2 + '&giokt2=' + giokt2;
    if(giobd3!=null)
      q += '&giobd3=' + giobd3 + '&giokt3=' + giokt3;
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
