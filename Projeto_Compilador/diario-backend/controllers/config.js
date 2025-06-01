var Config = require('../models/config')

module.exports.get = () => {
  return Config.findOne().exec();
}

module.exports.incrementFilesCounter = async ()  => {
  const config = await Config.findOneAndUpdate(
    {}, 
    { $inc: {files_counter : 1 } }, // incrementa o valor de files_counter 1
    { new: true}
  )
  return config.files_counter;
}