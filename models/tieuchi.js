var database = require('../Database/MongoDBDriver');
var TieuChiSchema = new database.Schema({
  tentieuchi : { type : String, unique : true },
});
module.exports.TieuChiModel = database.mongoose.model('phuong', TieuChiSchema);