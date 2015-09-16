var db = require('../lib/db');
var NgvSchema = new db.Schema({
    cmnd : {type: Number, unique: true},
    hoten : String,
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : [ {url : String} ],
    giaykhamsuckhoe : [ {url : String} ],
    sodt : Number,
    trangthai : Boolean,
    quequan : String,
    luongcodinh : Number,
    luongbanthoigian : Number,
    diachi : String,
    //mỗi người giúp việc thuộc 1 quận
    quan : {type: String, ref : "quan"}
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