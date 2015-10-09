var db = require('../lib/db');
var NgvSchema = new db.Schema({
    cmnd : {type: String, unique: true},
    hoten : String,
    ngaysinh : Date,
    sodt : Number,
    quequan : String,
    diachi : {
        phuong : String,
        quan : String
    },
    sotruong :[],
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : String,
    giaykhamsuckhoe : String,
    //trangthai : Boolean,
    luongcodinh : Number,
    mucluongtheogio : Number,
    //ngày bận là mảng những ngày bận, 1 ngày có nhiều khung giờ bận
    ngayban : [{
        ngay : Date,
        khunggio : [{
            giobatdau : Number,
            Giokethuc : Number
        }]
    }]
});
var NgvDB = db.mongoose.model('nguoigiupviec', NgvSchema);
module.exports.ngvModel = NgvDB;