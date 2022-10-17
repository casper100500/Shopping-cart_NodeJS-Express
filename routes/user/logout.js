var auth=require('./auth')

exports.LogoutGET= (auth.isLoggedIn, function(req, res, next) {
  var cart=null 
  if (req.session.cart!==undefined) {cart=req.session.cart}

  req.logout(function(err) {
    if (err) { return next(err); }
    if (cart!==null) {req.session.cart=cart}
    res.redirect('/');
  });
});