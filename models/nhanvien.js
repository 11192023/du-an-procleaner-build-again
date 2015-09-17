var db = require('../lib/db');
var NhanvienSchema = new db.Schema({
    sodt :  type : Number,
    cmnd : {type: Number, unique: true},
    hoten : String,
    hinhanh : [ {url : String} ],
    trangthai : Boolean,
    quequan : String,
    luong : Number,
    quyenhethong : Number,
    diachi : String,
    email : String,
})
var NhanvienDB = db.mongoose.model('nhanvien', NhanvienSchema);