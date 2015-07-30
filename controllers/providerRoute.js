
/*
var express = require('express');
var router = express.Router();

router.post('/addUser', function(req, res){
  var db = req.db;
  var collection = db.get('providerlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err===null) ? { msg: '' } : { msg: err}

      );

  });


});

