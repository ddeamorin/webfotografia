const { validationResult } = require("express-validator");
const { Op, where } = require("sequelize");
const db = require('../database/models/index');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcryptjs');


const databaseController = {
    verLogin: function(req,res){
            res.render('database/01-login')
        },
    ingresar: function (req, res){

      db.Admin.findByPk(1).then( resultado => {
        if ((req.body.email == resultado.email) && (bcrypt.compareSync(req.body.contrasena, resultado.contrasena))){
              req.session.adminLog = true
              if (typeof req.body.recordar != 'undefined') {
                let cookie_hash = cryptoRandomString({length: 60});
                res.cookie('recordar' , cookie_hash, { maxAge: 31536000000, httpOnly: true })
                db.Admin.update({cookie_hash:cookie_hash}, {where: {id:1}}).then(() =>
                {Promise.resolve("Hash enviado a la base de datos!")})
              }
              return res.redirect('/admin/imagenesAdmin')
            } else{
              return res.render('database/01-login', {mensaje:'Credenciales erroneas'})
            }
          })
          },
    cerrarSesion : function(req,res){
      if(req.cookies.recordar){
        db.Admin.update({cookie_hash : null}, {where:{id : 1}}).then(() => {
        Promise.resolve("Hash eliminado de la base de datos!")
      })
      res.clearCookie('recordar')
    }
      req.session.destroy(() => {
        return res.redirect("/")
      });
    },
    
    imagenesAdmin : function(req,res){
            db.Overview.findAll().then(function(resultado){
              return res.render('database/02-imagenesAdmin', {imagenes:resultado})
            })
          },
    filtrarImagenes: function(req,res){
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
                [Op.gt]: '0'
              },
            },
            order : [["checkindex", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
              order : [["rating", "ASC"]]
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
         resultado.view = resultado.view.split(", ")
         console.log(resultado.view)
          res.render('database/04-editarImagen', {imagenes : resultado})
        })
      },
      editar : function(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          console.log(errors)
          res.render(`database/04-editarImagen`, {errors : errors.errors, imagenes:req.body})
        }else{
        let id = req.params.id
        if (Array.isArray(req.body.vista)==true) {
          var vistaEdit = req.body.vista.join(", ")
        }else{
          var vistaEdit = req.body.vista
        }

        if(typeof req.files[0] != "undefined"){
          console.log(req.files[0])
          let imagen = req.files[0].filename
          db.Overview.update({
            ruta : imagen
          },{where: {id : req.params.id}}).then(resultado => {
            console.log(resultado)
          })
        }
          db.Overview.update({
          id : req.params.id,
          view: vistaEdit,
          nombre : req.body.nombre,
          descripcion: req.body.descripcion,
          checkindex: req.body.checkindex,
          lugar: req.body.lugar,
          fecha:req.body.fecha,
          rating: req.body.rating
          },{where: {id}}).then(function(){
            res.render('database/05-finalizado', {mensaje: 'editado', nombre:`la obra ${req.body.nombre}`})
          });
        
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