/**
 * used to clean up event.requestContext.connectionId
 */
let data = require('@architect/data');
let arc = require('@architect/functions');

exports.handler = async function ws(event) {
  console.log('ws-disconnect called with', event);
  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};
  await data.connection_table.delete(params);
  const scan = await data.connection_table.scan({});

  scan.Items.map(item => {
    arc.ws(event).send({
      id: item.connectionId,
      payload: {
        action: 'disconnected',
        removeId: connectionId
      }
    });
  });

  return {statusCode: 200};
};
