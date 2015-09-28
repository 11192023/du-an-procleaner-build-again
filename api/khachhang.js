var express = require('express');
var router = express.Router();
var khachhang = require('../models/khachhang.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  khachhang.khModel.find(function(err, khs){
  	if(err)
  		res.send(err)
  	res.json(khs);
  });
});

/*
router.get('/', function(req, res, next) {
  res.json({ message: 'hello json' });
}); */

module.exports = router;