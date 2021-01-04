const { validationResult } = require("express-validator");
const { Op, where } = require("sequelize");
const db = require('../database/models/index');

const databaseController = {
    verLogin: function(req,res){
            res.render('database/01-login')
        },
    ingresar: function (req, res){
            if (req.body.email == 'deamorindamian@gmail.com' && req.body.contrasena == '*1986Damian'){
              req.session.adminLog = true
              if (typeof req.body.recordar != 'undefined') {
                res.cookie('recordar' , 'true', { maxAge: 31536000000, httpOnly: true })
              }
              res.redirect('/admin/imagenesAdmin')
            } else{
              res.render('database/01-login', {mensaje:'Credenciales erroneas'})
            }
          },
    
    imagenesAdmin : function(req,res){
        console.log("Cookies :  ", req.cookies);
            db.Overview.findAll().then(function(resultado){
              return res.render('database/02-imagenesAdmin', {imagenes:resultado})
            })
          },
    filtrarImagenes: function(req,res){
      console.log(req.body.filtro)
      switch (req.body.filtro) {
        case 'id(asc)':
          db.Overview.findAll({
          order: [['id', 'ASC']]}).then(resultado => {
            res.render("database/02-imagenesAdmin", {imagenes:resultado})
          })
          break;
        case 'id(desc)':
          db.Overview.findAll({
            order: [['id', 'DESC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
        break;
        case 'rating(asc)':
          db.Overview.findAll({
            order: [['rating', 'ASC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
          break;
        case 'rating(desc)':
          db.Overview.findAll({
            order: [['rating', 'DESC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
          break;
        case 'index(off)':
          db.Overview.findAll({
            where: {
              checkindex: {
                [Op.like]: '%off%'
              }
            },
            order: [['checkindex', 'ASC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
          break;
        case 'lugar(a-z)':
          db.Overview.findAll({
            order: [['lugar', 'ASC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
          break;
        case 'lugar(z-a)':
          db.Overview.findAll({
            order: [['lugar', 'DESC']]}).then(resultado => {
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
          break;
        case 'overview':
          db.Overview.findAll({
            where: {
              checkindex: {
                [Op.like]: '%on%'
              }
            },
          }).then(resultado => {
            console.log(resultado)
            res.render("database/02-imagenesAdmin", {imagenes:resultado})
          })
          break;
          case 'paisajes':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Paisajes%'
                }
              },
            }).then(resultado => {
              console.log(resultado)
              res.render("database/02-imagenesAdmin", {imagenes:resultado})
            })
            break;
          case 'retratos':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Retratos%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'urbano':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Urbano%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'arquitectura':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Arquitectura%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'analogicas':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Analogicas%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'infancia':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Infancia%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'arquitectura':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Arquitectura%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'producto':
            db.Overview.findAll({
              where: {
                view: {
                  [Op.like]: '%Producto%'
                }
              },
            }).then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;
          case 'todas':
            db.Overview.findAll().then(resultado => {
                  console.log(resultado)
                  res.render("database/02-imagenesAdmin", {imagenes:resultado})
                })
            break;

        
      
        default:
          break;
      }
    },

    verCargaDatos : function(req,res){
        res.render('database/03-cargaDatos')
    },
    cargaDatos : function(req, res){
        let imagen = req.files[0].filename 
        if(req.body.checkindex == undefined){
          req.body.checkindex = "off"
        }
        if (Array.isArray(req.body.vista)==true) {
          var vista = req.body.vista.join(", ")
        }else{
          var vista = req.body.vista
        }
        
        
          db.Overview.create({
          ruta: imagen,
          nombre : req.body.nombre,
          descripcion: req.body.descripcion,
          checkindex: req.body.checkindex,
          lugar: req.body.lugar,
          fecha:req.body.fecha,
          view: vista,
          rating: req.body.rating
        }      
        ).then(function(){    
          
          res.render('database/05-finalizado', {mensaje: 'creado', nombre:`la obra ${req.body.nombre}`})
  
        })
      },
      verEditar : function(req,res){
        db.Overview.findByPk(req.params.id).then(function(resultado){
          res.render('database/04-editarImagen', {imagenes : resultado})
        })
      },
      editar : function(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          console.log(errors)
          res.render(`database/04-editarImagen`, {errors : errors.errors, imagenes:req.body})
        }else{
        id = req.params.id
        if(req.body.checkindex == undefined){
          req.body.checkindex = "off"
        }
        if (Array.isArray(req.body.vista)==true) {
          var vistaEdit = req.body.vista.join(", ")
        }else{
          var vistaEdit = req.body.vista
        }
        if(typeof req.files[0] == "undefined"){
          console.log("a")

        db.Overview.update({
          id : req.params.id,
          nombre : req.body.nombre,
          descripcion: req.body.descripcion,
          checkindex: req.body.checkindex,
          lugar: req.body.lugar,
          fecha:req.body.fecha,
          view:vistaEdit,
          rating: req.body.rating
        },{where: {id}}).then(function(){
          res.render('database/05-finalizado', {mensaje: 'editado', nombre:`la obra ${req.body.nombre}`})
        })}else{
          console.log("b")

          let imagen = req.files[0].filename
          db.Overview.update({
            id : req.params.id,
            imagen: imagen,
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            checkindex: req.body.checkindex,
            lugar: req.body.lugar,
            fecha:req.body.fecha,
            view:vistaEdit,
            rating: req.body.rating
          },{where: {id}}).then(function(){
            res.render('database/05-finalizado', {mensaje: 'editado', nombre:`la obra ${req.body.nombre}`})
          })
        }
      }
    },
      eliminarImagen:function(req,res){
        let id = req.params.id
        db.Overview.destroy({where : {id}}).then(function(){
          res.redirect(res.render('database/05-finalizado', {mensaje: 'eliminado', nombre:`la obra ${req.params.id}`}))
        })
      }, 

}

module.exports = databaseController;