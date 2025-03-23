var express = require('express');
var router = express.Router();
const axios = require('axios');
const apiURL = 'http://localhost:3000/api/alunos'; // API interna

// ---------------------------------------------------------------------------
// GET alunos listing.
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get(apiURL)
    .then(resp => res.status(200).render("alunos", { slist: resp.data, data: date }))
    .catch(erro => res.status(500).render("error", erro))
});

// ---------------------------------------------------------------------------
// GET formulário de adicionar aluno
router.get('/adicionar', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render("adicionarAluno", { data: date })
});

// POST adicionar aluno
router.post('/adicionar', function(req, res, next) {
  axios.post(apiURL, req.body)
    .then(resp => res.status(201).redirect("/alunos"))
    .catch(erro => res.status(500).render("error", erro))
});

// ---------------------------------------------------------------------------
// GET formulário de edição de aluno
router.get('/editar/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get(`${apiURL}/${req.params.id}`)
    .then(resp => {
      console.log("Aluno recebido da API:", resp.data) // <--- DEBUG
      res.status(200).render("editarAluno", { data: date, aluno: resp.data })
    })
    .catch(erro => {
      console.error("Erro ao obter aluno:", erro)
      res.status(500).render("error", erro)
    })
})

// POST atualização de aluno
router.post('/editar/:id', function(req, res, next) {
  axios.put(`${apiURL}/${req.params.id}`, req.body)
    .then(resp => res.status(201).redirect("/alunos"))
    .catch(erro => res.status(500).render("error", erro))
});

// ---------------------------------------------------------------------------
// GET apagar aluno (usado por botão/link)
router.get('/apagar/:id', function(req, res, next) {
  axios.delete(`${apiURL}/${req.params.id}`)
    .then(resp => res.status(201).redirect('/alunos'))
    .catch(erro => res.status(500).render("error", erro))
});

// ---------------------------------------------------------------------------
// GET aluno by id
router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get(`${apiURL}/${req.params.id}`)
    .then(resp => res.status(200).render('aluno', { aluno: resp.data, data: date }))
    .catch(erro => res.status(500).render("error", erro))
});

module.exports = router;
