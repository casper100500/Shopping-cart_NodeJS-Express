var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrf=require('csurf') //Password HASHing

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
  //slice=mid function
}

res.render('shop/index', { title: 'Shopping Cart_EX6', products:productChunks });
  
  }).lean(); //patch by NG added .lean();!!!!


  
});

router.get('/user/signup',function(req,res,next){
  console.log(req.session.csrfSecret);
  //console.log(req.csrfToken());
  console.log(res);
  res.render('user/signup', {csrfToken:req.csrfToken()});
//  res.render('user/signup', {csrfToken:'dsddsdqdsw'});
  //res.render('user/signup', {csrfToken:req.session.csrfSecret, test:'tttt'});
  
});

router.post('/user/signup',function(req,res,next){
  console.log('Im here')
  res.redirect('/');
  
});

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
