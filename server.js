var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Client = require('./clientModel');

var app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.get("/config/:client/:version", function(req, res) {
  Client.find({client: req.params.client, version: req.params.version}, function(err, clients) {
    if (err) {
      console.log(err);
    }
    else {
      var clientsConfig = {};

      for (var i = 0; i < clients.length; i++) {
        var key = clients[i].key;
        clientsConfig[key] = clients[i].value;
      }

      res.status(200).jsonp(clientsConfig);
    }
  });
});

app.post("/config", function(req, res) {

  var client = new Client(req.body);

  client.save(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      res.status(201).send('Created');
    }
  });
});

app.use(express.static(path.join(__dirname, 'build')));

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

module.exports = app;
