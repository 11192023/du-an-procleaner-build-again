var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var typesearch = req.body.typesearch;
  if(typesearch == 'nh'){
    var quan = req.body.quan;
    var ngay = req.body.ngay;
    var dichvu = req.body.dichvu;
    var giobd1 = req.body.giobd1;
    var giokt1 = req.body.giokt1;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&dichvu=' + dichvu
      + '&ngay=' + ngay 
      + '&giobd1=' + giobd1 
      + '&giokt1=' + giokt1;
    res.redirect('/search' + q);
  }
  else if(typesearch == 'dh'){
    var quan = req.body.quan;
    var dichvu = req.body.dichvu;
    var ngaybd = req.body.ngaybd;
    var ngaykt = req.body.ngaykt;
    var giobd1 = req.body.giobd1;
    var giokt1 = req.body.giokt1;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&dichvu=' + dichvu +
      + '&ngaybd=' + ngaybd + '&ngaykt=' + ngaykt 
      + '&giobd1=' + giobd1 + '&giokt1=' + giokt1;
    res.redirect('/search' + q);
  }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('search', { title: 'Express'});
});

module.exports = router;
