const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// const BadRequestError = require('../errors/bad-request-err');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
    link: Joi
      .string()
      .required()
      .pattern(/https?:\/\/(www\.)?[\w-]+\.[\w]{2,}[\w\W]*/),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .length(24)
      .hex()
      .required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .length(24)
      .hex()
      .required(),
  }),
}), dislikeCard);

module.exports = router;
