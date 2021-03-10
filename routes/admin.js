var express=require('express');
var router=express.Router(); 
var express=require('express');
var router=express.Router(); 
var Ex=require('../models/exercise.js');
var User=require('../models/user.js');

const upload = require("../multer/storage.js");


router.get('/add-exercise', (req,res) => {
    res.render('add-exercise.ejs');
});

router.post('/add-exercise',function(req,res){
	

    upload(req, res, function (err) {
		// need to check if the req.file is set.
		if(req.file== null){
			console.log("nothing got here");
		}
        if(req.file == null || req.file == undefined || req.file == ""){
            //redirect to the same url         
            console.log("failed");   
            res.redirect("/");
            
        }else{
            // An error occurred when uploading
            if (err) {
                console.log("failed while uploading");   

                console.log(err);
            }else{
                // Everything went fine
                //define what to do with the params
                //both the req.body and req.file(s) are accessble here
                // console.log(req.file);
        
        
                //store the file name to mongodb    
                //we use the model to store the file.
                

                    var name=req.body.ex_name;
                    var bd=req.body.bd;
                    var eq=req.body.eq;
                    var diff=req.body.diff;
                
                    var ex= new Ex({
                        name:name,
                        bd:bd,
                        eq:eq,
                        diff:diff,
                        image_path:req.file.filename

                    });
                    console.log(ex);
                    ex.save(function(err){
                        if(err){
                            return console.log(err);
                        }
                        res.redirect('/admin/add-exercise');
                        return;
                    });
                
                    // req.flash('success','Category Added');

            }
          }

        });

});

router.get('/exercise',function(req,res){
	Ex.find(function(err,ex){
		if(err) return console.log(err);
		res.render('admin-ex',{
			ex:ex
		});
	});
});

router.get("/user",function(req,res){
	User.find(function(err,user){
		if(err) return console.log(err);
		res.render('admin-user',{
			user:user
		});
	});
});

router.get("/add-user",function(req,res){
    res.render("add-user.ejs");
});

router.post('/add-user',function(req,res){
	var email=req.body.email;
	var password=req.body.password;
	var address=req.body.address;
	var name=req.body.name;
	var certi_id=req.body.certi_id;
	var course=req.body.course;
	var number=req.body.number;
	
    var user= new User({
        name:name,
        number:number,
        password:password,
        email:email,
        course:course,
        certi_id:certi_id,
        address:address,
    });
    user.save(function(err){
        if(err){
            return console.log(err);
        }
        // req.flash('success','Category Added');
        res.redirect('/admin/user');
    });
});

router.post("/user/delete/:id", function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
		} else {
			user.remove();
			res.redirect("/admin/user");
		}
	}); 
 });

router.post("/exercise/delete/:id", function(req, res){
	Ex.findById(req.params.id, function(err, e){
		if(err){
			console.log(err);
		} else {
			e.remove();
			res.redirect("/admin/exercise");
		}
	}); 
 });




module.exports = router;