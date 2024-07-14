const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const cardRouter = require('./routes/cardRouter');
const app = express();
const authRouter = require('./routes/auth.router');
const tokenRouter = require('./routes/token.router');

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/cards', cardRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

module.exports = app;
