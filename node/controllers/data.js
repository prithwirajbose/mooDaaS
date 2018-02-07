var _ = require('../libs/lodash.min.js'),
    errorHandling = require('../libs/error-handler.js'),
    utils = require('../libs/utils.js');


function createUpdate(req, res, data) {
    return utils.sendJSONResponse(_.get(req, 'body'));
}

module.exports.allowedRequestFields = ["firstName", "lastName"];
module.exports.createUpdate = createUpdate;