const mongoose = require('mongoose');
const productCollection = "products";

const productSchema = new mongoose.Schema({
    id: {type:String},
    title: {type:String},
    descripcion: {type:String},
    code: {type:String} ,
    price: {type:String} ,
    estatus: {type:String} ,
    stock: {type:String} ,
    category:  {type:String} ,
});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };
