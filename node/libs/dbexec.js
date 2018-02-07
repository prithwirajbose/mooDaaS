var _ = require('../libs/lodash.min.js');
require('dotenv').load();
var sqlite3 = require('sqlite3').verbose();
var sqlite = require('sqlite-sync');
var Promise = require("bluebird");

module.exports.query = function(qry) {
    return new Promise(function(resolve, reject) {
        try {
            var file = _.get(process.env, 'APP.DB_MAIN_FILE_PATH');
            sqlite.connect(file);
            var rowData = [];
            var res = sqlite.run(qry);
            resolve(res);
            sqlite.close();
        } catch (e) {
            sqlite.close();
            reject(e);
        }
    });
}