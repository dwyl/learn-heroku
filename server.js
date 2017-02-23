/**
   Start this app from the command line on your local PC:
   node server.js
   then visit: http://localhost:3000/YOURNAME
*/
var Hapi   = require('hapi');
var server = new Hapi.Server();

server.connection({ port: process.env.PORT || 5000 });

server.route({
	method: 'GET',
	path: '/{p*}',
	handler: function(request, reply){
		return reply('Hello ' + request.params.p);
	}
})

server.start(function(){
  console.log('Now Visit: http://localhost:' + server.info.port + '/YOURNAME');
});
