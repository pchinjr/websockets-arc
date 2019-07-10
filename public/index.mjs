// get the web socket url from the backend
const url = window.WS_URL;
let globalId = window.STATE_ID;

// all the DOM nodes this script will mutate
const main = document.getElementsByTagName('main')[0];
const msg = document.getElementById('message');
const faceDiv = document.getElementById('face');

// setup the web socket
const ws = new WebSocket(url);
ws.onopen = open;
ws.onclose = close;
ws.onmessage = message;
ws.onerror = console.log;

// connect to the web socket
function open() {
  let ts = new Date(Date.now()).toISOString();
  main.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`;
  let payload = {
    action: 'connected'
  };
  ws.send(JSON.stringify(payload));
}

// report a closed web socket connection
function close() {
  main.innerHTML = 'Closed <a href=/>reload</a>';
  // let payload = {
  //   action: 'disconnected'
  // };
  // ws.send(JSON.stringify(payload));
}

// write a message into main
function message(e) {
  let msg = JSON.parse(e.data);
  //console.log(msg.action);
  //main.innerHTML += `<p><code>${msg.text}</code></p>`;

  if(msg.action === 'connected') {
    console.log('connected message received');
    main.innerHTML += `${msg.face}`;
  }

  if(msg.action === 'disconnected') {
    console.log('disconnected message received');
    console.log(msg);
    let removeId = `${msg.removeId}/`;
    console.log(removeId)
    let face = document.getElementById(removeId);
    face.remove();
  }

  if(msg.action === 'GLOBAL_ID') {
    globalId = `${msg.id}`;
    console.log(globalId);
  }
}

// sends messages to the lambda
msg.addEventListener('keyup', function(e) {
  if (e.key == 'Enter') {
    let text = e.target.value; // get the text
    e.target.value = '';       // clear the text
    ws.send(JSON.stringify({text}));
  }
});
