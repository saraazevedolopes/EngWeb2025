const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  nome: String,
  email: String,
  perfil: String,
  auth_provider: { type: String, default: "local" }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: '_id'
});


module.exports = mongoose.model('user', userSchema, 'utilizadores');

