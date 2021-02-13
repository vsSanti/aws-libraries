import { createEventObject } from '../index';

describe('[COMMON] createEventObject', () => {
  it('Should create event of type OPTIONS', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
    });

    expect(res.httpMethod).toBe('OPTIONS');
  });

  it('Should create event with body', () => {
    const body = {
      message: 'hello',
    };
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      body,
    });

    expect(res.body).toBe(JSON.stringify(body));
  });

  it('Should create event with authorizer', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      authorizer: { id: 'id' },
    });

    expect(res.requestContext.authorizer.id).toBe('id');
  });

  it('Should create event with pathParameters', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      pathParameters: {
        id: 'id',
      },
    });

    expect(res.pathParameters.id).toBe('id');
  });

  it('Should create event with queryStringParameters', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      queryStringParameters: {
        id: 'id',
      },
    });

    expect(res.queryStringParameters.id).toBe('id');
  });

  it('Should create event with custom path', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      path: 'custom-path',
    });

    expect(res.path).toBe('custom-path');
  });

  it('Should create event with custom header', () => {
    const res: any = createEventObject({
      httpMethod: 'OPTIONS',
      headers: {
        customHeader: 'customHeader',
      },
    });

    expect(res.headers.customHeader).toBe('customHeader');
  });
});
