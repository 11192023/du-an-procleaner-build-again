var db = require('../lib/db');
var KhuvucSchema = new db.Schema({
  tenkhuvuc : String,
  //1 khu vực có nhiều quận
  quan : [{type : String, ref : "quan"}]
})
var KhuvucDB = db.mongoose.model('Khuvuc', KhuvucSchema);