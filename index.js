/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const argv = require('argv');
const WebSocketServer = require('ws').Server;
let port;
let broadCastList = [];
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
  const broad = is_broad(request['url']);
  if (broad) {broadCastList.push(ws);}
  ws.on('message', function(message) {
    console.log('receive message');
    console.log(message);
    if(echo){ ws.send(message);}
    if (broad) {
      for (var i = broadCastList.length - 1; i >= 0; i--) {
        if(broadCastList[i] === ws){continue;}
        broadCastList[i].send(message);
      }
    }
  });
  ws.on('close',function(code, reason){
    console.log(`client disconnect ${code}:${reason}`);
  });
});

function is_echo(url){
  if (url ==='/echo') {return true;}
  return false;
}
function is_broad(url){
  if (url ==='/broadcast') {return true;}
  return false;
}