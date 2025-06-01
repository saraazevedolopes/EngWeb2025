const express = require('express');
const router = express.Router();
const axios = require('axios');

const auth = require('../auth/auth')

const API_URL_USERS = 'http://localhost:3000/utilizadores';
const API_URL_ITEMS_USERS = 'http://localhost:3000/items/produtor/';

// Página principal — lista de produtores
router.get('/', async (req, res) => {

  const date = new Date().toISOString().substring(0, 16);

  try {
    
    const response = await axios.get(API_URL_USERS, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });

    let utilizadores = response.data;

    res.status(200).render('users/usersList', {
      utilizadores: utilizadores,
      date: date,
      title: "Lista de Utilizadores"
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Página de Produtor
router.get('/:id', async (req, res) => {

  const id = req.params.id
  const date = new Date().toISOString().substring(0, 16);

  try {
    
    const response = await axios.get(API_URL_ITEMS_USERS + id, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });

    let items = response.data;

    const response_user = await axios.get(API_URL_USERS + '/'+id, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });

    let user = response_user.data;

    res.status(200).render('users/userPage', {
      items: items,
      user: user,
      date: date,
      title: "Produtor " + id
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});



router.get('/edit/:id',auth.validateProdutor, async (req, res) => {
  const id = req.params.id;
  const date = new Date().toISOString().substring(0, 16);

  const previousUrl = req.get('Referer') || '/';

  try {
    const response = await axios.get(`${API_URL_USERS}/${id}`, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });
    const user = response.data;

    if (req.user.perfil == "administrador" || (req.user._id == id)) {

      res.status(200).render('users/userEditPage', {
        previousUrl : previousUrl,
        user: user,
        date: date,
        title: "Editar Utilizador"
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
    
    axios.put(`${API_URL_USERS}/${id}` , result, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    })
      .then(() => {
       res.redirect(redirectUrl)

      })
      .catch(error => {
        console.error(error);
        if (error.status == 403)
          res.status(403).render('forbidden')
        else
          res.status(500).render('error', { error });
      });

  } else {
      res.status(500).render("error", {error: "Não há dados", data: d})
  }
  
});

router.get('/delete/:id',auth.validateProdutor, async (req, res) => {

  const date = new Date().toISOString().substring(0, 16)
  var id = req.params.id

  try {

    const response = await axios.delete(API_URL_USERS + '/' + id, {
       withCredentials: true,
       headers: {
        Cookie: `token=${req.cookies.token}`
      }
    });

    if (id == req.user._id)
      res.redirect('/auth/logout')
    else
      res.redirect('back')

  } catch (error) {
    
    if (error.status == 403)
      res.status(403).render('forbidden')
    else
      res.status(500).render('error', { error });

  }

});


module.exports = router