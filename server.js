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
	path: '/.well-known/acme-challenge/WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0',
	handler: function(request, reply){
		return reply('WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0.kURQ5HbILtRXEwJA2QI4W5TdBkjnZNqH2_RHORvmN6w');
	}
})

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
