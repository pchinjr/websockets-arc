const arc = require('@architect/functions');
const data = require('@architect/data');

// main event bus for handling all messages on the socket after it is opened

exports.handler = async function ws(event) {
  console.log('ws-default called with', event);

  const connectionId = event.requestContext.connectionId;
  const message = JSON.parse(event.body);

  // read dynamo for all connectionIds
  const scan = await data.connection_table.scan({}); 

  // action handlers with specific "channels"
  const action = JSON.parse(event.body).action;

  // on connections map connection ids and send new faces to connected clients
  if(action === 'connected') {
    let face = `<img src="/_static/cagepng.png" id=${connectionId}/>`;
    let clients = scan.Items;
    await Promise.all(clients.map(item => {
      let id = item.connectionId;
      let payload = {
        action: 'connected',
        face: face
      };
      return arc.ws(event).send({
        id: id,
        payload: payload
      });
    }));
  }

  // when client disconnects, remove face with specific connection id
  if(action === 'disconnected') {
    let clients = scan.Items;
    let payload = {
      action: 'disconnected',
      removeId: connectionId
    };
    await Promise.all(clients.map(item => {
      let id = item.connectionId;
      return arc.ws(event).send({
        id: id,
        payload: payload
      });
    }));
  }

  // when device data is published return connectionId and associated device data
  if(action === 'turn') {
    let clients = scan.Items;
    let degree = message.degree;
    let payload = {
      action: 'turn',
      turnId: connectionId,
      degree: degree
    };
    await Promise.all(clients.map(item => {
      let id = item.connectionId;
      return arc.ws(event).send({
        id: id,
        payload: payload
      });
    }));
  }

  return {statusCode: 200};
};
