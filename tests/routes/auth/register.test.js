const request = require('supertest');
const { User } = require('../../../models/user');
const server = require('../../../server');

describe('auth route register', () => {
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

  const register = () => request(server).post('/api/auth/register').send(json);

  it('name required with 400', async () => {
    delete json.name;

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('email required with 400', async () => {
    delete json.email;

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('password required with 400', async () => {
    delete json.password;

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('name min requirements fail with 400', async () => {
    json.name = 'sd';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400', async () => {
    json.email = '1@';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400', async () => {
    json.password = '123';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('successful registration', async () => {
    const res = await register();

    expect(res.status).toBe(200);
  });

  it('already registered user with 400', async () => {
    await register();
    const res = await register();

    expect(res.status).toBe(400);
  });

  it('name required with 400 lang: tr', async () => {
    delete json.name;
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('email required with 400 lang: tr', async () => {
    delete json.email;
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('password required with 400 lang: tr', async () => {
    delete json.password;
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('name min requirements fail with 400 lang: tr', async () => {
    json.name = 'sd';
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('email min requirements fail with 400 lang: tr', async () => {
    json.email = '1@';
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('password min requirements fail with 400 lang: tr', async () => {
    json.password = '123';
    json.lang = 'tr';

    const res = await register();

    expect(res.status).toBe(400);
  });

  it('successful registration lang: tr', async () => {
    json.lang = 'tr';
    const res = await register();

    expect(res.status).toBe(200);
  });

  it('already registered user with 400 lang: tr', async () => {
    json.lang = 'tr';
    await register();
    const res = await register();

    expect(res.status).toBe(400);
  });
});
