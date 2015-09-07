var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database

var username = "admin";
var password = "admin";
var address = '@ds035673.mongolab.com:35673/study';
connect();
// Connect to mongo
function connect() {
 var url = 'mongodb://' + username + ':' + password + address;
 mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}