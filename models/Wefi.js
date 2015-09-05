var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var wefiSchema = new mongoose.Schema({

    wifiname: { type: String, default: ''},
    wifipassword: { type: String, default: ''},
    message: { type: String, default: 'default message' },
    location: { type: String, default: ''},
    userEmail: { type: String, default: ''}
});

module.exports = mongoose.model('Wefi', wefiSchema);
