@app 
ws-demo

@aws
region us-east-1
profile stepfunctions-user

@ws 

@static
staging  pchinjr-ws-demo-staging
production pchinjr-ws-demo-production

@http
get /

@tables
connection_table
  connectionId *String