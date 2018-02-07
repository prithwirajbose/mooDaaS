const uuidv1 = require('uuid/v1');
var _ = require('../libs/lodash.min.js');
var errorHandling = require('../libs/error-handler.js');

module.exports.initRequest = function(req, res, next) {
    var uuid = uuidv1();
    _.set(req, 'requestId', uuid);
    res.setHeader('Content-Type', 'application/json');
    next();
}

module.exports.logRequest = function(req, res, next) {
    console.log("Incoming Request " + _.get(req, 'method') + ' ' + _.get(req, 'url') + '\n' +
        JSON.stringify({
            requestId: _.get(req, 'requestId'),
            headers: _.get(req, 'headers'),
            query: _.get(req, 'query'),
            body: _.get(req, 'body')
        }));
    next();
}


module.exports.checkRequestParamNames = function(req, res, controller) {
    console.log(controller.allowedRequestFields);
    var failedKeys = '';
    var comma = '';
    if (_.has(controller, 'allowedRequestFields') && _.isArray(_.get(controller, 'allowedRequestFields'))) {
        var allowedRequestFields = _.get(controller, 'allowedRequestFields');
        if (req.body) {
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    if (!_.includes(allowedRequestFields, key)) {
                        failedKeys += comma + key;
                        comma = ', ';
                    }
                }
            }
        }
    }
    if (!_.isNil(failedKeys) && failedKeys.length > 0) {
        res = errorHandling.appError(req, res, "005", [failedKeys]);
        return false;
    }
    return true;
}

module.exports.sendJSONResponse = function(req, res, respJson) {
    return res.status(200).json({
        requestId: _.get(req, 'requestId'),
        results: respJson,
        success: true
    });
}