const Hasher = require('../../libs/hasher');

describe('lib.hasher', () => {
  it('correct comparison', async () => {
    const hashed = await Hasher.generateHash('123');
    const comparison = await Hasher.compareStrWithHash('123', hashed);
    expect(comparison).toBe(true);
  });

  it('wrong comparison', async () => {
    const hashed = await Hasher.generateHash('123');
    const comparison = await Hasher.compareStrWithHash('124', hashed);
    expect(comparison).toBe(false);
  });
});
