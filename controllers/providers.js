
/*
 * GET userlist.
 */
exports.getUserList = function(req, res) {

    var db = req.db;
    var collection = db.get('providerlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
};


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


exports.deleteuser = function(req, res) {
    var db = req.db;
    var collection = db.get('providerlist');
    var userToDelete = req.body.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
};