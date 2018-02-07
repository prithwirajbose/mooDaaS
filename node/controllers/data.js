var _ = require('../libs/lodash.min.js'),
    errorHandling = require('../libs/error-handler.js'),
    utils = require('../libs/utils.js');
require('dotenv').load();
var dbexec = require('../libs/dbexec');



function createUpdate(req, res) {


    dbexec.query('INSERT INTO user VALUES ("' + req.body + '")').then(function(result) {
        return utils.sendJSONResponse(req, res, JSON.stringify(result));
    }).catch(function(err) {
        console.log(err);
        errorHandling.appError(req, res, '001');
    });

}


function list(req, res) {
    dbexec.query('SELECT * FROM USER').then(function(result) {
        return utils.sendJSONResponse(req, res, result);
    }).catch(function(err) {
        console.log(err);
        errorHandling.appError(req, res, '001');
    });

}


module.exports.createUpdate = createUpdate;
module.exports.list = list;