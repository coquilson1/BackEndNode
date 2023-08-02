//acá se configurará las rutas del controlador proyect
'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject); //http://localhost:3700/api/save-project //Body - x-www-form-urlencoded
router.get('/project/:Id?', ProjectController.getProject) //opcional params 

module.exports = router;
//obs a
