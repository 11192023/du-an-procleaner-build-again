var db = require('../lib/db');
var LichLVSchema = new db.Schema({
	 nguoigiupviec : String,
	 ngaylam : Date,
	 giobatdau : Date,
	 gioketthuc : Date,
	 khachhang : String
})
var LichlvDB = db.mongoose.model('lichlamviec', LichLVSchema);
module.exports.llvModel = LichlvDB;