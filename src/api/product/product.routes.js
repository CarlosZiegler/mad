const express = require('express');
const ProductController = require('./ProductController');

const Controller = new ProductController();

const routes = express.Router();

routes.get('/product', Controller.show);
routes.get('/product/:id', Controller.index);
routes.post('/product', Controller.store);

module.exports = routes;
