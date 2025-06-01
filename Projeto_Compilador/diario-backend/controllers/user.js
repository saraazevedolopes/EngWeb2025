var User = require('../models/user')

module.exports.findAll = () => {
    return User 
        .find()
        .exec()
}


module.exports.findById = (id) => {
    return User 
        .findById(id)
        .exec()
}

module.exports.findByIdSafe = (id) => {
    let utilizador = User 
        .findById(id)
        .exec()

    utilizador.pop(salt)
    utilizador.pop(auth_provider)
    utilizador.pop(hash)

    return utilizador
}


module.exports.save = async (userData) => {
    var user = await User.find({ username: userData.username }).exec();
    if (user.length < 1) {
        var newUser = new User(userData);
        return newUser.save(); // Salva o novo usuário no banco de dados
    }
    throw new Error('Utilizador já existe');
}

module.exports.update = (id, data,perfil) => {

    if (perfil != "administrador")
        data.perfil = "produtor"

    return User 
        .findByIdAndUpdate(id, data, {new : true}) // o new : true faz com que devolva o objeto já alterado
        .exec()
}

module.exports.delete = async (id) => {
   return User 
        .findByIdAndDelete(id)
        .exec();
}