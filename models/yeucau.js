var db = require('../lib/db');
//yêu cầu tính theo ngày
var YeucauSchema = new db.Schema({
	ngayyeucau : Date,
	ngayketthuc : Date,
	chiphi : Number,
	ngaylam : Date, // ngày khách hàng yêu cầu làm, nếu dài hạn
	giobatdau : Date,
	gioketthuc : Date,
  	nhanvienxuly : { type: Number, ref: 'nhanvien' },
  	nguoigiupviec : { type: Number, ref: 'nguoigiupviec' },
  	sdtkhachhang : { type: Number, ref: 'khachhang' },
  	loaiyeucau : Number,
})
var YeucauDB = db.mongoose.model('yeucau', YeucauSchema);