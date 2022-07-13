var express = require('express');
var router = express.Router();
var csrf=require('csurf'); //Session token
const passport = require('passport');

var csrfProtection=csrf({cookie: false});
router.use(csrfProtection);

router.get('/profile',isLoggedIn,function(req,res,next)
{
res.render('user/profile');
});

router.get('/logout',isLoggedIn, function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//if user is not logged in or registered then try other pages below like /signup and etc..
router.use('/',notLoggedIn, function(req, res, next) {
  next();
});


router.get('/signup',function(req,res,next){
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
  
router.post('/signup',
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
   
//SignIN******************************
router.get('/signin',function(req,res,next){
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
  
router.post('/signin',
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


function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
          console.log(req.session)
            return next();
        }
    res.redirect('/');
}
    
function notLoggedIn(req, res, next) {
        if (!req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
}
