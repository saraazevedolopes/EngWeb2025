const fs = require('fs');

const caminhoFicheiro = 'cinema.json';

fs.readFile(caminhoFicheiro, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o ficheiro:', err);
    return;
  }

  let jsonData;
  try {
    jsonData = JSON.parse(data);
    
    // Se jsonData for um array, transformá-lo num objeto com a chave "filmes"
    if (Array.isArray(jsonData)) {
      jsonData = { filmes: jsonData };
    }
    
    if (!jsonData.filmes || !Array.isArray(jsonData.filmes)) {
      console.error('Erro: O JSON não contém um array chamado "filmes".');
      return;
    }

  } catch (e) {
    console.error('Erro ao processar JSON:', e);
    return;
  }

  jsonData.filmes = jsonData.filmes.map((filme, index) => ({
    id: filme.id || index + 1, 
    title: filme.title,
    year: filme.year,
    cast: filme.cast || [],
    genres: filme.genres || []
  }));

  // Escreve o JSON atualizado no ficheiro
  fs.writeFile(caminhoFicheiro, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Erro ao escrever no ficheiro:', err);
    } else {
      console.log('Ficheiro atualizado com sucesso!');
    }
  });
});
