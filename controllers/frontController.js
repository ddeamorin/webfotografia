const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require('../database/models/index');

let frontController = {
    verHome : function(req, res){
      
      db.Overview.findAll({
        where: {
          checkindex: {
            [Op.gt]: 0
          }
        },
      order: [['checkindex', 'ASC'], ['nombre', 'ASC']]}).then(resultado => {
        res.render("front/01-index", {imagenes:resultado})
      })
    },
    verPaisaje: function(req,res){
      db.Overview.findAll({
        where: {
          view: {
            [Op.like]: '%Paisajes%'
          }
        },
      order: [['rating', 'DESC'], ['nombre', 'ASC']]}).then(resultado => {
        res.render("front/01-index", {imagenes:resultado})
      })
      },
    verRetratos : function(req,res){
      db.Overview.findAll({
        where: {
          view: {
            [Op.like]: '%Retratos%'
          }
        },
      order: [['rating', 'DESC'], ['nombre', 'ASC']]}).then(resultado => {
            res.render("front/01-index", {imagenes:resultado})
          })
        },

    verProducto : function(req,res){
      db.Overview.findAll({
        where: {
          view: {
            [Op.like]: '%Producto%'
          }
        },
      order: [['rating', 'DESC'], ['nombre', 'ASC']]}).then(resultado => {
            res.render("front/01-index", {imagenes:resultado})
          })
        },
      

    verContacto:function(req,res){
      res.render('front/02-contacto')
    },

    verAbout:function(req,res){
      res.render('front/04-about')
    },

     

    enviarMail: async function(req,res){

      let {nombre, email, mensaje} = req.body;
      let contentHTML = `
      <h1>Nuevo contacto: informacion</h1>
      <ul>
      <li>Nombre: ${nombre}</li>
      <li>Email: ${email}</li>
      </ul>
      <h1>Mensaje: ${mensaje}</h1>
      `
      const transporter = nodemailer.createTransport({
        host: 'p3plzcpnl434611.prod.phx3.secureserver.net',
        port: 465,
        secure: true,
        auth : {
          user: 'contacto@damiandeamorin.com',
          pass: 'Damian32010734'
        },
      tls: {rejectUnauthorized:true}})

        const info = await transporter.sendMail({
          from: "'Pagina Fotografia' <contacto@damiandeamorin.com>",
          to: 'contacto@damiandeamorin.com',
          subject:'Consulta fotografia',
          html: contentHTML
        })

      console.log('Message sent', info.messageId) 
      res.render('database/05-finalizado', {mensaje:'enviado', nombre:`el mail, ${req.body.nombre}`})
    },
    }


module.exports = frontController;