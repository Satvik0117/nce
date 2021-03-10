var mongoose=require('mongoose');

var ExSchema=mongoose.Schema({
	
	name:{
		type:String,
		required:true
	},
	bd:{
		type:String,
		required:true
	},
	eq:{
		type:String,
		required:true
	},
	diff:{
		type:String,
		default:2,
		required:true
	},
	image_path:{
		type:String,
		default:2,
		required:true
	}
	
	
});

module.exports=mongoose.model('Ex',ExSchema);