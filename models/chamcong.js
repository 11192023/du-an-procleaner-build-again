var db = require('../lib/db');
var ChamCongSchema = new db.Schema({
	  cmnd : {type: Number, ref: 'nhanvien'},
   	hoten : String,
    nuangay : Boolean,
})
var ChamCong = db.mongoose.model('chamcong', ChamCongSchema);