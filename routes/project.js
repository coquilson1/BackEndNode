//acá se configurará las rutas del controlador proyect
'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject); //http://localhost:3700/api/save-project //Body - x-www-form-urlencoded
router.get('/project/:id?', ProjectController.getProject) //? : opcional params 
router.get('/projects',ProjectController.getProjects);
router.put('/update-project/:id?',ProjectController.updateProject);
router.delete('/delete-project/:id?',ProjectController.deleteProject);

module.exports = router;
//obs a
