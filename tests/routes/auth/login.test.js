const request = require('supertest');
const { User } = require('../../../models/user');
const server = require('../../../server');

describe('auth route login', () => {
  let json;

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });

  beforeEach(() => {
    json = {
      name: 'test8054',
      email: 'test8054@test.com',
      password: '12345',
    };
  });

  const login = () => request(server).post('/api/auth/login').send(json);
  const register = () => request(server).post('/api/auth/register').send(json);

  it('email required with 400', async () => {
    delete json.email;

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('password required with 400', async () => {
    delete json.password;

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400', async () => {
    json.email = '1@';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400', async () => {
    json.password = '123';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('successful login', async () => {
    const user = await register();
    const res = await login();

    expect(res.status).toBe(200);
    expect(res.body.data.data.id).toBe(user.body.data.data.id);
    expect(res.body.data.data).toHaveProperty('accessToken');
  });

  it('error wrong email', async () => {
    await register();
    json.email = 'test8054@test.com2';
    const res = await login();

    expect(res.status).toBe(400);
  });

  it('error wrong password', async () => {
    await register();
    json.password = '1234567';
    const res = await login();

    expect(res.status).toBe(400);
  });

  it('email required with 400 lang:tr', async () => {
    delete json.email;
    json.lang = 'tr';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('password required with 400 lang:tr', async () => {
    delete json.password;
    json.lang = 'tr';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400 lang:tr', async () => {
    json.email = '1@';
    json.lang = 'tr';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400 lang:tr', async () => {
    json.password = '123';
    json.lang = 'tr';

    const res = await login();

    expect(res.status).toBe(400);
  });

  it('successful login lang:tr', async () => {
    json.lang = 'tr';
    const user = await register();
    const res = await login();

    expect(res.status).toBe(200);
    expect(res.body.data.data.id).toBe(user.body.data.data.id);
    expect(res.body.data.data).toHaveProperty('accessToken');
  });

  it('error wrong email lang:tr', async () => {
    await register();
    json.email = 'test8054@test.com2';
    json.lang = 'tr';
    const res = await login();

    expect(res.status).toBe(400);
  });

  it('error wrong password lang:tr', async () => {
    await register();
    json.password = '1234567';
    json.lang = 'tr';
    const res = await login();

    expect(res.status).toBe(400);
  });
});
