// Ejecutar node (o nodejs) archivo.js, luego 
// POr esta vez. Modificar por seguridad.
const app_token = 'EAACF1jHbmN4BAAA5kuxMFh2fSwYKSZBitRT0CEARU5ICYRxVn3ZC44GCt9pU0XsceOAcyR35jTF2n49cQOgBuk0KaZCqoF7g5JnMcLK5lYvVc8k47NuIwIxqH8Fd8B39ataPo73J4HaghDbNMBuCYs0j2MdTEuZB4ovaZC1PRPQZDZD';
//const app_id = '147155005970654';

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

/* Ejemplo de recepción de mensaje por chat
{ object: 'page',
  entry: 
  [ { id: '1155894324513208',
       time: 1518494730266,
       messaging: [Object] } ] }
*/



//Evíamos token y recibimos un autentificador (challenge)
// Validación de servidores
app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token'] == 'test_token_botin2x'){
		res.send(req.query['hub.challenge']);
	}else{
		res.send('Ups, autentificación errónea.');
	}
});

// Valdidación y recorrido de eventos
app.post('/webhook', function(req, res){
	var data = req.body;
	if(data.object == 'page'){
		data.entry.forEach(function(pageEntry){ //Recorrido de entradas
			pageEntry.messaging.forEach(function(messagingEvent){ //Recorrido de eventos
				if(messagingEvent.message){
					receiveMessage(messagingEvent);// Mensaje?
				}else{
					console.log('Lo recibido no es un mensaje válido');
				};
			});
		});
	res.sendStatus(200); //Enviamos OK a Facebook
	}
});

/* Ejemplo de mensaje
{ sender: { id: '1590567334358752' },
  recipient: { id: '1155894324513208' },
  timestamp: 1518496420927,
  message: 
   { mid: 'mid.$cAAQbR88ntOxnvrXcP1hjXCTjp1Qr',
     seq: 692507,
     text: 'Hola' } }
*/

// Obtenemos el mensaje
function receiveMessage(event){
	var senderID = event.sender.id; // ID remitente
	var messageText = event.message.text; // Mensaje remitente
	console.log(senderID);
	console.log(messageText);
	evaluateMessage(senderID, messageText);
}


//Evaluamos el mensaje
function evaluateMessage(recipientID, message){
	var finalMessage = '';
	console.log('evaluacion 1');
	if(isContain(message, 'ayuda')){
		finalMessage = 'No me siento capaz de ayudarte, lo siento';
		//console.log('no tiene ayuda');
	}else{
		finalMessage = 'Solo me han programado para repetir :( ' + message;
		//console.log("Ya envié la copia del mensaje");
	}
	sendMessageText(recipientID, finalMessage);
}

//Mensaje final a enviar
function sendMessageText(recipientID, message){
	var messageData = {
		recipient: { 
			id: recipientID
		},
		message: {
			text: message
		}
	};
	callSendAPI(messageData);
}

function callSendAPI(messageData){
	request({
		uri: 'https://graph.facebook.com/v2.12/me/messages',
		qs: { acces_token : app_token},
		method: 'POST',
		json: messageData
	}, function(error, response, data){
			if(error){
				console.log('No es posible enviar el mensaje');
			}else{
				console.log('El mensaje fue enviado con exito');
			}
	});
}

//Análisis del mensaje
function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}