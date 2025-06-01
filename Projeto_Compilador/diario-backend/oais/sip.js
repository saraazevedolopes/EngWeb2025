const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');



function guardarZIP(zipFile) {

  if (!zipFile || !zipFile.path || !zipFile.filename) {
    throw new Error('Ficheiro ZIP inválido ou não enviado.');
  }

  const zipPath = zipFile.path;
  const extractPath = path.join(__dirname, '../uploads/extracted', zipFile.filename);

  // Validar se ZIP está vazio ou corrompido
  const stats = fs.statSync(zipPath);
  if (stats.size === 0) {
    throw new Error('Ficheiro ZIP está vazio.');
  }

  let zip;
  try {
    zip = new AdmZip(zipPath);
  } catch (err) {
    console.error('Erro ao abrir ZIP:', err.message);
    throw new Error('Formato ZIP inválido ou ficheiro corrompido.');
  }

  zip.extractAllTo(extractPath, true);

  console.log('Conteúdo extraído em:', extractPath);

  const extractedFolder = fs.readdirSync(extractPath);
  const zipFolder = extractedFolder[0]; // nome da pasta principal

  if (!zipFolder) {
    throw new Error('Nenhuma pasta encontrada dentro do ZIP extraído.');
  }

  return {
    zip : zipFolder,
    path : extractPath
  }

}


function validaSIP(zipFile,extractPath) {
  
  const manifestoPath = path.join(extractPath, 'manifesto-SIP.json');

  if (!fs.existsSync(manifestoPath)) {
    throw new Error("'manifesto-SIP.json' não encontrado no ZIP.");
  }

  const manifesto = JSON.parse(fs.readFileSync(manifestoPath, 'utf-8'));

  if (!Array.isArray(manifesto.ficheiros)) {
    throw new Error("Campo 'ficheiros' ausente ou inválido no manifesto.");
  }

  const ficheiros_a_guardar = [];

  for (const ficheiro of manifesto.ficheiros) {
    const ficheiroPath = path.join(extractPath, ficheiro.caminho);

    if (!fs.existsSync(ficheiroPath)) {
      throw new Error(`O ficheiro '${ficheiro.caminho}' listado no manifesto não foi encontrado.`);
    }

    ficheiros_a_guardar.push(ficheiro);
  }

  return {
    manifesto,
    ficheiros: ficheiros_a_guardar,
    extractPath: path.join(extractPath)
  };
  
}

module.exports = {
  validaSIP,
  guardarZIP
};
