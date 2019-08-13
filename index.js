/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

let WebSocketServer = require('ws').Server;
let port = 9000; //ポート番号は必要に応じて変更してください。
let wsServer = new WebSocketServer({ port: port });
console.log('websocket server start. port=' + port);

wsServer.on('connection', function(ws) {
  console.log('-- websocket connected --');
  ws.on('message', function(message) {
    console.log('receive message');
    console.log(message);
    let msgObj = JSON.parse(message);
  });
});

