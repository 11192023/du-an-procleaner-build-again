var db = require('../lib/db');
var LichLVSchema = new db.Schema({
	_nguoigiupviec : { type: Number, ref : 'nguoigiupviec' },
  	lichlamviec : [{
  		[ {ngaylam : Date} ],
  		_khachhang : { type: Number, ref : 'khachhang' },
  	}]
})
var MyUser = db.mongoose.model('lichlamviec', LichLVSchema);