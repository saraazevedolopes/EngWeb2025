const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: String,
  titulo: String,
  descricao: String,
  tipo: String,
  classificadores: [String],
  data_criacao: Date,
  data_submissao: Date,
  produtor: String,
  submissor: String,
  publico: Boolean,
  ficheiros: [
    {
      _id : String,
      nome: String,
      descricao: String,
      tipo: String,
      caminho: String
    }
  ],
  comentarios: [
    {
    username : String,
    comentario : String
    }
  ]
});

module.exports = mongoose.model('Item', itemSchema);
