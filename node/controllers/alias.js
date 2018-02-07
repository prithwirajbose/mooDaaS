var _ = require('../libs/lodash.min.js'),
    errorHandling = require('../libs/error-handler.js'),
    utils = require('../libs/utils.js');
require('dotenv').load();
var dbexec = require('../libs/dbexec');



function createUpdate(req, res) {

    if (_.has(req.body, 'oldName')) {
        dbexec.query('ALTER TABLE ' + _.get(req.body, 'oldName') + ' RENAME TO ' + _.get(req.body, 'name')).then(function(result) {
            return utils.sendJSONResponse(req, res, result);
        }).catch(function(err) {
            console.log(err);
            errorHandling.appError(req, res, '001');
        });
    } else {
        dbexec.query('CREATE TABLE ' + _.get(req.body, 'name') + '(data text)').then(function(result) {
            return utils.sendJSONResponse(req, res, result);
        }).catch(function(err) {
            console.log(err);
            errorHandling.appError(req, res, '001');
        });
    }

}

module.exports.allowedRequestFields = ["name", "oldName"];
module.exports.createUpdate = createUpdate;