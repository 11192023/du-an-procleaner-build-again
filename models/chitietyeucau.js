var db = require('../lib/db');
//yêu cầu tính theo ngày
var ChitietYCSchema = new db.Schema({
	idyeucau : Number,
	giobatdau : Date,
	gioketthuc : Date,
	nguoigiupviec :Number,
	nhanxet :String,
	matdo :Boolean,
	hudo : Boolean,
	trangthai : String
})
var ChitietYCDB = db.mongoose.model('chitietyeucau', YeucauSchema);