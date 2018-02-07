/*var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});

db.close();*/

var PORT = 9000;

var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    expressValidator = require('express-validator'),
    routes = require('./routes.js'),
    utils = require('./libs/utils.js');

//Other Libraries
var errorHandling = require('./libs/error-handler.js');

//Create Express App
var app = express();
app.use(utils.initRequest);

//Parse Input as JSON
app.use(bodyParser.json({ extended: true }));
app.use(utils.logRequest);
//catch express errors
app.use(errorHandling.globalError);
app.use(cors());


//Setup Routes
app.use('/', routes);

var server = app.listen(PORT, function() {
    console.log('mooDaaS is running on at http://localhost:' + PORT + '/\n' +
        'Docs available at http://localhost:' + PORT + '/docs/');
});
module.exports = server;