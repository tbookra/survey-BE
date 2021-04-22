#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app.js');
const fs = require('fs');
const https = require('https');
var debug = require('debug')('server:server');
var http = require('http');
const url = require("url");
const privateKey = fs.readFileSync('/etc/letsencrypt/live/rt-test.xyz/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/rt-test.xyz/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/rt-test.xyz/chain.pem', 'utf8');
const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

/**
 * Get port from environment and store in Express.
 */

//var port = normalizePort(process.env.PORT || '3099');
var port = 3007

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = https.createServer(credentials, app);
// const ser80 = http.createServer((req, res) => {
//   let pathname = url.parse(req.url).pathname;
//   //console.log(req.headers.host);
//   console.log('Pathname:',pathname);
//   res.writeHead(301,{Location:  'https://rt-students.xyz'+pathname});
//   res.end();
// //  res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});

// });

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,()=>console.log('started'));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
