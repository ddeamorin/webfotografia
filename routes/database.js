var express = require('express');
var router = express.Router();
const databaseMiddleware = require('../middlewares/databaseMiddleware')
let databaseController = require('../controllers/databaseController')
const path = require("path");


const multer = require('multer');
var storage = multer.diskStorage({
	  destination:(req,file,cb)=>{
		  cb(null,'public/images');
	  },
	  filename:(req,file,cb)=>{
		  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
  });
 var upload = multer({storage:storage});



router.get('/cargaDatos',databaseMiddleware.auth, databaseController.verCargaDatos);
router.post('/cargaDatos',databaseMiddleware.auth, upload.any(), databaseController.cargaDatos);

router.get('/imagenesAdmin',databaseMiddleware.auth, databaseController.imagenesAdmin)
router.post('/imagenesAdmin', databaseMiddleware.auth, databaseController.filtrarImagenes)

router.get('/editarImagen/:id',databaseMiddleware.auth, databaseController.verEditar)
router.post('/editarImagen/:id',databaseMiddleware.auth, upload.any(), databaseMiddleware.editMiddleware, databaseController.editar)

router.get("/login", databaseController.verLogin)
router.post("/login", databaseController.ingresar)

router.get("/eliminarImagen/:id", databaseMiddleware.auth, databaseController.eliminarImagen)


module.exports = router;
