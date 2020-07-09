const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    item: String
});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;