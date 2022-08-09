const passport = require('passport');
var Cart = require('../../models/cart')
var Order = require('../../models/order')

exports.loginGET= (req,res,next)=>{
      console.log('Session ID - '+req.session.csrfSecret);
      console.log('Session Token - '+req.csrfToken()); //Token coming from webbrowser?
      
      const ErrorMessages=req.flash('error') //flash can be read once and will be erased !!!
    
      if (ErrorMessages.length>0)
  
      {   console.log(ErrorMessages)
      
        res.render('user/login', { hasErrors:true, messages:ErrorMessages,csrfToken:req.csrfToken()});
      }
      else
      {
        res.render('user/login', {csrfToken:req.csrfToken()});
        
      }
     
};
   //***********Validatorrrrrrrrrrrrrrrrr****** */
  //Validator by NG
const { body, validationResult } = require('express-validator');

exports.loginPOST=(
    [body('email').isEmail(),
    body('password').isLength({ min: 5 }) 
    ]
    
     ,
     (req,res,next)=>{
       //console.log('*********Body**************')
       console.log(req.body)
       //console.log('*********Errors**************')
       var errors = validationResult(req);
       //console.log(errors)

      var cart=null 
      if (req.session.cart!==undefined) {cart=req.session.cart}

      if (!errors.isEmpty()) {
                var ErrorMessages=[];
    
                 errors.errors.forEach(function (error) {
                  ErrorMessages.push(error.param+' - '+error.msg);
                        });
       return res.render('user/login',{ hasErrors:true, messages:ErrorMessages ,csrfToken:req.csrfToken})
        
       }
        
        console.log('passport.authenticate...')
     
        //  passport.authenticate('local.signin',
        //  {
        //    successRedirect:'/',
        //    failureRedirect: '/user/login',
        //    filureFlash:true
        
        //  })(req, res, next); //fixed by NG


         passport.authenticate('local.signin',
         {
          //    successRedirect:'/',
           failureRedirect: '/user/login',
           filureFlash:true
        
         })(req, res,()=> {
          
          console.log('res.session----------')
          if (cart!==null) {req.session.cart=cart}
          console.log(req.session)
          res.redirect('/');

    }, next) 
         
         ; //fixed by NG

     
      }
    
);
      




