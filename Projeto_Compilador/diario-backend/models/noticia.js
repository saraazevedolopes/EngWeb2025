const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  _id: String,
  titulo: String,
  corpo: String,
  data: Date,
  visivel: Boolean
});

module.exports = mongoose.model('Noticia', newsSchema);

