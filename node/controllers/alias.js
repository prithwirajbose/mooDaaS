var _ = require('../libs/lodash.min.js'),
    errorHandling = require('../libs/error-handler.js'),
    utils = require('../libs/utils.js');


function createUpdate(req, res, data) {
    return utils.sendJSONResponse(req, res, _.get(req, 'body'));
}

module.exports.allowedRequestFields = ["name"];
module.exports.createUpdate = createUpdate;