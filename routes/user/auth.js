exports.isLoggedIn=(req, res, next) =>{
    if (req.isAuthenticated()){
      //console.log(req.session)
        return next();
    }
res.redirect('/');
}

exports.notLoggedIn=(req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

exports.session=(req, res, next) =>{
      console.log(req.session)
      return next();
}