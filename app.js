var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan'); //Coulerfull console log for express
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs= require ('express-handlebars')
var mongoose=require('mongoose') //MongoDB Client


var session=require('express-session'); //to have sessions in express
//var MongoStore= require('connect-mongo')(session); //order after express-session. used for save session data
var MongoStore= require('connect-mongo'); //order after express-session. used for save session data

var routes = require('./routes/index');
var UserRoutes = require('./routes/user/!Routes');
var CheckoutRoutes = require('./routes/checkout');
require('./config/passport');
var passport=require('passport'); //org

var flash=require('connect-flash'); //for render error msg
const { allowedNodeEnvironmentFlags } = require('process');



var app = express();

// const mongoDBurl='mongodb://localhost:27017/shopping'
// mongoose.connect(mongoDBurl)
 const connectMongoDB='mongodb://localhost:27017/shopping'
// const connectMongoDB=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}
// @cluster0.rwg46sl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
console.log(connectMongoDB)

mongoose.connect(connectMongoDB).then(()=>{
    app.listen(process.env.expressPort);
}).catch(err=>{
    console.log(err);
})



// view engine setup
app.engine('.hbs',expressHbs.engine({defaultLayout: 'layout',extname: '.hbs' }))
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Middleware setup order (express-session > pass.initialize > pass.session )

//app.use(session({secret: 'mysupersecret',resave: false, saveUninitialized: false, cookie:false}));

// app.use(session(
//   { secret: 'mysupersecret',
//     resave: false, 
//     saveUninitialized: false, 
//     store: MongoStore.create({ mongoUrl: mongoDBurl }),   
//     cookie:{maxAge:180 * 60 * 100} // session TTL = 180min
//   }
   
// ));


app.use(session(
  { secret: process.env.jwtPassword,
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({ mongoUrl: connectMongoDB }),   
    cookie:{maxAge:180 * 60 * 100} // session TTL = 180min
  }
   
));

app.use(flash());
app.use(function(req,res,next){
  //console.log('Session************')
  //console.log(req.session)
  //console.log('*******************')
  next()
})
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  
  res.locals.login = req.isAuthenticated() //global value
  res.locals.session=req.session
  if (req.user !== undefined)
  {
    res.locals.user = req.user.email
  }
  console.log('req.isAuthenticated:')
  console.log(res.locals.login)
  next()
})


app.use('/user', UserRoutes); //should be above '/' routes. order is important!
//app.use('/shop', ShopRoutes); //should be above '/' routes. order is important!
app.use('/checkout', CheckoutRoutes); //should be above '/' routes. order is important!
app.use('/', routes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
