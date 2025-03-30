var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato')

/* GET all contracts (optionally filtered by entidade and/or tipo). */
router.get('/', function(req, res, next) {
  const { entidade, tipo } = req.query;

  if (entidade && tipo) {
    Contrato.getAllContractsFilterByEntidadeAndTipo(entidade, tipo)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  } else if (entidade) {
    Contrato.getAllContractsFilterByEntidade(entidade)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  } else if (tipo) {
    Contrato.getAllContractsFilterByTipo(tipo)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  } else {
    Contrato.getAllContracts()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  }
});

/* GET entidades.*/
router.get('/entidades', function(req, res, next) {
  Contrato.getEntidades()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

/* GET tipos.*/
router.get('/tipos', function(req, res, next) {
  Contrato.getTipos()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

/* GET contract by ID. */
router.get('/:id', function(req, res, next) {
  Contrato.getContractById(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

/* POST new contract */
router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))  // 201 = Created
    .catch(error => res.status(500).jsonp(error))
});

/* PUT change contract */
router.put('/:id', function(req, res, next) {
  Contrato.update(req.params.id, req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error));
});

/* DELETE contract */
router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

module.exports = router;
