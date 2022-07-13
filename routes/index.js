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

res.render('shop/index', { title: 'Shopping Cart_EX9 Sign In', products:productChunks });
  
  }).lean(); //patch by NG added .lean();!!!!


  
});

router.get('/user/signup',function(req,res,next){
  console.log('Session ID - '+req.session.csrfSecret);
  console.log('Session Token - '+req.csrfToken()); //Token coming from webbrowser?
  
  const ErrorMessages=req.flash('error') //flash can be read once and will be erased !!!

  if (ErrorMessages.length>0)
  //if (!errors.isEmpty)
  {   console.log(ErrorMessages)
  
    res.render('user/signup', { hasErrors:true, messages:ErrorMessages,csrfToken:req.csrfToken()});
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

  //SignIN******************************
  router.get('/user/signin',function(req,res,next){
    console.log('Session ID - '+req.session.csrfSecret);
    console.log('Session Token - '+req.csrfToken()); //Token coming from webbrowser?
    
    const ErrorMessages=req.flash('error') //flash can be read once and will be erased !!!
  
    if (ErrorMessages.length>0)

    {   console.log(ErrorMessages)
    
      res.render('user/signin', { hasErrors:true, messages:ErrorMessages,csrfToken:req.csrfToken()});
    }
    else
    {
      res.render('user/signin', {csrfToken:req.csrfToken()});
      
    }
   
  });

  router.post('/user/signin',
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
              var ErrorMessages=[];
  
               errors.errors.forEach(function (error) {
                ErrorMessages.push(error.param+' - '+error.msg);
                      });
     return res.render('user/signin',{ hasErrors:true, messages:ErrorMessages ,csrfToken:req.csrfToken})
      
     }
      
      console.log('passport.authenticate...')
   
      passport.authenticate('local.signin',
      {
        successRedirect:'/',
        failureRedirect: '/user/signin',
        filureFlash:true,
       
      })(req, res, next); //fixed by NG
  
      console.log('***********************')
    }
  
    );

module.exports = router;

