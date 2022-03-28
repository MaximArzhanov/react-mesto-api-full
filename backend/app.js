const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
// const { CelebrateError, isCelebrateError } = require('celebrate');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const NotFoundError = require('./errors/not-found-err');
// const BadRequestError = require('./errors/bad-request-err');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mongodb')
  .then(() => console.log('Success: Database connected!'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Логи запросов */
app.use(requestLogger);

app.get('/api/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

/** Роут регистрации пользователя */
app.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .pattern(/https?:\/\/(www\.)?[\w-]+\.[\w]{2,}[\w\W]*/),
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
}), createUser);

/** Роут авторизации пользователя */
app.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
}), login);

app.use(auth);

app.use('/api/', usersRouter);
app.use('/api/', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Задан некорректный адрес'));
});

/** Логи ошибок */
app.use(errorLogger);

/** Обработка ошибок celebrate */
app.use(errors());

/** Обработка ошибок */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
