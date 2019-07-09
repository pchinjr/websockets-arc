const arc = require('@architect/functions');
const data = require('@architect/data');

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const ts = new Date(Date.now()).toISOString();
  const message = JSON.parse(event.body);

  const scan = await data.connection_table.scan({});
  const text = `${ts} - ${message.text}`;

  scan.Items.map(item => arc.ws(event).send({
    id: item.connectionId,
    payload: {text}
    })
  );

  // const ts = new Date(Date.now()).toISOString();
  // const connectionId = event.requestContext.connectionId;
  // const message = JSON.parse(event.body);
  // const text = `${ts} - ${message.text}`;

  // await arc.ws(event).send({
  //   id: connectionId,
  //   payload: {text}
  // });

  return {statusCode: 200};
};
