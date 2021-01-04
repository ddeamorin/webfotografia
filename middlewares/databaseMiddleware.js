const databaseMiddleware = {
    auth : function(req,res,next) {
        if (req.session.adminLog == true){
        next()
        }else if(req.cookies.recordar == 'true'){
            next();
        }else{
            res.redirect('/admin/login')
        }
    }
}

module.exports = databaseMiddleware;