function getWS() {
  let env = window.location.pathname;
  let testing = 'ws://localhost:3333';
  let staging = 'wss://rhzc9f1yfg.execute-api.us-east-1.amazonaws.com/staging';
  let production = 'wss://fstphnuou6.execute-api.us-east-1.amazonaws.com/production';
  if (env === '/')
    return testing;
  if (env === '/staging')
    return staging;
  if (env === '/production')
    return production;
  return testing;
}
