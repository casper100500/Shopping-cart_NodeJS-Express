
var auth=require('./auth')
var Order = require('../../models/order')

exports.ProfileGET=(auth.isLoggedIn,function(req,res,next)
{
//console.log(req.cookies)

  

  if (req.user !== undefined)
  {
    user = req.user.email
  }
  else
  {return null}
  console.log(user)
  Order.find({User:user}, function(err,order)
  {
    if (err) {
      console.log('not found')
     return null
    }
    var orderChunks=[];
var chunkSize=1;
//console.log(docs.length) //4

for (var i = 0; i< order.length;i +=chunkSize)
{
  orderChunks.push(order.slice(i,i+chunkSize)); //slice(from,to)
  //slice=mid function in VBA
}
    console.log(order)
  //  console.log(orderChunks)

    res.render('user/profile',{Orders:orderChunks});
  }).lean(); //patch by NG added .lean();!!!!


});




