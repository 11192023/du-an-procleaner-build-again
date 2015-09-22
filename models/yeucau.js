var db = require('../lib/db');
//yêu cầu tính theo ngày
var YeucauSchema = new db.Schema({
	id : {type: Number, unique: true},
	ngayyeucau : Date,
	ngaybatdau : Date,
	ngayketthuc : Date,
	chiphi : Number,
	khunggio : [{
		giobatdau : Date,
		gioketthuc : Date,
		nguoigiupviec : Number
	}]
  	nhanvienxuly : Number,
  	sdtkhachhang : Number,
  	loaiyeucau : Number,
  	trangthai : String
})
var YeucauDB = db.mongoose.model('yeucau', YeucauSchema);