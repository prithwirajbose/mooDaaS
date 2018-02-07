var ErrorHandling = {};
var _ = require('./lodash.min.js');
var errorMessageConfig = require('../config/error-message');


/** Used by Application for Application errors like Tier 1 Service Unavailable **/
module.exports.appError = function(req, res, errCd, placeHolders) {
    var errMsgObj = _.has(errorMessageConfig, errCd) ? _.get(errorMessageConfig, errCd) : _.get(errorMessageConfig, "001");
    var msg = _.get(errMsgObj, "message");
    if (!_.isNil(placeHolders) && _.isArray(placeHolders) && placeHolders.length > 0) {
        for (var i = 0; i < placeHolders.length; i++) {
            msg = msg.replace('{{' + i + '}}', placeHolders[i]);
        }
    }
    var responseData = {
        "requestId": _.get(req, 'requestId'),
        "errors": [{
            "code": errCd,
            "message": msg
        }],
        "success": false
    };
    res.status(_.has(errMsgObj, "status") ? _.get(errMsgObj, "status") : 500).send(responseData);
};

/** Used by Framework for Framework errors like JSON Parser Failure **/
module.exports.globalError = function(err, req, res, next) {
    console.error(err);
    var responseData = {
        "requestId": _.get(req, 'requestId'),
        "errors": [],
        "success": false
    };

    var httpStatus = 500;
    if (err instanceof SyntaxError) {
        var errMsgObj = _.get(errorMessageConfig, "002");
        responseData.errors.push({
            "code": "002",
            "message": _.get(errMsgObj, "message")
        });
        httpStatus = _.get(errMsgObj, "status")
    } else {
        var errMsgObj = _.get(errorMessageConfig, "004");
        responseData.errors.push({
            "code": "004",
            "message": _.get(errMsgObj, "message")
        });

        httpStatus = _.get(errMsgObj, "status")
    }
    res.status(httpStatus).send(responseData);
};