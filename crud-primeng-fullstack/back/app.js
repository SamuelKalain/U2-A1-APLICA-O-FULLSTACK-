var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
require('dotenv').config();

var app = express();

// ============================
//     Middlewares iniciais
// ============================
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ============================
//     Rotas protegidas
// ============================
const authMiddleware = require('./middleware/auth');


// ============================
//     IMPORTANDO ROTAS
// ============================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var alunosRouter = require('./routes/alunos');
var petsRouter = require('./routes/pets');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');

// 👉 IMPORTAR A ROTA DAS ORDERS
var ordersRouter = require('./routes/orders');

// ============================
//     ROTAS PÚBLICAS
// ============================
app.use('/', indexRouter);
app.use('/auth', authRouter);

// ============================
//     ROTAS PROTEGIDAS
// ============================
app.use('/users', authMiddleware, usersRouter);
app.use('/alunos', authMiddleware, alunosRouter);
app.use('/pets', authMiddleware, petsRouter);
app.use('/products', authMiddleware, productsRouter);

// 👉 ROTA PROTEGIDA DAS ORDERS
app.use('/orders', authMiddleware, ordersRouter);

// ============================
//        Swagger
// ============================
var { swaggerUi, swaggerSpec } = require('./swagger.js');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================
//      Arquivos estáticos
// ============================
app.use(express.static(path.join(__dirname, 'public')));

// ============================
//            404
// ============================
app.use(function(req, res, next) {
  next(createError(404));
});

// ============================
//       ERROR HANDLER
// ============================
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

module.exports = app;
