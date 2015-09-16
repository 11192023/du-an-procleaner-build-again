var db = require('../lib/db');
var KhachhangSchema = new db.Schema({
    hoten : String,
    sodt : { type : Number, Unique : true }
    matkhau : String,
    diachi : String,
    email : String
});
var KhachhangDB = db.mongoose.model('khachhang', KhachhangSchema);