const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Iniciar login com GitHub
router.get('/', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Callback após login com GitHub
router.get('/callback', passport.authenticate('github', { session: false }), (req, res) => {
  // Gerar JWT após autenticação
  const token = jwt.sign({
    _id: req.user._id,
    nome: req.user.nome,
    perfil: req.user.perfil
  }, "EngWeb2025", { expiresIn: 3600 });

  // Redirecionar com token (podes enviar num cookie, query param ou JSON)
  // Exemplo simples:
  res.redirect(`http://localhost:3001/login?token=${token}`);
});

module.exports = router;
