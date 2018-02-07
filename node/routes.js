const routes = require('express').Router();
var errorHandler = require('./libs/error-handler.js');
var utils = require('./libs/utils.js');
var _ = require('./libs/lodash.min.js');
var aliasController = require('./controllers/alias.js');
var dataController = require('./controllers/data.js');


routes.post('/alias', function(req, res) {
    if (!utils.checkRequestParamNames(req, res, aliasController)) {
        return res;
    }
    return aliasController.createUpdate(req, res);
});


routes.all('/*', function(req, res) {
    return errorHandler.appError(req, res, '006')
});


module.exports = routes;