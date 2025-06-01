var User = require('../models/user')
var Item = require('../models/item')
var Noticia = require('../models/noticia')

module.exports.clearAllUsers = () => {
    return User
      .deleteMany({});
}

module.exports.registerUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

module.exports.editUser = (id, updates) => {
    return User
        .findByIdAndUpdate(id, updates, { new: true })
        .exec();
};

module.exports.removeUser = (id) => {
    return User
        .findByIdAndDelete(id)
        .exec();
};

module.exports.listUsers = () => {
    return User
        .find()
        .exec();
};

// ---------- Recursos (AIPs) ----------

//module.exports.addAIP = (aipData) => {
//    const aip = new AIP(aipData);
//    return aip.save();
//};

module.exports.editItem = (id, updates) => {
    return Item.findByIdAndUpdate(id, updates, { new: true }).exec();
};

module.exports.removeItem = (id) => {
    return Item.findByIdAndDelete(id).exec();
};

module.exports.listItems = () => {
    return Item.find().exec();
};

//module.exports.exportAIP = (id) => {
//    return AIP.findById(id).exec(); // Ou gerar um ficheiro/export com os dados
//};

// ---------- Notícias ----------

module.exports.createNews = (newsData) => {
    const news = new Noticia(newsData);
    return news.save();
};

module.exports.updateNews = (id, updates) => {
    return Noticia.findByIdAndUpdate(id, updates, { new: true }).exec();
};

module.exports.toggleNewsVisibility = (id, visible) => {
    return Noticia.findByIdAndUpdate(id, { visible }, { new: true }).exec();
};

// ---------- Estatísticas ----------

//module.exports.getUsageStats = async () => {
//    // Exemplo básico: contar logs por tipo
//    const views = await Log.countDocuments({ action: 'view' });
//    const downloads = await Log.countDocuments({ action: 'download' });
//
//    return { views, downloads };
//};
