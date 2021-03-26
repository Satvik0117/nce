var express=require('express');
var router=express.Router(); 
var Ex=require('../models/exercise.js');
var User=require('../models/user.js');


router.get('/', (req,res) => {
    res.render('index.ejs');

});
router.get('/index', (req,res) => {
    res.render('index.ejs');

});
router.get('/index', (req,res) => {
    res.render('index.ejs');

});
router.get('/about-us', (req,res) => {
    res.render('about-us.ejs');

});
router.get('/classes', (req,res) => {
    res.render('classes.ejs');

});

router.get('/contact',(req,res)=>{
    res.render('contact.ejs');
});
router.get('/tools',(req,res)=>{
    Ex.find((err,ex) => {

        if(err) return console.log(err);
        // console.log(ex);
        res.render('exercise.ejs', {ex:ex});
    })
});

router.get('/verify',(req,res)=>{
    res.render('verify');
});

router.post('/verify',function(req,res){
	var certi_id=req.body.certi;
    console.log(certi_id);
    User.find({certi_id : certi_id}, (err,user) => {
        res.render('details',{user:user});
    });

});
router.get('/exercise',(req,res)=>{
    Ex.find((err,ex) => {
        if(err) return console.log(err);
        res.render('exercise.ejs', {ex:ex});
    })
})

module.exports = router;