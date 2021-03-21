const express = require('express');
const CouponController = require('./CouponController');

const Controller = new CouponController();
const routes = express.Router();

routes.get('/coupon/:code', Controller.index);
routes.post('/coupon', Controller.store);

module.exports = routes;
