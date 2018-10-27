var express = require("express");
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
var app = express();
const url ="mongodb://localhost:27017/Feed";


/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true     
    });
} catch (error) {
    
}

let port = 5000 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())


app.get('/', function (req, res, next) {
    res.status(200).end();
});

app.use('/api', require('./routes/ApiRoutes'));


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err);
});


app.set('port', 3001);

var server = app.listen(app.get('port'), function () {
   console.log('Express server listening on port ' + server.address().port);
});