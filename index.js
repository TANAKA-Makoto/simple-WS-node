/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

let argv = require('argv');
let WebSocketServer = require('ws').Server;
let port; 
//-------------------
//  handle args
//-------------------
argv.option([
{
  name: 'port',
  short: 'p',
  type : 'Number',
  description :'サーバのリッスンポート default:9000',
  example: "'script --port=value' or 'script -p value'"
},
{
  name: 'log',
  short: 'l',
  type : 'Number',
  description :'log level "not work"',
  example: ""
}]);
console.log(argv.run());
port = argv.run()['options']['port'] || 9000;
//-------------------

let wsServer = new WebSocketServer({ port: port });
console.log('websocket server start. port=' + port);

wsServer.on('connection', function(ws, request) {
  console.log('-- websocket connected --');
  const echo = is_echo(request['url']);
  ws.on('message', function(message) {
    console.log('receive message');
    console.log(message);
    if(echo){ ws.send(message);}
  });
  ws.on('close',function(code, reason){
    console.log(`client disconnect ${code}:${reason}`);
  });
});

function is_echo(url){
  if (url ==='/echo') {return true;}
  return false;
}