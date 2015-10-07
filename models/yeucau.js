var db = require('../lib/db');
//yêu cầu tính theo ngày
var YeucauSchema = new db.Schema({
	id : {type: Number, unique: true},
	ngayyeucau : Date,
	ngaybatdau : Date,
	ngayketthuc : Date,
	chiphi : Number,
  	nhanvienxuly : Number,
  	sdtkhachhang : Number,
  	loaiyeucau : String,
  	trangthai : String
})
var YeucauDB = db.mongoose.model('yeucau', YeucauSchema);