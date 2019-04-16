const Translate = require('../../libs/translate');

describe('lib.translate', () => {
  it('successful translation', () => {
    const translation = Translate.getTranslation('en', 'success');
    expect(translation).not.toBeNull();
  });

  it('successful translation with wrong lang', () => {
    const translation = Translate.getTranslation('safsdgd', 'success');
    expect(translation).not.toBeNull();
  });

  it('translation error', async () => {
    expect(() => {
      Translate.getTranslation('en', 'asfsdgdfgd');
    }).toThrow();
  });
});
