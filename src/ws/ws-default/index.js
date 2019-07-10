const arc = require('@architect/functions');
const data = require('@architect/data');

exports.handler = async function ws(event) {
  console.log('ws-default called with', event);

  const ts = new Date(Date.now()).toISOString();
  const connectionId = event.requestContext.connectionId;
  const message = JSON.parse(event.body);
  const text = `${ts} - ${message.text}`;
  const scan = await data.connection_table.scan({});

  //switch actions
  const action = JSON.parse(event.body).action;

  if(action === 'connected') {
    let face = `<img src="/_static/cagepng.png" id=${connectionId}/>`;
    let clients = scan.Items;
    clients.map(item => {
      let id = item.connectionId;
      let payload = {
        action: 'connected',
        face: face
      };
      return arc.ws(event).send({
        id: id,
        payload: payload
      });
    });
    // let result = await connected({event, action, connectionId});
    // return result;
  }

  if(action === 'disconnected') {
    let clients = scan.Items;
    let payload = {
      action: 'disconnected',
      removeId: connectionId
    };
    clients.map(item => {
      let id = item.connectionId;
      return arc.ws(event).send({
        id: id,
        payload: payload
      });
    });

  }


  // if(action.action === 'connected') {
  //   await Promise.all(scan.Items.map(item => {
  //     const id = item.connectionId;
  //     const payload = {
  //       action: 'connection',
  //       id: id
  //     };
  //       return arc.ws(event).send(
  //         {id: id,
  //         payload: payload}
  //       );
  //     })
  //   );
  // } else {
    // await Promise.all(scan.Items.map(item => {
    //   const id = item.connectionId;
    //   const payload = {text};
    //     return arc.ws(event).send(
    //       {id: id,
    //       payload: payload}
    //     );
    //   })
    // );

  return {statusCode: 200};
};
