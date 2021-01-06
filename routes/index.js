var express = require('express');
var router = express.Router();
let frontController = require('../controllers/frontController')
const path = require("path");

/* GET home page. */

router.get('/', frontController.verHome);

router.get("/paisajes", frontController.verPaisaje)

router.get("/retratos", frontController.verRetratos)




router.get('/contacto', frontController.verContacto)

router.post('/contacto', frontController.enviarMail)




module.exports = router;






