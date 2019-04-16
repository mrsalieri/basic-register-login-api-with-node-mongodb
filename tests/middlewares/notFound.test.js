const request = require('supertest');
const server = require('../../server');

describe('middlewares.notFound', () => {
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
      .post('/api/gdhmgdggh')
      .send(json);
  };

  it('status 404 url not found', async () => {
    const res = await exec();

    expect(res.status).toBe(404);
  });
});
