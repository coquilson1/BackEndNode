'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/portafolio") //esto es una promesa
     .then(() => {
        console.log("Conexion a la base de datos establecida con éxito ojo con eso...")
       
       //Creación del servidor 
       app.listen(port, () => {
              console.log("Servidor corriendo correctamente en la URL: localhost:3700");
       });

       } )
       .catch((err) => console.log(err));