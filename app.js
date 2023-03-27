var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var costumerRouter = require('./routes/costumers');
var addressRouter = require('./routes/costumer_address');
var order_detailRouter = require('./routes/order_detail');
var orderRouter = require('./routes/order');
var payment_methodRouter = require('./routes/payment_method');
var productRouter = require('./routes/product');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/costumer', costumerRouter);
app.use('/address', addressRouter);
app.use('/order_detail', order_detailRouter);
app.use('/order', orderRouter);
app.use('/payment_method', payment_methodRouter);
app.use('/product', productRouter);

module.exports = app;
