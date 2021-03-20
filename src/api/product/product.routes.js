const express = require('express');
const Controller = require('./controller/product');

const routes = express.Router();

routes.get('/product', Controller.show);
routes.get('/product/:id', Controller.index);
routes.post('/product', Controller.store);

module.exports = routes;
