var db = require('../lib/db');
var YeucauSchema = new db.Schema({
	ngayyeucau : Date,
	ngayketthuc : Date,
  	_nhanvienxuly : { type: Number, ref: 'nhanvien' },
  	_nguoigiupviec : { type: Number, ref: 'nguoigiupviec' },
  	_sdtkhachhang : { type: Number, ref: 'khachhang' },
  	loaiyeucau : Number,
})
var MyUser = db.mongoose.model('yeucau', YeucauSchema);