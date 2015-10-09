var db = require('../lib/db');
var LichLVSchema = new db.Schema({
	 nguoigiupviec : String,
	 ngaylam : Date,
	 giobatdau : Number,
	 gioketthuc : Number,
	 khachhang : String
})
var LichlvDB = db.mongoose.model('lichlamviec', LichLVSchema);
module.exports.llvModel = LichlvDB;