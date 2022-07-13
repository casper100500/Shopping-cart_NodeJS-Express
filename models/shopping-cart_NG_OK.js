var express = require('express');
var router = express.Router();
var Cart = require('../models/cart')

router.get('/shopping-cart',function(req,res,next)
{

    var cart= new Cart(req.session.cart ? req.session.cart :{});
      
    docs=cart.generateArray()
    console.log(docs) //by NG


    var productChunks=[];
    var chunkSize=3;
    //console.log(docs.length) //4
    
    for (var i = 0; i< docs.length;i +=chunkSize)
    {
      productChunks.push(docs.slice(i,i+chunkSize)); //slice(from,to)
      //slice=mid function in VBA
    }
    
    res.render('shop/shopping-cart', { products:productChunks });
 
    //res.redirect('/')

    
});

module.exports = router;