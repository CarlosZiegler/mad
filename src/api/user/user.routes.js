const express = require('express');
const Controller = require('./controller/user');

const routes = express.Router();

routes.get('/main', Controller.index);

module.exports = routes;
