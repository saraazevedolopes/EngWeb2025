const Noticia = require('../models/noticia');

module.exports.findAll = () => {
    return Noticia
        .find()
        .sort({ data: -1 })
        .exec();
};

module.exports.findAllPublic = () => {
    return Noticia
        .find({ visivel: true })
        .sort({ data: -1 })
        .exec();
};

module.exports.findById = (id) => {
    return Noticia
        .findById(id)
        .exec();
};

module.exports.save = async (data) => {
    const noticia = new Noticia({
        _id: Date.now().toString(), // Gera ID simples baseado no timestamp
        titulo: data.titulo,
        corpo: data.conteudo,
        data: new Date(),
        visivel: data.visivel === 'true'
    });
    return await noticia.save();
};

module.exports.update = (id, data) => {
    return Noticia
        .findByIdAndUpdate(id, {
            titulo: data.titulo,
            corpo: data.conteudo,
            visivel: data.visivel === 'true'
        }, { new: true })
        .exec();
};

module.exports.toggleVisibility = async (id) => {
    const noticia = await Noticia.findById(id).exec();
    if (!noticia) return null;
    noticia.visivel = !noticia.visivel;
    return await noticia.save();
};
