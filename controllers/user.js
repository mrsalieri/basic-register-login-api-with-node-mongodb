const _ = require('lodash');
const { User, validateUserUpdate } = require('../models/user');
const Hasher = require('../libs/hasher');
const MessageHandler = require('../libs/messageHandler');

module.exports = {
  getUser: async (req, res) => {
    // Get data
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) {
      return new MessageHandler(req, res)
        .notFound()
        .setMessageCode('user_not_found')
        .handle();
    }

    // Response preparation
    const payload = {
      data: _.mapKeys(user, (value, key) => (key === '_id' ? 'id' : key)),
    };

    // Send response
    return new MessageHandler(req, res)
        .success()
        .setMessageCode('success')
        .setData(payload)
        .handle();
  },

  updateUser: async (req, res) => {
    // Input validation
    const params = _.pick(req.body, ['name', 'email', 'password']);
    const { error } = validateUserUpdate(params);
    if (error) {
      return new MessageHandler(req, res)
        .badRequest()
        .setMessageCode('error')
        .setData(error.details[0].message)
        .handle();
    }

    // Get data
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return new MessageHandler(req, res)
        .notFound()
        .setMessageCode('user_not_found')
        .handle();
    }

    // Hash new password if given
    if (params.password) params.password = await Hasher.generateHash(params.password);

    // Copy new values to user and save
    Object.assign(user, params);
    await user.save();

    // Response preparation
    const data = _.mapKeys(user.toObject(), (value, key) => (key === '_id' ? 'id' : key));
    delete data.password;
    const payload = {
      data,
    };

    // Send response
    return new MessageHandler(req, res)
        .success()
        .setMessageCode('success')
        .setData(payload)
        .handle();
  },
};
