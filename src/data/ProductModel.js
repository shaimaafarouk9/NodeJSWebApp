var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:Number,
    name: String,
    description: String,
    image: String,
    price:Number,
    rating :Number
  });
module.exports = mongoose.model('products', productSchema);  