var db = require('../lib/db');
var KhachhangSchema = new db.Schema({
    _id : {type: Number, unique: true},
    hoten : String,
    sodt : Number,
    matkhau : String,
    diachi : String
});
var MyUser = db.mongoose.model('khachhang', KhachhangSchema);