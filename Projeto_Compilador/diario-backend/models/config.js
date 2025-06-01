const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
  files_counter : Number
});

module.exports = mongoose.model('config', configSchema);
