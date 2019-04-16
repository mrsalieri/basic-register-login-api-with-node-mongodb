const config = require('config');
const langObj = require('../resources/lang/lang');

const supportedLangs = config.get('Language.supportedLangs').split(',');
const defaultLang = config.get('Language.defaultLang');

if (supportedLangs.length === 0 || defaultLang.length === 0) { // At least 1 language protection
  throw new Error('missing language configuration');
}

// Creates language list
const langAry = supportedLangs.filter(val => val !== defaultLang);
langAry.push(defaultLang);

// Creates translation object
const dataSource = langAry.reduce((acc, cur) => {
  acc[cur] = langObj[cur]; // ignore security warning since no user input here
  return acc;
}, {});

class Translation {
  static getTranslation(lang, key) {
    const l = langAry.includes(lang) ? lang : defaultLang;
    if (dataSource[l][key]) return dataSource[l][key]; // ignore security warning since no user input here

    throw new Error(`missing key ${key} on ${l}.js`); // Missing translation
  }
}

module.exports = Translation;
