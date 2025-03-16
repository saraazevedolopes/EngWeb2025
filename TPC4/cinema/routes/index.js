var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).render('index', {
    title: 'Olá turma de 2025!',
  });
});

router.get('/filmes', function (req, res) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      res.status(200).render('filmes', { lfilmes: resp.data, tit: "Lista de Filmes" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('error', { error: error });
    });
});

router.post('/filmes/delete/:id', function (req, res) {
  const id = req.params.id;
  
  axios.delete(`http://localhost:3000/filmes/${id}`)
    .then(() => res.status(200).redirect('/filmes')) 
    .catch(error => {
      console.error('Erro ao apagar filme:', error);
      res.status(500).send('Erro ao apagar o filme.');
    });
});

router.get('/filmes/ator/:nome', function (req, res) {
  const nomeAtor = decodeURIComponent(req.params.nome);

  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      const filmesDoAtor = resp.data.filter(filme => filme.cast && filme.cast.includes(nomeAtor));
      res.status(200).render('filmesAtor', { tit: `Filmes de ${nomeAtor}`, ator: nomeAtor, lfilmes: filmesDoAtor });
    })
    .catch(error => {
      console.error('Erro ao buscar filmes:', error);
      res.status(500).render('error', { error: 'Erro ao buscar filmes do ator.' });
    });
});

router.get('/filmes/edit/:id', function (req, res) {
  const id = req.params.id;

  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      res.status(200).render('filmesEditar', { filme: resp.data });
    })
    .catch(error => {
      console.error('Erro ao carregar filme:', error);
      res.status(500).render('error', { error: 'Erro ao carregar os dados do filme.' });
    });
});

router.post('/filmes/edit/:id', function (req, res) {
  const id = req.params.id;
  const { year, title, cast, genres, new_cast, new_genres } = req.body;

  const elencoFinal = cast ? (Array.isArray(cast) ? cast : [cast]) : [];
  const generosFinal = genres ? (Array.isArray(genres) ? genres : [genres]) : [];

  if (new_cast && new_cast.trim() !== '') {
    elencoFinal.push(...new_cast.split(',').map(a => a.trim()).filter(a => a));
  }
  if (new_genres && new_genres.trim() !== '') {
    generosFinal.push(...new_genres.split(',').map(g => g.trim()).filter(g => g));
  }

  const filmeAtualizado = {
    year: Number(year),
    title: title.trim(),
    cast: elencoFinal,
    genres: generosFinal
  };

  axios.put(`http://localhost:3000/filmes/${id}`, filmeAtualizado)
    .then(() => res.status(200).redirect('/filmes'))
    .catch(error => {
      console.error('Erro ao editar filme:', error);
      res.status(500).render('error', { error: 'Erro ao editar filme.' });
    });
});

module.exports = router;