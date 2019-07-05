// get the web socket url from the back end
const url = window.WS_URL;

// all the DOM nodes this script will mutate
const main = document.getElementsByTagName('main')[0];
const msg = document.getElementById('message');

// set up the web socket
const ws = new WebSocket(url);
ws.onopen = open;
ws.onclose = close;
ws.onmessage = message;
ws.onerror = console.log;

// connect to the web socket
function open() {
  const ts = new Date(Date.now()).toISOString()
  main.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`;
}

// report a closed web socket connection
function close() {
  main.innerHTML = 'Closed <a href=/>reload</a>'; //typo in docs?
}

// write a message into main
function message(e) {
  const msg = JSON.parse(e.data);
  main.innerHTML += `<p><code>${msg.text}</code></p>`;
}

// sends messages to the lambda
msg.addEventListener('keyup', function(e) {
  if (e.key == 'Enter') {
    const text = e.target.value;  // get the text;
    e.target.value = '';        // clear the text;
    ws.send(JSON.stringify({text}));
  }
});
