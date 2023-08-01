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

//rutas

/*
app.post('/test/:id', (req,res) => { //el :id es un parámetro obligatorio que tendrìa que enviar en mi ruta
    console.log(req.body.nombre);
    console.log(req.body.apellido);
    console.log(req.query.web); //http://localhost:3700/test?web=webjorge.es
    console.log(req.params.id); //http://localhost:3700/test/87?web=webjorge.es
    res.status(200).send({
        message: "Hola mundo desde mi API de NodeJS"
        //http://localhost:3700/test --> esto abrimos en el servidor y nos devuelve el texto
        //si no colocamos la ruta test se abre la api pero no nos muestra nada
        //si devolveríamos "<h1>Texto</h1>" se pintaría el HTML 
    });
}) //estas rutas son por post, si fuese por get sería .get
//http://localhost:3700/test/87?web=webjorge.es
*/

app.use('/api', project_routes); //si no queremos que vaya /api lo colocamos '/'


//exportar 
module.exports = app; 