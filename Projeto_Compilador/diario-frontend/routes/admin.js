const express = require('express');
const router = express.Router();
const axios = require('axios');

const auth = require('../auth/auth')

const API_URL_USERS = 'http://localhost:3000/utilizadores';
const API_URL_ITEMS = 'http://localhost:3000/items';
const API_URL_NOTICIAS = 'http://localhost:3000/noticias'; 

// Página do administrador
router.get('/',auth.validateAdmin, async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  try {
    res.status(200).render('admin/adminPage', {
      date: date,
      title: "Área reservada"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Lista dos utilizadores
router.get('/utilizadores', auth.validateAdmin, async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  try {
    const token = req.cookies.token;
    const response = await axios.get(API_URL_USERS, {
      withCredentials: true,
      headers: {
        Cookie: `token=${token}`
      }
    });
    let utilizadores = response.data;
    res.status(200).render('admin/usersList', {
      utilizadores: utilizadores,
      date: date,
      title: "Lista de Utilizadores"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Apagar Utilizador
router.get('/utilizadores/delete/:id', auth.validateProdutor, async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  var id = req.params.id;
  try {
    const response = await axios.delete(API_URL_USERS + '/' + id, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    res.redirect('/admin/utilizadores');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});


// Lista dos recursos
router.get('/recursos',auth.validateAdmin, async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  try {
    const response = await axios.get(API_URL_ITEMS, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    let items = response.data;
    res.status(200).render('admin/itemsList', {
      items: items,
      date: date,
      title: "Lista de Recursos"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Lista + criação de notícias
router.get('/noticias', async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  try {
    const response = await axios.get(API_URL_NOTICIAS, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    let noticias = response.data;
    res.status(200).render('admin/noticias', {
      noticias: noticias,
      date: date,
      title: "Lista de Notícias"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

router.post('/noticias',auth.validateAdmin , async (req, res) => {
  try {
    await axios.post(API_URL_NOTICIAS, req.body, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    res.redirect('/admin/noticias');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Formulário de edição
router.get('/noticias/edit/:id',auth.validateAdmin , async (req, res) => {
  try {
    const response = await axios.get(`${API_URL_NOTICIAS}/${req.params.id}`, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    const noticia = response.data;
    res.status(200).render('admin/editarNoticia', {
      noticia: noticia,
      title: "Editar Notícia"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Guardar alterações
router.post('/noticias/edit/:id',auth.validateAdmin , async (req, res) => {
  try {
    await axios.put(`${API_URL_NOTICIAS}/${req.params.id}`, req.body, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    res.redirect('/admin/noticias');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Alternar visibilidade
router.get('/noticias/toggle/:id',auth.validateAdmin , async (req, res) => {
  try {
    await axios.post(`${API_URL_NOTICIAS}/${req.params.id}/toggle`, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    res.redirect('/admin/noticias');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

module.exports = router;
