const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

/** Находит все карточки в базе данных и отправляет ответ */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

/** Создаёт новую карточку в базе данных и отправляет ответ */
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

/** Находит карточку в базе данных по id и удаляет её */
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      // Проверяется, принадлежит ли удаляемая карточка текущему пользователю
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      // Удаление карточки
      Card.deleteOne({ _id: req.params.cardId })
        .then((data) => res.status(200).send({ data }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};

/** Записывает пользователя в массив likes */
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};

/** Удаляет пользователя из массива likes */
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotFoundError('Нет карточки с таким id'));
      } else {
        next(err);
      }
    });
};
