// get the web socket url
const url = window.WS_URL;

// all the DOM nodes this script will mutate
const main = document.getElementsByTagName('main')[0];
const msg = document.getElementById('message');

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
  let payload = {
    action: 'disconnected'
  };
  ws.send(JSON.stringify(payload));

}

// action handlers onMessage events
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

  if(msg.action === 'turn') {
    console.log('turning event');
    let turnId = `${msg.turnId}/`;
    console.log(turnId);
    let face = document.getElementById(turnId);
    console.log(face);
    console.log(msg);
    face.setAttribute('style', `transform: rotate(${msg.degree}deg)`);
  }
}

function handleOrientation(e) {
  let turnY = event.gamma;
  let payload = {
    action: 'turn',
    degree: turnY
  };
  ws.send(JSON.stringify(payload));

  // let clientFace = document.getElementsByTagName('img');
  // face.setAttribute('style', `transform: rotate(${y}deg)`);
}

window.addEventListener('deviceorientation', handleOrientation);
