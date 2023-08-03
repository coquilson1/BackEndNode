//Un controlador es una clase que va a tener una serie de métodos y acciones que van a estar relacionados con un modelo de datos específico 
'use strict'

const proyect = require('../models/proyect');
//const proyect = require('../models/proyect'); /*** */
var Project = require('../models/proyect'); //Tengo disponible mi modelo
//const { param } = require('../routes/project'); /*** */

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
            var project = await Project.findById(projectId)        
            res.status(200).send({project:project});
        }catch (err) {
            res.status(500).send({message: "No se encuentra proyecto"});
        }
        
    }

};

module.exports = controller;