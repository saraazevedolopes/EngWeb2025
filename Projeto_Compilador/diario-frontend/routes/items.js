const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const auth = require('../auth/auth');
const { error } = require('console');

const API_URL = 'http://localhost:3000/items';

const upload = multer({ dest: 'uploads/' });

// Dar upload
router.post('/files',auth.validateProdutor, upload.single('sip'), async (req, res) => {
  try {
    const fileStream = fs.createReadStream(req.file.path);

    const form = new FormData();
    form.append('sip', fileStream, req.file.originalname);

    const response = await axios.post(API_URL + "/files", form, {
      headers: {
        ...form.getHeaders(),
        Cookie: `token=${req.cookies.token}`
      },
      withCredentials: true
    });

    res.redirect('back');

  } 
  catch (err) {
    const mensagemErro = err.response?.data?.mensagem || 'Erro ao processar';
    res.status(500).render('erroSIP', { mensagem: mensagemErro });
  }
  finally {
    if (req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
  }


});

// Apagar Recurso
router.get('/delete/:id',  async (req, res) => {

  const date = new Date().toISOString().substring(0, 16)
  var id = req.params.id

  try {

    const response = await axios.delete(API_URL + '/' + id, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    res.redirect('back')

  } catch (error) {
    res.status(500).render('error', { error });
  }

});

router.get('/edit/:id',auth.validateProdutor, async (req, res) => {
  const id = req.params.id;
  const date = new Date().toISOString().substring(0, 16);

  const previousUrl = req.get('Referer') || '/';

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    const item = response.data;

    if (req.user.perfil == "administrador" || (req.user.perfil == "produtor" && req.user._id == item.produtor)) {

      res.status(200).render('items/editItem', {
        previousUrl : previousUrl,
        item: item,
        date: date,
        title: "Editar Recurso"
      });
    }
    else {
      res.status(403).render('forbidden')
    }

  } catch (error) {

    if (error.status == 403)
      res.status(403).render('forbidden')
    else
      res.status(500).render('error', { error });

  }
});

router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var result = req.body;
  const redirectUrl = req.body.redirectUrl || '/';

  if (result) {

    if (typeof result.classificadores === 'string') {
      result.classificadores = result.classificadores.split(',').map(s => s.trim());
    }

    if (result.publico === 'on') {
      result.publico = true;
    } else {
      result.publico = false;
    }
    
    axios.put(`${API_URL}/${id}` , result, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    })
      .then(() => {
       res.redirect(redirectUrl)

      })
      .catch(error => {
        if (error.status == 403)
          res.status(403).render('forbidden')
        else
          res.status(500).render('error', { error });
      });

  } else {
      res.status(500).render("error", {error: "Não há dados", data: d})
  }
  
});

router.get('/:id', async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);

  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    const item = response.data;

    let lista_textos = []

    for (a of item.ficheiros) {

      if (a.tipo && a.tipo.startsWith('text/')) {
        const texto_response = await axios.get(`http://localhost:3000/fileStore/${req.params.id}/${a.caminho}`,{ responseType: 'text' })
        const texto = {
          texto: texto_response.data,
          nome: a.nome
        }

        lista_textos.push(texto)
      }

    }

    res.status(200).render('items/itemPage', { item, date, textos : lista_textos });


  } catch (error) {
    res.status(500).render('error', { error });
  }
});

router.post('/:id', async (req, res) => {
  const date = new Date().toISOString().substring(0, 16);
  const body = req.body

  try {

    const response = await axios.post(`${API_URL}/comentario/${req.params.id}`,body, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    
    res.status(200).redirect('/items/' + req.params.id);

  } catch (error) {
    res.status(500).render('error', { error });
  }
});


module.exports = router