var db = require('../lib/db');
//tính theo ngày, với ngày x giờ a -> b thì người giúp việc g làm cho khách hàng h
var LichLVSchema = new db.Schema({
	 nguoigiupviec : { type: Number, ref : 'nguoigiupviec' },
	 ngaylam : Date,
	 giobatdau : Date,
	 gioketthuc : Date,
	 khachhang : { type: Number, ref : 'khachhang' },
})
var LichlvDB = db.mongoose.model('lichlamviec', LichLVSchema);