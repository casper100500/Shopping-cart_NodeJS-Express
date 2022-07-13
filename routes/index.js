var express = require('express');
var router = express.Router();
var Product = require('../models/product')

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
  //console.log(i)
  //console.log(docs[i].title)
}


//docs.forEach(element => {console.log(element.title);});

//productChunks= [
//["Gothic Video Game","IGI Project","Mortal Kombat"]
//["Far Cry 3"]
//]
console.log(productChunks[1][0].title);
//productChunks.forEach(element => {  console.log(element[0].title);});
 // productChunks.push(docs[i])
  //console.log(i)
  //console.log(productChunks[i][0].title)

//productChunkconsole.log(productChunks[0].length)

res.render('shop/index', { title: 'Shopping Cart_EX5', products:productChunks });
  
  }).lean();


  
});

module.exports = router;
