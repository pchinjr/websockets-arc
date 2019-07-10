function getWS() {
  const env = window.location.pathname;
  const testing = 'ws://localhost:3333';
  const staging = 'wss://rhzc9f1yfg.execute-api.us-east-1.amazonaws.com/staging';
  const production = 'wss://fstphnuou6.execute-api.us-east-1.amazonaws.com/production';
  if (env === '/')
    return testing;
  if (env === '/staging')
    return staging;
  if (env === '/production')
    return production;
  return testing;
}
