var express = require('express');
var router = express.Router();
var Order = require('../models/order')
var Cart = require('../models/cart')
//var Stripe=require('stripe') //Payment wesite
const stripe = require("stripe")("sk_test_51LGe7YGUvmt8rPeQ8q2gvYL4SIP25obw5Oj7IwVkqjs00xWDBOvfIyCh10kur6gMgRMV2rV4DgjGceWL4SXLKLuD00yCXXOQ1P");
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
  //console.log(req.session.cart)
 // if (!req.session.cart)
 //  var cart = new Cart(req.session.cart)
     var cart= new Cart(req.session.cart ? req.session.cart :{});

    arr=cart.generateArray();
    //console.log('****************')
  //  console.log(arr)
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

//console.log(paymentIntent)
//PaymentID: paymentIntent.id,
//

if (req.user !== undefined)
{
  user= req.user.email
}
else
{
  user= 'null'
}
 
console.log(user)
//Create new Order
var order = 

  new Order({
    OrderCart:cart,
    User: user,
    PaymentID: paymentIntent.id,
    PaymentStatus:'unknown'
  });
  //console.log(order)
  order.save()

  res.send({clientSecret: paymentIntent.client_secret});

});

router.post("/successfull_payment", async (req, res) => {
  console.log('Page successfull_payment:')
  //console.log(req.headers)
 // console.log('req.body:')
  //console.log(req.body)
  //console.log('**************')
  

//orderId='62c190aee10b27f862521bfa'
  PaymentID=req.body.paymentIntent.id


//PaymentID='pi_3LHTvFGUvmt8rPeQ0Ym7RkJ3'
//PaymentID='pi_3LHR06GUvmt8rPeQ3F2nyQRt' //error payment
//PaymentID='pi_3LHTJJGUvmt8rPeQ326oKFBV' //OK


//Order.findById(orderId,async function(err,order)
//findStr="{'PaymentID':'"+orderId+"'}"
//findStr="{'PaymentID':'pi_3LHTvFGUvmt8rPeQ0Ym7RkJ3'}"
//console.log(findStr)
Order.findOne({PaymentID:PaymentID},async function(err,order)
{
  if (err) {
    //return res.render('/')
    console.log('not found')
   return null
    //return res.redirect('/')
  }
  console.log(order)
  //clientSecret='pi_3LHSGGGUvmt8rPeQ3iybOEUG'
  clientSecret=order.PaymentID
  console.log(clientSecret)

   const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret)
   console.log(paymentIntent.status)
   order.PaymentStatus=paymentIntent.status
   order.save(function(err,result){
    console.log('Saved...')
    return null;
   })
   
}
) //.lean(); patch by NG added .lean();!!!!

  //res.render('shop/successfull_payment', {});
 
});
router.get('/successfull_payment', async (req, res) => {
  if(!req.session.cart)  {    return res.redirect('shop/shopping-cart');  }

  var cart = new Cart(req.session.cart)
  totalPrice=cart.totalPrice
  delete req.session.cart
  res.render('shop/successfull_payment', {total:totalPrice});
  });



    module.exports = router;