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
    sotruong :[{ tensotruong : String}],
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : String,
    giaykhamsuckhoe : [ {url : String} ],
    //trangthai : Boolean,
    luongcodinh : Number,
    mucluongtheogio : Number,
    //ngày bận là mảng những ngày bận, 1 ngày có nhiều khung giờ bận
    ngayban : [{
        ngay : Date,
        khunggio : [{
            giobatdau : Date,
            Giokethuc : Date
        }]
    }]
});
var NgvDB = db.mongoose.model('nguoigiupviec', NgvSchema); 