import { APIGatewayProxyEvent } from 'aws-lambda';
import { group } from 'console';

async function handler(event: APIGatewayProxyEvent) {
  console.log("request:", JSON.stringify(event, undefined, 2));
 if(isAuthorized(event)){
  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
 }else{
  return {
    statusCode: 401,
    body: JSON.stringify('You are not authorised')
  };
 }
}

function isAuthorized(event: APIGatewayProxyEvent){
  const groups = event.requestContext.authorizer?.claims['cognito:groups']
  if(groups){
    return (group as unknown as string).includes('admins')
  }else{
    return false
  }
}

export { handler };
