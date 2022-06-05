const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');
const productsRouter = express.Router();
var ProductModel = require('../data/ProductModel.js');
var mongoose = require('mongoose');
//const addData = require('../data/AddData');

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology:true
  }

productsRouter.route('/').get((req, res) => {
  (async function mongo() {
    try {
     mongoose.connect('mongodb+srv://shaimaafarouk:P%40ssw0rd%401294@nodejsproductsapp.cilaa.mongodb.net/nodejsProducts?retryWrites=true&w=majority',mongodbOptions);
    var conn = mongoose.connection;
    conn.on('connected', function() {
      debug('Connected to the mongooose DB successfully');
  });

     ProductModel.find((err, products) => {
      if (!err) {
          res.render("products", { products
          });
          
      } else {
          console.log('Failed to retrieve the products data: ' + err);
      }
  });
      
    } catch (error) {
      debug(error.stack);
    }
    
  })();
  });

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  (async function mongo() {
    try {
    mongoose.connect('mongodb+srv://shaimaafarouk:P%40ssw0rd%401294@nodejsproductsapp.cilaa.mongodb.net/nodejsProducts?retryWrites=true&w=majority',mongodbOptions);
    var conn = mongoose.connection;
    conn.on('connected', function() {
      debug('Connected to the mongooose DB successfully');
  });

     
    const CurrentProduct = ProductModel.findOne({ id:  Number(id)});
    CurrentProduct.find((err, product) => {
      if (!err) {
       if (product.length > 0){
          res.render("product", { product});
        }
        else {
          debug("The requested Product not found")
          res.send("<p style='color:red'>The requested Product not found !</p </br> <a href='/products'>view all products</a>")
        }
          
      } else {
        debug("The requested Product not found")
        res.send("<p style='color:red'>The requested Product not found !</p </br> <a href='/products'>view all products</a>")

      }
  });
      
    } catch (error) {
      debug(error.stack);
    }
    
  })();
  
});

module.exports = productsRouter;
