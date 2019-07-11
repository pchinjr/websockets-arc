const data = require('@architect/data');
const arc = require('@architect/functions');

// on disconnect event, remove connectionId from dynamo and publish connectionIds to remove from connected clients.
exports.handler = async function ws(event) {
  console.log('ws-disconnect called with', event);
  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};
  await data.connection_table.delete(params);
  const scan = await data.connection_table.scan({});

  await Promise.all(scan.Items.map(item => {
    return arc.ws(event).send({
      id: item.connectionId,
      payload: {
        action: 'disconnected',
        removeId: connectionId
      }
    });
  }));

  return {statusCode: 200};
};
