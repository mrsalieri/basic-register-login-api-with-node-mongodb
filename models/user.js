const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

// Access token generator for authenticated user instances
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.get('JWTToken.jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

// Common validation object generator
function ValidationSchemaGen() {
  this.name = Joi.string().min(3).max(100);
  this.email = Joi.string().min(5).max(255).email();
  this.password = Joi.string().min(5).max(255);
}

// Input validation for creating user
function validateUser(data) {
  const schema = new ValidationSchemaGen();

  // Make all fields required
  Object.keys(schema).reduce((acc, key) => {
    acc[key] = schema[key].required(); // ignore security warning since no user input here
    return acc;
  }, schema);

  return Joi.validate(data, schema);
}

// Input validation for login
function validateLogin(data) {
  const schema = new ValidationSchemaGen();

  // Make all fields required
  Object.keys(schema).reduce((acc, key) => {
    acc[key] = schema[key].required(); // ignore security warning since no user input here
    return acc;
  }, schema);

  const loginSchema = _.pick(schema, ['email', 'password']);

  return Joi.validate(data, loginSchema);
}

// Input validation for creating user
function validateUserUpdate(data) {
  const schema = new ValidationSchemaGen();

  return Joi.validate(data, schema);
}

module.exports = { User, validateUser, validateLogin, validateUserUpdate };
