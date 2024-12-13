import Joi from 'joi';

export function validateRegister(body) {
  const schema = Joi.object({
    id: Joi.number(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
    full_name: Joi.string().min(3).max(24).required(), // changed from 'name' to 'fullName'
    role: Joi.string().valid('patient', 'admin', 'doctor').required(), // added role
    gender: Joi.string().valid('male', 'female').required(), // added gender
    birth_date: Joi.date().required(), // added birthDate
    address: Joi.string().required(), // added address
    national_id: Joi.string().length(14).required(), // added nationalID
    photo_url: Joi.string().uri(), // added photoUrl
    is_verified: Joi.boolean().default(false), // added isVerified
  });
  return schema.validate(body);
}

export function validateLogin(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required()
  });
  return schema.validate(body);
}

export function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required()
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required()
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    email: Joi.string().min(3).required()
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    currPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
    retypeNewPassword: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateResetPassword(body) {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).max(20).required(),
    retypeNewPassword: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateEditUser(body) {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(24),
    email: Joi.string().min(3).max(20),
    // username: Joi.string().min(3).max(15),
    // role: Joi.string().valid('patient', 'admin', 'doctor'),
    // gender: Joi.string().valid('male', 'female'), // updated to match schema
    // birth_date: Joi.date(),
    address: Joi.string(),
    // national_id: Joi.string(),
    photo_url: Joi.string().uri(),
    // is_activated: Joi.boolean(),
    // is_verified: Joi.boolean(),
  });
  return schema.validate(body);
}
