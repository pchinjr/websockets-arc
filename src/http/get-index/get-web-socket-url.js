module.exports = function getWS() {
  const env = process.env.NODE_ENV;
  const testing = 'ws://localhost:3333';
  const staging = 'wss://qq6dz8lh9b.execute-api.us-east-1.amazonaws.com/staging/';
  const production = 'wss://qq6dz8lh9b.execute-api.us-east-1.amazonaws.com/production/';
  if (env === 'testing')
    return testing;
  if (env === 'staging')
    return staging;
  if (env === 'production')
    return production;
  return testing;
};
