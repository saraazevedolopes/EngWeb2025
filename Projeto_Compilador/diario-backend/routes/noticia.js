const express = require('express');
const router = express.Router();
const Noticia = require('../controllers/noticia');
const Auth = require('../auth/auth'); 

// GET /noticias — lista todas
router.get('/',Auth.validateAdmin, (req, res) => {
  Noticia.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// GET /noticias/publico — lista todas
router.get('/publico',Auth.none, (req, res) => {
  Noticia.findAllPublic()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// GET /noticias/:id — obter uma notícia por ID
router.get('/:id',Auth.none, (req, res) => {
  Noticia.findById(req.params.id)
    .then(data => {
      if (!data) res.status(404).json({ error: "Notícia não encontrada" });
      else res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// POST /noticias — criar nova notícia
router.post('/',Auth.validateAdmin, (req, res) => {
  Noticia.save(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// PUT /noticias/:id — atualizar notícia
router.put('/:id',Auth.validateAdmin, (req, res) => {
  Noticia.update(req.params.id, req.body)
    .then(data => {
      if (!data) res.status(404).json({ error: "Notícia não encontrada" });
      else res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// POST /noticias/:id/toggle — alternar visibilidade
router.post('/:id/toggle',Auth.validateAdmin, async (req, res) => {
  try {
    const updated = await Noticia.toggleVisibility(req.params.id);
    if (!updated) res.status(404).json({ error: "Notícia não encontrada" });
    else res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
