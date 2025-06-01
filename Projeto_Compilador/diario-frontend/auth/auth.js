const jwt = require('jsonwebtoken');
const axios = require('axios')

const SECRET = "EngWeb2025";

module.exports.validateProdutor = async (req, res, next) => {

  const whoami = await axios.get('http://localhost:3000/whoami', {
      headers: {
        Cookie: `token=${req.cookies.token}`
      },
      withCredentials: true
    });
  const user = whoami.data;

  if (!user) return res.status(401).render('forbidden');

  try {

    if (user.perfil === "produtor" || user.perfil === "administrador") {
      req.user = user
      next();
    }
    else {
      res.status(403).render('forbidden');
    }

  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports.validateAdmin = async (req, res, next) => {

  const whoami = await axios.get('http://localhost:3000/whoami', {
      headers: {
        Cookie: `token=${req.cookies.token}`
      },
      withCredentials: true
    });
  const user = whoami.data;

  if (!user) return res.status(401).render('forbidden');

  try {

    if (user.perfil === "administrador") {
      req.user = user
      next();
    }
    else {
      res.status(403).render('forbidden');
    }

  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }

}