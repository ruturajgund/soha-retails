const express = require('express');
const router = express.Router();
var _ = require('lodash');
var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var Q = require('q');
var config = require('../../config.json');
var mongodb = require("mongodb");

var db;

mongodb.MongoClient.connect(config.connectionString, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

});


var USERS_COLLECTION = "users";
var ORDERS_COLLECTION = "orders";

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/getAllOrders', getAllOrders);

var currentUser;
function register(req, res) {

  db.collection(USERS_COLLECTION).findOne({ username: req.body.username }, function (error, user) {
    if (error) res.send({ message: "Database Problem.", status: 500 });

    if (user) {
      res.send({ message: 'Username ' + req.body.username + ' is already taken', status: 500 });
    }
    else {
      var user = _.omit(req.body, 'password');
      user.hash = bcrypt.hashSync(req.body.password, 10);
      db.collection(USERS_COLLECTION).insert(user, function (error, user) {
        if (error) res.send({ message: "Database Problem.", status: 500 });

        res.send({ message: "User registered successfully.", status: 200 });
      });
    }
  });
}

function authenticate(req, res) {

  db.collection(USERS_COLLECTION).findOne({ username: req.body.username }, function (err, user) {
    if (err) res.send({ message: "Database Problem.", status: 500 });

    if (user && bcrypt.compareSync(req.body.password, user.hash)) {
      currentUser = user.firstName + " " + user.lastName;
      // authentication successful
      res.send({ message: "User Authenticated successfully.", currentUser: user, status: 200, token: 'fake-jwt-token' });
    } else {
      // authentication failed
      res.send({ message: "Error: Username or password is incorrect", status: 500 });
    }
  });
}

function getAllOrders(req, res) {
    db.collection(ORDERS_COLLECTION).find().toArray(function(error,orders){
      if (error) res.send({message:"Database Problem.",status: 500});
      
      res.send({orders: orders,status: 200});
  });
}

module.exports = router;
