var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos');

// ---------------------------------------------------------------------------
// GET alunos listing
router.get('/alunos', (req, res) => {
  Aluno.list()
    .then(data => res.json(data)) 
    .catch(erro => res.status(500).jsonp(erro));
});

// ---------------------------------------------------------------------------
// GET aluno by ID
router.get('/alunos/:id', (req, res) => {
  Aluno.findById(req.params.id)
    .then(data => {
      if (data) res.json(data.toJSON()) 
      else res.status(404).json({ erro: `Aluno ${req.params.id} não encontrado.` })
    })
    .catch(erro => res.status(500).jsonp(erro));
});

// ---------------------------------------------------------------------------
// POST novo aluno
router.post('/alunos', (req, res) => {
  Aluno.insert(req.body)
    .then(data => res.status(201).json(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// ---------------------------------------------------------------------------
// PUT atualizar aluno
router.put('/alunos/:id', (req, res) => {
  Aluno.update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(erro => res.status(500).jsonp(erro));
});

// ---------------------------------------------------------------------------
// DELETE aluno
router.delete('/alunos/:id', (req, res) => {
  Aluno.delete(req.params.id)
    .then(() => res.status(204).end())
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
