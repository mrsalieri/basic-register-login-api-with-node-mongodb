const Translate = require('./translate');

// Http response creator
class MessageHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    // console.log(req.body);
    this.lang = req.body.lang;

    this.json = {
      status: 0,
      code: '',
      message: '',
    };
  }

  setMessageCode(code) {
    this.json.code = code;
    this.json.message = Translate.getTranslation(this.lang, code);

    return this;
  }

  setData(data) {
    if (data instanceof Error) {
      this.json.data = data.message;
    } else {
      this.json.data = data;
    }

    return this;
  }

  // Status list
  success() {
    this.json.status = 200;
    return this;
  }

  badRequest() {
    this.json.status = 400;
    return this;
  }

  unauthorized() {
    this.json.status = 401;
    return this;
  }

  forbidden() {
    this.json.status = 403;
    return this;
  }

  notFound() {
    this.json.status = 404;
    return this;
  }

  // Sends responses
  handle() {
    return this.res.status(this.json.status).send(this.json);
  }
}

module.exports = MessageHandler;
