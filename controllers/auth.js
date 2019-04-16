const _ = require('lodash');
const { User, validateUser, validateLogin } = require('../models/user');
const Hasher = require('../libs/hasher');
const MessageHandler = require('../libs/messageHandler');

module.exports = {
  register: async (req, res) => {
    // Input validation
    const { error } = validateUser(_.pick(req.body, ['name', 'email', 'password']));
    if (error) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('error')
        .setData(error.details[0].message)
        .handle();
    }

    // Unique email verification
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('already_registered_user')
        .handle();
    }

    // User creation
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user.password = await Hasher.generateHash(user.password);
    await user.save();

    // Response preparation
    const payload = {
      data: {
        id: user._id,
        accessToken: user.generateAuthToken(),
      },
    };

    // Send response
    return new MessageHandler(req, res)
        .success()
        .setMessageCode('success')
        .setData(payload)
        .handle();
  },

  login: async (req, res) => {
    // Input validation
    const { error } = validateLogin(_.pick(req.body, ['email', 'password']));
    if (error) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('error')
        .setData(error.details[0].message)
        .handle();
    }

    // User search
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('login_error')
        .handle();
    }

    // Password check
    const isAuthenticated = await Hasher.compareStrWithHash(req.body.password, user.password);
    if (!isAuthenticated) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('login_error')
        .handle();
    }

    // Response preparation
    const payload = {
      data: {
        id: user._id,
        accessToken: user.generateAuthToken(),
      },
    };

    // Send response
    return new MessageHandler(req, res)
        .success()
        .setMessageCode('success')
        .setData(payload)
        .handle();
  },
};
