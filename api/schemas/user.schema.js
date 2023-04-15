const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  image: image,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
