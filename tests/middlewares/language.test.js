const language = require('../../middlewares/language');
const config = require('config');

describe('middlewares.language', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = jest.fn();
  });

  it('request body check for no language input ', async () => {
    language(req, res, next);

    expect(req.body).toMatchObject({ lang: config.get('Language.defaultLang') });
    expect(next.mock.calls.length).toBe(1);
  });

  it('request body check for invalid language input', async () => {
    req.body.lang = '';
    language(req, res, next);

    expect(req.body).toMatchObject({ lang: config.get('Language.defaultLang') });
    expect(next.mock.calls.length).toBe(1);
  });

  it('request body check for valid language input', async () => {
    req.body.lang = 'xxxx';
    language(req, res, next);

    expect(req.body).toMatchObject({ lang: 'xxxx' });
    expect(next.mock.calls.length).toBe(1);
  });
});
