import Joi from 'joi'

export const accountSignupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const accountLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const monsterCreationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  skills: Joi.string().required(),
  image: Joi.string(),
  nickname: Joi.string(),
})