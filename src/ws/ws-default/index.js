const arc = require('@architect/functions');
const data = require('@architect/data');

exports.handler = async function ws(event) {
  console.log('ws-default called with', event);

  const ts = new Date(Date.now()).toISOString();
  const message = JSON.parse(event.body);
  const text = `${ts} - ${message.text}`;
  const scan = await data.connection_table.scan({});

  const action = JSON.parse(event.body);
  if(action.action === 'connected') {
    await Promise.all(scan.Items.map(item => {
      const id = item.connectionId;
      const payload = {
        action: 'connection',
        count: scan.Count
      };
        return arc.ws(event).send(
          {id: id,
          payload: payload}
        );
      })
    );
  } else {
    await Promise.all(scan.Items.map(item => {
      const id = item.connectionId;
      const payload = {text};
        return arc.ws(event).send(
          {id: id,
          payload: payload}
        );
      })
    );
  }

  return {statusCode: 200};
};
