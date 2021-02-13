import { APIGatewayEvent } from 'aws-lambda';

import GenericObject from './GenericObject';

const defaultEvent: APIGatewayEvent = {
  body: null,
  headers: { origin: 'origin' },
  multiValueHeaders: {},
  httpMethod: '',
  isBase64Encoded: false,
  multiValueQueryStringParameters: null,
  path: '/',
  pathParameters: null,
  queryStringParameters: {},
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: {},
    protocol: '',
    httpMethod: '',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
    path: '',
    stage: '',
    requestId: '',
    requestTimeEpoch: 232131321,
    resourceId: '',
    resourcePath: '',
  },
  resource: '',
  stageVariables: null,
};

export interface DataProps {
  httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
  body?: GenericObject;
  authorizer?: GenericObject;
  pathParameters?: GenericObject;
  headers?: GenericObject;
  path?: string;
  queryStringParameters?: GenericObject;
}

/**
 * Cria um objeto de evento para chamar o handler da função ao testar algo com o Jest.
 * @param data Objeto de evento.
 * @returns Objeto do tipo `APIGatewayEvent`
 */
const createEventObject = (data: DataProps): APIGatewayEvent => {
  const response: APIGatewayEvent = {
    ...defaultEvent,
    httpMethod: data.httpMethod,
    body: data.body ? JSON.stringify(data.body) : null,
    requestContext: {
      ...defaultEvent.requestContext,
      authorizer: data.authorizer,
    },
    pathParameters: data.pathParameters || null,
    headers: {
      ...defaultEvent.headers,
      ...data.headers,
    },
    path: data.path || '',
    queryStringParameters: data.queryStringParameters || null,
  };

  return response;
};

export default createEventObject;
