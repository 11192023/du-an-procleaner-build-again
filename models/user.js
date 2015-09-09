var db = require('../lib/db');
var UserSchema = new db.Schema({
   username : {type: String, unique: true}
 , password : String
})
var MyUser = db.mongoose.model('user', UserSchema);
// Exports
module.exports.addUser = addUser;
module.exports.newUser = MyUser;
module.exports.findUser = findUser;
// Add user to database
	function addUser(user, callback) {
		var instance = new MyUser();
		instance.username = user.username;
		instance.password = user.password;
		instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});

}
function findUser(id){
	MyUser.findOne({ username : id }, 'username password', function(err, user){
		if(err) {
			callback(err);
		}
		else {
			console.log(user.password);
		}
	});
}