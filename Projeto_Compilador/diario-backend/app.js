var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morganLogger = require('morgan');               
var logger = require('./utils/logger');            
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const githubRoutes = require('./routes/github');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoDB = 'mongodb://localhost:27017/projeto';
mongoose.connect(mongoDB);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB'));
connection.once('open', () => console.log('Conexão ao MongoDB realizada com sucesso'));

// passport config
require('dotenv').config();
require('./auth/github');
var User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var userRouter = require('./routes/user');
var newsRouter = require('./routes/noticia');

var app = express();

app.use(morganLogger('dev'));  // mantém o morgan para debugging terminal

// Middleware de logging com winston
app.use((req, res, next) => {
  logger.info({
    message: 'Pedido recebido',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.email || 'anónimo'
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Itens do filestore
app.use('/fileStore', express.static(path.join(__dirname, 'public/fileStore')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/utilizadores', userRouter);
app.use('/noticias', newsRouter);
app.use('/auth/github', githubRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler com logging
app.use(function(err, req, res, next) {
  logger.error({
    message: 'Erro no servidor',
    error: err.message,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user: req.user?.email || 'anónimo'
  });

  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
