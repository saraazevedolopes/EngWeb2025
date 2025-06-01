// Carregar variáveis de ambiente do .env
require('dotenv').config();

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const userModel = require('../models/user'); // assume que usas mongoose e tens este model

// DEBUG opcional — útil para resolver erros
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CALLBACK_URL:", process.env.GITHUB_CALLBACK_URL);

// Configurar estratégia GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const username = profile.username;
      if (!username) {
        return done(new Error("GitHub profile has no username"));
      }

      // Verifica se já existe utilizador com este _id
      let user = await userModel.findById(username);

      if (!user) {
        // Criar novo utilizador
        user = await userModel.create({
          _id: username, 
          githubId: profile.id,
          nome: profile.displayName || username,
          email: profile.emails?.[0]?.value || `${username}@github.com`,
          perfil: 'consumidor',
          auth_provider: 'github'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
