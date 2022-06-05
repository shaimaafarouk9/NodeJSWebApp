const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const products = require('../data/products.json');
const homeRouter = express.Router();
const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology:true
  }

  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb+srv://shaimaafarouk:P@ssw0rd@1294@nodejsproductsapp.cilaa.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(url,mongodbOptions, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodejsProducts");

    dbo.listCollections({name: 'products'})
    .next(function(err, collinfo) {
        if (collinfo) {}
        else{
          dbo.collection("products").insertMany(products, function(err, res) {
            if (err) throw err;
            db.close();

      });
    }
  });
});
module.exports = homeRouter;

