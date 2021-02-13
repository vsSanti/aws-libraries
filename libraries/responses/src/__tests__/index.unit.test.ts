import Responses from '../index';

const data = { any: 'thing' };

describe('[RESPONSES] index', () => {
  it('Should be an object', () => {
    expect(typeof Responses).toBe('object');
  });

  it('Should have default as BadGateway', () => {
    const res = Responses.customResponse(undefined, data);

    expect(res.statusCode).toBe(502);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return OK', () => {
    const res = Responses.OK(data);

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return Created', () => {
    const res = Responses.Created(data);

    expect(res.statusCode).toBe(201);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return NoContent', () => {
    const res = Responses.NoContent(data);

    expect(res.statusCode).toBe(204);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return BadRequest', () => {
    const res = Responses.BadRequest(data);

    expect(res.statusCode).toBe(400);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return Unauthorized', () => {
    const res = Responses.Unauthorized(data);

    expect(res.statusCode).toBe(401);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return Forbidden', () => {
    const res = Responses.Forbidden(data);

    expect(res.statusCode).toBe(403);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return NotFound', () => {
    const res = Responses.NotFound(data);

    expect(res.statusCode).toBe(404);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return MethodNotAllowed', () => {
    const res = Responses.MethodNotAllowed(data);

    expect(res.statusCode).toBe(405);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return MethodNotAllowed default message', () => {
    const res = Responses.MethodNotAllowed();

    expect(res.statusCode).toBe(405);
    expect(res.body).toBe(JSON.stringify({ message: 'Método não definido.' }));
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return Conflict', () => {
    const res = Responses.Conflict(data);

    expect(res.statusCode).toBe(409);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return UnprocessableEntity', () => {
    const res = Responses.UnprocessableEntity(data);

    expect(res.statusCode).toBe(422);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return InternalServerError', () => {
    const res = Responses.InternalServerError(data);

    expect(res.statusCode).toBe(500);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });

  it('Should return NotImplemented', () => {
    const res = Responses.NotImplemented(data);

    expect(res.statusCode).toBe(501);
    expect(typeof res.body).toBe('string');
    expect((res.headers || {})['Content-Type']).toBe('application/json');
  });
});
