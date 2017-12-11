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
var RETURNS_COLLECTION = "returns"
var VENDORS_COLLECTION = "vendors"

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/getAllOrders', getAllOrders);
router.get('/getAllReturns', getAllReturns);
router.post('/searchBy', searchBy);
router.post('/saveVendorDetails', saveVendorDetails);

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
  db.collection(ORDERS_COLLECTION).find().sort({purchaseDate : 1}).toArray(function (error, orders) {
    if (error) res.send({ message: "Database Problem.", status: 500 });

    res.send({ orders: orders, status: 200 });
  });
}

function getAllReturns(req, res) {
  db.collection(RETURNS_COLLECTION).find().sort({returnDate : 1}).toArray(function (error, returns) {
    if (error) res.send({ message: "Database Problem.", status: 500 });

    res.send({ returns: returns, status: 200 });
  });
}

function searchBy(req, res) {
  var query = {};
  var searchModel = req.body;
  if (searchModel.asin != undefined && searchModel.asin != '') {
    query.asin = searchModel.asin;
  }
  if (searchModel.emailId != undefined && searchModel.emailId != '') {
    query.emailId = searchModel.emailId;
  }
  if(searchModel.particularDate != undefined && searchModel.particularDate !=''){
    var date1 = new Date(searchModel.particularDate);
    var date2 = new Date(searchModel.particularDate);
    date1 = date1.toISOString().slice(0,-5) + '+00.00';
    date2 = date2.toISOString().slice(0,-13) + '18:30:00+00.00'
    query.purchaseDate = {
      $gte: date1,
      $lt : date2
    };
  }
  if(searchModel.startDate != undefined && searchModel.startDate != '' && 
    searchModel.endDate != undefined && searchModel.endDate != ''){
      var date1 = new Date(searchModel.startDate);
      var date2 = new Date(searchModel.endDate);
      date1 = date1.toISOString().slice(0,-5) + '+00.00';
      date2 = date2.toISOString().slice(0,-13) + '18:30:00+00.00'
      query.purchaseDate = {
        $gte: date1,
        $lt : date2
      };
    }
  db.collection(ORDERS_COLLECTION).find(query).sort({purchaseDate : 1}).toArray(function (error, orders) {
    if (error) res.send({ message: "Database Problem.", status: 500 });

    res.send({ orders: orders, status: 200 });
  });
}

function saveVendorDetails(req, res){
  
  db.collection(VENDORS_COLLECTION).insert(req.body,function(error,doc){
    if(error) res.send({message:"Database Problem.",status: 500});
    
    res.send({ message: "Details saved successfully..", status: 200 })
  });
}

module.exports = router;
