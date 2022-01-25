const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// const BadRequestError = require('../errors/bad-request-err');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi
      .string()
      .length(24)
      .hex()
      .required(),
  }),
}), getUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .pattern(/https?:\/\/(www\.)?[\w-]+\.[\w]{2,}[\w\W]*/),
  }),
}), updateUserAvatar);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
    about: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
  }),
}), updateUserInfo);

module.exports = router;
