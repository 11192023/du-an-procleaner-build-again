var db = require('../lib/db');
var NgvSchema = new db.Schema({
	id : Number,
	cmnd : {type: Number, unique: true},
   	ho : String,
  	ten : String,
  	hinhanh : [ {diachi : String} ],
  	giaykhamsuckhoe : [ {diachi : String} ],
  	trangthai : Boolean,
  	quequan : String,
  	mucluong : Number,
  	nguoiquanly : [{type : Schema.Types.ObjectId, ref : 'nhanvien'}]
})
var MyUser = db.mongoose.model('nguoigiupviec', NgvSchema);
// Exports
module.exports.add_nguoigv = add_nguoigv;
// Add user to database
	function add_nguoigv(nguoigiupviec) {
		var instance = new MyUser();
		instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}