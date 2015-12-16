var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
var consoleDiv = document.getElementById('console');
var welcomeDiv = document.getElementById('welcome');
ws.onmessage = function (event) {
  var msg = JSON.parse(event.data);
  if(msg.intro) {
    welcomeDiv.insertAdjacentHTML('beforeend', '<p>' + msg.msg + '</p>');
  } else {
    consoleDiv.insertAdjacentHTML('beforeend', '<p>' + msg.msg + '</p>');
  }
};
ws.onopen = function (event) {
  ws.send(window.navigator.platform);
};