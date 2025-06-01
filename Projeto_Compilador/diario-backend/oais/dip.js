const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const Item = require('../controllers/item')

async function gerarDIP(itemId) {
    const item = await Item.findById(itemId);

    console.log("ITEM",item)

    const zip = new AdmZip();

    const subpasta_fileStore = path.join(__dirname, '../public/fileStore', item._id); // criar a subpasta dentro de fileStore
    
    console.log(subpasta_fileStore)

    for (const f of item.ficheiros) {

        const path_ficheiro = path.join(subpasta_fileStore, f.caminho);
        const file_path = path_ficheiro;
        zip.addLocalFile(file_path,'dados');
    }
    
    const manifestoDIP = {
        titulo: item.titulo,
        descricao: item.descricao,
        tipo: item.tipo,
        classificadores: item.classificadores,
        data_criacao: item.data_criacao,
        data_submissao: item.data_submissao,
        produtor_id: item.produtor,
        submissor_id: item.submissor,
        publico: item.publico,
        ficheiros: item.ficheiros
      };
    
    zip.addFile("manifesto-DIP.json", Buffer.from(JSON.stringify(manifestoDIP, null, 2)), "Manifesto DIP");

    const buffer = zip.toBuffer();
    return buffer;


    ```

    { 
  "titulo": "Caminhada na Serra",
  "descricao": "Uma bela caminhada em família pelas deslumbrantes montanhas do Gerês. Um trilho a repetir.",
  "tipo": "passeio",
  "classificadores" : ["treino","pensamento","natureza","local"],
  "data_criacao": "2025-05-11T15:32:00Z",
  "data_submissao": "2025-05-11T15:40:00Z",
  "produtor": "author1",
  "submissor": "author1",
  "publico": true,
  "ficheiros": [
    {
      "nome" : "Braga",
      "descricao" : "Fotografia do Bom Jesus",
      "tipo" : "image/jpeg",
      "caminho" : "dados/braga.jpg"
    },
    {
      "nome" : "Descrição",
      "descricao" : "Descrição sobre a caminhada",
      "tipo" : "text/plain",
      "caminho" : "dados/descricao1.txt"
    },
    {
      "nome" : "Treino",
      "descricao" : "Fotografia do Treino efetuado",
      "tipo" : "image/jpeg",
      "caminho" : "dados/treino.jpg"
    },
    {
      "nome" : "Notas",
      "descricao" : "Notas sobre o treino efetuado",
      "tipo" : "text/plain",
      "caminho" : "dados/notas.txt"
    }
  ]
}
    
    ```

}

//addLocalFile (localPath, zipPath, zipName)

module.exports = {
  gerarDIP
};
