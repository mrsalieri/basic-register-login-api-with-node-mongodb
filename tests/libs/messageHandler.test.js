const MessageHandler = require('../../libs/messageHandler');

describe('lib.messageHandler', () => {
  let req;
  let res;
  let body;

  function Response() {
    this.status = function (statusCode) { this.statusCode = statusCode; return this; };
    this.send = function (data) { this.data = data; return this; };
  }

  beforeEach(() => {
    body = {
      status: 400,
      code: 'error',
      data: {},
    };

    req = { body: {} };
    res = new Response();
  });

  it('status 200 message', () => {
    body.status = 200;
    body.code = 'success';

    new MessageHandler(req, res)
        .success()
        .setMessageCode(body.code)
        .setData(body)
        .handle();
    expect(res.statusCode).toBe(body.status);
    expect(res.data.data).toMatchObject(body);
  });

  it('status 400 message', () => {
    new MessageHandler(req, res)
        .badRequest()
        .setMessageCode(body.code)
        .setData(body)
        .handle();
    expect(res.statusCode).toBe(body.status);
    expect(res.data.data).toMatchObject(body);
  });

  it('status 401 message', () => {
    body.status = 401;

    new MessageHandler(req, res)
        .unauthorized()
        .setMessageCode(body.code)
        .setData(body)
        .handle();
    expect(res.statusCode).toBe(body.status);
    expect(res.data.data).toMatchObject(body);
  });

  it('status 403 message', () => {
    body.status = 403;

    new MessageHandler(req, res)
        .forbidden()
        .setMessageCode(body.code)
        .setData(body)
        .handle();
    expect(res.statusCode).toBe(body.status);
    expect(res.data.data).toMatchObject(body);
  });

  it('status 404 message', () => {
    body.status = 404;

    new MessageHandler(req, res)
        .notFound()
        .setMessageCode(body.code)
        .setData(body)
        .handle();
    expect(res.statusCode).toBe(body.status);
    expect(res.data.data).toMatchObject(body);
  });
});
