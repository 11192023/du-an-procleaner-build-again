var db = require('../lib/db');
var NhanvienSchema = new db.Schema({
    cmnd : {type: Number, unique: true},
    hoten : String,
    quequan : String,
    sodt :  type : Number,
    hinhanh : String,
    luong : Number,
    quyenhethong : Number,
    email : String
})
var NhanvienDB = db.mongoose.model('nhanvien', NhanvienSchema);