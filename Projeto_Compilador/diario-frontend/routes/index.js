const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


const API_URL = 'http://localhost:3000/items';
const API_URL_USERS = 'http://localhost:3000/utilizadores';
const API_URL_NOTICIAS = 'http://localhost:3000/noticias/publico'

// Página Inicial
router.get('/', async (req, res) => {

  const date = new Date().toISOString().substring(0, 16);

  try {
    
    const whoami = await axios.get('http://localhost:3000/whoami', {
      headers: {
        Cookie: `token=${req.cookies.token}`
      },
      withCredentials: true
    });
    const user = whoami.data;

    let response
    if (req.query.classificador)
      response = await axios.get(API_URL + '?publico=true&classificador=' + req.query.classificador);
    else
      response = await axios.get(API_URL + '?publico=true');

    let items = response.data;

    items = items.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

    res.status(200).render('paginaPrincipal', {
      user: user,
      items: items,
      is_logged : !!req.cookies.token,
      date: date,
      title: "Página Inicial"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Classificadores
router.get('/classificadores', async (req, res) => {

  const date = new Date().toISOString().substring(0, 16);

  try {

    const response = await axios.get('http://localhost:3000/items/classificadores');
    let classificadores = response.data;

    res.status(200).render('classificadoresPage', {
      classificadores : classificadores,
      date: date,
      title: "Classificadores"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// ==============================
// ROTAS DE NOTÍCIAS 
// ==============================

// Lista + criação de notícias
router.get('/noticias', async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  try {
    const response = await axios.get(API_URL_NOTICIAS);
    let noticias = response.data;
    res.status(200).render('listarNoticias', {
      noticias: noticias,
      date: date,
      title: "Lista de Notícias"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});



module.exports = router