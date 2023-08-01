//acá se configurará las rutas del controlador proyect
'use strict'

var express = require('express');
var ProyectController = require('../controllers/project');

var router = express.Router();

router.get('/home',ProyectController.home);
router.post('/test',ProyectController.test);
router.post('/save-project',ProyectController.saveProject); //http://localhost:3700/api/save-project //Body - x-www-form-urlencoded


module.exports = router;