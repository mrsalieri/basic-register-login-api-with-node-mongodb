const request = require('supertest');
const { User } = require('../../../models/user');
const server = require('../../../server');

describe('user route me', () => {
  let json;
  let registerJson;

  const login = obj => request(server).post('/api/auth/login').send(obj);
  const register = obj => request(server).post('/api/auth/register').send(obj);

  const me = obj => request(server).post('/api/user/me').send(obj);

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

    json = { accessToken: res.body.data.data.accessToken };
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

  it('get user data successfully', async () => {
    const res = await me(json);

    expect(res.status).toBe(200);
    expect(res.body.data.data.email).toBe(registerJson.email);
  });

  it('user not found with 404', async () => {
    await User.remove({});
    const res = await me(json);

    expect(res.status).toBe(404);
  });

  it('token required with 401 lang:tr', async () => {
    json.accessToken = null;
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(401);
  });

  it('invalid token with 400 lang:tr', async () => {
    json.accessToken = 'adfsg';
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(400);
  });

  it('get user data successfully lang:tr', async () => {
    json.lang = 'tr';
    const res = await me(json);

    expect(res.status).toBe(200);
    expect(res.body.data.data.email).toBe(registerJson.email);
  });

  it('user not found with 404 lang:tr', async () => {
    json.lang = 'tr';
    await User.remove({});
    const res = await me(json);

    expect(res.status).toBe(404);
  });
});
