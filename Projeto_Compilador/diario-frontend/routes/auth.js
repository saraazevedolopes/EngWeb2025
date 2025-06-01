var express = require('express');
var router = express.Router();
const axios = require('axios')

  // Formulário de login
router.get('/login', (req, res) => {
    const date = new Date().toISOString().substring(0, 16);
    res.render('login', {
      date: date,
      title: "Entrar"
    });
});

// Manda login ao backend
router.post('/login', async (req, res) => {
  try {

    const body = req.body;

    const response = await axios.post(
      'http://localhost:3000/utilizadores/login',
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      res.setHeader('Set-Cookie', setCookieHeader);
    }

    res.status(200).redirect('/');
  } catch (err) {
    res.status(401).json({ error: 'Credenciais inválidas ou erro de rede.' });
  }
});

// Formulario de SignUp
router.get('/signup', (req, res) => {
    const date = new Date().toISOString().substring(0, 16);
    res.render('register', {
      date: date,
      title: "Registar"
    });
});

// Manda signup ao backend
router.post('/signup', async (req, res) => {
  try {

    const body = req.body;

    const response = await axios.post(
      'http://localhost:3000/utilizadores/register',
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      res.setHeader('Set-Cookie', setCookieHeader);
    }

    res.status(200).redirect('/auth/login');
  } catch (err) {
    res.status(401).json({ error: 'Credenciais inválidas ou erro de rede.' });
  }
});


router.get('/logout', (req, res) => {

  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  res.redirect('/');
  
});


module.exports = router