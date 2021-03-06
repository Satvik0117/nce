var mongoose=require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema=mongoose.Schema({
	email:{type:String,required:true},	
	password:{type:String,required:true},
	address:{type:String,required:true},
	name:{type:String,required:true},
	number:{type:String,required:true},
	certi_id:{type:String,required:true},
	course:{type:String,required:true}
});

userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports=mongoose.model('User',userSchema);