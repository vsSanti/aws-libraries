import { APIGatewayProxyResult } from 'aws-lambda';
import { GenericObject } from '@vssanti/types';

interface DataProps {
  data?: GenericObject;
  docs?: any[];
  message?: string;
}

type DataType = DataProps & GenericObject;

const Responses = {
  customResponse(statusCode = 502, data: DataType): APIGatewayProxyResult {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode,
      body: JSON.stringify(data),
    };
  },

  OK(data: DataType): APIGatewayProxyResult {
    return this.customResponse(200, data);
  },

  Created(data: DataType): APIGatewayProxyResult {
    return this.customResponse(201, data);
  },

  NoContent(data: DataType): APIGatewayProxyResult {
    return this.customResponse(204, data);
  },

  BadRequest(data: DataType): APIGatewayProxyResult {
    return this.customResponse(400, data);
  },

  Unauthorized(data: DataType): APIGatewayProxyResult {
    return this.customResponse(401, data);
  },

  Forbidden(data: DataType): APIGatewayProxyResult {
    return this.customResponse(403, data);
  },

  NotFound(data: DataType): APIGatewayProxyResult {
    return this.customResponse(404, data);
  },

  MethodNotAllowed(data: DataType = { message: 'Método não definido.' }): APIGatewayProxyResult {
    return this.customResponse(405, data);
  },

  Conflict(data: DataType): APIGatewayProxyResult {
    return this.customResponse(409, data);
  },

  UnprocessableEntity(data: DataType): APIGatewayProxyResult {
    return this.customResponse(422, data);
  },

  InternalServerError(data: DataType): APIGatewayProxyResult {
    return this.customResponse(500, data);
  },

  NotImplemented(data: DataType): APIGatewayProxyResult {
    return this.customResponse(501, data);
  },
};

export default Responses;
