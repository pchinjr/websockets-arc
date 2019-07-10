const arc = require('@architect/functions');
const data = require('@architect/data');


exports.handler = async function ws(event) {
  console.log('ws-connect called with', event);

  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};
  await data.connection_table.put(params);

  return {statusCode: 200};
};
