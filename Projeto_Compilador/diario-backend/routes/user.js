var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
var User = require('../controllers/user'); 

const Auth = require('../auth/auth')

const logger = require('../utils/logger');

router.get('/', function(req, res, next) {
    User.findAll()
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))
});

// Registo de utilizador
router.post('/register', async function(req, res, next) {

  const utilizadores = await User.findAll();

  console.log("USERS",utilizadores)

  let perfil = "produtor"

  if (utilizadores && utilizadores.length == 0)
    perfil = "administrador"

  userModel.register(
    new userModel({
      _id: req.body._id,
      nome: req.body.nome,
      email: req.body.email,
      perfil: perfil,
      auth_provider: 'local',
    }),
    req.body.password, //password fornecida pelo utilizador
    (err, user) => {
      if (err) {
        console.log("Erro ao registar:", err);
        res.status(500).jsonp(err);
      } else {

        // ADICIONADO APENAS ISTO:
        logger.evento("Novo utilizador registado", {
          _id: user._id,
          nome: user.nome,
          email: user.email,
          perfil: user.perfil
        });

        res.status(200).json({ message: "Utilizador registado com sucesso" });
      }
    }
  );
});

// Login e criação de JWT
router.post('/login', (req, res, next) => {
    console.log("Body recebido:", JSON.parse(JSON.stringify(req.body)));
  

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).jsonp({ error: err });
      }
  
      if (!user) {
        return res.status(400).jsonp({ error: info.message || "Credenciais inválidas." });
      }
    
      jwt.sign(
        {
          _id: user._id,
          nome: user.nome,
          perfil: user.perfil
        },
        "EngWeb2025",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(500).jsonp(err);
          } 

          //Cookie
          res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600 * 1000
          });

          return res.status(201).jsonp({ perfil: user.perfil });

        }
      );
    })(req, res, next);
  });
  
// Listar todos os utilizadores (apenas admins)
router.get('/:id', (req, res) => {

  console.log("USER")

  User.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).jsonp({ error: 'Utilizador não encontrado.' });
      }
      res.status(200).jsonp(data);
    })
    .catch(err => res.status(500).jsonp({ error: err.message }));
});

// Atualizar utilizador (apenas admins)
router.put('/:id',Auth.validateProdutor ,function(req, res, next) {

  if (req.user.perfil === "produtor" && req.user._id != req.params.id)
    res.status(403).jsonp("ola");
  else {

    User.update(req.params.id, req.body,req.user.perfil)
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))

  }
});

// Eliminar utilizador (apenas admins)
router.delete('/:id',Auth.validateProdutor ,function(req, res, next) {

  if (req.user.perfil === "produtor" && req.user._id != req.params.id)
    res.status(403).jsonp("Servidor entendeu o pedido, mas não o autoriza");
  else {
    User.delete(req.params.id, req.body.justificacao)
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
});

module.exports = router;
