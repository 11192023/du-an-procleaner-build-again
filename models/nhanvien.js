var db = require('../lib/db');
var NhanvienSchema = new db.Schema({
	_id : {type: Number, unique: true},
	cmnd : {type: Number, unique: true},
   	ho : String,
  	ten : String,
  	hinhanh : [ {url : String} ],
  	trangthai : Boolean,
  	quequan : String,
  	mucluong : Number,
  	quyenhethong : Number,
  	diachi : String
})
var MyUser = db.mongoose.model('nhanvien', NhanvienSchema);