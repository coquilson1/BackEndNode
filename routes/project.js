//acá se configurará las rutas del controlador proyect
'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'}); //un middleware es algo que se ejecuta antes de que se realice la acctión del controlador

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject); //http://localhost:3700/api/save-project //Body - x-www-form-urlencoded
router.get('/project/:id?', ProjectController.getProject) //? : opcional params 
router.get('/projects',ProjectController.getProjects);
router.put('/update-project/:id?',ProjectController.updateProject);
router.delete('/delete-project/:id?',ProjectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware, ProjectController.uploadImage); //Con este parámetro adicional se ejecutará el middelware 
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
//obs a


