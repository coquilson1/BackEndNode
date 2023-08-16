//Un controlador es una clase que va a tener una serie de métodos y acciones que van a estar relacionados con un modelo de datos específico 
'use strict'

const { exit } = require('process');
const proyect = require('../models/proyect');
//const proyect = require('../models/proyect'); /*** */
var Project = require('../models/proyect'); //Tengo disponible mi modelo
//const { param } = require('../routes/project'); /*** */
var fs = require('fs');
var path = require('path'); //path es un módulo del NodeJs que nos permite cargar rutas fìsicas en 
                            //nuestro sistema de archivo

var controller = {

    home: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador del proyecto'
        });
    },

    saveProject: function( req,res ){

        
        var project = new Project();

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save()
            .then(()=>{
                res.status(200).send({project: project});
            }).catch((err)=>{
                res.status(500).send({message: 'Error al guardar el documento'});
            })

    }, 

    getProject: async function(req,res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message: "Debe ingresar código del proyecto"});
        
        try{
            var project = await Project.findById(projectId);
            res.status(200).send({project:project});
        }catch (err) {
            res.status(500).send({message: "No se encontró proyecto"});
        }
    },

    getProjects: async function(req, res){
        try{
            //var projects = await Project.find({"category":"Desarrollo Web"}).exec(); //Opción con filtros
            //var projects = await Project.find({}).sort('year').exec(); //Opcion para ordenar por año
            var projects = await Project.find({}).sort('-year').exec(); //Opcion para ordenar por año de mayor a menor
            //var projects = await Project.find({}).exec();
            res.status(200).send({projects:projects});
        }catch(err) {
            res.status(500).send({message: "No se encontró proyecto"});
        }
    },

    updateProject: async function (req,res){
        
        try{
            var projectId = req.params.id;
            var update = req.body;
            
            //En la documentacion de Mongoose están especificados todos los métodos que existen
            var ProjectUpdated =  await Project.findByIdAndUpdate(projectId,update, {new:true}); //Con el tercer parámetro devuelve el nuevo objeto
            
            res.status(200).send({project: ProjectUpdated});

        }catch(err){
            res.status(500).send({message: "No se actualizó el proyecto"});
        }
    },

    deleteProject: async function (req,res){
        try{
            var projectId = req.params.id;

            await Project.findByIdAndDelete(projectId).exec();
            
            res.status(200).send({message: "El proyecto se elimino correctamente"});

        
        } catch(err) {
            res.status(500).send({message: "No se eliminó el proyecto"});
        }
    },

    //La subida de archivos se trabajará con al librería: connect-multiparty

    uploadImage: async function (req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida ...';
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

                try{
                    var projectUpdated = await Project.findByIdAndUpdate(projectId, {image:fileName},{new:true});

                    res.status(200).send({
                        //files: req.files
                        //files:fileName
                        project: projectUpdated
                    });

                }catch(err){
                    res.status(500).send({message: "No se actualizó la imagen"});
                }
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "La extensión no es valida"});
                });
            }

        }else{
            console.log('entra');
            return res.status(200).send({
                files: fileName
            });
        }
    },

    getImageFile: function (req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;
        
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    }

};

module.exports = controller;