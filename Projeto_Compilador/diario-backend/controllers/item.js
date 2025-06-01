var Item = require('../models/item')

module.exports.countAllClassificadores = () => {
  return Item.aggregate([
    { $unwind: "$classificadores" },
    { $group: { 
        _id: "$classificadores",          
        count: { $sum: 1 }                  
    }},
    { $sort: { count: -1, _id: 1 } }      
  ]).exec();
}

module.exports.findAll = () => {
    return Item 
        .find()
        .exec()
}

module.exports.findPublic = () => {
    return Item
        .find({ publico: true })
        .exec();
}

module.exports.getItemsProdutor = (produtor) => {
    return Item
        .find({ produtor: produtor })
        .exec();
}

module.exports.getAllItemsByClassificador = (classificador) => {
    return Item
        .find({ classificadores: classificador }) 
        .exec();
}

module.exports.getPublicItemsByClassificador = (classificador) => {
    return Item
        .find({ publico: true, classificadores: classificador })
        .exec();
}

module.exports.getPrivateItemsByClassificador = (classificador) => {
    return Item
        .find({ publico: false, classificadores: classificador })
        .exec();
}

module.exports.findPrivate = () => {
    return Item
        .find({ publico: false })
        .exec();
}

module.exports.findById = id => {
    return Item 
        .findById(id)
        .exec()
}

module.exports.save = async (item) => {
    var items = await Item.find({_id : item._id}).exec();
  
    if (items.length < 1) {
      var itemDb = new Item(item);
      return await itemDb.save();
    } else {
      return items[0];
    }
  }
  

module.exports.update = (id, data) => {
    return Item 
        .findByIdAndUpdate(id, data, {new : true}) // o new : true faz com que devolva o objeto já alterado
        .exec()
}

module.exports.delete = id => {
   return Item 
        .findByIdAndDelete(id)
        .exec();
}

module.exports.addComentario = (id,data,user) => {

    if (data.comentario.length == 0)
        return

    let username = null

    if (user && data.anonimo != "on")
        username = user._id

    let comentario = {
        username: username,
        comentario: data.comentario
    }

    return Item
        .findByIdAndUpdate(
          id,
          { $push: { comentarios: comentario } },
          { new: true }
        )
        .exec();

}