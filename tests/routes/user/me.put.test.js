const request = require('supertest');
const { User } = require('../../../models/user');
const server = require('../../../server');

describe('user route me', () => {
  let json;
  let registerJson;

  const login = obj => request(server).post('/api/auth/login').send(obj);
  const register = obj => request(server).post('/api/auth/register').send(obj);

  const me = obj => request(server).put('/api/user/me').send(obj);

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });

  beforeEach(async () => {
    registerJson = {
      name: 'test8054',
      email: 'test8054@test.com',
      password: '12345',
    };

    await register(registerJson);
    const res = await login(registerJson);

    json = {
      accessToken: res.body.data.data.accessToken,
      name: 'test80545',
      email: 'test80545@test.com',
      password: '123455',
    };
  });

  it('token required with 401', async () => {
    json.accessToken = null;
    const res = await me(json);

    expect(res.status).toBe(401);
  });

  it('invalid token with 400', async () => {
    json.accessToken = 'adfsg';
    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('name min requirements fail with 400', async () => {
    json.name = 'sd';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400', async () => {
    json.email = '1@';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400', async () => {
    json.password = '123';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('successful update', async () => {
    const res = await me(json);

    expect(res.status).toBe(200);
    expect(res.body.data.data).toMatchObject({ name: json.name, email: json.email });

    let loginRes = await login(registerJson);
    expect(loginRes.status).toBe(400);

    loginRes = await login(json);
    expect(loginRes.status).toBe(200);
  });

  it('user not found with 404', async () => {
    await User.remove({});
    const res = await me(json);

    expect(res.status).toBe(404);
  });

  it('token required with 401 lang: tr', async () => {
    json.accessToken = null;
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(401);
  });

  it('invalid token with 400 lang: tr', async () => {
    json.accessToken = 'adfsg';
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('name min requirements fail with 400 lang: tr', async () => {
    json.name = 'sd';
    json.lang = 'tr';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400 lang: tr', async () => {
    json.email = '1@';
    json.lang = 'tr';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400 lang: tr', async () => {
    json.password = '123';
    json.lang = 'tr';

    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('successful update lang: tr', async () => {
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(200);
    expect(res.body.data.data).toMatchObject({ name: json.name, email: json.email });

    let loginRes = await login(registerJson);
    expect(loginRes.status).toBe(400);

    loginRes = await login(json);
    expect(loginRes.status).toBe(200);
  });

  it('user not found with 404 lang: tr', async () => {
    json.lang = 'tr';
    await User.remove({});
    const res = await me(json);

    expect(res.status).toBe(404);
  });
});
