var express = require('express');
const cart = require('../models/cart_NG_OK');
var router = express.Router();
var Product = require('../models/product')
var CartMy = require('../models/cart_NG_OK');
const { captureRejectionSymbol } = require('connect-mongo');
/* GET home page. */
router.get('/', function(req, res, next) {
var Products=Product.find(function(err,docs){
    
//console.log(docs) //by NG
var productChunks=[];
var chunkSize=3;
//console.log(docs.length) //4

for (var i = 0; i< docs.length;i +=chunkSize)
{
  productChunks.push(docs.slice(i,i+chunkSize)); //slice(from,to)
  //slice=mid function in VBA
}

res.render('shop/index', { title: 'Shopping Cart_EX11 Adding a Session Store + 12 Cart Model', products:productChunks });
  
  }).lean(); //patch by NG added .lean();!!!!
 
});

/* fff */
router.get('/clear-cart', function(req, res, next) {
  delete req.session.cart 
  console.log(req.session)
  res.redirect('/');
})

router.get('/add-to-cart/:id', function(req, res, next) {
var ccc=new CartMy(req.session.cart || {})
console.log(req.params)
//console.log(req.session.cart)
Product.findById(req.params.id,function(err,product){

if (err)
{console.log('product not found')
res.redirect('/');
}

ccc.ADD(product)
//console.log(ccc)
//res.session.cart=ccc
req.session.cart = ccc;
console.log(req.session.cart)
res.redirect('/')
})

});



module.exports = router;

