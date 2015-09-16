var db = require('../lib/db');
var QuanSchema = new db.Schema({
	 tenquan : { type : String, unique : true },
   //1 quận thuộc 1 khu vực
   khuvuc : { type : String, ref : "khuvuc"},
})
var QuanDB = db.mongoose.model('quan', QuanSchema);