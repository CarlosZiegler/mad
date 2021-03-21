const express = require('express');
const CartController = require('./CartController');

const Controller = new CartController();
const routes = express.Router();

routes.post('/cart', Controller.store);
routes.get('/cart', Controller.show);
routes.get('/cart/:id', Controller.index);
routes.put('/cart/:id', Controller.update);
routes.delete('/cart/:id', Controller.destroy);

module.exports = routes;
