const mongoose = require('mongoose');
const userCollection = "users";

const userSchema = new mongoose.Schema({
    nombre: {type:String},
    apellido: {type:String},
    edad: {type:String}
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = { userModel };
