// Puerto de escucha del servidor:

var puerto = 8080;

// Cargamos el módulo de express en un objeto al que llamamos moduloexpress.

var moduloexpress = require('express');

// Creamos una nueva aplicación sobre la variable app, llamando a () sobre el objeto moduloexpress

var app = moduloexpress();

// Gracias al framework express podremos más adelante gestionar las peticiones http

// Cargamos el módulo http y creamos un servidor con createServer()
// Como parámetro se le pasa una función con 2 parámetros (req,resp) o en este caso se le pasa
// una instancia de express.

var servidor = require('http').createServer(app);

// Por último queda cargar el módulo de socket.io y pasarle el servidor como parámetro.

var io = require('socket.io').listen(servidor);

// Comenzamos a aceptar peticiones en el puerto e ip especificadas:   .listen(puerto,[IP])
// Si no se indica IP, lo hará en todas las interfaces.

servidor.listen(puerto);

// Mostramos mensaje en la consola de Node.js:

console.log('Servidor de websockets escuchando en puerto: ' + puerto);

// Mediante express gestionamos las rutas de las peticiones http al servidor.
// Cuando  alguien haga una petición a la raiz del servidor web, le enviamos un texto de información.
// También se le podría enviar un fichero con  res.sendfile(__dirname + '/index.html');

app.get('/', function(req, res) {
	res.end('Servidor de websockets');
});


//  Programación de eventos que gestiona el servidor 
//  https://github.com/LearnBoost/socket.io/wiki/Exposed-events

// Vamos a programar las respuestas a los eventos que se pueden producir en el servidor.

// Primero tendremos que gestionar si se está produciendo una nueva conexión de websockets al servidor:
// lo haremos programando el evento 'connection' sobre io.sockets
// El argumento 'socket' de la función callback será utilizado en las futuras conexiones con el cliente.

io.sockets.on('connection', function(socket)
  {
	// Cada vez que se conecta un cliente mostramos un mensaje en la consola de Node.
	console.log('**** Nuevo cliente conectado ****');

	// A través del objeto socket que escribimos en la función de callback
	// gestionamos el intercambio de mensajes con el cliente.
	// Nombres de eventos reservados para ese socket:'message', 'disconnect', 'eventos_propios'

	socket.on('disconnect', function()
	  {
		console.log('>>>> Se ha desconectado un cliente.');
	  });

	
	// A parte de esos eventos reservados podemos programar nuestros propios eventos con el nombre
	// que deseemos. Por ejemplo socket.on('teletienda',function()..

	socket.on('canalborde', function(datosrecibidos) 
    {
		// Usamos io.sockets.emit() para retransmitir datosrecibidos a todos 
		// los que escuchan el evento 'canalborde' y así en todos los eventos...
		io.sockets.emit('canalborde', datosrecibidos);
	  });
	
	socket.on('canalcolores',function(datosrecibidos)   
    {
		io.sockets.emit('canalcolores',datosrecibidos);
	  });

	socket.on('canalfondo',function(datosrecibidos) 
    {
		io.sockets.emit('canalfondo',datosrecibidos);
	  });
	
	socket.on('canalgrosor',function(datosrecibidos) 
    {
		io.sockets.emit('canalgrosor',datosrecibidos);
	  });

	socket.on('canallimpiar',function(datosrecibidos) 
    {
		io.sockets.emit('canallimpiar',datosrecibidos);
	  });

	socket.on('canalmousedown',function(datosrecibidos) 
    {
		io.sockets.emit('canalmousedown',datosrecibidos);
	  });

	socket.on('canalmouseup',function(datosrecibidos) 
    {
		io.sockets.emit('canalmouseup',datosrecibidos);
    });

	socket.on('canalmouseover',function(datosrecibidos) 
    {
		io.sockets.emit('canalmouseover',datosrecibidos);
	  });

	socket.on('canalmouseout',function(datosrecibidos) 
    {
		io.sockets.emit('canalmouseout',datosrecibidos);
	  });
	
  socket.on('canalmousemove',function(datosrecibidos) 
    {
		io.sockets.emit('canalmousemove',datosrecibidos);
	  });

  });
