var mongoose = require("mongoose");

var Client = mongoose.model('Client', {client: String,
                                       version: String,
                                       key: String,
                                       value: String});

module.exports = Client;
