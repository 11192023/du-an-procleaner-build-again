var db = require('../lib/db');
var NhanvienSchema = new db.Schema({
    sodt : { type : Number, unique : true}
	  cmnd : {type: Number, unique: true},
   	hoten : String,
  	hinhanh : [ {url : String} ],
  	trangthai : Boolean,
  	quequan : String,
  	luongtheogio : Number,
    luongcodinh : Number,
  	quyenhethong : Number,
  	diachi : String,
    email : String,
})
var NhanvienDB = db.mongoose.model('nhanvien', NhanvienSchema);