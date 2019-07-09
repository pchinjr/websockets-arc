/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 */
let arc = require('@architect/functions');
let data = require('@architect/data');


exports.handler = async function ws(event) {
  console.log('ws-connect called with', event);

  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};

  await data.connection_table.put(params);

  const scan = await data.connection_table.scan({}); //get all connectionIds
  const payload = {
    action: 'connection',
    count: scan.Count
  };

  //iterate the connectionIds
  scan.Items.map(item => arc.ws(event).send({
    id: item.connectionId,
    payload: payload
    })
  ).then(console.log('connection promise handler complete'));

  // await arc.ws(event).send({
  //   id: connectionId,
  //   payload: {action: 'connection', count: scan.Count }
  // });

  //console.log(scan);
  return {statusCode: 200};
};
