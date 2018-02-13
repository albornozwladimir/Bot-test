// Ejecutar node (o nodejs) archivo.js, luego 
// POr esta vez. Modificar por seguridad.
const app_token = 'EAACF1jHbmN4BAAA5kuxMFh2fSwYKSZBitRT0CEARU5ICYRxVn3ZC44GCt9pU0XsceOAcyR35jTF2n49cQOgBuk0KaZCqoF7g5JnMcLK5lYvVc8k47NuIwIxqH8Fd8B39ataPo73J4HaghDbNMBuCYs0j2MdTEuZB4ovaZC1PRPQZDZD';

// Importación
var express = require('express');
var bodyParser = require('body-parser'); //Trabajo con atributos de request de forma directa
var request = require('request'); // Peticiones HTTP y HTTPS

// Instancia
var app = express();
app.use(bodyParser.json());

// Puerto
var puerto = 3333;
app.listen(puerto, function(){
	console.log("Servidor se encuentra en el puerto", puerto);
});

//Para asociar una función a una ruta se necesita como parámetros un request y un response
app.get('/', function(req, res){
	res.send('Primer paso del bot');
});

//Evíamos token y recibimos un autentificador (challenge)
app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token'] == 'test_token_botin2x	'){
		res.send(req.query['hub.challenge']);
	}else{
		res.send('Ups, autentificación errónea.');
	}
});