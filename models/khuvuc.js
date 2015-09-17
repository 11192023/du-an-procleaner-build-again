var db = require('../lib/db');
var KhuvucSchema = new db.Schema({
  tenkhuvuc : String,
})
var KhuvucDB = db.mongoose.model('Khuvuc', KhuvucSchema);