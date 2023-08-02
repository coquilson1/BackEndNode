//Un controlador es una clase que va a tener una serie de métodos y acciones que van a estar relacionados con un modelo de datos específico 
'use strict'

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

        
        /*Metodo del profesor que no me funcionó*/ 
        /*
        project.save( (err, projectStore) => {

            if(err) return res.status(500).send({message: 'Error al guardar el documento'});

            if(!projectStore) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

           
            return res.status(200).send({project: projectStore});
        });*/

        project.save()
            .then(()=>{
                res.status(200).send({project: project});
            }).catch((err)=>{
                res.status(500).send({message: 'Error al guardar el documento'});
            })

    }, 

    getProject: function(req,res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: "El proyecto no existe"});
        

        //Refiere que hay muchos métodos de este tipo y se podrían buscar en la documentación de Moongose
        Project.findById(projectId, (err, project) => {
            
            if(err) return res.status(500).send({message: "Error al devolver los datos."});

            if(!project) return res.status(404).send({message: "El proyecto no existe"});

            return res.status(200).send({
                project
            })

        });

    }

    


};

module.exports = controller;