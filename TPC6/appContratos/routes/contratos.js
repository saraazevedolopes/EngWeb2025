var express = require('express');
var router = express.Router();
var axios = require('axios');

// Página principal com todos os contratos
router.get('/', function(req, res, next) {
  const date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:16000/')
    .then(dados => {
      res.status(200).render('index', {
        slist: dados.data,
        date: date
      });
    })
    .catch(error => res.status(500).render('error', { error: error }));
});

// Página de um contrato específico
router.get('/:id', function(req, res, next) {
  const date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:16000/' + req.params.id)
    .then(dados => {
      res.status(200).render('contrato', {
        contrato: dados.data,
        date: date
      });
    })
    .catch(error => res.status(500).render('error', { error: error }));
});

// Página de uma entidade específica
router.get('/entidades/:nipc', function(req, res, next) {
  const date = new Date().toISOString().substring(0, 16);
  const nipc = req.params.nipc;

  axios.get('http://localhost:16000/')
    .then(dados => {
      const contratos = dados.data.filter(c => c.NIPC_entidade_comunicante == nipc);
      const nome = contratos.length > 0 ? contratos[0].entidade_comunicante : 'Entidade desconhecida';
      const total = contratos.reduce((acc, c) => acc + (c.precoContratual || 0), 0);

      res.status(200).render('entidade', {
        entidade: { nipc: nipc, nome: nome },
        contratos: contratos,
        total: total.toFixed(2),
        date: date
      });
    })
    .catch(error => res.status(500).render('error', { error: error }));
});

module.exports = router;
