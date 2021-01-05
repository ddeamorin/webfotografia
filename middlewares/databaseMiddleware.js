const {check, body, cookie} = require("express-validator");
const db = require('../database/models/index');

const databaseMiddleware = {
    auth : function(req,res,next) {
        if (req.session.adminLog == true){
        next()
        }else if(req.cookies.recordar){
            db.Admin.findByPk(1).then(resultado => {
            if(req.cookies.recordar == resultado.cookie_hash){
            return next();
            }else{
            return res.redirect('/admin/login')
            }
        })
        }else{
            res.redirect('/admin/login')
        }
    },
    editMiddleware : [
        body("imagen", "Debe ingresar una imagen válida").custom(function(value, {req}){
            if(typeof req.files[0] == "undefined"){
                return true;
            } else{
                var extension = (path.extname(req.files[0].originalname)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return true;
                    case '.jpeg':
                        return true;
                    case  '.png':
                        return true;
                    case  '.webm':
                        return true;
                    default:
                        return false;
                }
            }
        })
    ]
}

module.exports = databaseMiddleware;