const request = require('supertest');
const server = require('../../server');
const AuthController = require('../../controllers/auth');

describe('middlewares.error', () => {
  let json;

  afterEach(async () => {
    await server.close();
  });

  beforeEach(() => {
    json = {
      name: 'test8054',
      email: 'test8054@test.com',
    };
  });

  const exec = () => {
    return request(server)
      .post('/api/auth/register')
      .send(json);
  };

  it('status 500 unexpected error', async () => {
    AuthController.register = (req, res) => { throw new Error('test error'); };

    const res = await exec();

    expect(res.status).toBe(500);
  });
});
