const express = require('express');
const router = express.Router();

// Página de login (também usada como callback do GitHub)
router.get('/login', (req, res) => {
  res.render('login'); // Assumindo que existe views/login.pug
});

module.exports = router;