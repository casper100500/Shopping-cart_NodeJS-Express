var passport=require('passport'); //to have userId in sessions
var User=require('../models/user'); //mongoDB user doc
var LocalStrategy=require('passport-local').Strategy; //Strategy

passport.serializeUser(function(user,done) //save userid in the current session
{//user.id->ObjectID in MongoDB

    console.log('serializeUser - save userid in the current session. userid - '+user.id)
    done(null,user.id) //to have a userId
});

passport.deserializeUser(function(id,done) //check userid for the current session
{
    console.log('deserializeUser - check userid for the current session. userid - '+id)
    User.findById(id,function(err,user)
    {
        done(err,user);
    });
});

//Signup LocalStrategy
passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true //
}, function(req,email,password,done)
{  


    User.findOne({'email':email},function(err,user)
    {console.log('check new user - '+email)
        if(err){
            return done(err);
        }
        if(user)
        {console.log('Email is already in use.')
       return done(null, false, req.flash('error', 'Email is already taken.'));
     }
        //save into MongoDB
        var newUser= new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.passwordOPEN=password //by NG
        newUser.save(function(err,result)
        {if(err){
            return done(err);
        }

        console.log('Session************')
        console.log(req.session)
        console.log('*******************')

        return done(null,newUser);

        })
    });
}));

//Login LocalStrategy
passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true //
}, function(req,email,password,done)
{  
    console.log('Session************')
    console.log(req.session)
    console.log('*******************')

    User.findOne({'email':email},function(err,user)
    {
        if(err){
            return done(err);
        }
        if(!user)
        {//'No user found'
            return done(null, false, req.flash('error', 'No user found'));
        }
        if(!user.validPassword(password))
        {//'Wrong password'
            return done(null, false, req.flash('error', 'Wrong password'));
        }
  return done(null,user) //everything is ok.
    });
}));
