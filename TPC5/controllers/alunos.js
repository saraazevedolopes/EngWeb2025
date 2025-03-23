var Aluno = require('../models/aluno')

module.exports.list = () => {
    return Aluno.find().sort({nome : 1}).exec()
}

module.exports.findById = id => {
    return Aluno.findOne({_id : id}).exec() 
}

module.exports.insert = async aluno => {
    const existe = await Aluno.findOne({_id: aluno.id}).exec()
    if (!existe) {
        var novoAluno = new Aluno(aluno)
        novoAluno._id = aluno.id
        return novoAluno.save()
    } else {
        throw new Error("Aluno já existe")
    }
}

module.exports.update = (id, aluno) => {
    for (let i = 1; i <= 8; i++) {
        const key = 'tpc' + i
        aluno[key] = aluno[key] ? true : false
    }

    return Aluno.findByIdAndUpdate(id, aluno, { new: true }).exec()
}

module.exports.delete = id => {
    return Aluno.findByIdAndDelete(id).exec()
}

module.exports.inverteTpc = async (id, idTpc) => {
    aluno = await Aluno.findOne({'_id' : id}).exec().then(aluno => {
        var tpc = `tpc${idTpc}`
        if (aluno[tpc] != null) {
            aluno[tpc] = !aluno[tpc]
        } else {
        aluno[tpc] = true
        }
        return Aluno.findByIdUpdate(idAluno, aluno).exec()
    })
}