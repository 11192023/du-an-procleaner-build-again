var db = require('../lib/db');
var NgvSchema = new db.Schema({
    _id : {type: Number, unique: true},
    cmnd : {type: Number, unique: true},
    hoten : String,
    kinhnghiem : Number,
    hinhanh : [ {url : String} ],
    giaykhamsuckhoe : [ {url : String} ],
    trangthai : Boolean,
    quequan : String,
    mucluong : Number,
    diachi : String
});
var MyUser = db.mongoose.model('nguoigiupviec', NgvSchema); 