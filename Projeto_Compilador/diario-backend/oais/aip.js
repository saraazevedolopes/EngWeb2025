const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const Config = require('../controllers/config');
const Item = require('../controllers/item')

async function arquivarSIP(zipFile) {

  try {
    const res = await Config.get()

        console.log("ZIPFILE",zipFile)
        console.log("RES",res)
        console.log("PASTA",zipFile.extractPath)
        const zipName = 'sip' + res.files_counter

        const subpasta_fileStore = path.join(__dirname, '../public/fileStore', zipName); // criar a subpasta dentro de fileStore
        fs.mkdirSync(subpasta_fileStore, { recursive: true }); // criar essa subpasta

        for (const file of zipFile.ficheiros) {

            const path_ficheiro = path.join(subpasta_fileStore, file.caminho);
  
            fs.mkdirSync(path.dirname(path_ficheiro), { recursive: true }); // criar essa subpasta
            fs.renameSync(path.join(zipFile.extractPath, file.caminho), path_ficheiro); // mover o ficheiro da pasta temporária para a pasta final
        }

        await fs.promises.rm(zipFile.extractPath, { recursive: true, force: true });
        return zipName

  } catch(error) {
    throw new Error('Erro')
  }

}


async function guardaMetadadosDB(zipFile,zipName) {

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",zipFile.ficheiros)
  console.log(zipName)
  
  let ficheiros = zipFile.ficheiros

  ficheiros = ficheiros.map(f => ({
    ...f,
    _id: f.caminho
  }))

  console.log(ficheiros)

  metadados = zipFile.manifesto
  console.log("AAAAAA",metadados)
  const novoItem = {
          _id: zipName,
          titulo: metadados.titulo,
          descricao: metadados.descricao,
          tipo: metadados.tipo,
          classificadores: metadados.classificadores || [],
          data_criacao: metadados.data_criacao || new Date(),
          data_submissao: new Date(),
          publico: metadados.publico || false,
          produtor: metadados.produtor,
          submissor: metadados.submissor,
          ficheiros: ficheiros
        };
    
  console.log(novoItem)

  const resultado = await Item.save(novoItem);
  Config.incrementFilesCounter()
  //console.log('Resultado a enviar na resposta:', resultado);
  
        //res.status(201).json(resultado);


}

module.exports = {
  arquivarSIP,
  guardaMetadadosDB
};
