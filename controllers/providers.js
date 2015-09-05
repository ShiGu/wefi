
/*
 * GET userlist.
 */

 var User = require('../models/User');
 

 exports.getUserEmail = function(req, res){

    var userEmail = "testemail@gmail.com";

    console.log('user.email = ' + User.name);

    res.json({"email" : userEmail});

 };

exports.getUserList = function(req, res) {

    var db = req.db;
    var collection = db.get('providerlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
};


exports.addUser = function(req, res) {
    User.findOne({ email: req.body.email}, function(err, user){
        if(!user){
            res.render('login.jade');
        }else{
            user.sharedWifi.message = 'Successfully added user to db';
        }
        
        });
    res.redirect('/');
};


/* Old addUser function using Monk
exports.addUser = function(req, res) {
    var db = req.db;
    var collection = db.get('providerlist');
    collection.insert(req.body, function(err, result){
        if(err === null){
            res.send({msg: ''});
        }
        else{
            res.send({ msg: err});
        };
    });
};
*/

exports.deleteuser = function(req, res) {
    var db = req.db;
    var collection = db.get('providerlist');
    var userToDelete = req.body.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
};