// Ejecutar node (o nodejs) archivo.js, luego 
// 

// Importación
var express = require('express');
var bodyParser = require('body-parser'); //Trabajo con atributos de request de forma directa
var request = require('request'); // Peticiones HTTP y HTTPS

// Instancia
var app = express();
app.use(bodyParser.json());

// Puerto
var puerto = 3000;
app.listen(puerto, function(){
	console.log("Servidor se encuentra en el puerto", puerto);
});

//Para asociar una función a una ruta se necesita como parámetros un request y un response
app.get('/', function(req, res){
	res.send('Primer paso del bot');
});