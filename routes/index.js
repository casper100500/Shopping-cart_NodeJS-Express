var express = require('express');
//const cart = require('../models/cart');
var router = express.Router();
var Product = require('../models/product')
var Cart = require('../models/cart')
//var Stripe=require('stripe') //Payment wesite
const stripe = require("stripe")("sk_test_51LGe7YGUvmt8rPeQ8q2gvYL4SIP25obw5Oj7IwVkqjs00xWDBOvfIyCh10kur6gMgRMV2rV4DgjGceWL4SXLKLuD00yCXXOQ1P");

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

res.render('shop/index', { title: 'Shopping Cart_EX16 Making Charges with Stripe', products:productChunks });
  
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

  if(!req.session.cart)
  {
    return res.render('shop/shopping-cart', { products:null });
  }
var cart = new Cart(req.session.cart)
res.render('shop/shopping-cart', { products:cart.generateArray(), totalPrice:cart.totalPrice});
})


router.get('/checkout', function(req, res, next) {
  if(!req.session.cart)  {    return res.redirect('shop/shopping-cart');  }

  var cart = new Cart(req.session.cart)
  res.render('shop/checkout', { total:cart.totalPrice});
//  res.render('shop/checkout');

})

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items.totalPrice)
  if (items.totalPrice>0)
  {//console.log('my Stripe - totalPrice!!!!')
    return items.totalPrice*100;
  }
  else
  {
  return 100;
  }
};

router.post("/create-payment-intent", async (req, res) => {
  //var cart = new Cart(req.session.cart)
 // res.render('shop/shopping-cart', { products:cart.generateArray(), totalPrice:cart.totalPrice});

  const { items } = req.body;
  console.log('my Stripe - Success!!!!')
  //console.log(req.body)
  //console.log(cart.generateArray())
  console.log(req.session.cart)
 // if (!req.session.cart)
 //  var cart = new Cart(req.session.cart)
     var cart= new Cart(req.session.cart ? req.session.cart :{});

    arr=cart.generateArray();
    //console.log('****************')
    console.log(arr)
    //console.log('****************')
    //console.log(typeof arr)

    titles=''
    productIds=''
    arr.forEach(element =>  titles+=element.item.title+', ' );
  //  arr.forEach(element =>  productIds+=element.item.title+' - '+element.item._id+'\n' );
      
    titles=titles.slice(0,-2)
   // productIds=productIds.slice(0,-2)
    description=titles+'\n'+productIds
    console.log(description)
  

  // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create(
     { description:description,
       amount: calculateOrderAmount(cart), 
       currency: "eur"  });

    //  const paymentIntent = await stripe.paymentIntents.create( { amount: calculateOrderAmount(items),  currency: "usd"  });


  res.send({clientSecret: paymentIntent.client_secret});

});

module.exports = router;

