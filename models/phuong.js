var database = require('../Database/MongoDBDriver');
var PhuongSchema = new database.Schema({
  tenphuong : { type : String, unique : true },
  //1 khu vực có nhiều quận
  quan : { type : String, ref : "quan"},
});
module.exports.WardModel = database.mongoose.model('phuong', PhuongSchema);