/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 */
let data = require('@architect/data');

exports.handler = async function ws(event) {
  console.log('ws-connect called with', event);
  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};
  await data.connection_table.put(params);
  const ids = await data.connection_table.scan({});
  console.log(ids);
  return {statusCode: 200};
};
