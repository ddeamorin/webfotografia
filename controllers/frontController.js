const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require('../database/models/index');

let frontController = {
    verHome : function(req, res){
      
      db.Overview.findAll({
        where: {
          checkindex: {
            [Op.like]: '%on%'
          }
        },
      order: [['rating', 'DESC'], ['nombre', 'ASC']]}).then(resultado => {
        console.log(resultado)
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
        console.log(resultado)
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
          console.log(resultado)
          res.render("front/01-index", {imagenes:resultado})
        })
      },

    verContacto:function(req,res){
      res.render('front/02-contacto')
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
        host: 'mail.damian-deamorin.com',
        port: 587,
        secure: false,
        auth : {
          user: 'contacto@damian-deamorin.com',
          pass: '**DamianAriel'
        },
      tls: {rejectUnauthorized:false}})

        const info = await transporter.sendMail({
          from: "'Pagina Fotografia' <contacto@damian-deamorin.com>",
          to: 'contacto@damian-deamorin.com',
          subject:'Consulta fotografia',
          html: contentHTML
        })

      console.log('Message sent', info.messageId) 
      res.render('database/05-finalizado', {mensaje:'enviado', nombre:`el mail, ${req.body.nombre}`})
    },
    }


module.exports = frontController;