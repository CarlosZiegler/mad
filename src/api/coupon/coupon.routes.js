const express = require('express');
const Controller = require('./controller/coupon');

const routes = express.Router();

routes.get('/coupon/:code', Controller.index);
routes.post('/coupon', Controller.store);

module.exports = routes;
