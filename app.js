'use strict'

//Con esto tenemos los objetos completos de las librerías declaradas en el package.json
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas 
var project_routes = require('./routes/project');

//middlewares --> Es una capa o un mètodo que se ejecuta antes de realizar la acción de un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors //esto siempre se va a ejecutar antes de cada petición
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //A la hora de publicar nuestro aplicativo, en vez de * pondríamos la URL permitida u orígenes permitidos 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api', project_routes); //si no queremos que vaya /api lo colocamos '/'


//exportar 
module.exports = app; 