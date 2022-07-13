var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrf=require('csurf'); //Session token
const passport = require('passport');

var csrfProtection=csrf({cookie: false});
router.use(csrfProtection);


/* GET home page. */
router.get('/', function(req, res, next) {
var Products=Product.find(function(err,docs){
    
//console.log(docs) //by NG
var productChunks=[];
var chunkSize=3;
console.log(docs.length) //4

for (var i = 0; i< docs.length;i +=chunkSize)
{
  productChunks.push(docs.slice(i,i+chunkSize)); //slice(from,to)
  //slice=mid function in VBA
}

res.render('shop/index', { title: 'Shopping Cart_EX8 Validation&Flash', products:productChunks });
  
  }).lean(); //patch by NG added .lean();!!!!


  
});

router.get('/user/signup',function(req,res,next){
  console.log('Session ID - '+req.session.csrfSecret);
  console.log('Session Token - '+req.csrfToken()); //Token coming from webbrowser?
  
  const errors=req.flash('signupError') //flash can be read once and will be erased !!!

  if (errors.length>0)
  //if (!errors.isEmpty)
  {   console.log(errors)
  
    res.render('user/signup', { hasErrors:true, messages:errors,csrfToken:req.csrfToken()});
  }
  else
  {
    res.render('user/signup', {csrfToken:req.csrfToken()});
    
  }
 
});

//***********Validatorrrrrrrrrrrrrrrrr****** */
//Validator by NG
const { body, validationResult } = require('express-validator');

router.post('/user/signup',
[body('email').isEmail(),
body('password').isLength({ min: 5 }) 
]

 ,
 (req,res,next)=>{
   console.log('*********Body**************')
   console.log(req.body)
   console.log('*********Errors**************')
   var errors = validationResult(req);
   console.log(errors)
   console.log('***********************') 
   if (!errors.isEmpty()) {
            var messages=[];

             errors.errors.forEach(function (error) {
                        messages.push(error.param+' - '+error.msg);
                    });
   return res.render('user/signup',{ hasErrors:true, messages:messages ,csrfToken:req.csrfToken})
    
   }
    
    console.log('passport.authenticate...')
 
    passport.authenticate('local.signup',
    {
      successRedirect:'/user/profile',
      failureRedirect: '/user/signup',
      filureFlash:true,
     
    })(req, res, next); //fixed by NG

    console.log('***********************')
  }

  );

  router.get('/user/profile',function(req,res,next)
  {
  res.render('user/profile');
  });
 // console.log('Im here')
  //res.redirect('/');
  


module.exports = router;

//docs.forEach(element => {console.log(element.title);});

//productChunks= [
//["Gothic Video Game","IGI Project","Mortal Kombat"]
//["Far Cry 3"]
//]
//console.log(productChunks[1][0].title);
//productChunks.forEach(element => {  console.log(element[0].title);});
 // productChunks.push(docs[i])
  //console.log(i)
  //console.log(productChunks[i][0].title)

//productChunkconsole.log(productChunks[0].length)
