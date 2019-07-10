/**
 * used to clean up event.requestContext.connectionId
 */
let data = require('@architect/data');

exports.handler = async function ws(event) {
  console.log('ws-disconnect called with', event);
  const connectionId = event.requestContext.connectionId;
  const params = {'connectionId': connectionId};
  await data.connection_table.delete(params);
  const ids = await data.connection_table.scan({});
  console.log(ids);
  return {statusCode: 200};
};
