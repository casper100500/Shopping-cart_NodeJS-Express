var express = require('express');
//const cart = require('../models/cart');
var router = express.Router();
var Product = require('../models/product')
var Cart = require('../models/cart')
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

res.render('shop/index', { title: 'Shopping Cart_EX13 show cart', products:productChunks });
  
  }).lean(); //patch by NG added .lean();!!!!
 
});

/* fff */
router.get('/clear-cart', function(req, res, next) {
  delete req.session.cart 
  console.log(req.session)
  res.redirect('/');
})

router.get('/add-to-cart/:id', function(req, res, next) {

var productId = req.params.id
//Create new Cart or use previous one if exsists
var cart= new Cart(req.session.cart ? req.session.cart :{});

Product.findById(productId,function(err,product)
{
  if (err) {
    return res.redirect('/')
  }
  //console.log('get(/add-to-cart/:id)')
  cart.add(product, product.id)
  req.session.cart = cart;
  console.log(req.session.cart)
  res.redirect('/')
}
)

});

router.get('/shop/shopping-cart',function(req,res,next){
  console.log('ddddddddddddd')
  if(!req.session.cart)
  {
    return res.render('shop/shopping-cart', { products:null });
  }
var cart = new Cart(req.session.cart)
res.render('shop/shopping-cart', { products:cart.generateArray(), totalPrice:cart.totalPrice});
})

module.exports = router;

