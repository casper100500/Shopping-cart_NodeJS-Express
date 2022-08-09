const passport = require('passport');

exports.signupGET= (req,res,next)=>{
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
   
  };
  
  //***********Validatorrrrrrrrrrrrrrrrr****** */
  //Validator by NG
const { body, validationResult } = require('express-validator');
  
exports.SignupPOST=(
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
      
