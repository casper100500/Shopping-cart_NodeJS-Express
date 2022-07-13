var passport=require('passport'); //
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
        {
            return done(null,false,{message:'Email is already in use.'})
        }
        //save into MongoDB
        var newUser= new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.passwordOPEN=password
        newUser.save(function(err,result)
        {if(err){
            return done(err);
        }
        return done(null,newUser);

        })
    });
}));