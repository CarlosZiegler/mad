const express = require('express');
const Controller = require('./controller/cart');

const routes = express.Router();

routes.post('/cart', Controller.store);
routes.get('/cart/:id', Controller.index);
routes.put('/cart/:id', Controller.update);

module.exports = routes;
